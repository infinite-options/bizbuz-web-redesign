import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QRCode from "../common/QRCode";
import { ReactComponent as Brand } from "../../assets/brand.svg";

const EventCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state;

  return (
    <Box display="flex" flexDirection="column">
      <Brand style={{ marginTop: "36px" }} />
      <Typography variant="h1" sx={{ mt: "68px" }}>
        {"Registration code"}
      </Typography>
      <Stack
        direction="column"
        spacing={2}
        sx={{ mt: "36px", justifyContent: "center", alignItems: "center" }}
      >
        <Box display="flex" flexDirection="column" sx={{ minHeight: "62vh" }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <QRCode
              route={"/preregistration-event/"}
              eventRegistrationCode={event.event_registration_code}
            />
            <Typography sx={{ color: "#FFFFFF", fontSize: 24 }}>
              {event.event_registration_code}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "242px",
                height: "40px",
                backgroundColor: "#3B8C75",
              }}
            >
              {"Add to Google Calendar"}
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "242px",
                height: "40px",
                backgroundColor: "#AF2304",
              }}
            >
              {"Share"}
            </Button>
          </Stack>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          style={{
            width: "92vw",
            maxWidth: "550px",
          }}
        >
          <Button variant="contained" onClick={() => navigate("/")} fullWidth>
            {"Go to Main menu"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventCode;