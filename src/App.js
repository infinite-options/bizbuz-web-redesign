import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Landing from "./components/Landing";
import CreateEvent from "./components/create/CreateEvent";
import EventDetails from "./components/create/EventDetails";
import EventLocation from "./components/create/EventLocation";
import FindBy from "./components/find/FindBy";
import EventTitle from "./components/create/EventTitle";
import EventImage from "./components/create/EventImage";
import EventQuestions from "./components/create/EventQuestions";
import EventReview from "./components/create/EventReview";

const App = () => {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/eventDetails" element={<EventDetails />} />
        <Route path="/eventLocation" element={<EventLocation />} />
        <Route path="/eventTitle" element={<EventTitle />} />
        <Route path="/eventImage" element={<EventImage />} />
        <Route path="/eventQuestions" element={<EventQuestions />} />
        <Route path="/eventReview" element={<EventReview />} />
        <Route path="/findEvent" element={<FindBy />} />
      </Routes>
    </Container>
  );
};

export default App;
