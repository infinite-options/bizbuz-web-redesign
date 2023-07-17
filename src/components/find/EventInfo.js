import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import dayjs from "dayjs";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventInfo = () => {
  const location = useLocation();
  const { event } = location.state;
  const navigate = useNavigate();
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
        <Card sx={{ minWidth: 275 }}>
          <Box bgcolor={"#3a8d75"}>
            <CardContent>
              <Typography variant="h2" color="secondary" mb={1} align="end">
                {dayjs(event.event_start_date).format("MMMM DD")}
              </Typography>
              <Typography variant="h2" color="secondary" mb={1}>
                {event.event_title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Box>
                  {JSON.parse(event.event_photo).length === 0 ? (
                    <CardMedia
                      component="img"
                      height="174px"
                      image={NoImage}
                      alt="default"
                      sx={{ borderRadius: 3 }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="174px"
                      image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                      alt="event"
                      sx={{ borderRadius: 3 }}
                    />
                  )}
                </Box>
                <Stack spacing={1}>
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    gap={0.5}
                    color="secondary"
                    variant="body2"
                  >
                    <ClockIcon mr={1} />
                    <span>
                      {event.event_start_time} - {event.event_end_time}
                    </span>
                  </Typography>
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    gap={0.5}
                    color="secondary"
                    variant="body2"
                  >
                    <MarkerIcon mr={1} />
                    <span> {event.event_location}</span>
                  </Typography>
                  <Button
                    variant="contained"
                    color="buttonAlternative"
                    size="small"
                    sx={{ height: 40 }}
                    onClick={() => {
                      navigate("/eventQuestionnaire", {
                        state: { event: event },
                      });
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Box>
        </Card>
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
