import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CreateEvent = () => {
  const getEventsByUser = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = axios.get(
      BASE_URL +
        `/GetEvents?event_organizer_uid=100-000038&timeZone=${user_timezone}`
    );
    console.log("GetEvents result: ", response.data.result);
  };

  useEffect(() => {
    getEventsByUser();
  }, []);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Brand style={{ marginTop: "36px" }} />
    </Box>
  );
};

export default CreateEvent;
