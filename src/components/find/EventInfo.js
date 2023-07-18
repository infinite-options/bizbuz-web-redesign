import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import NewCardComponent from "../new-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventInfo = () => {
  const location = useLocation();
  const { event } = location.state;
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/eventQuestionnaire", {
      state: { event: event },
    });
  };
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
        <Back onClick={() => navigate(-1)} />
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 10 }}
      >
        <NewCardComponent event={event} onRegisterClick={handleRegisterClick} />
      </Stack>
      <Typography
        variant="h1"
        sx={{
          mt: "35px",
          color: "#FFF",
          fontFamily: "Fira Sans Condensed",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        {"About The Event"}
      </Typography>
      <Box
        display="flex"
        width="347px"
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
          marginTop: "8px",
        }}
      >
        {event.event_description}
      </Box>
      <Typography
        variant="h1"
        sx={{
          mt: "35px",
          color: "#FFF",
          fontFamily: "Fira Sans Condensed",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        {"Event Questions"}
      </Typography>
      <Box
        display="flex"
        width="347px"
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
          marginTop: "8px",
        }}
      >
        {JSON.parse(event.pre_event_questionnaire).map((question, index) => (
          <Typography key={question.id} variant="body1">
            {`${index + 1}. ${question.question}`}
          </Typography>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{
          width: "352.5px",
          height: "56px",
          mt: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          position: "fixed",
          bottom: "20px",
          left: "0",
          right: "0",
        }}
        onClick={() => {
          navigate("/eventQuestionnaire", { state: { event: event } });
        }}
      >
        {"Continue Registration"}
      </Button>
    </Box>
  );
};

export default EventInfo;
