import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import RegisteredCardComponent from "../registered-card-component";
import NewCardComponent from "../new-card-component";

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
              user: JSON.parse(
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("user_details="))
                  .split("=")[1]
              ),
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
    const response = await axios.get(
      `${BASE_URL}/GetEvents?event_start_date=${new Date().toLocaleDateString()}&timeZone=${user_timezone}`
    );
    setEvents(response.data.result);
  };

  useEffect(() => {
    getEventsByUser();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand />
        <BackIcon
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/")}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        {events.length > 0 ? (
          events.map((event) => {
            return (
              <NewCardComponent
                event={event}
                onCardClick={handleEventClick}
                isRegisteredEventCard={true}
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
