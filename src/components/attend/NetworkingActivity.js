import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import HighchartsReact from "highcharts-react-official";
import NewCardComponent from "../new-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NetworkingActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventObj = location.state
    ? location.state.eventObj
    : JSON.parse(localStorage.getItem("event"));
  const userObj = location.state
    ? location.state.userObj
    : JSON.parse(localStorage.getItem("user"));
  const { removeAttendee, onAttendeeUpdate, subscribe, unSubscribe, detach } =
    useAbly(eventObj.event_uid);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
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

  const refreshGraph = async () => {
    const response = await axios.get(
      `${BASE_URL}/overallGraph?eventId=${eventObj.event_uid}`
    );
    const data = response["data"];
    let nodesArr = [];
    for (const u of data["users"]) {
      if (
        u.user_uid === userObj.user_uid ||
        (nodesArr.length <= 7 && u.user_uid !== userObj.user_uid)
      ) {
        nodesArr.push({
          id: u.user_uid,
          marker: {
            symbol: `url(${handleUserImage(u.images)})`,
            width: 50,
            height: 50,
          },
          name: `${u.first_name} is ${u.role}`,
          className: {
            clipPath: "circle()",
          },
        });
      }
    }
    let linksArr = [];
    for (const l of data["links"]) {
      if (l["from"] === userObj.user_uid || l["to"] === userObj.user_uid)
        linksArr.push(l);
    }
    setOptions({
      series: [
        {
          data: linksArr,
          nodes: nodesArr,
        },
      ],
    });
  };

  const handleEndEvent = async () => {
    await axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=0`
    );
  };

  const handleLeaveEvent = async () => {
    await handleEndEvent();
    removeAttendee(userObj.user_uid);
    navigate("/");
  };

  const broadcastAndExitSubscribe = () => {
    onAttendeeUpdate((m) => {
      refreshGraph();
    });
    subscribe((e) => {
      if (e.data === "Event ended") {
        handleEndEvent();
        detach();
        navigate("/");
      } else {
        setMessage(e.data);
        setShowAlert(true);
      }
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  useEffect(() => {
    refreshGraph();
    broadcastAndExitSubscribe();
    return () => unSubscribe();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Brand
        style={{ marginTop: "36px" }}
        onClick={() => {
          navigate("/");
        }}
      />
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
        <NewCardComponent
          event={eventObj}
          isRegisteredEventCard={true}
          totalRegistrants={eventObj.registrants}
        />
      </Stack>

      <Stack spacing={2} direction="column">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: "16px" }}
        color="primary"
        onClick={handleLeaveEvent}
      >
        {"Leave Event"}
      </Button>
    </Box>
  );
};

export default NetworkingActivity;
