import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import useLocalStorage from "../../util/localStorage";
import NewCardComponent from "../new-card-component";

const EditEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [buttonText, setButtonText] = useState("Share");
  const [getEvent, setEvent] = useLocalStorage("event");

  const handleShare = () => {
    navigator.clipboard.writeText(event.event_registration_code);
    setButtonText("Copied!");
    setTimeout(() => {
      setButtonText("Share");
    }, 2000);
  };

  const handleEditEvent = () => {
    event.isEdit = true;
    setEvent(event);
    navigate("/eventReview", { state: { event, user } });
  };

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
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
      </Stack>
      <Typography variant="h1" sx={{ mt: "40px" }}>
        {"Edit event"}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: "8px" }}
      >
        <NewCardComponent
          event={event}
          isRegisteredEventCard={true}
          totalRegistrants={event.registrants}
        />
      </Stack>
      <Box sx={{ display: "flex" }}>
        <Button
          color="secondary"
          variant="contained"
          sx={{
            width: "48%",
            height: "56px",
            mt: "15px",
            flexShrink: 0,
            borderRadius: "10px",
            background: "#F9FAFB",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            color: "#143959",
            fontFamily: "Inter",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            letterSpacing: "4.56px",
          }}
        >
          {event.event_registration_code}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleShare}
          sx={{
            ml: "4%",
            mt: "15px",
            width: "48%",
            height: "56px",
            flexShrink: 0,
            borderRadius: "10px",
            backgroundColor: eventTypeColor,
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            color: "#143959",
            fontFamily: "Inter",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          {buttonText}
        </Button>
      </Box>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        sx={{ mt: "60px" }}
        onClick={() => navigate("/viewRegistrants", { state: { event, user } })}
      >
        {"View Registrants"}
      </Button>
      <Button
        sx={{ mt: "16px" }}
        size="large"
        color="secondary"
        variant="contained"
        onClick={() =>
          navigate("/broadcastMessage", { state: { event, user } })
        }
      >
        {"Brodcast Message"}
      </Button>
      <Button
        sx={{ mt: "16px" }}
        size="large"
        color="secondary"
        variant="contained"
        onClick={() => navigate("/createEvent", { state: { event, user } })}
      >
        {"See Event List"}
      </Button>
      <Button
        sx={{ mt: "16px" }}
        size="large"
        color="secondary"
        variant="contained"
        onClick={handleEditEvent}
      >
        {"Edit Event"}
      </Button>
    </Box>
  );
};

export default EditEvent;
