import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Done } from "../../assets/done.svg";
import EventCard from "../common/EventCard";
import Loading from "../common/Loading";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const RegistrationConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(state.eventObj.eu_event);
  const [userDetails, setUserDetails] = useState();
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const email = state.email;
  const user = state.user;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;

  const getUserProfile = async () => {
    const response = await axios.get(
      BASE_URL + `/CheckUserProfile/${user_uid}`
    );
    setUserDetails(response.data.result[0]);
  };

  const addEventUser = async () => {
    let eObj = eventObj;
    eObj.eu_user_id = user_uid;
    const chkResponse = await axios.get(
      BASE_URL +
        `/CheckAlreadyRegistered/${eObj.eu_event_id},${eObj.eu_user_id}`
    );
    if (chkResponse.data.message === "Already Registered") {
      setMessage(chkResponse.data.message);
      setEvent(chkResponse.data.result[0]);
    } else {
      const regResponse = await axios.post(BASE_URL + "/EventUser", eObj);
      setEvent(regResponse.data.result[0]);
      setMessage("Registration Confirmed!");
    }
  };

  const loadAndRegister = async () => {
    setLoading(true);
    await getUserProfile();
    if (eventObj) {
      await addEventUser();
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAndRegister();
  }, []);

  console.log("Event:", JSON.stringify(event));

  const getEventTypeColor = (eventType) => {
    const eventTypeColors = {
      "Party or Event": "#90CAED",
      "Business Marketing": "#3A8D75",
      "Social Mixer": "#F26457",
      Other: "#AA0E00",
      // Add more event types and their corresponding colors here
    };
    // Return the color based on event_type
    return eventTypeColors[eventType] || "#3A8D75"; // Default color
  };

  const eventTypeColor = getEventTypeColor(event.event_type);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} onClick={() => navigate("/")} />
      </Box>
      <Loading isLoading={isLoading} />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 10 }}
      >
        <EventCard event={event} isRegistered={true} />
      </Stack>
      <Typography
        variant="h1"
        sx={{
          mt: "35px",
          textAlign: "center",
          color: "#FFF",
          fontFamily: "Fira Sans Condensed",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          marginBottom: "15px",
        }}
      >
        {message}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        sx={{
          typography: {
            color: "#FFF",
            fontFamily: "Inter",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22.5px",
          },
          textIndent: "1em",
          textAlign: "justify",
          marginTop: "2px",
        }}
      >
        <Typography>
          A confirmation email has been sent to the provided email address.
          Please check your inbox for further details.
        </Typography>
        <Done style={{ marginTop: "15px" }} />
        <Typography sx={{ my: "15px" }}>
          Make it easy to share your contact info by making a Free bizCard
        </Typography>
      </Box>

      <Stack
        spacing={1}
        sx={{ position: "fixed", bottom: "30px", alignSelf: "center" }}
      >
        <Button
          variant="contained"
          sx={{
            width: "352.5px",
            height: "56px",
            backgroundColor: eventTypeColor,
          }}
          onClick={() => {
            navigate("/createBizCard", {
              state: {
                event: event,
                user: user,
                userDetails: userDetails,
                email: email,
                user_uid: user_uid,
              },
            });
          }}
        >
          {userDetails ? "Edit bizCard" : "Create a bizCard"}
        </Button>

        <Button
          variant="contained"
          sx={{
            width: "352.5px",
            height: "56px",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          {"Go Back to Homepage"}
        </Button>
      </Stack>
    </Box>
  );
};

export default RegistrationConfirmation;
