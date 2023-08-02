import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const EventDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const [eventStarted, setEventStarted] = useState(
    eventObj.event_status === "1"
  );
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const { publish } = useAbly(eventObj.event_uid);

  const handleBroadcast = () => {
    publish(message);
    setShowDialog(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStartEvent = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    if (!response.data.hasRegistered) {
      navigate("/eventQuestionnaire", {
        state: { event: eventObj },
      });
      return;
    }
    await axios.put(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&eventStatus=1`
    );
    eventObj.event_status = "1";
    setEventStarted(true);
    handleClearStorage(["event", "user"]);
    localStorage.setItem("event", JSON.stringify(eventObj));
    localStorage.setItem("user", JSON.stringify(userObj));
    window.open("/networkingActivity", "_blank");
    publish("Event started");
    navigate(".", {
      state: { eventObj, userObj },
    });
  };

  const handleStopEvent = () => {
    setEventStarted(false);
    publish("Event ended");
    axios.put(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&eventStatus=0`
    );
    eventObj.event_status = "0";
    navigate(".", {
      state: { eventObj, userObj },
    });
  };

  const handleClearStorage = (items) => {
    items.forEach((item) => {
      localStorage.removeItem(item);
    });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <BackIcon
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Stack>
      <Typography
        gutterBottom
        variant="h4"
        align="center"
        sx={{ color: "#ffffff", mt: "20px" }}
      >
        {eventObj.event_title}
      </Typography>
      <Typography variant="h5" align="center" sx={{ color: "#ffffff" }}>
        {new Date(eventObj.event_start_date).toLocaleString("default", {
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontKerning: "none", color: "#ffffff" }}
      >
        {`${eventObj.event_start_time.slice(0, -2)} - ${
          eventObj.event_end_time
        }`}
      </Typography>
      <Stack
        align="center"
        direction="column"
        spacing={5}
        sx={{
          py: 5,
        }}
      >
        <Stack spacing={3}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() =>
              navigate("/eventRegistrants", { state: { eventObj, userObj } })
            }
          >
            {"View Registrants"}
          </Button>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() =>
              navigate("/eventAttendees", { state: { eventObj, userObj } })
            }
          >
            {"View Attendees"}
          </Button>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() =>
              navigate("/overallNetwork", { state: { eventObj, userObj } })
            }
          >
            {"View Network"}
          </Button>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => setShowDialog(true)}
          >
            {"Broadcast"}
          </Button>
          {eventStarted && (
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={handleStopEvent}
            >
              {"Stop Event"}
            </Button>
          )}
        </Stack>
        {!eventStarted && (
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleStartEvent}
          >
            {"Start Event"}
          </Button>
        )}
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={() => navigate("/")}
        >
          {"Home Page"}
        </Button>
      </Stack>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{"Broadcast message"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="broadcast"
            type="text"
            fullWidth
            variant="filled"
            value={message}
            onChange={handleMessageChange}
            hiddenLabel
            multiline
            maxRows={3}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleBroadcast}
            sx={{ height: "40px" }}
          >
            {"Send"}
          </Button>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => setShowDialog(false)}
            sx={{ height: "40px" }}
          >
            {"Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventDashboard;
