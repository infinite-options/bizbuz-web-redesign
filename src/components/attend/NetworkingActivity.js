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
import pfp from "../../images/pfp.jpg"
import CosineGraph from "./Graphs/CosineGraph";
import ClassGraph from "./Graphs/ClassGraph";

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
  const { eventObj, userObj, isBusiness } = location.state;
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
    if(isBusiness){
      setOptions({
        series: [
          {
            data: linksArr,
            nodes: nodesArr,
          },
        ],
      });
    }
    
    setLoading(false);
  };

  const handleEndEvent = async () => {
    try{
      console.log("before the put",userObj.user_uid,eventObj.event_uid)
      await axios.put(
        `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=0`
      );
      console.log(" handle");
    }
    catch(error){
      console.log("error in end event handle",error);
    }
  };

  const handleLeaveEvent = async () => {
    try{
      await handleEndEvent();
      const response = await axios.get(
        `${BASE_URL}/networkingGraph?eventId=${eventObj.event_uid}`
      );
      
      removeAttendee(userObj.user_uid, { ...response["data"] });
      fetchAttendees()
      navigate("/");
    }
    catch(error){
      console.log("error in leaving",error);
    }
  };

  const broadcastAndExitSubscribe = () => {
    console.log("in broadcast");
    if (eventObj.event_organizer_uid === userObj.user_uid) {
      onAttendeeEnterExit((m) => {
        if(isBusiness){
          refreshGraph(m);
        }
        else{
          fetchAttendees();
        }
        
        updateAttendee(userObj.user_uid, m.data);
      });
    } else {
      onAttendeeUpdate((m) => {
        if(isBusiness){
          refreshGraph(m);
        }
        else{
          fetchAttendees();
        }
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
    let nodesImg = {};
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
        let img_url=user_obj.images.replace(/[\[\]"]/g,'')
            
        if (img_url == ''){
            img_url=pfp
        }
        nodesImg[user_obj.first_name]={
            id:user_obj.first_name,
            // image:img_url,
            marker:{
                symbol: `url(${img_url})`,
                width: 50,
                height: 50,
            }
        }
    }
    console.log("updated users",updatedUsers);
    setEventUsers(updatedUsers);
    setAttendees(data["attendees"]);
    setNodesarr(nodesImg);
  };
  const get_cosine_data = async ()=>{
    setLoading(true);
    try{
        if(eventUsers!==undefined){
            console.log("before call",eventUsers);
            let arg=JSON.stringify(eventUsers);
            console.log("before call",encodeURIComponent(JSON.stringify(eventUsers)));
            
            let response = await axios.get(
                `${LOCAL_URL}/algorithmgraph?EventUsers=${encodeURIComponent(JSON.stringify(eventUsers))}`
            )
            console.log("response of alg",nodesarr);
            let node_images=[];
            if(response!==undefined || response.data!==undefined){
                response=response.data;
                // console.log("inside",response.replace(/'/g, '"'));
                
                response = JSON.parse(response.replace(/'/g, '"'));
                console.log("the response",response);
                console.log("result of user response",response[userObj.user_uid]);
                if (response[userObj.user_uid].length==0){
                  // console.log("user",userObj);
                  let node_img=[nodesarr[userObj.first_name]];
                  console.log("the node_img",node_img);
                  setOptions({
                    series: [{
                        data:[userObj.first_name],
                        nodes:node_img,
                        marker:{
                          radius:20,
                        }
                    }]
                  })
                }
                let graph_data=[];
                let user_name=response[userObj.user_uid][0]["from"];
                node_images.push(nodesarr[user_name]);
                console.log("what is push",nodesarr[user_name]);
                for(let i=0;i<response[userObj.user_uid].length;i++){
                  graph_data.push([response[userObj.user_uid][i]["from"],response[userObj.user_uid][i]["to"]]);
                  node_images.push(nodesarr[response[userObj.user_uid][i]["to"]]);
                }
                //pushes all nodes that point to the user to graph data
                for(const key in response){
                  for(let i=0;i<response[key].length;i++){
                    console.log("here",response[key],response[key][i]);
                    if(response[key][i]["to"]==user_name){
                      graph_data.push([response[key][i]["from"],response[key][i]["to"]]);
                      node_images.push(nodesarr[response[key][i]["from"]]);
                    }
                  }
                }

                
                console.log("what the graph",graph_data);
                
                setNodeData(graph_data);
                console.log("image graph",node_images);
                setOptions({
                    series: [{
                        data:graph_data,
                        nodes:node_images,
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
    if(!isBusiness){
      fetchAttendees();
      onAttendeeEnterExit((m) => {
          console.log("in the attendee enter exit");
          fetchAttendees();
      });
    }
    // isAttendeePresent(eventObj.event_organizer_uid, (m) => refreshGraph(m));
    isAttendeePresent(eventObj.event_organizer_uid,(m) => refreshGraph(m));
    broadcastAndExitSubscribe();
    return () => unSubscribe();
  }, []);
  useEffect(()=>{
    if(!isBusiness){
      get_cosine_data();
    }
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
      <h1>Personal Graph</h1>
      <Stack spacing={2} direction="column">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>
      {(isOrganizer.current) ?  
        (isBusiness ?
          <>
            <h1>Graph of the overall Attendees</h1>
            <Stack spacing={2} direction="column">
              <ClassGraph eventObj={eventObj} userObj={userObj} registergraph={false}/>
            </Stack>
            <h1>Graph of the overall Registrants</h1>
            <Stack spacing={2} direction="column">
              <ClassGraph eventObj={eventObj} userObj={userObj} registergraph={true}/>
            </Stack>
          </>
          :
          <>
            <h1>Graph of the overall Attendees</h1>
            <Stack spacing={2} direction="column">
              <CosineGraph eventObj={eventObj} userObj={userObj} registergraph={false}/>
            </Stack>
            <h1>Graph of the overall Registrants</h1>
            <Stack spacing={2} direction="column">
              <CosineGraph eventObj={eventObj} userObj={userObj} registergraph={true}/>
            </Stack>
          </>
        )
        :
        <></>
      }
      


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
