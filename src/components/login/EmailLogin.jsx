import React, { useState, useContext } from "react";
import axios from "axios";
import LoginContext from "../../LoginContext";
import {
  Typography,
  Box,
  Stack,
  Button,
  FormControl,
  FormGroup,
  TextField,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordModal from "./PasswordModal";
import Email from "../../assets/Email.png";
import { red, pillButton, boldSmall, hidden, small } from "../../styles";

export default function EmailLogin(props) {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  const {
    userDoesntExist,
    setUserDoesntExist,
    path,
    showForm,
    setShowForm,
    errorMessage,
    setErrorMessage,
  } = props;
  const eventObj = props.eventObj !== undefined ? props.eventObj : "";
  const [passModal, setpassModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showSpinner, setShowSpinner] = useState(false);
  // const [userDoesntExist, setUserDoesntExist] = useState(false);
  function submitForm() {
    if (email === "" || password === "") {
      setErrorMessage("Please fill out all fields");
      return;
    }
    // setShowSpinner(true);
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt/FINDME",
        {
          email: email,
        }
      )
      .then((res) => {
        let saltObject = res;
        if (res.data.message == "Email doesn't exist") {
          setUserDoesntExist(true);
          navigate("/email-signup", {
            state: {
              path: path,
              eventObj: eventObj,
              email: email,
              password: password,
            },
          });
        }
        if (saltObject.data.code === 200) {
          let hashAlg = saltObject.data.result[0].password_algorithm;
          let salt = saltObject.data.result[0].password_salt;

          if (hashAlg != null && salt != null) {
            // Make sure the data exists
            if (hashAlg !== "" && salt !== "") {
              // Rename hash algorithm so client can understand
              switch (hashAlg) {
                case "SHA256":
                  hashAlg = "SHA-256";
                  break;
                default:
                  break;
              }
              // Salt plain text password
              let saltedPassword = password + salt;
              // Encode salted password to prepare for hashing
              const encoder = new TextEncoder();
              const data = encoder.encode(saltedPassword);
              //Hash salted password
              crypto.subtle.digest(hashAlg, data).then((res) => {
                let hash = res;
                // Decode hash with hex digest
                let hashArray = Array.from(new Uint8Array(hash));
                let hashedPassword = hashArray
                  .map((byte) => {
                    return byte.toString(16).padStart(2, "0");
                  })
                  .join("");
                let loginObject = {
                  email: email,
                  password: hashedPassword,
                };
                axios
                  .post(
                    "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login/FINDME",
                    loginObject
                  )
                  .then((response) => {
                    if (response.data.message === "Incorrect password") {
                      setErrorMessage(response.data.message);
                      // setShowSpinner(false);
                    } else if (
                      response.data.message === "Email doesn't exist"
                    ) {
                      setUserDoesntExist(true);
                      // setShowSpinner(false);
                    } else if (response.data.message === "Login successful") {
                      setErrorMessage("");
                      document.cookie =
                        "user_uid=" + response.data.result.user_uid;
                      document.cookie = "user_email=" + email;
                      document.cookie =
                        "user_details=" + JSON.stringify(response.data.result);
                      document.cookie = "loggedIn=" + true;
                      JSON.stringify(response.data.result);
                      loginContext.setLoginState({
                        ...loginContext.loginState,
                        reload: false,
                        loggedIn: true,
                        user_uid: response.data.result.user_uid,
                        user_email: email,
                        user_details: response.data.result,
                      });
                      navigate(path, {
                        state: {
                          email: email,
                          user: response.data.result,
                          eventObj: eventObj,
                        },
                      });
                    }
                  })
                  .catch((err) => {
                    if (err.response) {
                      console.log(err.response);
                    }
                    console.log(err);
                  });
              });
            }
          }
        } else {
        }
      });
  }

  const onReset = async () => {
    if (email == "") {
      setErrorMessage("Please enter an email");
      return;
    }
    // setShowSpinner(true);
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/SetTempPassword/FINDME",
        {
          email: email,
        }
      )
      .then((response) => {
        if (response.data.message === "A temporary password has been sent") {
          setErrorMessage("");
          // setShowSpinner(false);
          setpassModal(true);
        }
        if (response.data.code === 280) {
          setErrorMessage("No account found with that email.");
          return;
        }
      });
  };
  const onCancel = () => {
    setpassModal(false);
  };

  const required =
    errorMessage === "Please fill out all fields" ? (
      <span style={red} className="ms-1">
        *
      </span>
    ) : (
      ""
    );
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PasswordModal isOpen={passModal} onCancel={onCancel} />
      {showForm ? (
        <Stack direction="column" justifyContent="center" sx={{ mt: 2 }}>
          <FormControl>
            <FormGroup>
              <Typography variant="h3" sx={{ width: "92vw" }}>
                {"Username"}
              </Typography>
              <TextField
                sx={{
                  backgroundColor: "white",
                  width: "92vw",
                  height: "44px",
                  borderRadius: "8px",
                }}
                type="email"
                value={email}
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Typography variant="h3" sx={{ width: "92vw" }}>
                {"Password"}
              </Typography>
              <TextField
                sx={{
                  backgroundColor: "white",
                  width: "92vw",
                  height: "44px",
                  borderRadius: "8px",
                }}
                type="password"
                value={password}
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
          </FormControl>
          <div className="text-center pt-1 pb-2">
            <div className="text-center">
              <p onClick={onReset} variant="body1" style={{ color: "white" }}>
                {"Forgot Password?"}
              </p>
            </div>
          </div>
          <div
            className="text-center"
            style={errorMessage === "" ? hidden : {}}
          >
            <p style={{ ...red, ...small }}>{errorMessage || "error"}</p>
          </div>
        </Stack>
      ) : (
        <Button
          onClick={() => setShowForm(true)}
          sx={{
            textTransform: "none",
            backgroundColor: "white",
            color: "#000000",
            width: "92vw",
            height: "44px",
          }}
        >
          <img
            src={Email}
            style={{ width: "3rem", padding: "1rem", cursor: "pointer" }}
            alt="email"
          />
          {"Register with Email"}
        </Button>
      )}
      <Stack>
        {showForm ? (
          <Button
            onClick={() => submitForm()}
            style={{
              backgroundColor: "#F26457",
              color: "white",
              marginTop: "-2rem",
              width: "92vw",
              height: "56px",
              borderRadius: "10px",
            }}
          >
            {"Login"}
          </Button>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
}
