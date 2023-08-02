import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Box, Button, Typography, Stack } from "@mui/material";
import { ReactComponent as Down } from "../../assets/down.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import EventCard from "../common/EventCard";
import Loading from "../common/Loading";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CurrentRsvp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showList, setShowList] = useState(false);
  const user = state.user;
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getRSVPdEvents = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      BASE_URL +
        `/GetEventUser?timeZone=${user_timezone}&eu_user_id=${user.user_uid}`
    );
    setRsvpEvents(response.data.result);
    setLoading(false);
    if (!showList) setShowList(!showList);
  };

  useEffect(() => {
    getRSVPdEvents();
  }, []);

  const handleCardClick = (event) => {
    navigate("/rsvpEventInfo", { state: { event, user } });
  };

  return (
    <>
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <BackIcon
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Stack>
      <Loading isLoading={isLoading} />
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
          {showList && rsvpEvents.length > 0 ? (
            <Box>
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
                {rsvpEvents.map((event) => (
                  <EventCard
                    key={event.event_uid}
                    event={event}
                    onCardClick={handleCardClick}
                    isRegistered={true}
                    isList={true}
                  />
                ))}
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
