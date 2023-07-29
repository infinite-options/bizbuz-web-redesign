import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black-card.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import { ReactComponent as UserAltIcon } from "../../assets/user-alt.svg";
import { ReactComponent as UserAltBlackIcon } from "../../assets/user-alt-black.svg";
import { ReactComponent as DoneRingIcon } from "../../assets/done-ring.svg";
import { ReactComponent as DoneRingBlackIcon } from "../../assets/done-ring-black.svg";
import DefaultEventImage from "../../assets/event-default.png";
import { Grid } from "@mui/material";

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
    Other: {
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
  registrants,
  onCardClick,
  buttonLabel = "Register",
}) => {
  const eventTypeColor = getEventTypeColor(event);

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick(event);
  };

  const handleCardClick = () => {
    if (onCardClick) onCardClick(event);
  };

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
                {/* <Typography
                  color={eventTypeColor.textColor}
                  variant="b"
                  alignItems="center"
                >
                  {eventTypeColor.doneRingIcon}
                  <Typography component="span" sx={{ fontFamily: "Inter" }}>
                    &nbsp;{"Attending"}
                  </Typography>
                </Typography> */}
                <Stack
                  direction="row"
                  width="50%"
                  color={eventTypeColor.textColor}
                >
                  {eventTypeColor.doneRingIcon}
                  <Typography component="span" sx={{ pt: "3px" }}>
                    &nbsp;{"Attending"}
                  </Typography>
                </Stack>
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
                {dayjs(event.event_start_date).format("MMMM DD")}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="h2" color={eventTypeColor.textColor} mb={1}>
            {event.event_title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box width="50%" mt={1}>
              {JSON.parse(event.event_photo).length === 0 ? (
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
                  image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
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
                  {`${event.event_start_time} - ${event.event_end_time}`}
                </Grid>
                <Grid item xs={2} sx={{ pt: "15px !important" }}>
                  {eventTypeColor.markerIcon}
                </Grid>
                <Grid
                  item
                  xs={10}
                  sx={{
                    color: eventTypeColor.textColor,
                    pt: "12px !important",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {event.event_location}
                </Grid>
              </Grid>
              {isRegistered ? (
                // <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                //   {eventTypeColor.userAltIcon}&nbsp;
                //   <Typography color={eventTypeColor.textColor} variant="body2">
                //     {`${registrants} Registrants`}
                //   </Typography>
                // </Box>
                <Grid container spacing={1} sx={{ mt: 1 }}>
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
                    {`${registrants} Registrants`}
                  </Grid>
                </Grid>
              ) : handleButtonClick ? (
                <Button
                  variant="contained"
                  color="buttonAlternative"
                  size="large"
                  sx={{ width: "100%", height: 40, mt: 1 }}
                  onClick={handleButtonClick}
                >
                  {buttonLabel}
                </Button>
              ) : (
                {}
              )}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
