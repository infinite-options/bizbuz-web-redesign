import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  TextField,
  FormLabel,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { formatPhoneNumber } from "../../util/helper";

export default function EmailSignupForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user_uid = state.user_uid;
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  function updateUser() {
    let updatedUser = {
      user_uid: user_uid,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    axios
      .put(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UpdateUser/FINDME",
        updatedUser
      )
      .then((response) => {
        navigate("/login", {
          state: {
            path: path,
            eventObj: eventObj,
          },
        });
      });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        border={1}
        margin={5}
      >
        {" "}
        Enter Profile
        <FormControl>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <TextField
              type="email"
              placeholder=""
              name="email"
              value={firstName}
              margin="normal"
              label="First Name"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "92vw",
                height: "44px",
                borderRadius: "8px",
              }}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <TextField
              type="email"
              margin="normal"
              label="Last Name"
              InputLabelProps={{ shrink: true }}
              name="email"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "92vw",
                height: "44px",
                borderRadius: "8px",
              }}
              required
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Phone Number</FormLabel>
            <TextField
              placeholder="(xxx)xxx-xxxx"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="phoneNumber"
              value={phoneNumber}
              margin="normal"
              label="Phone Number"
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setPhoneNumber(formatPhoneNumber(e.target.value))
              }
              sx={{
                backgroundColor: "white",
                width: "92vw",
                height: "44px",
                borderRadius: "8px",
              }}
              required
            />
          </FormGroup>
        </FormControl>
        <Button
          variant="outlined"
          // style={{ margin: "2rem 0rem" }}
          sx={{
            textTransform: "none",
            backgroundColor: "#F26457",
            color: "white",
            width: "92vw",
            height: "44px",
            "&.MuiButtonBase-root:hover, &.Mui-selected": {
              backgroundColor: "#F26457",
            },
          }}
          onClick={updateUser}
        >
          {" "}
          Enter
        </Button>
      </Grid>
    </div>
  );
}
