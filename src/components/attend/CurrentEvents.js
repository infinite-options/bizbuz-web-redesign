import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CurrentEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleEventClick = (event) => {
    if (
      document.cookie !== "" &&
      document.cookie.split("; ").find((row) => row.startsWith("loggedIn=")) !==
        undefined
    ) {
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("loggedIn="))
        .split("=")[1] === "true"
        ? navigate("/earlyArrival", {
            state: {
              email: document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_email="))
                .split("=")[1],
              user: document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_details="))
                .split("=")[1],
              eventObj: event,
            },
          })
        : navigate("/login", {
            state: { path: "/earlyArrival", eventObj: event },
          });
    } else {
      navigate("/login", {
        state: { path: "/earlyArrival", eventObj: event },
      });
    }
  };

  const getEventsByUser = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const response = await axios.get(
    //   `${BASE_URL}/GetEvents?event_start_date=${new Date().toLocaleDateString()}&timeZone=${user_timezone}`
    // );
    const response = await axios.get(`${BASE_URL}/GetEvents`);
    setEvents(response.data.result);
  };

  useEffect(() => {
    getEventsByUser();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Brand
        style={{ marginTop: "36px" }}
        onClick={() => {
          navigate("/");
        }}
      />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        {events.length > 0 ? (
          events.map((event) => {
            return (
              <RegisteredCardComponent
                event={event}
                onCardClick={handleEventClick}
              />
            );
          })
        ) : (
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Grid
              container
              rowSpacing={{ xs: 1, sm: 10 }}
              sx={{ mt: "18% !important" }}
            ></Grid>
            <Grid item xs={5} align="center">
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                style={{ color: "white" }}
              >
                No Events Available For Now
              </Typography>
            </Grid>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CurrentEvents;
