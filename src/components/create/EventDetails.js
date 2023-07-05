import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-black.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock-black.svg";
import { ReactComponent as BackIcon } from "../../assets/arrow-circle-left.svg";
import { ReactComponent as NextIcon } from "../../assets/arrow-square-right.svg";
import { styled } from "@mui/material/styles";

const Dot = styled("div")(({ color }) => ({
  backgroundColor: color,
  borderRadius: "50%",
  width: "10px",
  height: "10px",
}));

const EventDetails = () => {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("Business Marketing");
  const [eventCapacity, setEventCapacity] = useState("No Limit");

  const handleEventTypeChange = (e, newEventType) => {
    setEventType(newEventType);
  };

  const handleEventCapacityChange = (e) => {
    setEventCapacity(e.target.value);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" sx={{ mt: "114px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Typography variant="h2">{"Event Type"}</Typography>
        <ToggleButtonGroup
          value={eventType}
          exclusive
          onChange={handleEventTypeChange}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid container spacing={1}>
            <Grid item>
              <ToggleButton
                value="Business Marketing"
                variant="contained"
                sx={{ width: "202px", backgroundColor: "#C2E9D9" }}
              >
                <Dot color="#20B2AA" />
                &nbsp;
                {"Business Marketing"}
              </ToggleButton>
            </Grid>
            <Grid item>
              <ToggleButton
                value="Social Mixer"
                variant="contained"
                sx={{ width: "128px", backgroundColor: "#F2ABA5" }}
              >
                <Dot />
                &nbsp;
                {"Social Mixer"}
              </ToggleButton>
            </Grid>
            <Grid item>
              <ToggleButton
                value="Party or Event"
                variant="contained"
                sx={{ width: "202px", backgroundColor: "#C1DEEF" }}
              >
                <Dot />
                &nbsp;
                {"Party or Event"}
              </ToggleButton>
            </Grid>
            <Grid item>
              <ToggleButton
                value="Other"
                variant="contained"
                sx={{ width: "128px", backgroundColor: "#CE807A" }}
              >
                <Dot />
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
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <CalendarIcon />
                  </InputAdornment>
                }
                sx={{
                  width: "129px",
                  height: "36px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"Start Time"}
              </Typography>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <ClockIcon />
                  </InputAdornment>
                }
                sx={{
                  width: "129px",
                  height: "36px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sx={{ pl: "0 !important" }}>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"End Date"}
              </Typography>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <CalendarIcon />
                  </InputAdornment>
                }
                sx={{
                  width: "129px",
                  height: "36px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Typography variant="body1" sx={{ color: "white" }}>
                {"End Time"}
              </Typography>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <ClockIcon />
                  </InputAdornment>
                }
                sx={{
                  width: "129px",
                  height: "36px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h2">{"Event Capacity"}</Typography>
        <FormControl>
          <RadioGroup
            color="secondary"
            value={eventCapacity}
            onChange={handleEventCapacityChange}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="No Limit"
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
                  label="No Limit"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="Set Limit"
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
                  sx={{
                    width: "129px",
                    height: "36px",
                    fontSize: 12,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
        <Stack spacing={2} direction="row" sx={{ pt: "110px" }}>
          <Button variant="contained" onClick={() => navigate(-1)} fullWidth>
            <BackIcon />
            {"Back"}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/eventLocation")}
            fullWidth
          >
            <NextIcon />
            {"Next"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventDetails;
