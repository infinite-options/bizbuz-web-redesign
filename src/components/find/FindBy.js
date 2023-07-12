import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as ReactBootStrap from "react-bootstrap";
import { DialogContent, Typography, FormGroup, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as Type } from "../../assets/type.svg";
// import { ReactComponent as Location } from "../../assets/location.svg";
import { ReactComponent as Organizer } from "../../assets/organizer.svg";
import { ReactComponent as Calendar } from "../../assets/date.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";
// import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import { ReactComponent as Down } from "../../assets/down.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-date.svg";
import { ReactComponent as Location } from "../../assets/marker-pin-01.svg";
import { ReactComponent as User } from "../../assets/User_alt.svg";
import NoImage from "../../assets/NoImage.png";
import NoUserImage from "../../assets/NoUserImage.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export default function FindBy() {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openOrganizerModal, setOpenOrganizerModal] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openTypeModal, setOpenTypeModal] = useState(false);

  const [showSpinner, setShowSpinner] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [registionCode, setRegistionCode] = useState('');

  const [organizers, setOrganizers] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [city, setCity] = useState("");
  const [miles, setMiles] = useState(5);
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [eventType, setEventType] = useState("");
  const getAllEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(BASE_URL + `/GetEvents?timeZone=${user_timezone}`)
      .then((response) => {
        setEvents(response.data.result);
        setShowList(!showList);
      });
  };
  const getEventsByDate = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_start_date=${selectedDate}&timeZone=${user_timezone}`
      )
      .then((response) => {
        setEvents(response.data.result);
        setShowList(!showList);
        setOpenDateModal(false);
      });
  };
  const getOrganizers = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(BASE_URL + `/GetOrganizers?timeZone=${user_timezone}`)
      .then((response) => {
        setOrganizers(response.data.result);
        setOpenOrganizerModal(true);
      });
  };

  const getEventsByOrganizer = (id) => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_organizer_uid=${id}&timeZone=${user_timezone}`
      )
      .then((response) => {
        setEvents(response.data.result);
        setShowList(!showList);
        setOpenOrganizerModal(false);
      });
  };
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`
        )
        .then((response) => {
          let result = response.data.results[0];
          setAddress(result.formatted_address);
        });
    });
  };
  const getEventsByLocation = () => {
    setShowSpinner(true);
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (city !== "") {
      let obj = {
        city: city,
      };
      axios
        .post(BASE_URL + `/EventsByCity?timeZone=${user_timezone}`, obj)
        .then((response) => {
          setEvents(response.data.result);
        });
    } else if (address !== "") {
      let obj = {
        miles: miles,
        address: address,
      };

      axios
        .post(BASE_URL + `/EventsByAddress?timeZone=${user_timezone}`, obj)
        .then((response) => {
          setEvents(response.data.result);
        });
    } else {
      let obj = {
        miles: miles,
        zip_code: zipCode,
      };
      axios
        .post(BASE_URL + `/EventsByZipCodes?timeZone=${user_timezone}`, obj)
        .then((response) => {
          setEvents(response.data.result);
        });
    }
    setShowSpinner(false);
    setOpenLocationModal(false);
  };
  const getEventsByType = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_type=${eventType}&timeZone=${user_timezone}`
      )
      .then((response) => {
        setEvents(response.data.result);
        setShowList(!showList);
        setOpenTypeModal(false);
      });
  };
  const hideModal = () => {
    setOpenDateModal(false);
    setOpenOrganizerModal(false);
    setOpenLocationModal(false);
    setOpenTypeModal(false);
  };
  const FilterByDate = () => {
    return (
      <Dialog
        maxWidth="md"
        open={openDateModal}
        onClose={hideModal}
        // PaperProps={{ style: { backgroundColor: "red" } }}
      >
        <DialogTitle>Filter Events by Date</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                value={selectedDate}
                inputFormat="MM-DD-YYYY"
                onChange={(d) => {
                  setSelectedDate(d.format("MM/DD/YYYY"));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            style={{
              // backgroundColor: "white",
              width: "100%",
              marginTop: "1rem",
            }}
            onClick={() => getEventsByDate()}
          >
            Get Events
          </Button>
        </DialogContent>
      </Dialog>
    );
  };
  const FilterByOrganizer = () => {
    return (
      <Dialog maxWidth="md" open={openOrganizerModal} onClose={hideModal}>
        <DialogTitle>Filter Events by Organizer</DialogTitle>
        <DialogContent>
          {" "}
          {organizers &&
            organizers.map((organizer) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 0.5,
                  }}
                  onClick={() => {
                    setEventOrganizer(
                      organizer.first_name + " " + organizer.last_name
                    );
                    getEventsByOrganizer(organizer.user_uid);
                  }}
                >
                  {" "}
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    <Typography>
                      {organizer.first_name} {organizer.last_name}
                    </Typography>
                  </CardContent>
                  {JSON.parse(organizer.images) === null ? (
                    <CardMedia
                      component="img"
                      height="70px"
                      sx={{ width: 70, objectFit: "contained" }}
                      src={NoUserImage}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="70px"
                      sx={{ width: 70, objectFit: "contained" }}
                      src={`${JSON.parse(organizer.images)}?${Date.now()}`}
                    />
                  )}
                </Card>
              );
            })}
        </DialogContent>
      </Dialog>
    );
  };
  const FilterByLocation = () => {
    return (
      <Dialog maxWidth="md" open={openLocationModal} onClose={hideModal}>
        <DialogTitle>Filter Events by Location</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <FormGroup>
              <Typography variant="body1" color="secondary">
                City
              </Typography>
              <TextField
                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                //  placeholder="Email"
                type="email"
                value={city}
                margin="normal"
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </FormGroup>
            <Typography variant="body1" color="secondary">
              OR
            </Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "2rem 0rem",
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  verticalAlign: "middle",
                }}
              >
                <TextField
                  sx={{ backgroundColor: "white", borderRadius: "10px" }}
                  style={{
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  inputProps={{ style: { textAlign: "center" } }}
                  type="email"
                  value={miles}
                  margin="normal"
                  onChange={(e) => setMiles(e.target.value)}
                />
                <Typography variant="body1" color="secondary">
                  &nbsp;&nbsp;&nbsp;miles radius from
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  verticalAlign: "middle",
                }}
              >
                <FormGroup>
                  <TextField
                    sx={{ backgroundColor: "white", borderRadius: "10px" }}
                    placeholder="Zip Code"
                    type="email"
                    value={zipCode}
                    margin="normal"
                    onChange={(e) => setZipCode(e.target.value)}
                    fullWidth
                  />
                </FormGroup>
                <Typography variant="body1" color="secondary">
                  {" "}
                  &nbsp;&nbsp;OR &nbsp;&nbsp;
                </Typography>
                <Button
                  margin="normal"
                  sx={{
                    width: "214px",
                  }}
                  onClick={() => getCurrentLocation()}
                >
                  Current Location
                </Button>
              </div>
              <Typography sx={{ m: 2 }} variant="body1" color="secondary">
                {address}
              </Typography>{" "}
              {showSpinner ? (
                <ReactBootStrap.Spinner animation="border" role="status" />
              ) : (
                ""
              )}
            </Box>
            <Button sx={{ my: 1 }} onClick={() => getEventsByLocation()}>
              Get Events
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  const FilterByType = () => {
    return (
      <Dialog maxWidth="md" open={openTypeModal} onClose={hideModal}>
        <DialogTitle>Filter Events by Type</DialogTitle>
        <DialogContent>
          <Button
            sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
            onClick={() => {
              setEventType("Business Networking");
            }}
          >
            Business Networking
          </Button>
          <Button
            sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
            onClick={() => {
              setEventType("Party");
            }}
          >
            Party
          </Button>
          <Button
            sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
            onClick={() => {
              setEventType("Social Mixer");
            }}
          >
            Social Mixer
          </Button>
          <Button
            sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
            onClick={() => {
              setEventType("Other");
            }}
          >
            Other
          </Button>
          <Button
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onClick={() => getEventsByType()}
          >
            Get Events
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

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
      query = BASE_URL+`/verifyRegCode/${registionCode}`;
    }
    axios.get(query)
      .then((response) => {
        setEvents(response.data.result);
        if(registionCode) {
          setEvents(response.data.result.result);
          console.log(response.data.result.result);
        }
        setShowList(!showList);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
      
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      {FilterByDate()}
      {FilterByOrganizer()}
      {FilterByLocation()}
      {FilterByType()}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
        <Back onClick={() => navigate(-1)} />
      </Box>

      <Typography gutterBottom variant="h4" align="center" 
          sx={{
            fontFamily: 'Fira Sans Condensed',
            fontSize: '20px', 
            lineHeight: '24px', 
            color: '#FFFFFF', 
            marginTop: '32px',
            marginLeft: '139dp',
          }}
        >
            {"Search Events"}
        </Typography>

        <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <OutlinedInput
              placeholder="Date"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                  <CalendarIcon />
                </InputAdornment>
              }
              value={selectedDate}
              onChange={(e) => {
                const inputDate = e.target.value;
                setSelectedDate(inputDate);
              }}
              sx={{
                width: "350px",
                height: "56px",
                marginLeft: '20px',
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: '16px',
              }}
            />
          </FormControl>
      </Grid>
      <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <OutlinedInput
              placeholder="Location"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                  <Location />
                </InputAdornment>
              }
              value = {location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                width: "350px",
                height: "56px",
                marginLeft: '20px',
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: '16px',
              }}
            />
          </FormControl>
      </Grid>
      <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <OutlinedInput
              placeholder="Search by Type"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                  <User />
                </InputAdornment>
              }
              value = {type}
              onChange={(e) => setType(e.target.value)}
              sx={{
                width: "350px",
                height: "56px",
                marginLeft: '20px',
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: '16px',
              }}
            />
          </FormControl>
      </Grid>
      <Grid item sx={{ pl: "0 !important" }}>
          <FormControl sx={{ width: "129px" }} variant="outlined">
            <OutlinedInput
              placeholder="Search by Registration Code"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                </InputAdornment>
              }
              value = {registionCode}
              onChange={(e) => setRegistionCode(e.target.value)}
              sx={{
                width: "350px",
                height: "56px",
                marginLeft: '20px',
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "8px",
                mt: '16px',
              }}
            />
          </FormControl>
      </Grid>
      <Button
        variant="contained"
        sx={{ 
          width: "352.5px",
          height: "56px",
          marginLeft: '20px',
          mt: "16px" }}
          onClick={getEvents}
      >
        {"Get Events"}
      </Button>
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
          {showList ? (
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
                onClick={() => setShowList(!showList)}
              >
                <Down />
              </div>

              {events.map((event) => {
                return (
                  <Card key={event.event_uid}>
                    <CardActionArea
                      onClick={() => {
                        setEvent(event);
                        navigate("/eventDetails");
                      }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h2" component="div">
                          {event.event_title}
                        </Typography>
                        <Grid container rowSpacing={1}>
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <CalendarIcon />
                            &nbsp;
                            <Typography variant="body1">
                              {new Date(event.event_start_date).toLocaleString(
                                "default",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} />
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <ClockIcon />
                            &nbsp;
                            <Typography variant="body1">
                              {`${event.event_start_time} - ${event.event_end_time}`}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <MarkerIcon />
                            &nbsp;
                            <Typography
                              variant="body1"
                              sx={{ fontSize: 12, maxWidth: "80%" }}
                            >
                              {event.event_location}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      {JSON.parse(event.event_photo).length === 0 ? (
                        <CardMedia
                          component="img"
                          height="174px"
                          image={NoImage}
                          alt="default"
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="174px"
                          image={`${JSON.parse(
                            event.event_photo
                          )}?${Date.now()}`}
                          alt="event"
                        />
                      )}
                    </CardActionArea>
                  </Card>
                );
              })}
            </Stack>
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
{/* ---------------------------------------------------------------- */}
      {/* <Grid
        container
        rowSpacing={{ xs: 1, sm: 10 }}
        sx={{ mt: "10% !important" }}
      >
        <Grid item xs={2} align="center" onClick={() => setOpenDateModal(true)}>
          <Calendar />
        </Grid>
        <Grid item xs={2} align="center" onClick={() => getOrganizers()}>
          <Organizer />
        </Grid>
        <Grid
          item
          xs={2}
          align="center"
          onClick={() => setOpenLocationModal(true)}
        >
          <Location />
        </Grid>
        <Grid item xs={2} align="center" onClick={() => setOpenTypeModal(true)}>
          <Type />
        </Grid>
        <Grid item xs={2} align="center"></Grid>
        <Grid item xs={2} align="center"></Grid>

        <Grid item xs={12} align="center">
          <Button
            style={{
              backgroundColor: "white",

              width: "100%",
            }}
            onClick={() => getAllEvents()}
          >
            See Event List
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          {" "}
          <Button
            style={{
              backgroundColor: "white",

              width: "100%",
            }}
          >
            {" "}
            See Current RSVPs
          </Button>
        </Grid>
      </Grid> */}
      {/* <Grid container>
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
          {showList ? (
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
                onClick={() => setShowList(!showList)}
              >
                <Down />
              </div>

              {events.map((event) => {
                return (
                  <Card key={event.event_uid}>
                    <CardActionArea
                      onClick={() => {
                        setEvent(event);
                        navigate("/eventDetails");
                      }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h2" component="div">
                          {event.event_title}
                        </Typography>
                        <Grid container rowSpacing={1}>
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <CalendarIcon />
                            &nbsp;
                            <Typography variant="body1">
                              {new Date(event.event_start_date).toLocaleString(
                                "default",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} />
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <ClockIcon />
                            &nbsp;
                            <Typography variant="body1">
                              {`${event.event_start_time} - ${event.event_end_time}`}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <MarkerIcon />
                            &nbsp;
                            <Typography
                              variant="body1"
                              sx={{ fontSize: 12, maxWidth: "80%" }}
                            >
                              {event.event_location}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      {JSON.parse(event.event_photo).length === 0 ? (
                        <CardMedia
                          component="img"
                          height="174px"
                          image={NoImage}
                          alt="default"
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="174px"
                          image={`${JSON.parse(
                            event.event_photo
                          )}?${Date.now()}`}
                          alt="event"
                        />
                      )}
                    </CardActionArea>
                  </Card>
                );
              })}
            </Stack>
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
      </Grid> */}
{/* ---------------------------------------------------------------- */}
    </Box>
  );
}
