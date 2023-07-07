import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Map from "./Map";
import Searchbox from "./SearchBox";
import { ReactComponent as BackIcon } from "../../assets/arrow-circle-left.svg";
import { ReactComponent as NextIcon } from "../../assets/arrow-square-right.svg";

const EventLocation = () => {
  const navigate = useNavigate();
  const [lat, setLat] = useState(37.23672);
  const [long, setLong] = useState(-121.88737);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [locationName, setLocationName] = useState("");

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
        var country = stateZipCountry[1];
        var stateZip_components = stateZip.split(/(\s+)/);
        if (stateZip_components && stateZip_components.length > 0) {
          zip = stateZip_components.pop();
        }
      }
    }
    setZipcode(zip);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" sx={{ mt: "114px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
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
            onClick={() => navigate("/eventTitle")}
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

export default EventLocation;
