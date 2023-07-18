import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { ReactComponent as NextIcon } from "../../assets/continue.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

const preDefQestions = [
  "What is your current role?",
  "What Are you really good at?",
  "What are a few things you need?",
  "What is one thing you are really proud of?",
  "What is one thing you wish you were better at?",
  "What are one or two words that describe you?",
];

const EventQuestions = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [getEvent, setEvent] = useLocalStorage("event");

  const handleSelectQuestion = (e) => {
    if (selectedQuestions.length < 3) {
      setSelectedQuestions([...selectedQuestions, e.target.value]);
    }
  };

  const handleDeselectQuestion = (question) => {
    const newSelectedOptions = selectedQuestions.filter((q) => q !== question);
    setSelectedQuestions(newSelectedOptions);
  };

  const handleCustomQuestionChange = (e) => {
    setCustomQuestion(e.target.value);
  };

  const handleAddQuestion = () => {
    if (selectedQuestions.length < 3)
      setSelectedQuestions([...selectedQuestions, customQuestion]);
    setCustomQuestion("");
  };

  const handleContinue = () => {
    const event = getEvent();
    let preEventQuestionnaire = selectedQuestions.map((question, index) => ({
      id: index + 1,
      question: question,
    }));
    event.preEventQuestionnaire = preEventQuestionnaire;
    setEvent(event);
    navigate("/eventReview");
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
        <Typography variant="h2">{"Event Questionnaire"}</Typography>
        <Typography variant="body1" sx={{ color: "#FFFFFF", fontSize: 16 }}>
          {"Select from existing list"}
        </Typography>
        <Select
          multiple
          native
          onClick={handleSelectQuestion}
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
          value={customQuestion}
          onChange={handleCustomQuestionChange}
          endAdornment={
            <InputAdornment position="end">
              <AddIcon onClick={handleAddQuestion} />
            </InputAdornment>
          }
          type="text"
          sx={{ backgroundColor: "#FFFFFF" }}
          fullWidth
        />
        <Typography variant="h2" sx={{ my: "10px" }}>
          {"Pre-Event Questionnaire"}
        </Typography>
        <List sx={{ mt: 2 }}>
          {selectedQuestions.length > 0 ? (
            selectedQuestions.map((question, index) => (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={10} md={10}>
                  <Typography
                    key={index}
                    sx={{ color: "#FFFFFF", fontSize: 16 }}
                  >
                    {question}
                  </Typography>
                </Grid>
                <Grid item xs={2} md={2} sx={{ textAlign: "center" }}>
                  <DeleteIcon
                    onClick={() => handleDeselectQuestion(question)}
                  />
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography sx={{ color: "#FFFFFF", fontSize: 16 }}>
              {"No question selected"}
            </Typography>
          )}
        </List>
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

export default EventQuestions;