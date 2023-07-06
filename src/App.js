import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Landing from "./components/Landing";
import CreateEvent from "./components/create/CreateEvent";
import EventDetails from "./components/create/EventDetails";
import EventLocation from "./components/create/EventLocation";
import FindBy from "./components/find/FindBy";
import EventTitle from "./components/create/EventTitle";
import RegistrationPage from "./components/RegistrationPage";
import { ReactComponent as Brand } from "./assets/brand.svg";
import { Box } from "@mui/material";

const App = () => {
  return (
    // <Container maxWidth="sm">
    <>
      <Box p={1}>
        <Brand />
      </Box>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/eventDetails" element={<EventDetails />} />
        <Route path="/eventLocation" element={<EventLocation />} />
        <Route path="/eventTitle" element={<EventTitle />} />
        <Route path="/findEvent" element={<FindBy />} />
        <Route path="/registrationPage" element={<RegistrationPage />} />
      </Routes>
    </>
    // </Container>
  );
};

export default App;
