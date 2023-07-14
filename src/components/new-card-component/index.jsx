import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";
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
    event_type: "Party",
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
  return (
    <Card sx={{ minWidth: 275 }}>
      <Box bgcolor={"#3a8d75"}>
        <CardContent>
          <Typography variant="h2" color="secondary" mb={1} align="end">
            {dayjs(event.event_start_date).format("MMMM DD")}
          </Typography>
          <Typography variant="h2" color="secondary" mb={1}>
            {event.event_title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box>
              {JSON.parse(event.event_photo).length === 0 ? (
                <CardMedia
                  component="img"
                  height="174px"
                  image={NoImage}
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
            <Stack spacing={1}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={0.5}
                color="secondary"
                variant="body2"
              >
                <ClockIcon mr={1} />
                <span>
                  {event.event_start_time} - {event.event_end_time}
                </span>
              </Typography>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={0.5}
                color="secondary"
                variant="body2"
              >
                <MarkerIcon mr={1} />
                <span> {event.event_location}</span>
              </Typography>
              <Button
                variant="contained"
                color="buttonAlternative"
                size="small"
                sx={{ height: 40 }}
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};

export default NewCardComponent;
