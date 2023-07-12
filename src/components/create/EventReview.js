import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Map from "./Map";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";

const BASE_URL =
  "https://qlw29nnkwh.execute-api.us-west-1.amazonaws.com/dev/api/v2";
// const BASE_URL = "http://localhost:4000/api/v2";

const EventReview = () => {
  const navigate = useNavigate();
  const [getEvent] = useLocalStorage("event");
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
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
                    {event.eventTitle}
                  </Typography>
                  <Grid container rowSpacing={1}>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <Stack spacing={2}>
                        <Stack direction="row">
                          <CalendarIcon />
                          &nbsp;
                          <Typography variant="body1">
                            {new Date(event.eventStartDate).toLocaleString(
                              "default",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </Typography>
                        </Stack>
                        <Stack direction="row">
                          <ClockIcon />
                          &nbsp;
                          <Typography variant="body1">
                            {`${event.eventStartTime} - ${event.eventEndTime}`}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <MarkerIcon />
                      &nbsp;
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 12, maxWidth: "80%" }}
                      >
                        {event.eventLocation}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardMedia
                  component="img"
                  height="174px"
                  image={event.img_cover}
                  alt="event"
                />
              </CardActionArea>
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
