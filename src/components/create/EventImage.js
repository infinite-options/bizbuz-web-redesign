import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { ReactComponent as NextIcon } from "../../assets/continue.svg";
import { ReactComponent as EventDefaultImage } from "../../assets/event-default.svg";
import { ReactComponent as CameraIcon } from "../../assets/camera.svg";

const EventImage = () => {
  const navigate = useNavigate();
  const [getEvent, setEvent] = useLocalStorage("event");
  const event = getEvent();
  const [image, setImage] = useState(
    event.img_cover ? { image: event.img_cover } : {}
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isDefault, setDefault] = useState(false);

  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      file.image = e.target.result;
      setImage(file);
    };
    reader.readAsDataURL(file.file);
  };

  const addFile = (e) => {
    const file = {
      index: 0,
      file: e.target.files[0],
      image: null,
    };
    let isLarge = file.file.size > 5000000;
    let file_size = (file.file.size / 1000000).toFixed(1);
    if (isLarge) {
      setErrorMessage(`Your file size is too large (${file_size} MB)`);
      return;
    } else {
      setErrorMessage("");
    }
    readImage(file);
  };

  const handleContinue = async () => {
    if (!isDefault) event.img_cover = image.image;
    else event.img_cover = null;
    setEvent(event);
    if (event.isReview) navigate("/eventReview");
    else navigate("/eventQuestions");
  };

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand />
        <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
      </Stack>
      <Typography variant="h1" sx={{ mt: "58px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "26px" }}>
        <Typography variant="h2">{"Event Photo"}</Typography>
        <Stack spacing={2} direction="column">
          <Button
            onClick={() => setDefault(true)}
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
            onClick={() => setDefault(false)}
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
                    component="label"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      fontSize: 12,
                    }}
                  >
                    {"Choose Image"}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={addFile}
                    />
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
                    p: 0,
                    m: 0,
                  }}
                >
                  {
                    <div>
                      {image.image ? (
                        <img
                          key={Date.now()}
                          src={image.image}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          alt="event"
                        />
                      ) : (
                        <br />
                      )}
                    </div>
                  }
                </Button>
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
            bottom: "30px",
            maxWidth: "550px",
          }}
        >
          <Button variant="contained" onClick={handleContinue} fullWidth>
            {"Continue"}&nbsp;
            <NextIcon />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventImage;
