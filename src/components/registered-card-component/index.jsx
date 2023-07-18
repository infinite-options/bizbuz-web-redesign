import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Icon,
  CardActionArea,
} from "@mui/material";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import { ReactComponent as UserAltIcon } from "../../assets/user-alt.svg";
import { ReactComponent as UserAltBlackIcon } from "../../assets/user-alt-black.svg";
import { ReactComponent as DoneRingIcon } from "../../assets/done-ring.svg";
import { ReactComponent as DoneRingBlackIcon } from "../../assets/done-ring-black.svg";

import DefaultEventImage from "../../assets/event-default.png";
import dayjs from "dayjs";

const RegisteredCardComponent = ({ event, onCardClick }) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(event);
    }
  };

  const getEventTypeColor = () => {
    const eventTypeColors = {
      Party: {
        backgroundColor: "#3A8D75",
        textColor: "secondary",
        clockIcon: <ClockIcon />,
        markerIcon: <MarkerIcon />,
        userAltIcon: <UserAltIcon />,
        doneRingIcon: <DoneRingIcon />,
      },
      "Business Marketing": {
        backgroundColor: "#90CAED",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
        userAltIcon: <UserAltBlackIcon />,
        doneRingIcon: <DoneRingBlackIcon />,
      },
      "Social Mixer": {
        backgroundColor: "#F2ABA5",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
        userAltIcon: <UserAltBlackIcon />,
        doneRingIcon: <DoneRingBlackIcon />,
      },
      Other: {
        backgroundColor: "#CE807A",
        textColor: "#222222",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
        userAltIcon: <UserAltBlackIcon />,
        doneRingIcon: <DoneRingBlackIcon />,
      },
    };

    // Return the color based on event_type
    return (
      eventTypeColors[event.event_type] || {
        backgroundColor: "#3a8d75",
        textColor: "secondary",
        clockIcon: <ClockBlackIcon />,
        markerIcon: <MarkerBlackIcon />,
        userAltIcon: <UserAltBlackIcon />,
        doneRingIcon: <DoneRingBlackIcon />,
      }
    );
  };
  const eventTypeColor = getEventTypeColor();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea onClick={handleCardClick}>
        <Box bgcolor={eventTypeColor.backgroundColor}>
          <CardContent>
            <Stack direction="row" spacing={1} mb={1}>
              <Box width="50%">
                <Typography
                  color={eventTypeColor.textColor}
                  align="left"
                  variant="b"
                >
                  <Icon>{eventTypeColor.doneRingIcon}</Icon>
                  <span> Attending</span>
                </Typography>
              </Box>
              <Box
                width="50%"
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-start"
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
              <Box width="50%">
                {JSON.parse(event.event_photo).length === 0 ? (
                  <CardMedia
                    component="img"
                    height="100%"
                    width="50%"
                    image={DefaultEventImage}
                    alt="default"
                    sx={{ borderRadius: 3, objectFit: "cover" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                    alt="event"
                    sx={{ borderRadius: 3, objectFit: "cover" }}
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
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.5}
                  color={eventTypeColor.textColor}
                  variant="body2"
                >
                  <Icon>{eventTypeColor.userAltIcon}</Icon>
                  {event.num_attendees} Registrants
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RegisteredCardComponent;
