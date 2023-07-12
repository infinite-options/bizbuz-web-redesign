import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-date.svg";
import { ReactComponent as Location } from "../../assets/marker-pin-01.svg";
import { ReactComponent as User } from "../../assets/User_alt.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function FindBy() {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [registionCode, setRegistionCode] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      });
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
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

      {events.length > 0 ? (
          events.map((event) => { return (
            <Card sx={{mt: "16px" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
                    {event.event_title}
                  </Typography>
                  <Grid container rowSpacing={{ xs: 1, sm: 10 }}>
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
                    image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                    alt="event"
                  />
                )}
              </CardActionArea>
            </Card>
          )})
        ) : (
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Grid
              container
              rowSpacing={{ xs: 1, sm: 10 }}
              sx={{ mt: "18% !important" }}
            >
            </Grid>
            <Grid item xs={5} align="center">
            <Typography gutterBottom variant="h2" component="div" style={{ color: 'white' }}>
              {/* No Events Available For Now */}
            </Typography>
            </Grid>
          </Box>
        )}

    </Box>
  );
}
