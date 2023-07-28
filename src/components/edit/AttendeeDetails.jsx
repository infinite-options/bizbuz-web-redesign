import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Phone } from "../../assets/phone.svg";
import { ReactComponent as Mail } from "../../assets/mail-04.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import NewCardComponent from "../new-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const AttendeeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user, id } = location.state;
  const [registrant, setRegistrant] = useState({ images: "[]" });
  const [qas, setQas] = useState([]);

  const fetchRegistrantDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/eventRegistrant?eventId=${event.event_uid}&registrantId=${id}`
      );
      const data = response["data"];
      setRegistrant(data.registrant);
      setQas(JSON.parse(data.registrant.eu_qas));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegistrantDetails();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand onClick={() => navigate("/")} />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: "40px" }}
      >
        <NewCardComponent event={event} isRegisteredEventCard={true} />
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
        <Stack align="center" direction="column">
          <Avatar
            src={registrant.images.replace(/\\/g, "").slice(2, -2)}
            sx={{
              width: "70px",
              height: "70px",
              bgcolor: "#ff5722",
              alignSelf: "center",
            }}
            alt={registrant.first_name}
            sizes=""
          />
          <Typography
            align="center"
            variant="h6"
            sx={{
              mt: 2,
              color: "#FFF",
              fontFamily: "Fira Sans Condensed",
              fontSize: "36px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            {registrant.first_name + " " + registrant.last_name}
          </Typography>
          <Typography
            align="center"
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.80)",
              textAlign: "center",
              fontFamily: "Fira Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              marginTop: "8px",
            }}
          >
            {registrant.title}
          </Typography>
          <Typography
            align="center"
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.80)",
              textAlign: "center",
              fontFamily: "Fira Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              marginTop: "8px",
            }}
          >
            {registrant.company}
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Card
              variant="contained"
              sx={{
                color: "#000000",
                mt: "16px",
                display: "flex",
                width: "350px",
                height: "149px",
                padding: "8px 14px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
                borderRadius: "8px",
                border: "1px solid var(--gray-300, #D0D5DD)",
                background: "var(--gray-50, #F9FAFB)",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container rowSpacing={1}>
                    <Grid
                      sx={{ mt: "-32px" }}
                      item
                      container
                      alignItems="center"
                    >
                      <Phone />
                      <Grid
                        item
                        xs={6}
                        sx={{ fontWeight: "normal", marginLeft: "8px" }}
                      >
                        {registrant.phone_number}
                      </Grid>
                    </Grid>
                    <Grid sx={{ mt: "8px" }} item container alignItems="center">
                      <Mail />
                      <Grid
                        item
                        xs={6}
                        sx={{ fontWeight: "normal", marginLeft: "35px" }}
                      >
                        {registrant.email}
                      </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                      <Grid item sx={{ fontWeight: "normal", mt: "8px" }}>
                        {registrant.catch_phrase}
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Stack>
        <Grid sx={{ mt: "64px", marginBottom: "32px" }}>
          {qas.map((qa) => (
            <Box
              key={qa.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                my: 2,
                mt: "16px",
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  color: "#FFF",
                  fontFamily: "Fira Sans",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  ml: "16px",
                  mt: "32px",
                }}
              >
                {qa.question}
              </Typography>
              <Grid
                sx={{ mt: "8px" }}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Card
                  sx={{
                    display: "flex",
                    width: "350px",
                    height: "120px",
                    padding: "8px 14px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    color: "black",
                    border: "1px solid var(--gray-300, #D0D5DD)",
                    background: "var(--gray-50, #F9FAFB)",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                  }}
                >
                  <CardActionArea>
                    <CardContent
                      sx={{ display: "flex", alignItems: "flex-start" }}
                    >
                      <Typography
                        sx={{ ml: "-16px", mt: "-56px" }}
                        variant="body1"
                        gutterBottom
                      >
                        {qa.answer}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: "352.5px",
          height: "56px",
          mt: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          // position: "fixed",
          bottom: "20px",
          left: "0",
          right: "0",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        {"Return to Homepage"}
      </Button>
    </Box>
  );
};

export default AttendeeDetails;
