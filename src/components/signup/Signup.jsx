import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import GoogleSignup from "./GoogleSignup";
import EmailLogin2 from "../../assets/EmailLogin2.png";
export default function Signup() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
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
        <div style={{ marginTop: "3rem" }}> Create a Profile</div>
        <div style={{ marginTop: "3rem" }}> We recommend Google</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleSignup path={path} eventObj={eventObj} />
        </div>
        <div style={{ marginTop: "3rem" }}> Sign up using Email</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={EmailLogin2}
            onClick={() =>
              navigate("/email-signup", {
                state: { path: path, eventObj: eventObj },
              })
            }
            style={{ width: "2.7rem", margin: "2rem" }}
          />{" "}
        </div>
      </Grid>
    </div>
  );
}
