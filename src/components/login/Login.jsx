import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Stack } from "@mui/material";
import GoogleLogin from "./GoogleLogin";
import EmailLogin from "./EmailLogin";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Footer } from "../../assets/footer.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
// import Back from "../../assets/Back.png";
import { hidden } from "../../styles";
export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const [userDoesntExist, setUserDoesntExist] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onCancelModal = () => {
    setUserDoesntExist(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" sx={{ mt: "36px", marginBottom: "2rem" }}>
        <Brand onClick={() => navigate("/")} />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
      </Stack>
      <Typography variant="h1" sx={{ mt: "58px" }}>
        {"Login here"}
      </Typography>
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
            flexDirection: "column",
          }}
        >
          {showForm ? (
            " "
          ) : (
            <GoogleLogin
              userDoesntExist={userDoesntExist}
              setUserDoesntExist={setUserDoesntExist}
              path={path}
              eventObj={eventObj}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}

          <EmailLogin
            userDoesntExist={userDoesntExist}
            setUserDoesntExist={setUserDoesntExist}
            showForm={showForm}
            setShowForm={setShowForm}
            path={path}
            eventObj={eventObj}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <div className="text-center" style={errorMessage === "" ? hidden : {}}>
          <Typography variant="h3">{errorMessage || "error"}</Typography>
        </div>
      </Stack>

      {/* <Stack sx={{ mt: 12 }}>
        {showForm ? (
          " "
        ) : (
          <Button onClick={() => navigate(-1)}>
            <img src={Back} style={{ width: "2rem" }} />
            &nbsp; &nbsp;Back
          </Button>
        )}
      </Stack> */}
      <Footer style={{ alignSelf: "center", position: "fixed", bottom: "0" }} />
    </Box>
  );
}
