
import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";


const EventInnfo = () => {
    const location = useLocation();
    const {event} = location.state;
    const navigate = useNavigate();
    return ( 
        <Box display="flex" justifyContent="center" flexDirection="column">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Brand style={{ marginTop: "36px" }} />
                <Back onClick={() => navigate(-1)} />
            </Box>
            <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ mt: 10 }}
            >
                <Card key={event.event_uid}>
                    <CardActionArea>
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
            </Stack>
            <Typography 
                variant="h1" 
                sx={{
                    mt: "35px",
                    color: "#FFF",
                    fontFamily: "Fira Sans Condensed",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
            >
                {"About The Event"}
            </Typography>
            <Box
                display="flex"
                width="347px"
                flexDirection="column"
                justifyContent="center"
                flexShrink={0}
                sx={{
                    typography: {
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "22.5px",
                    },
                    textIndent: "1em",
                    textAlign: "justify",
                    marginTop: "8px",
                }}
                >
                {"Join industry professionals, designers, and artists for an immersive evening of networking, inspiration, and collaboration. Explore the latest trends in design, share insights, and connect with like-minded creatives. RSVP now!"}
            </Box>
            <Typography 
                variant="h1" 
                sx={{
                    mt: "35px",
                    color: "#FFF",
                    fontFamily: "Fira Sans Condensed",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
            >
                {"Event Questions"}
            </Typography>
            <Box
                display="flex"
                width="347px"
                flexDirection="column"
                justifyContent="center"
                flexShrink={0}
                sx={{
                    typography: {
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "22.5px",
                    },
                    textIndent: "1em",
                    textAlign: "justify",
                    marginTop: "8px",
                }}
                >
                {/* {JSON.parse(event.pre_event_questionnaire).map((question, index) => (
                    <Typography key={question.id} variant="body1">
                        {`${index + 1}. ${question.question}`}
                    </Typography>
                ))} */}
                <Typography  variant="body1">
                    {"1. How did you discover Figma and what attracts you to the platform?"}
                </Typography>

                <Typography  variant="body1">
                    {"2. What design challenges are you currently facing, and how are you addressing them?"}
                </Typography>

                <Typography  variant="body1">
                    {"3. What features or functionalities in Figma do you find most valuable for your design workflow?"}
                </Typography>
                
            </Box>
        </Box>
        
     );
}
 
export default EventInnfo;