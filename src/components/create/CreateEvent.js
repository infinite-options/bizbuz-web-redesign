import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [events, setEvents] = useState([]);
  const [getEvent, setEvent, removeEvent] = useLocalStorage("event");

  const getEventsByUser = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      BASE_URL +
        `/GetEvents?event_organizer_uid=100-000038&timeZone=${user_timezone}`
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
        Create new Event
      </Typography>
      <Button variant="contained" sx={{ mt: "8px" }}>
        Create
      </Button>
      <Typography variant="h1" sx={{ mt: "35px" }}>
        Edit Event
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {events.map((event) => (
          <Card>
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
                <Grid container rowSpacing={{ xs: 1, sm: 10 }}>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
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
                  </Grid>
                  <Grid item xs={6} />
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <ClockIcon />
                    &nbsp;
                    <Typography variant="body1">
                      {`${event.event_start_time} - ${event.event_end_time}`}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <MarkerIcon />
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
                <img src={NoImage} alt="default" />
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
