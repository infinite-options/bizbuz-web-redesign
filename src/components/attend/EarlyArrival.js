import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import Button from "@mui/material/Button";
import NoImage from "../../assets/NoImage.png";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EarlyArrival = () => {
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const navigate = useNavigate();

  const handleEnterWaitingRoom = async () => {
    navigate("/eventRegistrants", {
      state: { eventObj, userObj },
    });
  };

  // const handleNewAttendee = async () => {
  //   await axios.put(
  //     `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=1`
  //   );
  //   addAttendee(userObj.user_uid);
  // };

  const validateAndRoute = async () => {
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=100-000038&eventId=200-000098`
    );
    if (response.data.isOrganizer) {
      navigate("/eventDashboard", {
        state: { eventObj, userObj },
      });
    } else {
      navigate("/earlyArrival", {
        state: { eventObj, userObj },
      });
    }
  };

  useEffect(() => {
    validateAndRoute();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Brand
        style={{ marginTop: "36px" }}
        onClick={() => {
          navigate("/");
        }}
      />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        {/* <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                {eventObj.event_title}
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
                    {new Date(eventObj.event_start_date).toLocaleString(
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
                    {`${eventObj.event_start_time} - ${eventObj.event_end_time}`}
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
                    {eventObj.event_location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {JSON.parse(eventObj.event_photo).length === 0 ? (
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
                image={`${JSON.parse(eventObj.event_photo)}?${Date.now()}`}
                alt="event"
              />
            )}
          </CardActionArea>
        </Card> */}

        <RegisteredCardComponent event={eventObj} />
      </Stack>
      <Typography variant="h1" sx={{ mt: "35px" }}>
        Event has not started
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: "8px" }}
        color="secondary"
        onClick={handleEnterWaitingRoom}
      >
        Go to the Waiting Room
      </Button>
    </Box>
  );
};

export default EarlyArrival;