import { Button, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth={"xs"} sx={{ minHeight: "100vh" }}>
      <Stack spacing={1} mt={6}>
        <Button size="large" color="secondary" variant="contained">
          Enter Registration Code
        </Button>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={() => navigate("/EventsByDatePage")}
        >
          Find Event By Date
        </Button>
        <Button size="large" color="secondary" variant="contained">
          Find Event By Organizer
        </Button>
        <Button size="large" color="secondary" variant="contained">
          See Event List
        </Button>
        <Button size="large" color="secondary" variant="contained">
          See Events Near You
        </Button>
      </Stack>
    </Container>
  );
};

export default RegistrationPage;
