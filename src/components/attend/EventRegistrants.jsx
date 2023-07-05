import { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;



const EventRegistrants = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj } = location.state;
    const [registrants, setRegistrants] = useState([]);
    const [eventHost, setEventHost] = useState(
      { user_uid: "7",
        images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
        first_name: "Mike",
      }
    );

    const handleAttendEvent = async () => {
      navigate("/eventAttendees", {
        state: { eventObj },
      });
    }
    const fetchRegistrants = async () => {
        const response = await axios.get(
          `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}`
        );
        const data = response["data"];

        setRegistrants(data["attendees"]);
      };

      const fetchOrganizers = async () => {
        const response = await axios.get( `${BASE_URL}/GetOrganizers`);
        const organizersData = response.data.result;
        console.log("Organizers Data:", organizersData); 
        const eventHost = organizersData.find(
          (organizer) => organizer.event_uid === eventObj.event_uid
        );
        console.log("Event Host:", eventHost);
        setEventHost(eventHost);
      };



      useEffect(() => {
        fetchOrganizers();
        fetchRegistrants();
      }, []);

    return (
        <Box display="flex" flexDirection="column">
            <Brand style={{ marginTop: "36px" }} onClick={() => {navigate("/");}}/>
            <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2 }}
            >
            <Card>
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
                      {new Date().toLocaleString(
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
            </CardActionArea>
            </Card>
            </Stack>

            <Card sx={{ mt: "8px", bgcolor: "#FFFFFF", color: "#000000"}}>
                <CardActionArea>
                <CardContent sx={{display: "flex", alignItems: "center"}}>
                    <Typography gutterBottom variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    {"Event Host"}
                    </Typography>
                        <Grid key={eventHost.user_uid} item xs={4}>
                            <Box sx={{ display: "flex", flexDirection: "column", }}>
                            <Avatar
                                src={JSON.parse(eventHost.images)[0]}
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
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ mt: "8px", bgcolor: "#FFFFFF", color: "#000000"}}>
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
                                    // onClick={() => handleClickRegistrant(registrant)}
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
            
            <Button variant="contained" sx={{width: '70%', mt: "8px", marginLeft:"auto", marginRight:"auto"}} color="secondary" onClick={handleAttendEvent}>
                    Attend Event
            </Button>
        </Box>
     );
}
 
export default EventRegistrants;