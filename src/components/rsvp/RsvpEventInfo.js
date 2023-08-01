import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import EventCard from "../common/EventCard";
import dayjs from "dayjs";

const RsvpEventInfo = () => {
  const location = useLocation();
  const { event, user } = location.state;
  const navigate = useNavigate();

  const userAnswers = JSON.parse(event.eu_qas);

  const isEventToday = dayjs(event.event_start_date).isSame(dayjs(), "day");

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
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
        sx={{ mt: 10 }}
      >
        <EventCard event={event} isRegistered={true} />
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
          <div key={question.id}>
            <Typography key={question.id} variant="body1">
              {`${index + 1}. ${question.question}`}
            </Typography>
            <Typography variant="body1">
              Your Answer - {userAnswers[index].answer}
            </Typography>
          </div>
        ))}
      </Box>
      {isEventToday && (
        <Button
          variant="contained"
          sx={{
            width: "352.5px",
            height: "56px",
            mt: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            position: "fixed",
            bottom: "96px",
            left: "0",
            right: "0",
          }}
          color="secondary"
          onClick={() => {
            navigate("/earlyArrival", {
              state: { eventObj: event, user },
            });
          }}
        >
          {"Attend Event"}
        </Button>
      )}
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
          navigate("/", { state: { event: event } });
        }}
      >
        {"Cancel RSVP"}
      </Button>
    </Box>
  );
};

export default RsvpEventInfo;
