import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import DatePickerInput from "./date-picker-input";
import EventItem from "./event-item";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventsByDatePage = () => {
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);
  const [eventDateSet, setEventDateSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const getEventsForDate = () => {
    const queryDate = dayjs(date).format("MM-DD-YYYY");
    setEventDateSet(true);
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_start_date=${queryDate}&timeZone=${user_timezone}`
      )
      .then((response) => {
        console.log(response.body);
        setEventsList(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEventClicked = (event) => {
    navigate(`/searchEventsByDate/${event.id}`);
  };

  return (
    <>
      <Container maxWidth={"xs"}>
        <Stack spacing={1}>
          <Typography color="secondary">Search Events by Date</Typography>
          <DatePickerInput
            defaultValue={date}
            handleDateChange={handleDateChange}
          />
          <Button size="large" variant="contained" onClick={getEventsForDate}>
            Get Events
          </Button>
        </Stack>
      </Container>
      <Box bgcolor="secondary.main" borderRadius={2} py={1} mt={1}>
        <Container maxWidth={"xs"}>
          <Stack spacing={1}>
            {eventsList &&
              eventsList.map((event) => <EventItem key={event.id} event={event} onEventClick={handleEventClicked} />)}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default EventsByDatePage;
