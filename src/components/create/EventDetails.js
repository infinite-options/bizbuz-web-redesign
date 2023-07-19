import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [eventType, setEventType] = useState();
  const eventCapacity = useRef();
  const [isDisabled, setDisabled] = useState(true);
  const [eventLimit, setEventLimit] = useState();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [getEvent, setEvent] = useLocalStorage("event");

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
    const event = getEvent();
    event.event_organizer_uid = "100-000038";
    event.eventType = eventType;
    event.eventStartDate = new Date(startDate).toLocaleDateString("en-US");
    event.eventEndDate = new Date(endDate).toLocaleDateString("en-US");
    let eventStartTime = new Date(startTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    event.eventStartTime = eventStartTime
      ? eventStartTime.replace(/^0+/, "")
      : "";
    let eventEndTime = new Date(endTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    event.eventEndTime = eventEndTime ? eventEndTime.replace(/^0+/, "") : "";
    if (eventLimit === "Set Limit")
      event.eventCapacity = eventCapacity.current.value;
    else event.eventCapacity = eventLimit;
    setEvent(event);
    navigate("/eventLocation");
  };

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
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
                  onClick={() => handleEventLimitChange("Set Limit")}
                  control={
                    <Radio
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
                  inputRef={eventCapacity}
                  sx={{
                    width: "129px",
                    height: "36px",
                    fontSize: 12,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
        <Stack spacing={2} direction="row" sx={{ pt: "60px" }}>
          <Button variant="contained" onClick={handleContinue} fullWidth>
            {"Continue"}&nbsp;
            <NextIcon />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventDetails;
