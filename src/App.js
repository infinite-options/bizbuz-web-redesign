import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Landing from "./components/Landing";
import CreateEvent from "./components/create/CreateEvent";
import FindBy from "./components/find/FindBy";
import CurrentEvents from "./components/attend/CurrentEvents";
import EarlyArrival from "./components/attend/EarlyArrival";
import EventRegistrants from "./components/attend/EventRegistrants";
import EventAttendees from "./components/attend/EventAttendees";
const App = () => {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/findEvent" element={<FindBy />} />
        <Route exact path="/currentEvents" element={<CurrentEvents />} />
        <Route exact path="/earlyArrival" element={<EarlyArrival />} />
        <Route exact path="/eventRegistrants" element={<EventRegistrants />} />
        <Route exact path="/eventAttendees" element={<EventAttendees />} />
      </Routes>
    </Container>
  );
};

export default App;
