import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;
