import { useNavigate } from "react-router-dom";
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
  const [getEvent, setEvent, removeEvent] = useLocalStorage("event");
  const event = getEvent();
  console.log(event);

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
      Party: {
        backgroundColor: "#3A8D75",
        textColor: "secondary",
        clockIcon: <ClockIcon />,
        markerIcon: <MarkerIcon />,
      },
      "Business Marketing": {
        backgroundColor: "#90CAED",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
      "Social Mixer": {
        backgroundColor: "#F2ABA5",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
      Other: {
        backgroundColor: "#CE807A",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
    };
    return (
      eventTypeColors[event.eventType] || {
        backgroundColor: "#3a8d75",
        textColor: "secondary",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      }
    );
  };
  const eventTypeColor = getEventTypeColor();

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
                  >
                    {dayjs(event.eventStartDate).format("MMMM DD")}
                  </Typography>

                  <Typography
                    variant="h2"
                    color={eventTypeColor.textColor}
                    mb={1}
                  >
                    {event.eventTitle}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box width="50%" mt={1}>
                      {!event.img_cover ? (
                        <CardMedia
                          component="img"
                          height="120rem"
                          image={DefaultEventImage}
                          alt="default"
                          sx={{ borderRadius: 3 }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="120rem"
                          image={event.img_cover}
                          alt="event"
                          sx={{ borderRadius: 3 }}
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
                      >
                        {eventTypeColor.clockIcon}
                        <span>
                          {event.eventStartTime} - {event.eventEndTime}
                        </span>
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        color={eventTypeColor.textColor}
                        variant="body2"
                        mb={1}
                      >
                        <Icon>{eventTypeColor.markerIcon}</Icon>
                        <span> {event.eventLocation}</span>
                      </Typography>
                      <Button
                        variant="contained"
                        color="buttonAlternative"
                        size="large"
                        sx={{ width: "90%", height: 40 }}
                        onClick={() => {
                          navigate("/eventQuestionnaire", {
                            state: { event },
                          });
                        }}
                      >
                        {"Register"}
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Box>
            </Card>
            <Button
              sx={{
                color: "#000000",
                backgroundColor: "#FFFFFF",
                pointerEvents: "none",
                borderRadius: "8px",
                height: "100%",
                textAlign: "left",
                pl: 2,
              }}
            >
              <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                  {"Event Type"}
                </Grid>
                <Grid item xs={6} sx={{ fontWeight: "normal" }}>
                  {event.eventType}
                </Grid>
                <Grid item xs={6}>
                  {"Accessibility"}
                </Grid>
                <Grid item xs={6} sx={{ fontWeight: "normal" }}>
                  {event.eventVisibility}
                </Grid>
                <Grid item xs={6}>
                  {"Event Capacity"}
                </Grid>
                <Grid item xs={6} sx={{ fontWeight: "normal" }}>
                  {event.eventCapacity}
                </Grid>
              </Grid>
            </Button>
            <Button
              sx={{
                color: "#000000",
                backgroundColor: "#FFFFFF",
                pointerEvents: "none",
                borderRadius: "8px",
                height: "100%",
                textAlign: "left",
                pl: 2,
              }}
            >
              <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                  {"Pre-Event Questionnaire"}
                </Grid>
                {event.preEventQuestionnaire.map((q) => (
                  <Grid item key={q.id} xs={12} sx={{ fontWeight: "normal" }}>
                    {q.question}
                  </Grid>
                ))}
              </Grid>
            </Button>
            <Button
              sx={{
                color: "#000000",
                backgroundColor: "#FFFFFF",
                pointerEvents: "none",
                borderRadius: "8px",
                height: "100%",
                textAlign: "left",
                pl: 2,
              }}
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
            </Button>
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
          <Button
            color="info"
            variant="contained"
            onClick={() => handleAddEvent()}
            fullWidth
          >
            {"Create Event"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventReview;
