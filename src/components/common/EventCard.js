import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black-card.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import { ReactComponent as UserAltIcon } from "../../assets/user-alt.svg";
import { ReactComponent as UserAltBlackIcon } from "../../assets/user-alt-black.svg";
import { ReactComponent as DoneRingIcon } from "../../assets/done-ring.svg";
import { ReactComponent as DoneRingBlackIcon } from "../../assets/done-ring-black.svg";
import DefaultEventImage from "../../assets/event-default.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const getEventTypeColor = (event) => {
  const eventTypeColors = {
    "Business Marketing": {
      backgroundColor: "#3A8D75",
      textColor: "secondary",
      clockIcon: <ClockIcon />,
      markerIcon: <MarkerIcon />,
      userAltIcon: <UserAltIcon />,
      doneRingIcon: <DoneRingIcon />,
    },
    "Party or Event": {
      backgroundColor: "#90CAED",
      textColor: "#222222",
      clockIcon: <ClockBlackIcon />,
      markerIcon: <MarkerBlackIcon />,
      userAltIcon: <UserAltBlackIcon />,
      doneRingIcon: <DoneRingBlackIcon />,
    },
    "Social Mixer": {
      backgroundColor: "#F26457",
      textColor: "#222222",
      clockIcon: <ClockBlackIcon />,
      markerIcon: <MarkerBlackIcon />,
      userAltIcon: <UserAltBlackIcon />,
      doneRingIcon: <DoneRingBlackIcon />,
    },
    "Other": {
      backgroundColor: "#AA0E00",
      textColor: "secondary",
      clockIcon: <ClockIcon />,
      markerIcon: <MarkerIcon />,
      userAltIcon: <UserAltIcon />,
      doneRingIcon: <DoneRingIcon />,
    },
  };
  return (
    eventTypeColors[event.event_type] || {
      backgroundColor: "#3a8d75",
      textColor: "secondary",
      clockIcon: <ClockIcon />,
      markerIcon: <MarkerIcon />,
      userAltIcon: <UserAltIcon />,
      doneRingIcon: <DoneRingIcon />,
    }
  );
};

const EventCard = ({
  event,
  onButtonClick,
  isRegistered = false,
  isList = false,
  onCardClick,
  buttonLabel = "Register",
}) => {
  const [eventObj, setEventObj] = useState(event);
  const isFull = parseInt(event.event_capacity) - parseInt(event.registrants) > 0;
  const eventTypeColor = getEventTypeColor(event);

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick(event);
  };

  const handleCardClick = () => {
    if (onCardClick) onCardClick(event);
  };

  const getEvent = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      BASE_URL +
        `/GetEvents?timeZone=${user_timezone}&event_uid=${event.event_uid}`
    );
    const respEventObj = response.data.result[0];
    setEventObj({ ...eventObj, ...respEventObj });
  };

  useEffect(() => {
    if (!isList && isRegistered) getEvent();
  }, []);

  return (
    <Card
      sx={{ backgroundColor: eventTypeColor.backgroundColor, minWidth: 275 }}
    >
      <CardActionArea
        component={onCardClick ? "button" : "div"}
        onClick={handleCardClick}
        sx={{ cursor: onCardClick ? "pointer" : "default" }}
      >
        <CardContent>
          <Stack direction="row" spacing={1}>
            {isRegistered ? (
              <Box width="50%">
                <Grid container width="50%" spacing={1}>
                  <Grid item xs={2}>
                    {eventTypeColor.doneRingIcon}
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{
                      color: eventTypeColor.textColor,
                      pt: "12px !important",
                    }}
                  >
                    <Typography component="span" sx={{ pl: "12px" }}>
                      {"Attending"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : buttonLabel === "Edit Event" ? (
              <Box width="50%">
                <Button
                  component="a"
                  variant="contained"
                  color="buttonAlternative"
                  size="large"
                  sx={{
                    width: "100%",
                    height: 40,
                    mb: 1,
                    color: eventTypeColor.textColor,
                  }}
                  onClick={handleButtonClick}
                >
                  {buttonLabel}
                </Button>
              </Box>
            ) : (
              <Box width="50%"></Box>
            )}
            <Box
              width="50%"
              display="flex"
              justifyContent="flex-end"
              alignItems="right"
            >
              <Typography
                variant="h2"
                color={eventTypeColor.textColor}
                align="right"
              >
                {dayjs(eventObj.event_start_date).format("MMMM DD")}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="h2" color={eventTypeColor.textColor} mb={1}>
            {eventObj.event_title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box width="50%" mt={1}>
              {JSON.parse(eventObj.event_photo).length === 0 ? (
                <CardMedia
                  component="img"
                  height="134px"
                  width="100%"
                  image={DefaultEventImage}
                  alt="default"
                  sx={{ borderRadius: 3, objectFit: "cover" }}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="134px"
                  width="100%"
                  image={`${JSON.parse(eventObj.event_photo)}?${Date.now()}`}
                  alt="event"
                  sx={{ borderRadius: 3, objectFit: "cover" }}
                />
              )}
            </Box>
            <Box width="50%" sx={{ height: "134px", py: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  {eventTypeColor.clockIcon}
                </Grid>
                <Grid
                  item
                  xs={10}
                  sx={{
                    color: eventTypeColor.textColor,
                    pt: "12px !important",
                  }}
                >
                  {`${eventObj.event_start_time} - ${eventObj.event_end_time}`}
                </Grid>
                <Grid item xs={2} sx={{ pt: "17px !important" }}>
                  {eventTypeColor.markerIcon}
                </Grid>
                <Grid
                  item
                  xs={10}
                  sx={{
                    color: eventTypeColor.textColor,
                    pt: "12px !important",
                    display: "-webkit-box",
                    WebkitBoxOrient: "horizontal",
                    WebkitBoxAlign: "center",
                  }}
                >
                  <span
                    style={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {eventObj.event_location}
                  </span>
                </Grid>
              </Grid>
              {isRegistered ? (
                <Grid container spacing={1} sx={{ mt: 0.5 }}>
                  <Grid item xs={2}>
                    {eventTypeColor.userAltIcon}
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{
                      color: eventTypeColor.textColor,
                      pt: "12px !important",
                    }}
                  >
                    {`${eventObj.registrants} Registrants`}
                  </Grid>
                </Grid>
              ) : isFull ? (
                <Grid container spacing={1} sx={{ mt: 0.5 }}>
                  <Grid item xs={2}>
                    {eventTypeColor.userAltIcon}
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{
                      color: eventTypeColor.textColor,
                      pt: "12px !important",
                    }}
                  >
                    {"Registration closed"}
                  </Grid>
                </Grid>
              ) : handleButtonClick && buttonLabel === "Register" ? (
                <Button
                  variant="contained"
                  color="buttonAlternative"
                  size="large"
                  sx={{
                    width: "100%",
                    height: 40,
                    mt: 1,
                    color: eventTypeColor.textColor,
                  }}
                  onClick={handleButtonClick}
                >
                  {buttonLabel}
                </Button>
              ) : (
                <Grid container spacing={1} sx={{ mt: 0.5 }}>
                  <Grid item xs={2}>
                    {eventTypeColor.userAltIcon}
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{
                      color: eventTypeColor.textColor,
                      pt: "12px !important",
                    }}
                  >
                    {`${eventObj.registrants} Registrants`}
                  </Grid>
                </Grid>
              )}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
