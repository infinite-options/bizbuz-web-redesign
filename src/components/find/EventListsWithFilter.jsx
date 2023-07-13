import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { ReactComponent as Down } from "../../assets/down.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";

const EventListsWithFilter = () => {
    const location = useLocation();
    const {events} = location.state;
    // const [event, setEvent] = useState([]);
    const navigate = useNavigate();
    return (
        <Box display="flex" justifyContent="center" flexDirection="column">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Brand style={{ marginTop: "36px" }} />
                <Back onClick={() => navigate("/findEvent")} />
            </Box>
                <Grid
                    item
                    xs={12}
                    style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "flex-end",
                         height: "100vh",
                         flexShrink: 0,
                     }}
                    >

                    {events.length > 0 ? (
                        <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={2}
                        sx={{ mt: 2, p: 2 }}
                        style={{
                            backgroundColor: "white",
                            marginTop: "1rem",
                            minWidth: "100%",
                            borderRadius: "25px 25px 0px 0px",
                            width: "389px",
                            height: "732px",
                        }}
                        >
                        <Box
                            sx={{ mt: -45}}
                            style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0.5rem",
                            height: "0px",
                            }}
                            onClick={() => navigate("/findEvent")}
                        >
                            <Down/>
                        </Box>

                        {events.map((event) => {
                            return (
                            <Card key={event.event_uid}>
                                <CardActionArea
                                onClick={() => {
                                    navigate("/eventInfo",  {state: { event: event},});
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
                                    image={`${JSON.parse(
                                        event.event_photo
                                    )}?${Date.now()}`}
                                    alt="event"
                                    />
                                )}
                                </CardActionArea>
                            </Card>
                            );
                        })}
                        </Stack>
                    ) : (
                        <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 2, p: 2 }}
                        style={{
                            backgroundColor: "white",
                            marginTop: "1rem",
                            minWidth: "100%",
                            borderRadius: "25px 25px 0px 0px",
                            width: "389px",
                            height: "732px",
                        }}
                        >
                            <Box
                                sx={{ mt: -82}}
                                style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0.5rem",
                                height: "0px",
                                }}
                                onClick={() => navigate("/findEvent")}
                            >
                                <Down/>
                            </Box>
                            <Typography gutterBottom variant="h2" component="div" style={{ color: 'Black' }}>
                                    No Events Available For Now
                            </Typography>
                        </Stack>
                    )}
                </Grid>
        </Box>
    );
}
 
export default EventListsWithFilter;