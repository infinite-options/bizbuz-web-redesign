import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Map from "./Map";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { Card, CardContent, CardMedia, Icon } from "@mui/material";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import DefaultEventImage from "../../assets/event-default.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [getEvent, setEvent, removeEvent] = useLocalStorage("event");
  const event = getEvent();

  const handleAddEvent = async () => {
    const user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    event.user_timezone = user_timezone;
    const headers = {
      // "content-type": "application/json",
    };
    const requestBody = new FormData();
    for (const key of Object.keys(event)) {
      if (typeof event[key] === "object" && key !== "img_cover") {
        requestBody.append(key, JSON.stringify(event[key]));
      } else if (key === "img_cover") {
        requestBody.append(key, getImage(event[key]));
      } else {
        requestBody.append(key, event[key]);
      }
    }
    const response = await fetch(BASE_URL + "/AddEvent", {
      method: "POST",
      headers: headers,
      body: requestBody,
    });
    removeEvent();
    const data = await response.json();
    navigate("/eventCode", { state: { event: data.result[0] } });
  };

  const handleUpdateEvent = async () => {
    const user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    event.user_timezone = user_timezone;
    const headers = {
      // "content-type": "application/json",
    };
    const requestBody = new FormData();
    const fileName = "img_cover";
    for (const key of Object.keys(event)) {
      if (typeof event[key] === "object" && key !== "img_cover") {
        requestBody.append(key, JSON.stringify(event[key]));
      } else if (key === fileName) {
        requestBody.append(key, getImage(event[key]));
      } else {
        requestBody.append(key, event[key]);
      }
    }
    if (!requestBody.has(fileName))
      requestBody.append(fileName, JSON.parse(event["event_photo"])[0]);
    const response = await fetch(BASE_URL + "/UpdateEvent", {
      method: "PUT",
      headers: headers,
      body: requestBody,
    });
    removeEvent();
    const data = await response.json();
    navigate("/editEvent", { state: { event: data.result[0], user } });
  };

  const getImage = (img) => {
    var arr = img.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "cover.jpeg", { type: mime });
  };

  const getEventTypeColor = () => {
    const eventTypeColors = {
      "Business Marketing": {
        backgroundColor: "#3A8D75",
        textColor: "secondary",
        clockIcon: <ClockIcon />,
        markerIcon: <MarkerIcon />,
      },
      "Party or Event": {
        backgroundColor: "#90CAED",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
      "Social Mixer": {
        backgroundColor: "#F26457",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
      Other: {
        backgroundColor: "#AA0E00",
        textColor: "secondary",
        clockIcon: <ClockIcon />,
        markerIcon: <MarkerIcon />,
      },
    };
    return (
      eventTypeColors[event.event_type] || {
        backgroundColor: "#3a8d75",
        textColor: "secondary",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      }
    );
  };
  const eventTypeColor = getEventTypeColor();

  const handleChange = (route) => {
    event.isReview = true;
    setEvent(event);
    navigate(route, { state: { user } });
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
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Box display="flex" flexDirection="column" sx={{ minHeight: "62vh" }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h2">{"Event Review"}</Typography>
            <Card sx={{ minWidth: 275 }}>
              <Box
                bgcolor={eventTypeColor.backgroundColor}
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <CardContent>
                  <Typography
                    variant="h2"
                    color={eventTypeColor.textColor}
                    mb={1}
                    align="right"
                    onClick={() => handleChange("/eventDetails")}
                  >
                    {dayjs(event.event_start_date).format("MMMM DD")}
                  </Typography>

                  <Typography
                    variant="h2"
                    color={eventTypeColor.textColor}
                    mb={1}
                    onClick={() => handleChange("/eventTitle")}
                  >
                    {event.event_title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box width="50%" mt={1}>
                      {event.img_cover ? (
                        <CardMedia
                          component="img"
                          height="120rem"
                          image={event.img_cover}
                          alt="default"
                          sx={{ borderRadius: 3 }}
                          onClick={() => handleChange("/eventImage")}
                        />
                      ) : event.isEdit ? (
                        <CardMedia
                          component="img"
                          height="120rem"
                          image={JSON.parse(event.event_photo)[0]}
                          alt="event"
                          sx={{ borderRadius: 3 }}
                          onClick={() => handleChange("/eventImage")}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="120rem"
                          image={DefaultEventImage}
                          alt="event"
                          sx={{ borderRadius: 3 }}
                          onClick={() => handleChange("/eventImage")}
                        />
                      )}
                    </Box>
                    <Box width="50%" gap={1}>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        color={eventTypeColor.textColor}
                        variant="body2"
                        my={1}
                        onClick={() => handleChange("/eventDetails")}
                      >
                        {eventTypeColor.clockIcon}
                        <span>
                          {event.event_start_time} - {event.event_end_time}
                        </span>
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        color={eventTypeColor.textColor}
                        variant="body2"
                        mb={1}
                        onClick={() => handleChange("/eventLocation")}
                      >
                        <Icon>{eventTypeColor.markerIcon}</Icon>
                        <span> {event.event_location}</span>
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Box>
            </Card>
            <Box
              sx={{
                color: "#000000",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "100%",
                textAlign: "left",
                pl: 2,
                py: 2,
                fontFamily: "'Inter Variable', sans-serif",
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                  {"Event Type"}
                </Grid>
                <Grid
                  item
                  xs={6}
                  onClick={() => handleChange("/eventDetails")}
                  sx={{ fontWeight: "normal" }}
                >
                  {event.event_type}
                </Grid>
                <Grid item xs={6}>
                  {"Accessibility"}
                </Grid>
                <Grid
                  item
                  xs={6}
                  onClick={() => handleChange("/eventTitle")}
                  sx={{ fontWeight: "normal" }}
                >
                  {event.event_visibility}
                </Grid>
                <Grid item xs={6}>
                  {"Event Capacity"}
                </Grid>
                <Grid
                  item
                  xs={6}
                  onClick={() => handleChange("/eventDetails")}
                  sx={{ fontWeight: "normal" }}
                >
                  {event.event_capacity}
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                color: "#000000",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "100%",
                textAlign: "left",
                pl: 2,
                py: 2,
                fontFamily: "'Inter Variable', sans-serif",
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                  {"Pre-Event Questionnaire"}
                </Grid>
                {JSON.parse(event.pre_event_questionnaire).map((q) => (
                  <Grid
                    item
                    key={q.id}
                    xs={12}
                    onClick={() => handleChange("/eventQuestions")}
                    sx={{ fontWeight: "normal" }}
                  >
                    {q.question}
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                color: "#000000",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                height: "100%",
                textAlign: "left",
                pl: 2,
                py: 2,
                fontFamily: "'Inter Variable', sans-serif",
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
              onClick={() => handleChange("/eventLocation")}
            >
              <Grid container rowSpacing={1}>
                <Grid item xs={6} sx={{ alignSelf: "center" }}>
                  {"Event Location"}
                </Grid>
                <Grid item xs={6}>
                  <Map
                    latitude={event.lat}
                    longitude={event.long}
                    height="150px"
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            width: "92vw",
            maxWidth: "550px",
            pb: 2,
          }}
        >
          {event.isEdit ? (
            <Button
              color="info"
              variant="contained"
              onClick={handleUpdateEvent}
              fullWidth
            >
              {"Update Event"}
            </Button>
          ) : (
            <Button
              color="info"
              variant="contained"
              onClick={handleAddEvent}
              fullWidth
            >
              {"Create Event"}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventReview;
