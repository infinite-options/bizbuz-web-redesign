import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import EventCard from "../common/EventCard";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const ViewRegistrants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [attendees, setAttendees] = useState([]);

  const handleClickRegistrant = (registrant) => {
    navigate("/attendeeDetails", {
      state: { event, user, id: registrant.user_uid },
    });
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      // `${BASE_URL}/eventAttendees?eventId=${event.event_uid}&attendFlag=1`
      `${BASE_URL}/eventAttendees?eventId=${event.event_uid}`
    );
    const data = response["data"];
    setAttendees(data["attendees"]);
    console.log(data);
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
      </Stack>
      <Typography variant="h1" sx={{ mt: "58px" }}>
        {"Edit event"}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: "8px" }}
      >
        <EventCard event={event} isRegistered={true} />
      </Stack>
      <Card sx={{ mt: "16px", bgcolor: "#FFFFFF", color: "#000000" }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h2" component="div">
              {"Current Registrants"}
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
                      onClick={() => handleClickRegistrant(attendee)}
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

export default ViewRegistrants;
