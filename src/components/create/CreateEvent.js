import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import NewCardComponent from "../new-card-component";
import Loading from "../common/Loading";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getEventsByUser = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      BASE_URL +
        `/GetEvents?event_organizer_uid=${user.user_uid}&timeZone=${user_timezone}`
    );
    setEvents(response.data.result);
    setLoading(false);
  };

  useEffect(() => {
    getEventsByUser();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <BackIcon
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Stack>
      <Loading isLoading={isLoading} />
      <Typography variant="h1" sx={{ mt: "78px" }}>
        {"Create new Event"}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: "8px" }}
        onClick={() => {
          localStorage.clear();
          navigate("/eventDetails", {
            state: { user },
          });
        }}
      >
        {"Create"}
      </Button>
      <Typography variant="h1" sx={{ mt: "35px" }}>
        {"Edit Event"}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {events.map((event) => (
          <NewCardComponent
            key={event.event_uid}
            event={event}
            isRegisteredEventCard={false}
            buttonLabel="Edit Event"
            onRegisterClick={() => {
              localStorage.clear();
              navigate("/editEvent", {
                state: { event, user },
              });
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CreateEvent;
