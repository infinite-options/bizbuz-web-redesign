import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as Location } from "../../assets/marker-black.svg";
import NewCardComponent from "../new-card-component";
import Stack from "@mui/material/Stack";
import { ReactComponent as Down } from "../../assets/down.svg";
import { Select, MenuItem } from "@mui/material";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function FindBy() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showList, setShowList] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [city, setCity] = useState("");
  const [miles, setMiles] = useState(5);
  const [zipCode, setZipCode] = useState("");
  const [type, setType] = useState("");
  const [registionCode, setRegistionCode] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  //const [userDetails, setUserDetails] = useState();
  const [user_uid, setUserUid] = useState(null);

  const getEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let queries = [];

    if (!selectedDate && !city && !type && !registionCode && !zipCode) {
      axios
        .get(BASE_URL + `/GetEvents?timeZone=${user_timezone}`)
        .then((response) => {
          setEvents(response.data.result);
          if (!showList) setShowList(!showList);
        });
    } else {
      if (selectedDate) {
        queries.push(
          axios.get(
            BASE_URL +
              `/GetEvents?timeZone=${user_timezone}&event_start_date=${selectedDate}`
          )
        );
      }

      if (city) {
        let obj = {
          city: city,
        };
        queries.push(
          axios.post(BASE_URL + `/EventsByCity?timeZone=${user_timezone}`, obj)
        );
      }

      if (miles && zipCode) {
        let obj = {
          miles: miles,
          zip_code: zipCode,
        };
        queries.push(
          axios.post(
            BASE_URL + `/EventsByZipCodes?timeZone=${user_timezone}`,
            obj
          )
        );
      }

      if (type) {
        queries.push(
          axios.get(
            BASE_URL + `/GetEvents?timeZone=${user_timezone}&event_type=${type}`
          )
        );
      }

      if (registionCode) {
        queries.push(axios.get(BASE_URL + `/verifyRegCode/${registionCode}`));
      }

      Promise.all(queries)
        .then((responses) => {
          const results = responses.map((response) => {
            const result = response.data.result;
            if (typeof result === "object" && !Array.isArray(result))
              return result.result;
            else return result;
          });
          const mergedResults = results.reduce((intersection, arr) => {
            const eventUids = arr.map((item) => item.event_uid);
            return intersection.filter((item) =>
              eventUids.includes(item.event_uid)
            );
          });

          setEvents(mergedResults);
          if (!showList) setShowList(!showList);
          console.log(mergedResults);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
    setSelectedDate("");
  };

  const getUserRegisteredEvents = async () => {
    const isUserLoggedIn = () => {
      if (
        document.cookie !== "" &&
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("loggedIn=")) !== undefined
      ) {
        return document.cookie
          .split("; ")
          .find((row) => row.startsWith("loggedIn="))
          .split("=")[1] === "true"
          ? true
          : false;
      }
    };

    if (isUserLoggedIn && location.state && location.state.user) {
      let user = location.state.user;
      let user_uid =
        typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
      console.log("inside loop");
      setUserUid(user_uid);

      let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      await axios
        .get(
          BASE_URL +
            `/GetEventUser?timeZone=${user_timezone}&eu_user_id=${user_uid}`
        )
        .then((response) => {
          setUserEvents(response.data.result);
        });
    }
  };

  useEffect(() => {
    getUserRegisteredEvents();
  }, []);

  const handleRegisterClick = (event) => {
    navigate("/eventInfo", { state: { event } });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} onClick={() => navigate("/")} />
        <Back onClick={() => navigate("/")} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
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
            <DatePicker
              sx={{
                width: "355px",
                height: "56px",
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "10px",
                marginTop: "16px",
                color: (theme) =>
                  `${theme.palette.primary.contrastText} !important`,
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  underline: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  underline: "none",
                },
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                },
              }}
              value={selectedDate}
              inputFormat="MM-DD-YYYY"
              onChange={(d) => {
                setSelectedDate(d.format("MM/DD/YYYY"));
              }}
            />
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
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                sx={{
                  width: "355px",
                  height: "56px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginTop: "16px",
                }}
              />
            </FormControl>
          </Grid>

          <Typography
            gutterBottom
            variant="h4"
            align="center"
            sx={{
              fontFamily: "Fira Sans Condensed",
              fontSize: "15px",
              lineHeight: "24px",
              color: "#FFFFFF",
              marginLeft: "139dp",
            }}
          >
            {"Or"}
          </Typography>

          <Grid item sx={{ pl: "0 !important" }}>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">{"Miles From"}</InputAdornment>
                }
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                sx={{
                  width: "130px",
                  height: "56px",
                  fontSize: 12,
                  borderRadius: "10px",
                }}
              />
            </FormControl>

            <FormControl sx={{ width: "129px" }} variant="outlined">
              <OutlinedInput
                placeholder="Zip Code"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                sx={{
                  width: "215px",
                  height: "56px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  ml: "10px",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item sx={{ pl: "0 !important" }}>
            <FormControl sx={{ width: "129px" }} variant="outlined">
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                sx={{
                  width: "355px",
                  height: "56px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginTop: "16px",
                }}
                displayEmpty
              >
                <MenuItem disabled value="">
                  <Typography sx={{ fontStyle: "normal" }}>
                    Select by Type
                  </Typography>
                </MenuItem>
                <MenuItem value="Business Marketing">
                  Business Marketing
                </MenuItem>
                <MenuItem value="Party or Event">Party or Event</MenuItem>
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
                  setRegistionCode(e.target.value);
                }}
                sx={{
                  width: "355px",
                  height: "56px",
                  fontSize: 12,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  mt: "16px",
                }}
              />
            </FormControl>
          </Grid>

          <Button
            variant="contained"
            sx={{
              width: "355px",
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
                    borderRadius: "25px 0px 25px 0px",
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
                    const isEventRegistered =
                      event.eu_user_uid === user_uid ? true : false;

                    // Check if the user is logged in, and if so, provide userEvents data to the NewCardComponent
                    const userEvent = userEvents.find(
                      (item) => item.event_uid === event.event_uid
                    );
                    return (
                      <NewCardComponent
                        event={event}
                        onRegisterClick={handleRegisterClick}
                        isRegisteredEventCard={isEventRegistered}
                        seatsRemaining={
                          event.event_capacity - event.registrants
                        }
                      />
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
    </Box>
  );
}
