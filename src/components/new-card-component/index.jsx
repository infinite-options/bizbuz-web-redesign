import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Stack,
  Icon,
} from "@mui/material";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import DefaultEventImage from "../../assets/event-default.png";
import dayjs from "dayjs";

const NewCardComponent = ({ event, onRegisterClick }) => {
  const handleRegisterClick = () => {
    onRegisterClick(event);
  };

  const getEventTypeColor = () => {
    const eventTypeColors = {
      Party: {
        backgroundColor: "#3A8D75",
        textColor: "secondary",
        clockIcon: <ClockIcon />,
        markerIcon: <MarkerIcon />,
      },
      "Business Marketing": {
        backgroundColor: "#90CAED",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
      "Social Mixer": {
        backgroundColor: "#F2ABA5",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
      Other: {
        backgroundColor: "#CE807A",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      },
    };

    // Return the color based on event_type
    return (
      eventTypeColors[event.event_type] || {
        backgroundColor: "#3a8d75",
        textColor: "secondary",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
      }
    );
  };
  const eventTypeColor = getEventTypeColor();

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box
        bgcolor={eventTypeColor.backgroundColor}
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <CardContent>
          <Typography
            variant="h2"
            color={eventTypeColor.textColor}
            mb={1}
            align="right"
          >
            {dayjs(event.event_start_date).format("MMMM DD")}
          </Typography>

          <Typography variant="h2" color={eventTypeColor.textColor} mb={1}>
            {event.event_title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box width="50%" mt={1}>
              {JSON.parse(event.event_photo).length === 0 ? (
                <CardMedia
                  component="img"
                  height="120rem"
                  image={DefaultEventImage}
                  alt="default"
                  sx={{ borderRadius: 3 }}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="120rem"
                  image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                  alt="event"
                  sx={{ borderRadius: 3 }}
                />
              )}
            </Box>
            <Box width="50%" gap={1}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={0.5}
                color={eventTypeColor.textColor}
                variant="body2"
                my={1}
              >
                {/* <ClockIcon mr={1} /> */}
                {eventTypeColor.clockIcon}
                <span>
                  {event.event_start_time} - {event.event_end_time}
                </span>
              </Typography>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={0.5}
                color={eventTypeColor.textColor}
                variant="body2"
                mb={1}
              >
                <Icon>{eventTypeColor.markerIcon}</Icon>
                <span> {event.event_location}</span>
              </Typography>
              <Button
                variant="contained"
                color="buttonAlternative"
                size="large"
                sx={{ width: "90%", height: 40 }}
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};

export default NewCardComponent;
