import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventRegistrants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const [registrants, setRegistrants] = useState([]);
  const [eventHost, setEventHost] = useState();

  const handleClickRegistrant = (registrant) => {
    navigate("/attendeeDetails", {
      state: { event: eventObj, user: userObj, id: registrant.user_uid },
    });
  };

  const fetchRegistrants = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}`
    );
    const data = response["data"];
    setRegistrants(data["attendees"]);
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

  useEffect(() => {
    fetchOrganizerProfile();
    fetchRegistrants();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand />
        <BackIcon
          style={{ marginLeft: "auto" }}
          onClick={() => navigate(-1, { state: { eventObj, userObj } })}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        <RegisteredCardComponent event={eventObj} />
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
              {"Current Registrants"}
            </Typography>
            <Grid container spacing={2}>
              {registrants.map((registrant) => (
                <Grid key={registrant.user_uid} item xs={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Avatar
                      src={JSON.parse(registrant.images)[0]}
                      sx={{
                        width: "80px",
                        height: "80px",
                        bgcolor: "#ff5722",
                        alignSelf: "center",
                      }}
                      alt={registrant.first_name}
                      onClick={() => handleClickRegistrant(registrant)}
                    />
                    <Typography align="center">
                      {registrant.first_name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* <Button
        variant="contained"
        sx={{
          display: "flex",
          width: "203px",
          height: "48px",
          padding: "8px 14px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
          borderRadius: "8px",
          background: "#3C8F7D",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          mt: "16px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        color="secondary"
        onClick={handleAttendEvent}
      >
        {"Attend Event"}
      </Button> */}
    </Box>
  );
};

export default EventRegistrants;
