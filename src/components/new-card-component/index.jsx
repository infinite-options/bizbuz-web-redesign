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
