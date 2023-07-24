import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Box, Button, Typography, Stack } from "@mui/material";
import RegisteredCardComponent from "../../registered-card-component";
import { ReactComponent as Down } from "../../../assets/down.svg";
import { ReactComponent as Globe } from "../../../assets/globe.svg";
import { ReactComponent as Brand } from "../../../assets/brand.svg";
import { ReactComponent as Back } from "../../../assets/back.svg";
import NewCardComponent from "../../new-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CurrentRsvp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showList, setShowList] = useState(false);
  const user = state.user;
  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
  const [events, setEvents] = useState([]);
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const getRSVPdEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEventUser?timeZone=${user_timezone}&eu_user_id=${user_uid}`
      )
      .then((response) => {
        setRsvpEvents(response.data.result);
        if (!showList) setShowList(!showList);
      });
  };
  const getEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL + `/GetEvents?timeZone=${user_timezone}&eu_user_id=${user_uid}`
      )
      .then((response) => {
        setEvents(response.data.result);
      });
  };
  useEffect(() => {
    getRSVPdEvents();
    getEvents();
  }, []);

  const handleCardClick = (event) => {
    navigate("/rsvpEventInfo", { state: { event } });
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
        <Back onClick={() => navigate("/")} />
      </Box>
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
        {"Current RSVPs"}
      </Typography>
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
              {/* <Typography
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
              </Typography> */}
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
                  onClick={() => setShowList(false)}
                >
                  <Down />
                </div>

                {rsvpEvents.map((event) => {
                  const correspondingEvent = events.find(
                    (e) => e.event_uid === event.event_uid
                  );

                  // Extract the registrants field
                  const totalRegistrants = correspondingEvent
                    ? correspondingEvent.registrants
                    : 0;
                  return (
                    <NewCardComponent
                      event={event}
                      onCardClick={handleCardClick}
                      totalRegistrants={totalRegistrants}
                      isRegisteredEventCard={true}
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
    </>
  );
};

export default CurrentRsvp;
