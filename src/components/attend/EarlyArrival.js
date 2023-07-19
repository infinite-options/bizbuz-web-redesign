import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Button from "@mui/material/Button";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EarlyArrival = () => {
  const location = useLocation();
  const { eventObj, user: userObj } = location.state;
  const navigate = useNavigate();
  const { addAttendee, isAttendeePresent } = useAbly(eventObj.event_uid);

  const handleEnterWaitingRoom = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    if (response.data.eventStarted === "1") {
      navigate("/networkingActivity", {
        state: { eventObj, userObj },
      });
    } else {
      navigate("/eventAttendees", {
        state: { eventObj, userObj },
      });
    }
  };

  const handleNewAttendee = async () => {
    await axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=1`
    );
    addAttendee(userObj.user_uid);
  };

  const validateAndRoute = async () => {
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}`
    );
    if (response.data.isOrganizer) {
      handleNewAttendee();
      navigate("/eventDashboard", {
        state: { eventObj, userObj },
      });
    } else {
      const response = await axios.get(
        `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
      );
      if (!response.data.hasRegistered) {
        navigate("/preregistration-event/" + eventObj.event_registration_code, {
          state: { event: eventObj },
        });
        return;
      }
      handleNewAttendee();
      isAttendeePresent(eventObj.event_organizer_uid, () => {
        if (response.data.eventStarted === "1") {
          navigate("/networkingActivity", {
            state: { eventObj, userObj },
          });
        }
        // } else {
        //   navigate("/waiting", {
        //     state: { eventObj, userObj },
        //   });
        // }
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
        {"Event has not started"}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: "8px" }}
        color="secondary"
        onClick={handleEnterWaitingRoom}
      >
        {"Go to the Waiting Room"}
      </Button>
    </Box>
  );
};

export default EarlyArrival;
