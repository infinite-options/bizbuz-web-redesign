import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import EventCard from "../common/EventCard";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EventAttendees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const [eventHost, setEventHost] = useState();
  const [attendees, setAttendees] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { onAttendeeUpdate, subscribe, unSubscribe } = useAbly(
    eventObj.event_uid
  );

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}&attendFlag=1`
    );
    const data = response["data"];
    setAttendees(data["attendees"]);
  };

  const handleClickAttendee = (attendee) => {
    navigate("/attendeeDetails", {
      state: { event: eventObj, user: userObj, id: attendee.user_uid },
    });
  };

  // const fetchOrganizers = async () => {
  //   const response = await axios.get(`${BASE_URL}/GetOrganizers`);
  //   const organizersData = response.data.result;
  //   const eventHost = organizersData.find(
  //     (organizer) => organizer.event_uid === eventObj.event_uid
  //   );
  //   setEventHost(eventHost);
  // };

  const fetchOrganizerProfile = async () => {
    const response = await axios.get(
      `${BASE_URL}/profileByUserUID?userId=${eventObj.event_organizer_uid}`
    );
    setEventHost(response.data.profile);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const joinSubscribe = () => {
    onAttendeeUpdate((m) => {
      fetchAttendees();
    });
    subscribe((e) => {
      if (e.data === "Event started") {
        navigate("/networkingActivity", { state: { eventObj, userObj } });
      } else {
        setMessage(e.data);
        setShowAlert(true);
      }
    });
  };

  useEffect(() => {
    fetchOrganizerProfile();
    fetchAttendees();
    joinSubscribe();
    return () => unSubscribe();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <BackIcon
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => navigate(-1, { state: { eventObj, userObj } })}
        />
      </Stack>
      <Snackbar
        open={showAlert}
        autoHideDuration={15000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleAlertClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        <EventCard event={eventObj} isRegistered={true} />
      </Stack>
      <Card sx={{ mt: "16px", bgcolor: "#FFFFFF", color: "#000000" }}>
        <CardActionArea>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {"Event Host"}
            </Typography>
            {eventHost && (
              <Grid key={eventHost.user_uid} item xs={4}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Avatar
                    src={JSON.parse(eventHost.images)}
                    sx={{
                      width: "80px",
                      height: "80px",
                      bgcolor: "#ff5722",
                      alignSelf: "center",
                    }}
                    alt={eventHost.first_name}
                  />
                  <Typography align="center">{eventHost.first_name}</Typography>
                </Box>
              </Grid>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ mt: "16px", bgcolor: "#FFFFFF", color: "#000000" }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h2" component="div">
              {"Current Attendees"}
            </Typography>
            <Grid container spacing={2}>
              {attendees.map((attendee) => (
                <Grid key={attendee.user_uid} item xs={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Avatar
                      src={JSON.parse(attendee.images)}
                      sx={{
                        width: "80px",
                        height: "80px",
                        bgcolor: "#ff5722",
                        alignSelf: "center",
                      }}
                      alt={attendee.first_name}
                      onClick={() => handleClickAttendee(attendee)}
                    />
                    <Typography align="center">
                      {attendee.first_name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default EventAttendees;
