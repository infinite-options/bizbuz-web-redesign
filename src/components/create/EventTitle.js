import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { ReactComponent as NextIcon } from "../../assets/continue.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { styled } from "@mui/material/styles";

const Dot = styled("div")(({ color }) => ({
  backgroundColor: color,
  borderRadius: "50%",
  width: "10px",
  height: "10px",
}));

const EventTitle = () => {
  const navigate = useNavigate();
  const [getEvent, setEvent] = useLocalStorage("event");
  const event = getEvent();
  const [title, setTitle] = useState(event.eventTitle || "");
  const [description, setDescription] = useState(event.eventDescription || "");
  const [access, setAccess] = useState(event.eventVisibility || "");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAccessChange = (newValue) => {
    setAccess(newValue);
  };

  const handleContinue = () => {
    event.eventTitle = title;
    event.eventDescription = description;
    event.eventVisibility = access;
    setEvent(event);
    if (event.isReview) navigate("/eventReview");
    else navigate("/eventImage");
  };

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
      </Stack>
      <Typography variant="h1" sx={{ mt: "58px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "26px" }}>
        <Typography variant="h2">{"Event Title"}</Typography>
        <TextField
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          placeholder="Write Event's title here..."
          sx={{ backgroundColor: "white", borderRadius: "8px" }}
        />
        <Typography variant="h2">{"Event Description"}</Typography>
        <TextField
          value={description}
          onChange={handleDescriptionChange}
          variant="outlined"
          multiline
          rows={8}
          placeholder="Describe your Event here..."
          sx={{ backgroundColor: "white", borderRadius: "8px" }}
        />
        <Typography variant="h2">
          {"Accessibility"}&nbsp;
          <HelpIcon />
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          style={{
            maxWidth: "550px",
          }}
        >
          <ToggleButton
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              width: "128px",
              height: "40px",
              color: "#000000",
              "&.Mui-selected": {
                backgroundColor: "#F26457 !important",
              },
            }}
            onClick={() => handleAccessChange("Public")}
            selected={access === "Public"}
          >
            <Dot color="#AA0E00" />
            &nbsp;
            {"Public"}
          </ToggleButton>
          <ToggleButton
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              width: "128px",
              height: "40px",
              color: "#000000",
              "&.Mui-selected": {
                backgroundColor: "#F26457 !important",
              },
            }}
            onClick={() => handleAccessChange("Private")}
            selected={access === "Private"}
          >
            <Dot color="#20B2AA" />
            &nbsp;
            {"Private"}
          </ToggleButton>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          style={{
            width: "92vw",
            position: "fixed",
            bottom: "30px",
            maxWidth: "550px",
          }}
        >
          <Button variant="contained" onClick={handleContinue} fullWidth>
            {"Continue"}&nbsp;
            <NextIcon />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventTitle;
