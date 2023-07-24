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
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black-card.svg";
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

    // Return the color based on event_type
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
  const eventTypeColor = getEventTypeColor();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea onClick={handleCardClick}>
        <Box
          bgcolor={eventTypeColor.backgroundColor}
          display="flex"
          flexDirection="column"
          height="240px"
          maxHeight="100%"
        >
          <CardContent>
            <Stack direction="row" spacing={1} mb={1} alignItems="center">
              <Box width="50%">
                <Typography
                  color={eventTypeColor.textColor}
                  variant="b"
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.5}
                >
                  <Icon>{eventTypeColor.doneRingIcon}</Icon>
                  <span style={{ fontFamily: "Inter" }}> Attending</span>
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
              <Box width="50%" gap={1}>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.5}
                  color={eventTypeColor.textColor}
                  variant="body2"
                  my={1.5}
                  noWrap
                >
                  {eventTypeColor.clockIcon}
                  <Typography
                    fontFamily={"Inter"}
                    fontSize={"14px"}
                    fontWeight={400}
                    noWrap
                  >
                    {event.event_start_time} - {event.event_end_time}
                  </Typography>
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
                  <span
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      maxWidth: "100%",
                      fontFamily: "Inter",
                    }}
                  >
                    {" "}
                    {event.event_location}
                  </span>
                </Typography>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.5}
                  color={eventTypeColor.textColor}
                  variant="body2"
                >
                  <Icon>{eventTypeColor.userAltIcon}</Icon>
                  <span style={{ fontFamily: "Inter" }}>
                    {event.num_attendees} Registrants{" "}
                  </span>
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
