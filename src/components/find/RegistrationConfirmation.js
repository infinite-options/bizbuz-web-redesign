import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
// import { ReactComponent as Done } from "../../assets/done.svg";
const RegistrationConfirmation = () => {
  const location = useLocation();
  const { event } = location.state;
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
        <Back onClick={() => navigate(-1)} />
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 10 }}
      >
        <Card key={event.event_uid}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                {event.event_title}
              </Typography>
              <Grid container rowSpacing={1}>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row">
                      <CalendarIcon />
                      &nbsp;
                      <Typography variant="body1">
                        {new Date(event.event_start_date).toLocaleString(
                          "default",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <ClockIcon />
                      &nbsp;
                      <Typography variant="body1">
                        {`${event.event_start_time} - ${event.event_end_time}`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <MarkerIcon />
                  &nbsp;
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 12, maxWidth: "80%" }}
                  >
                    {event.event_location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {JSON.parse(event.event_photo).length === 0 ? (
              <CardMedia
                component="img"
                height="174px"
                image={NoImage}
                alt="default"
              />
            ) : (
              <CardMedia
                component="img"
                height="174px"
                image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                alt="event"
              />
            )}
          </CardActionArea>
        </Card>
      </Stack>
      <Typography
        variant="h1"
        sx={{
          mt: "35px",
          textAlign: "center",
          color: "#FFF",
          fontFamily: "Fira Sans Condensed",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          marginBottom: "70px",
        }}
      >
        {"Registration Confirmed!"}
      </Typography>
      <Box
        sx={{
          marginLeft: "151px",
          position: "relative",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {/* <Done /> */}
      </Box>
      <Typography
        variant="h1"
        sx={{
          mt: "-32px",
          textAlign: "center",
          color: "#FFF",
          fontFamily: "Fira Sans Condensed",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Registration Code:{" "}
        <span style={{ fontSize: "30px", marginLeft: "8px" }}>
          {event.event_registration_code}
        </span>
      </Typography>

      <Box
        display="flex"
        width="347px"
        height="163px"
        flexDirection="column"
        justifyContent="center"
        flexShrink={0}
        sx={{
          typography: {
            color: "#FFF",
            fontFamily: "Inter",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22.5px",
          },
          textIndent: "1em",
          textAlign: "justify",
          marginTop: "8px",
        }}
      >
        <Typography>
          A confirmation email has been sent to the provided email address.
          Please check your inbox for further details.
        </Typography>
        <Typography sx={{ mt: "32px" }}>
          We look forward to seeing you at the event and hope you have a great
          experience!
        </Typography>
      </Box>
    </Box>
  );
};

export default RegistrationConfirmation;
