import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Button from "@mui/material/Button";
import EventCard from "../common/EventCard";

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EarlyArrival = () => {
  const location = useLocation();
  const { eventObj, user: userObj } = location.state;
  const navigate = useNavigate();
  const { addAttendee, isAttendeePresent, subscribe, unSubscribe } = useAbly(
    eventObj.event_uid
  );
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const handleEnterWaitingRoom = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    if (response.data.eventStarted === "1") {
      navigate("/networkingActivity", {
        state: { eventObj, userObj },
      });
    } else {
      navigate("/eventAttendees", {
        state: { eventObj, userObj },
      });
    }
  };

  const handleNewAttendee = async () => {
    await axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=1`
    );
    addAttendee(userObj.user_uid);
  };

  const validateAndRoute = async () => {
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}`
    );
    if (response.data.isOrganizer) {
      handleNewAttendee();
      navigate("/eventDashboard", {
        state: { eventObj, userObj },
      });
    } else {
      const response = await axios.get(
        `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
      );
      if (!response.data.hasRegistered) {
        navigate("/eventQuestionnaire", {
          state: { event: eventObj },
        });
        return;
      }
      handleNewAttendee();
      isAttendeePresent(eventObj.event_organizer_uid, () => {
        if (response.data.eventStarted === "1") {
          navigate("/networkingActivity", {
            state: { eventObj, userObj },
          });
        } else {
          joinSubscribe();
        }
      });
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const joinSubscribe = () => {
    subscribe((e) => {
      if (e.data === "Event started") {
        navigate("/networkingActivity", { state: { eventObj, userObj } });
      } else {
        setMessage(e.data);
        setShowAlert(true);
      }
    });
  };

  useEffect(() => {
    validateAndRoute();
    return () => unSubscribe();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <BackIcon
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Stack>
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
      <Typography variant="h1" sx={{ mt: "35px" }}>
        {"Event has not started"}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: "8px" }}
        color="secondary"
        onClick={handleEnterWaitingRoom}
      >
        {"Go to the Waiting Room"}
      </Button>
    </Box>
  );
};

export default EarlyArrival;
