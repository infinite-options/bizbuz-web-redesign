import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../../util/localStorage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Map from "./Map";
import Searchbox from "./SearchBox";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { ReactComponent as NextIcon } from "../../assets/continue.svg";

const EventLocation = () => {
  const navigate = useNavigate();
  const [lat, setLat] = useState(37.23672);
  const [long, setLong] = useState(-121.88737);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [locationName, setLocationName] = useState("");
  const [getEvent, setEvent] = useLocalStorage("event");

  const handleLatLongChange = (lat, long) => {
    setLat(lat);
    setLong(long);
  };
  const handleAddressChange = (address, name) => {
    setLocationName(name);
    setAddress(address);
    console.log(address);
    let zip = " ";
    var addressComponents = address.split(",");
    if (addressComponents && addressComponents.length > 1) {
      var stateZipCountry = addressComponents.slice(-2);
      if (stateZipCountry && stateZipCountry.length == 2) {
        var stateZip = stateZipCountry[0];
        var stateZip_components = stateZip.split(/(\s+)/);
        if (stateZip_components && stateZip_components.length > 0) {
          zip = stateZip_components.pop();
        }
      }
    }
    setZipcode(zip);
  };

  const handleContinue = () => {
    const event = getEvent();
    event.eventLocationName = locationName;
    event.eventLocation = address;
    event.eventZip = zipcode;
    event.lat = lat;
    event.long = long;
    setEvent(event);
    navigate("/eventTitle");
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
        <Typography variant="h2">{"Event Location"}</Typography>
        <Grid
          container
          direction="column"
          margin={1}
          style={{ height: "80rem" }}
          alignItems="center"
          justify="center"
        >
          <Searchbox
            latLongHandler={handleLatLongChange}
            addressHandler={handleAddressChange}
          />
          <Map latitude={lat} longitude={long} />
        </Grid>
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

export default EventLocation;
