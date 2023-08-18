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

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NetworkingActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    setOptions({
      series: [
        {
          data: linksArr,
          nodes: nodesArr,
        },
      ],
    });
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

  useEffect(() => {
    isAttendeePresent(eventObj.event_organizer_uid, (m) => refreshGraph(m));
    broadcastAndExitSubscribe();
    return () => unSubscribe();
  }, []);

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
