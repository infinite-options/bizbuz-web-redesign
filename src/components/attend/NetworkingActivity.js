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
import { transformGraph } from "../../util/helper";
import HighchartsReact from "highcharts-react-official";
import EventCard from "../common/EventCard";

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
  const {
    isAttendeePresent,
    updateAttendee,
    removeAttendee,
    onAttendeeUpdate,
    subscribe,
    unSubscribe,
    detach,
  } = useAbly(eventObj.event_uid);
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

  const refreshGraph = async ({ data }) => {
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
    updateAttendee(eventObj.event_organizer_uid, { ...response["data"] });
    removeAttendee(userObj.user_uid, { ...response["data"] });
    navigate("/");
  };

  const broadcastAndExitSubscribe = () => {
    onAttendeeUpdate((m) => {
      refreshGraph(m);
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
    isAttendeePresent(eventObj.event_organizer_uid, (m) => refreshGraph(m));
    broadcastAndExitSubscribe();
    return () => unSubscribe();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Brand
        style={{ marginTop: "36px", cursor: "pointer" }}
        onClick={handleLeaveEvent}
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
        <EventCard event={eventObj} isRegistered={true} />
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
