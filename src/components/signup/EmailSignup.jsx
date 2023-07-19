import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormGroup,
  Typography,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UserAlreadyExistsModal from "./UserAlreadyExistsModal";
import { hidden } from "../../styles";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Footer } from "../../assets/footer.svg";

export default function EmailSignup() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state.path;
  const email = state.email;
  const password = state.password;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const onCancel = () => {
    setUserAlreadyExists(false);
  };
  const required =
    errorMessage === "Please fill out all fields" ? <span>*</span> : "";
  const submitForm = async () => {
    console.log("in submit form");
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill out all fields");
      console.log("error");
      return;
    }

    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      setErrorMessage("Passwords must match");
      console.log("error");
      return;
    } else if (password === confirmPassword) {
      setErrorMessage("");
    }
    setShowSpinner(true);
    const user = {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: email,
      password: password,
      role: "",
    };
    console.log(user);
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CreateAccount/FINDME",
        user
      )
      .then((response) => {
        if (response.data.message == "User already exists") {
          setUserAlreadyExists(!userAlreadyExists);
          return;
          // add validation
        } else {
          navigate("/validate-code", {
            state: {
              user_uid: response.data.result.user_uid,
              email: response.data.result.email,
              user: response.data.result,
              path: path,
              eventObj: eventObj,
            },
          });
        }
      });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <UserAlreadyExistsModal
        isOpen={userAlreadyExists}
        onCancel={onCancel}
        email={email}
      />
      <Brand style={{ marginTop: "36px" }} />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl>
              {" "}
              <FormGroup>
                <Typography variant="h3">Username</Typography>
                <TextField
                  style={{
                    backgroundColor: "white",
                  }}
                  type="email"
                  name="email"
                  margin="normal"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Typography variant="h3">Confirm Password</Typography>
                <TextField
                  style={{
                    backgroundColor: "white",
                  }}
                  type="password"
                  margin="normal"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <div className={errorMessage === "" ? hidden : {}}>
                <p>{errorMessage}</p>
              </div>
              <Stack sx={{ mt: 2 }}>
                <Button
                  onClick={submitForm}
                  style={{
                    backgroundColor: "#F26457",
                    color: "white",
                  }}
                >
                  Create New Account
                </Button>{" "}
              </Stack>
            </FormControl>
          </div>
        </div>
      </Stack>{" "}
      <Footer
        style={{
          alignSelf: "center",
          position: "fixed",
          bottom: "0",
        }}
      />
    </Box>
  );
}
