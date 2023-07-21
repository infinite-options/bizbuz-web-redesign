import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Done } from "../../assets/done.svg";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;


const RegistrationConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(state.eventObj.eu_event);
  let email = state.email;
  let user = state.user;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  console.log(eventObj);
  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;

  const addEventUser = () => {
    let eObj = eventObj;
    eObj.eu_user_id = user_uid;
    axios
      .get(
        BASE_URL +
          `/CheckAlreadyRegistered/${eObj.eu_event_id},${eObj.eu_user_id}`
      )
      .then((response) => {
        if (response.data.message === "Already Registered") {
          console.log("Already Registered:", response.data.result[0]);
          setEvent(response.data.result[0]);
        } else {
          axios.post(BASE_URL + "/EventUser", eObj).then((response) => {
            console.log("Start Registering", response.data.result[0]);
            setEvent(response.data.result[0]);
          });
        }
      });
  };
  useEffect(() => {
    if (eventObj) {
      console.log("addEvent");
      addEventUser();
    }
  }, []);

  console.log("Event:", JSON.stringify(event));

  const getEventTypeColor = (eventType) => {
    const eventTypeColors = {
      "Party or Event": "#90CAED",
      "Business Marketing": "#3A8D75",
      "Social Mixer": "#F26457",
      "Other": "#AA0E00",
      // Add more event types and their corresponding colors here
    };
    // Return the color based on event_type
    return eventTypeColors[eventType] || "#3A8D75"; // Default color
  };

  const eventTypeColor = getEventTypeColor(event.event_type);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 10 }}
      >
        <RegisteredCardComponent event={event} />
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
          marginBottom: "70px",
        }}
      >
        {"Registration Confirmed!"}
      </Typography>
      <Box
        display="flex"
        width="347px"
        height="163px"
        flexDirection="column"
        justifyContent="center"
        flexShrink={0}
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
        <Typography sx={{ml:"24px"}}>
          A confirmation email has been sent to the provided email address.
          Please check your inbox for further details.
        </Typography>
        <Box
          sx={{
            marginLeft: "130px",
            marginTop: "-8px",
            position: "relative",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Done />
        </Box>
        <Typography sx={{ mt: "32px", ml:"24px" }}>
          Make it easy to share your contact info by making a Free bizCard
        </Typography>
      </Box>
      
      {/* <Typography
        variant="h1"
        sx={{
          mt: "-32px",
          textAlign: "center",
          color: "#FFF",
          fontFamily: "Fira Sans Condensed",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Registration Code:{" "}
        <span style={{ fontSize: "30px", marginLeft: "8px" }}>
          {event.event_registration_code}
        </span>
      </Typography> */}

      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="40vh" 
        >
          <Button
            variant="contained"
            sx={{
              width: "352.5px",
              height: "56px",
              mt: "auto",
              backgroundColor: eventTypeColor,
            }}
            onClick={() => {
              navigate("/createBizCard", {state: { event, user},});
            }}
          >
            {"Create a bizCard"}
          </Button>

          <Button
            variant="contained"
            sx={{
              width: "352.5px",
              height: "56px",
              mt: "56px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            {"Go Back to Homepage"}
          </Button>
        </Box>
    </Box>
  );
};

export default RegistrationConfirmation;
