import React, { useState } from "react";
import axios from "axios";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCodeInput from "react-code-input";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Footer } from "../../assets/footer.svg";

const codeInputStyle = {
  borderRadius: "6px",
  border: "1px solid",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,.10)",
  margin: "4px",
  padding: "0 0 0 10px",
  width: "60px",
  height: "46px",
  fontSize: "32px",
  boxSizing: "border-box",
};

export default function ValidationCode() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user_uid = state.user_uid;
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const email = state.email;
  const user = state.user;
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);

  function handleChange(code) {
    setCode(code);
  }

  function submitButton() {
    let input = {
      user_uid: user_uid,
      code: code,
    };
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CheckEmailValidationCode/FINDME",
        input
      )
      .then((response) => {
        if (response.data.email_validated_status === "...") {
          setErrorMessage(response.data.message);
        } else if (response.data.email_validated_status === "TRUE") {
          navigate("/create-card", {
            state: {
              email: email,
              user_uid: user_uid,
              edit: false,
              eventObj: eventObj,
              path: path,
              user: user,
            },
          });

          // navigate("/email-signup-form", {
          //   state: {
          //     user_uid: user_uid,
          //     eventObj: eventObj,
          //     path: path,
          //   },
          // });
        }
      });
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Brand style={{ marginTop: "36px" }} onClick={() => navigate("/")} />
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
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <Typography sx={{ m: 2, color: "white" }} variant="body1">
            We sent a code to {email}
            <br /> Please enter the code below
          </Typography>
          <Box sx={{ mt: 8 }}>
            {" "}
            <ReactCodeInput
              type="number"
              inputStyle={codeInputStyle}
              fields={3}
              onChange={handleChange}
            />
          </Box>
          <Typography sx={{ m: 2 }}> {errorMessage}</Typography>
        </div>
      </Stack>{" "}
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        {" "}
        <Button
          style={{
            backgroundColor: "#F26457",
            color: "white",
            marginTop: "-2rem",
          }}
          onClick={submitButton}
        >
          Verify
        </Button>
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
