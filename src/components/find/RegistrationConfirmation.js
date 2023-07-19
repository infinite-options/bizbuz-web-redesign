import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import RegisteredCardComponent from "../registered-card-component";
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
        <RegisteredCardComponent event={event} />
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
