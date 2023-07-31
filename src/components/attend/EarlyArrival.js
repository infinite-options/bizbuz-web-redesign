import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Button from "@mui/material/Button";
import EventCard from "../common/EventCard";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EarlyArrival = () => {
  const location = useLocation();
  const { eventObj, user: userObj } = location.state;
  const navigate = useNavigate();
  const { addAttendee, isAttendeePresent } = useAbly(eventObj.event_uid);

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
        }
        // } else {
        //   navigate("/waiting", {
        //     state: { eventObj, userObj },
        //   });
        // }
      });
    }
  };

  useEffect(() => {
    validateAndRoute();
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
