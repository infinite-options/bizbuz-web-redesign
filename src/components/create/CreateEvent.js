import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import useLocalStorage from "../../util/localStorage";
import NoImage from "../../assets/NoImage.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [getUser, setUser] = useLocalStorage("user");
  const [events, setEvents] = useState([]);
  const [getEvent, setEvent] = useLocalStorage("event");

  const getEventsByUser = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      BASE_URL +
        `/GetEvents?event_organizer_uid=${user.user_uid}&timeZone=${user_timezone}`
    );
    setEvents(response.data.result);
  };

  useEffect(() => {
    getEventsByUser();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Brand style={{ marginTop: "36px" }} />
      <Typography variant="h1" sx={{ mt: "78px" }}>
        {"Create new Event"}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: "8px" }}
        onClick={() => navigate("/eventDetails")}
      >
        {"Create"}
      </Button>
      <Typography variant="h1" sx={{ mt: "35px" }}>
        {"Edit Event"}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {events.map((event) => (
          <Card key={event.event_uid}>
            <CardActionArea
              onClick={() => {
                setEvent(event);
                navigate("/eventDetails");
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h2" component="div">
                  {event.event_title}
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
                          {new Date(event.event_start_date).toLocaleString(
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
                          {`${event.event_start_time} - ${event.event_end_time}`}
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
                      {event.event_location}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {JSON.parse(event.event_photo).length === 0 ? (
                <CardMedia
                  component="img"
                  height="174px"
                  image={NoImage}
                  alt="default"
                />
              ) : (
                <CardMedia
                  component="img"
                  height="174px"
                  image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                  alt="event"
                />
              )}
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default CreateEvent;
