import dayjs from "dayjs";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import Image from "mui-image";
import { CalendarMonth } from "@mui/icons-material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const EventItem = ({ event, onEventClick = () => {} }) => {
  const { eventTitle, eventLocation, imgURL } = event;

  const handleEventClick = () => {
    onEventClick(event)
  }

  return (
    <Card sx={{ minWidth: 275 }} onClick={handleEventClick}>
      <Box bgcolor={"#3a8d75"}>
        <CardContent>
          <Typography variant="h5" color="secondary" mb={1}>
            {eventTitle}
          </Typography>
          <Typography
            display={"flex"}
            alignItems={"center"}
            gap={0.5}
            color="secondary"
          >
            <CalendarMonth mr={1} />
            <span> {dayjs().format("MMMM DD, YYYY")}</span>
          </Typography>
          <Stack direction="row" justifyContent={"space-between"} mt={0.5}>
            <Typography
              display={"flex"}
              alignItems={"center"}
              gap={0.5}
              color="secondary"
            >
              <AccessTimeFilledIcon mr={1} />
              <span> {dayjs().format("hh:mm a")}</span>
            </Typography>
            <Typography
              display={"flex"}
              alignItems={"center"}
              gap={0.5}
              color="secondary"
            >
              <LocationOnIcon mr={1} />
              <span> {eventLocation}</span>
            </Typography>
          </Stack>
        </CardContent>
        <Image src={imgURL} width={"100%"}></Image>
      </Box>
    </Card>
  );
};

export default EventItem;
