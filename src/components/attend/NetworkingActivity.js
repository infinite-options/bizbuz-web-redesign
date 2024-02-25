import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import useAbly from "../../util/ably";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import NoUserImage from "../../assets/NoUserImage.png";
import Highcharts from "../../util/networking";
import { transformGraph } from "../../util/helper";
import HighchartsReact from "highcharts-react-official";
import EventCard from "../common/EventCard";
import Loading from "../common/Loading";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NetworkingActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventUsers, setEventUsers] = useState();
  const [nodesarr,setNodesarr]=useState([]);
  const [attendees, setAttendees] = useState([]);
  const [nodeData,setNodeData]=useState();
  const { eventObj, userObj } = location.state;
  const {
    publish,
    isAttendeePresent,
    updateAttendee,
    removeAttendee,
    onAttendeeUpdate,
    subscribe,
    onAttendeeEnterExit,
    unSubscribe,
    detach,
  } = useAbly(eventObj.event_uid);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isOrganizer = useRef(eventObj.event_organizer_uid === userObj.user_uid);
  const [options, setOptions] = useState({
    chart: {
      type: "networkgraph",
      height: 400,
      backgroundColor: "transparent",
      margin: 25,
      reflow: false,
    },
    title: {
      text: null,
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          initialPositions: "circle",
          repulsiveForce: () => 100,
        },
        point: {
          events: {
            click(e) {
              handleNodeClick(e.point);
            },
          },
        },
      },
    },
    series: [
      {
        link: {
          width: 2,
          color: "white",
        },
        dataLabels: {
          enabled: false,
          linkFormat: "",
          allowOverlap: true,
        },
        id: "networking",
        data: [],
        nodes: [],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  const handleNodeClick = (e) => {
    navigate("/attendeeDetails", {
      state: { event: eventObj, user: userObj, id: e.id },
    });
  };

  const handleUserImage = (images) => {
    const imagesArr = JSON.parse(images);
    return imagesArr.length > 0 ? imagesArr[0] : NoUserImage;
  };

  const refreshGraph = async ({ data }) => {
    if (Object.keys(data).length === 0) return;
    setLoading(true);
    const [nodesArr, linksArr] = transformGraph(
      data["user_groups"],
      data["users"],
      false,
      handleUserImage,
      userObj.user_uid
    );
    // setOptions({
    //   series: [
    //     {
    //       data: linksArr,
    //       nodes: nodesArr,
    //     },
    //   ],
    // });
    setLoading(false);
  };

  const handleEndEvent = async () => {
    await axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=0`
    );
  };

  const handleLeaveEvent = async () => {
    await handleEndEvent();
    const response = await axios.get(
      `${BASE_URL}/networkingGraph?eventId=${eventObj.event_uid}`
    );
    removeAttendee(userObj.user_uid, { ...response["data"] });
    navigate("/");
  };

  const broadcastAndExitSubscribe = () => {
    if (eventObj.event_organizer_uid === userObj.user_uid) {
      onAttendeeEnterExit((m) => {
        refreshGraph(m);
        updateAttendee(userObj.user_uid, m.data);
      });
    } else {
      onAttendeeUpdate((m) => {
        refreshGraph(m);
      });
    }
    subscribe((e) => {
      if (eventObj.event_organizer_uid !== userObj.user_uid) {
        if (e.data === "Event ended") {
          handleEndEvent();
          detach();
          navigate("/");
        } else {
          setMessage(e.data);
          setShowAlert(true);
        }
      }
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const handleStopEvent = async () => {
    publish("Event ended");
    await handleEndEvent();
    axios.put(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&eventStatus=0`
    );
    detach();
    navigate("/");
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}&attendFlag=1`
    );
    const data = response["data"];
    console.log("attendees get:",data["attendees"]);
    let updatedUsers = { ...eventUsers };
    // let nodesImg = [...nodesarr];
    let users=data["attendees"];
    for(let i=0;i<users.length;i++){
        let user_obj=users[i];
        console.log("logging:",users[i]);
        const qa= await  axios.get(`${BASE_URL}/eventRegistrant?eventId=${eventObj.event_uid}&registrantId=${user_obj.user_uid}`)
        updatedUsers[user_obj.first_name]={
            user_uid: user_obj.user_uid,
            images: user_obj.images,
            qas:JSON.parse(qa.data.registrant.eu_qas),
            first_name:user_obj.first_name,
            last_name:user_obj.last_name
        }
        
        // let img_url=user_obj.images.replace(/[\[\]"]/g,'')
        // nodesImg.push({
        //     id:user_obj.first_name,
        //     image:img_url,
        //     marker:{
        //         radius:20
        //     }
        // })
    }
    console.log("updated users",updatedUsers);
    setEventUsers(updatedUsers);
    setAttendees(data["attendees"]);

    // setNodesarr(nodesImg);
  };
  const get_cosine_data = async ()=>{
    // console.log("response",eventObj.event_uid);     
    setLoading(true);
    try{
        if(eventUsers!==undefined){
            console.log("before call",eventUsers);
            let arg=JSON.stringify(eventUsers);
            console.log("before call",encodeURIComponent(JSON.stringify(eventUsers)));
            // let temp="%7B%22marty1%22%3A%7B%22user_uid%22%3A%22100-000077%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000077%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22swimming%22%7D%5D%2C%22first_name%22%3A%22marty1%22%2C%22last_name%22%3A%22%22%7D%2C%22mart3%22%3A%7B%22user_uid%22%3A%22100-000080%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000080%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22surfing%22%7D%5D%2C%22first_name%22%3A%22mart3%22%2C%22last_name%22%3A%22%22%7D%2C%22mart2%22%3A%7B%22user_uid%22%3A%22100-000081%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000080%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22running%22%7D%5D%2C%22first_name%22%3A%22mart2%22%2C%22last_name%22%3A%22%22%7D%7D"
            let response = await axios.get(
                `${LOCAL_URL}/algorithmgraph?EventUsers=${encodeURIComponent(JSON.stringify(eventUsers))}`
            )
            console.log("response of alg",response.data);
            if(response!==undefined || response.data!==undefined){
                response=response.data;
                // console.log("inside",response.replace(/'/g, '"'));
                
                response = JSON.parse(response.replace(/'/g, '"'));
                console.log("result of user response",response[userObj.first_name]);

                let graph_data=[]
                for(let i=0;i<response[userObj.first_name].length;i++){
                  graph_data.push([userObj.first_name,response[userObj.first_name][i][0]]);
                }
                console.log("what the graph",graph_data);
                  // for (let key in response) {
                  //     console.log("response in key",response[key],response);
                  //     for(let i=0;i<response[key].length;i++){
                  //         graph_data.push([key,response[key][i][0]]);
                  //     }
                  // }
                
                setNodeData(graph_data);
                
                setOptions({
                    series: [{
                        data:graph_data,
                        nodes:nodesarr,
                        marker:{
                          radius:20,
                        }
                    }]
                })
            }      
        }
    }
    catch(error){
        console.log("error in getting algorithm",error)
    }
    setLoading(false);
  }
  useEffect(() => {
    console.log("what is event",eventObj,userObj);
    fetchAttendees();
    // isAttendeePresent(eventObj.event_organizer_uid, (m) => refreshGraph(m));
    isAttendeePresent(eventObj.event_organizer_uid, (m) => get_cosine_data());
    broadcastAndExitSubscribe();
    return () => unSubscribe();
  }, []);
  useEffect(()=>{
    get_cosine_data();
  },[eventUsers]);

  return (
    <Box display="flex" flexDirection="column">
      <Brand
        style={{ marginTop: "36px", cursor: "pointer" }}
        onClick={isOrganizer.current ? handleStopEvent : handleLeaveEvent}
      />
      <Loading isLoading={isLoading} />
      <Snackbar
        open={showAlert}
        autoHideDuration={15000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleAlertClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        <EventCard event={eventObj} isRegistered={true} />
      </Stack>

      <Stack spacing={2} direction="column">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: "16px" }}
        color="primary"
        onClick={isOrganizer.current ? handleStopEvent : handleLeaveEvent}
      >
        {isOrganizer.current ? "Stop Event" : "Leave Event"}
      </Button>
    </Box>
  );
};

export default NetworkingActivity;
