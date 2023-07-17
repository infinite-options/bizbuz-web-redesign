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
import { ReactComponent as ClockBlackIcon } from "../../assets/card-clock-black.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import DefaultEventImage from "../../assets/default-event-image.png";
import dayjs from "dayjs";

const NewCardComponent = (onRegisterClick = () => {}) => {
  const handleRegisterClick = () => {
    onRegisterClick(event);
  };

  const event = {
    event_uid: "200-000106",
    event_title: "Party at the Lake",
    event_description: "Lake Party - bring swimsuits",
    event_organizer_uid: "100-000037",
    event_start_time: "3:00 PM",
    event_end_time: "12:00 AM",
    event_registration_code: "198774",
    event_type: "Business Marketing",
    event_visibility: "Public",
    pre_event_questionnaire:
      '[{"id":1,"question":"What is your current role?"},{"id":2,"question":"What is one thing you are really proud of?"}]',
    event_photo: "[]",
    event_capacity: "No Limit",
    event_start_date: "07/31/2023",
    event_end_date: "08/01/2023",
    event_location: "6099 Winfield Blvd, San Jose, CA 95120, USA",
    event_zip: "95120",
    event_location_name: "Almaden Lake Park",
    event_checkin_code: "726621",
    event_status: null,
    num_attendees: 0,
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
            align="end"
          >
            {dayjs(event.event_start_date).format("MMMM DD")}
          </Typography>

          <Typography variant="h2" color={eventTypeColor.textColor} mb={1}>
            {event.event_title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box width="50%">
              {JSON.parse(event.event_photo).length === 0 ? (
                <CardMedia
                  component="img"
                  height="174px"
                  image={DefaultEventImage}
                  alt="default"
                  sx={{ borderRadius: 3 }}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="174px"
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
