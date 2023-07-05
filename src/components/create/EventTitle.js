import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as BackIcon } from "../../assets/arrow-circle-left.svg";
import { ReactComponent as NextIcon } from "../../assets/arrow-square-right.svg";

const EventTitle = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" sx={{ mt: "114px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Typography variant="h2">{"Event Title"}</Typography>
        <TextField
          variant="outlined"
          placeholder="Write Event's title here..."
          sx={{ backgroundColor: "white" }}
        />
        <Typography variant="h2">{"Event Description"}</Typography>
        <TextField
          variant="outlined"
          placeholder="Describe your Event here..."
          sx={{ backgroundColor: "white" }}
        />
        <Stack
          spacing={2}
          direction="row"
          style={{ width: "92vw", position: "fixed", bottom: "15px" }}
        >
          <Button variant="contained" onClick={() => navigate(-1)} fullWidth>
            <BackIcon />
            {"Back"}
          </Button>
          <Button color="secondary" variant="contained" fullWidth>
            <NextIcon />
            {"Next"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventTitle;
