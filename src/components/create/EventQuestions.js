import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as BackIcon } from "../../assets/arrow-circle-left.svg";
import { ReactComponent as NextIcon } from "../../assets/arrow-square-right.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

const preDefQestions = [
  "What is your current role?",
  "What are you really good at?",
  "What are a few things you need?",
  "What is one thing you are really proud of?",
];

const EventQuestions = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" sx={{ mt: "114px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Typography variant="h2">{"Event Questionnaire"}</Typography>
        <Typography variant="body1" sx={{ color: "#FFFFFF", fontSize: 16 }}>
          {"Select from existing list"}
        </Typography>
        <Select
          multiple
          native
          inputProps={{
            id: "select-multiple-native",
          }}
          sx={{ backgroundColor: "#FFFFFF" }}
        >
          {preDefQestions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        <Typography variant="body1" sx={{ color: "#FFFFFF", fontSize: 16 }}>
          {"Write your own question"}
        </Typography>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <AddIcon />
            </InputAdornment>
          }
          type="text"
          sx={{ backgroundColor: "#FFFFFF" }}
          fullWidth
        />
        <Typography variant="h2" sx={{ my: "10px" }}>
          {"Pre-Event Questionnaire"}
        </Typography>
        {preDefQestions.map((question) => (
          <Typography
            variant="body1"
            sx={{ color: "#FFFFFF", fontSize: 16, width: "90vw" }}
          >
            {question}
            <DeleteIcon style={{ float: "right" }} />
          </Typography>
        ))}
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
            onClick={() => navigate("/eventReview")}
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

export default EventQuestions;
