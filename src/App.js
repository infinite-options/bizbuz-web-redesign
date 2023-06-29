import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Landing from "./components/Landing";
import CreateEvent from "./components/create/CreateEvent";
import FindBy from "./components/find/FindBy";
const App = () => {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/findEvent" element={<FindBy />} />
      </Routes>
    </Container>
  );
};

export default App;
