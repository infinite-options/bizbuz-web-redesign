import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as Location } from "../../assets/marker-pin-01.svg";
import { ReactComponent as User } from "../../assets/User_alt.svg";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function FindBy() {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [registionCode, setRegistionCode] = useState('');



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
    if(isLoading){
      axios.get(query)
      .then((response) => {
        navigate("/eventListsWithFilter", {state: { events: response.data.result},});
        if(registionCode) {
          navigate("/eventListsWithFilter", {state: { events: response.data.result.result},});
          console.log(response.data.result.result);
        }
        setShowList(!showList);
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


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              className={classes.textfield}
              value={selectedDate}
              inputFormat="MM-DD-YYYY"
              onChange={(d) => {
                setSelectedDate(d.format("MM/DD/YYYY"));
                setIsLoading(true);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        
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
              onChange={(e) => {
                setIsLoading(true);
                setLocation(e.target.value);
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
              placeholder="Search by Type"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                  <User />
                </InputAdornment>
              }
              value = {type}
              onChange={(e) => {
                setIsLoading(true);
                setType(e.target.value);
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
              placeholder="Search by Registration Code"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                </InputAdornment>
              }
              value = {registionCode}
              onChange={(e) => {
                setIsLoading(true);
                setRegistionCode(e.target.value);
              }}
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
        </Grid>
      </Grid>
    </Box>
  );
}
