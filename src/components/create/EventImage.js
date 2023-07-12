import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as BackIcon } from "../../assets/arrow-circle-left.svg";
import { ReactComponent as NextIcon } from "../../assets/arrow-square-right.svg";
import { ReactComponent as EventDefaultImage } from "../../assets/event-default.svg";
import { ReactComponent as CameraIcon } from "../../assets/camera.svg";
import { styled } from "@mui/material/styles";

const Dot = styled("div")(({ color }) => ({
  backgroundColor: color,
  borderRadius: "50%",
  width: "10px",
  height: "10px",
}));

const EventImage = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" sx={{ mt: "114px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Typography variant="h2">{"Event Photo"}</Typography>
        <Stack spacing={2} direction="column">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              height: "100%",
              p: 2,
            }}
          >
            <Stack spacing={2} direction="column">
              {"Use Default Image"}
              <EventDefaultImage />
            </Stack>
          </Button>
          <Divider
            sx={{
              color: "#FFFFFF",
              "&.MuiDivider-root": {
                "&::before": {
                  borderTop: "thin solid white",
                },
                "&::after": {
                  borderTop: "thin solid white",
                },
              },
              "& .MuiDivider-wrapper": {
                fontSize: 18,
              },
            }}
          >
            {"or"}
          </Divider>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              height: "100%",
              p: 2,
            }}
          >
            <Stack spacing={2} direction="column">
              {"Choose your own image"}
              <Stack spacing={2} direction="row">
                <Stack spacing={2} direction="column">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      fontSize: 12,
                    }}
                  >
                    {"Choose Image"}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      fontSize: 12,
                    }}
                  >
                    <CameraIcon />
                    &nbsp;{"Take a new one"}
                  </Button>
                </Stack>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    width: "154px",
                    height: "130px",
                  }}
                ></Button>
              </Stack>
            </Stack>
          </Button>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          style={{
            width: "92vw",
            position: "fixed",
            bottom: "15px",
            maxWidth: "550px",
          }}
        >
          <Button variant="contained" onClick={() => navigate(-1)} fullWidth>
            <BackIcon />
            {"Back"}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/eventQuestions")}
            fullWidth
          >
            <NextIcon />
            {"Next"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventImage;
