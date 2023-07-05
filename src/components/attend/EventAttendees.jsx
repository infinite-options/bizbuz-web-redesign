import * as React from "react";
import {useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventAttendees = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj } = location.state;
    const [attendees, setAttendees] = useState([]);

    const fetchAttendees = async () => {
      const response = await axios.get(
        `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}`
      );
      const data = response["data"];
      setAttendees(data["attendees"]);
    };

    useEffect(() => {
      fetchAttendees();
    }, []);

    // const attendees = [
    //     {
    //       user_uid: "1",
    //       images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //       first_name: "John",
    //     },
    //     {
    //       user_uid: "2",
    //       images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //       first_name: "Jane",
    //     },
    //     {
    //       user_uid: "3",
    //       images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //       first_name: "Mike",
    //     },
    //     {
    //         user_uid: "4",
    //         images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //         first_name: "Mike",
    //     },
    //     {
    //     user_uid: "5",
    //     images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //     first_name: "Mike",
    //     },
    //     {
    //         user_uid: "6",
    //         images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //         first_name: "Mike",
    //     },
    //     {
    //         user_uid: "7",
    //         images: '["https://img.freepik.com/free-icon/user_318-159711.jpg"]',
    //         first_name: "Mike",
    //     },
    //   ];
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
            
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems="center"
                sx={{ minHeight: "30vh", mt: "16px"}}
            >
                {attendees.map((attendee) => (
                <Grid key={attendee.user_uid} item xs={4}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Avatar
                        src={JSON.parse(attendee.images)[0]}
                        sx={{
                        width: "80px",
                        height: "80px",
                        bgcolor: "#ff5722",
                        alignSelf: "center",
                        }}
                        alt={attendee.first_name}
                        // onClick={() => handleClickAttendee(attendee)}
                    />
                    <Typography align="center" color="#FFFFFF">
                        {attendee.first_name}
                    </Typography>
                    </Box>
                </Grid>
                ))}
            </Grid>

            <Button variant="contained" sx={{ mt: "16px" }} color="primary" onClick={() => navigate("/")}>
                Leave Event
            </Button>

        </Box>
     );

}
 
export default EventAttendees;