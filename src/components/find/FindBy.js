import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as Location } from "../../assets/marker-black.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import Stack from "@mui/material/Stack";
import { ReactComponent as Down } from "../../assets/down.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Select, MenuItem } from "@mui/material";
import NoImage from "../../assets/NoImage.png";
import dayjs from "dayjs";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function FindBy() {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [registionCode, setRegistionCode] = useState("");

  const getEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let query = BASE_URL + `/GetEvents?timeZone=${user_timezone}`;
    if (selectedDate) {
      query += `&event_start_date=${selectedDate}`;
    }

    if (location) {
      query += `&event_location=${location}`;
    }

    if (type) {
      query += `&event_type=${type}`;
    }

    if (registionCode) {
      query = BASE_URL + `/verifyRegCode/${registionCode}`;
    }
    if (isLoading) {
      axios
        .get(query)
        .then((response) => {
          setEvents(response.data.result);
          // navigate("/eventListsWithFilter", {state: { events: response.data.result},});
          if (registionCode) {
            // navigate("/eventListsWithFilter", {state: { events: response.data.result.result},});
            setEvents(response.data.result.result);
            console.log(response.data.result.result);
          }
          if (!showList) setShowList(!showList);
          console.log(query);
          console.log(response.data.result);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
        <Back onClick={() => navigate("/")} />
      </Box>

      <Box>
        <Typography
          gutterBottom
          variant="h4"
          align="center"
          sx={{
            fontFamily: "Fira Sans Condensed",
            fontSize: "20px",
            lineHeight: "24px",
            color: "#FFFFFF",
            marginTop: "32px",
            marginLeft: "139dp",
          }}
        >
          {"Search Events"}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={selectedDate}
              inputFormat="MM-DD-YYYY"
              onChange={(d) => {
                setSelectedDate(d.format("MM/DD/YYYY"));
                setIsLoading(true);
              }}
              sx={{ width: "350px" }}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <OutlinedInput
              placeholder="Location"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Location />
                </InputAdornment>
              }
              value={location}
              onChange={(e) => {
                setIsLoading(true);
                setLocation(e.target.value);
              }}
              sx={{
                width: "350px",
                height: "56px",
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: "16px",
              }}
            />
          </FormControl>
        </Grid>

        <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <Select
              value={type}
              onChange={(e) => {
                setIsLoading(true);
                setType(e.target.value);
              }}
              sx={{
                width: "350px",
                height: "56px",
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: "16px",
              }}
              displayEmpty
            >
              <MenuItem disabled value="">
                <em>Select by Type</em>
              </MenuItem>
              <MenuItem value="Business Marketing">Business Marketing</MenuItem>
              <MenuItem value="Party">Party</MenuItem>
              <MenuItem value="Social Mixer">Social Mixer</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <OutlinedInput
              placeholder="Search by Registration Code"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              value={registionCode}
              onChange={(e) => {
                setIsLoading(true);
                setRegistionCode(e.target.value);
              }}
              sx={{
                width: "350px",
                height: "56px",
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                mt: "16px",
              }}
            />
          </FormControl>
        </Grid>

        <Button
          variant="contained"
          sx={{
            width: "352.5px",
            height: "56px",
            mt: "16px",
          }}
          onClick={getEvents}
        >
          {"Get Events"}
        </Button>
      </Box>

      <Grid container>
        {" "}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showList && events.length > 0 ? (
            <Box>
              <Typography
                gutterBottom
                variant="h4"
                align="right"
                sx={{
                  fontFamily: "Fira Sans Condensed",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  marginTop: "32px",
                  marginLeft: "139dp",
                }}
              >
                {events.length}
                {events.length === 1 ? " Result" : " Results"}
              </Typography>
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ mt: 2, p: 2 }}
                style={{
                  backgroundColor: "white",
                  marginTop: "1rem",
                  minWidth: "100%",
                  borderRadius: "25px 25px 0px 0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem",
                  }}
                  onClick={() => setShowList(false)}
                >
                  <Down />
                </div>

                {events.map((event) => {
                  return (
                    <Card sx={{ minWidth: 275 }}>
                      <Box bgcolor={"#3a8d75"}>
                        <CardContent>
                          <Typography
                            variant="h2"
                            color="secondary"
                            mb={1}
                            align="end"
                          >
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
                                  image={`${JSON.parse(
                                    event.event_photo
                                  )}?${Date.now()}`}
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
                                  {event.event_start_time} -{" "}
                                  {event.event_end_time}
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
                                onClick={() => {
                                  navigate("/eventInfo", {
                                    state: { event: event },
                                  });
                                }}
                              >
                                Register
                              </Button>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Box>
                    </Card>
                  );
                })}
              </Stack>
            </Box>
          ) : (
            <Button
              hide={showList}
              style={{
                backgroundColor: "white",
                marginTop: "1rem",
                minWidth: "100%",
                borderRadius: "25px 25px 0px 0px",
                position: "fixed",
                bottom: 0,
              }}
            >
              {" "}
              <Globe />
            </Button>
          )}
        </Grid>{" "}
      </Grid>
    </Box>
  );
}
