import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-black.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock-black.svg";
import { ReactComponent as NextIcon } from "../../assets/continue.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { styled } from "@mui/material/styles";

const Dot = styled("div")(({ color }) => ({
  backgroundColor: color,
  borderRadius: "50%",
  width: "10px",
  height: "10px",
}));

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [getEvent, setEvent] = useLocalStorage("event");
  const event = getEvent();
  const [eventType, setEventType] = useState(event.event_type);
  const [eventCapacity, setEventCapacity] = useState(event.event_capacity);
  const [isDisabled, setDisabled] = useState(
    !event.event_capacity || event.event_capacity === "No Limit"
  );
  const [eventLimit, setEventLimit] = useState(
    event.event_capacity ? "Set Limit" : "No Limit"
  );
  const [startDate, setStartDate] = useState(
    event.event_start_date
      ? dayjs(event.event_start_date, "M/DD/YYYY")
      : dayjs()
  );
  const [endDate, setEndDate] = useState(
    event.event_end_date ? dayjs(event.event_end_date, "M/DD/YYYY") : dayjs()
  );
  const [startTime, setStartTime] = useState(
    dayjs(event.event_start_time, "hh mm A")
  );
  const [endTime, setEndTime] = useState(
    dayjs(event.event_end_time, "hh mm A")
  );

  const handleEventTypeChange = (v) => {
    setEventType(v);
  };

  const handleStartDateChange = (v) => {
    setStartDate(v);
    if (endDate < v) setEndDate(v);
  };

  const handleEndDateChange = (v) => {
    setEndDate(v);
  };

  const handleEndTimeChange = (v) => {
    setEndTime(v);
    if (v < startTime && startDate === endDate)
      setEndDate(dayjs(startDate).add(1, "day"));
  };

  const handleStartTimeChange = (v) => {
    setStartTime(v);
  };

  const handleEventLimitChange = (v) => {
    if (v === "Set Limit") setDisabled(false);
    else setDisabled(true);
    setEventLimit(v);
  };

  const handleContinue = () => {
    if (
      !eventType ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      (eventLimit === "Set Limit" && !eventCapacity)
    ) {
      alert("Please fill out all the fields");
      return;
    }
    event.event_organizer_uid = user.user_uid;
    event.event_type = eventType;
    event.event_start_date = new Date(startDate).toLocaleDateString("en-US");
    event.event_end_date = new Date(endDate).toLocaleDateString("en-US");
    let event_start_time = new Date(startTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    event.event_start_time = event_start_time
      ? event_start_time.replace(/^0+/, "")
      : "";
    let event_end_time = new Date(endTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    event.event_end_time = event_end_time
      ? event_end_time.replace(/^0+/, "")
      : "";
    if (eventLimit === "Set Limit") event.event_capacity = eventCapacity;
    else event.event_capacity = eventLimit;
    setEvent(event);
    if (event.isReview)
      navigate("/eventReview", {
        state: { user },
      });
    else
      navigate("/eventLocation", {
        state: { user },
      });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <BackIcon
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() =>
            navigate(-1, {
              state: { user },
            })
          }
        />
      </Stack>
      <Typography variant="h1" sx={{ mt: "58px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Typography variant="h2">{"Event Type"}</Typography>
        <ToggleButtonGroup exclusive sx={{ display: "flex" }}>
          <Grid container spacing={1}>
            <Grid item>
              <ToggleButton
                onChange={() => handleEventTypeChange("Business Marketing")}
                selected={eventType === "Business Marketing"}
                value="Business Marketing"
                variant="contained"
                sx={{
                  width: "202px",
                  backgroundColor: "#C2E9D9",
                  "&.MuiButtonBase-root:hover, &.Mui-selected": {
                    backgroundColor: "#20B2AA",
                  },
                }}
              >
                <Dot color="#20B2AA" />
                &nbsp;
                {"Business Marketing"}
              </ToggleButton>
            </Grid>
            <Grid item>
              <ToggleButton
                onChange={() => handleEventTypeChange("Social Mixer")}
                selected={eventType === "Social Mixer"}
                value="Social Mixer"
                variant="contained"
                sx={{
                  width: "128px",
                  backgroundColor: "#F2ABA5",
                  "&.MuiButtonBase-root:hover, &.Mui-selected": {
                    backgroundColor: "#F26457",
                  },
                }}
              >
                <Dot color="#F26457" />
                &nbsp;
                {"Social Mixer"}
              </ToggleButton>
            </Grid>
            <Grid item>
              <ToggleButton
                onChange={() => handleEventTypeChange("Party or Event")}
                selected={eventType === "Party or Event"}
                value="Party or Event"
                variant="contained"
                sx={{
                  width: "202px",
                  backgroundColor: "#C1DEEF",
                  "&.MuiButtonBase-root:hover, &.Mui-selected": {
                    backgroundColor: "#90CAED",
                  },
                }}
              >
                <Dot color="#90CAED" />
                &nbsp;
                {"Party or Event"}
              </ToggleButton>
            </Grid>
            <Grid item>
              <ToggleButton
                onChange={() => handleEventTypeChange("Other")}
                selected={eventType === "Other"}
                value="Other"
                variant="contained"
                sx={{
                  width: "128px",
                  backgroundColor: "#CE807A",
                  "&.MuiButtonBase-root:hover, &.Mui-selected": {
                    backgroundColor: "#AA0E00",
                  },
                }}
              >
                <Dot color="#AA0E00" />
                &nbsp;
                {"Other"}
              </ToggleButton>
            </Grid>
          </Grid>
        </ToggleButtonGroup>
        <Typography variant="h2">{"Event Date & Time"}</Typography>
        <Grid container spacing={1} columnSpacing={2}>
          <Grid item sx={{ pl: "0 !important" }}>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"Start Date"}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  minDate={dayjs()}
                  onChange={handleStartDateChange}
                  slots={{
                    openPickerIcon: CalendarIcon,
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      style: {
                        width: "129px",
                        fontSize: 12,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <CalendarIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"Start Time"}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={startTime}
                  onChange={handleStartTimeChange}
                  slots={{
                    openPickerIcon: ClockIcon,
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      style: {
                        width: "129px",
                        fontSize: 12,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <ClockIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item sx={{ pl: "0 !important" }}>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"End Date"}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={endDate}
                  minDate={dayjs()}
                  onChange={handleEndDateChange}
                  slots={{
                    openPickerIcon: CalendarIcon,
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      style: {
                        width: "129px",
                        fontSize: 12,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <CalendarIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"End Time"}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={endTime}
                  onChange={handleEndTimeChange}
                  slots={{
                    openPickerIcon: ClockIcon,
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      style: {
                        width: "129px",
                        fontSize: 12,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <ClockIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h2">{"Event Capacity"}</Typography>
        <FormControl>
          <RadioGroup color="secondary">
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="No Limit"
                  control={
                    <Radio
                      onClick={() => handleEventLimitChange("No Limit")}
                      checked={eventLimit === "No Limit"}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#3B8C75",
                        },
                      }}
                    />
                  }
                  label="No Limit"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="Set Limit"
                  control={
                    <Radio
                      onClick={() => handleEventLimitChange("Set Limit")}
                      checked={eventLimit === "Set Limit"}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "#3B8C75",
                        },
                      }}
                    />
                  }
                  label="Set Limit"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <OutlinedInput
                  value={eventCapacity}
                  sx={{
                    width: "129px",
                    height: "36px",
                    fontSize: 12,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                  disabled={isDisabled}
                  onChange={(e) => setEventCapacity(e.target.value)}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            width: "92vw",
            position: "fixed",
            bottom: "30px",
            maxWidth: "550px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleContinue}
            sx={{ width: "100%" }}
          >
            {"Continue"}&nbsp;
            <NextIcon />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventDetails;
