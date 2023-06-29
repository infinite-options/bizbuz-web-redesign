import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as Type } from "../../assets/type.svg";
import { ReactComponent as Location } from "../../assets/location.svg";
import { ReactComponent as Organizer } from "../../assets/organizer.svg";
import { ReactComponent as Calendar } from "../../assets/date.svg";
export default function FindBy() {
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Brand style={{ marginTop: "36px" }} />
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 10 }}
        sx={{ mt: "10% !important" }}
      >
        <Grid item xs={12} align="left">
          <Typography variant="h2">Filter results</Typography> <Filter />
        </Grid>
        <Grid item xs={2} align="center">
          <Calendar />
        </Grid>
        <Grid item xs={2} align="center">
          <Organizer />
        </Grid>
        <Grid item xs={2} align="center">
          <Location />
        </Grid>
        <Grid item xs={2} align="center">
          <Type />
        </Grid>
        <Grid item xs={2} align="center"></Grid>
        <Grid item xs={2} align="center"></Grid>

        <Grid item xs={12} align="center">
          <Button>See Event List</Button>
        </Grid>
        <Grid item xs={12} align="center">
          {" "}
          <Button>See Current RSVPs</Button>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 10 }}
        sx={{ mt: "18% !important" }}
      >
        {/* <Grid item xs={6} align="center">
          <Register />
        </Grid>
        <Grid item xs={6} align="center">
          <Search onClick={() => navigate("/findEvent")} />
        </Grid>
        <Grid item xs={6} align="center">
          <Attend />
        </Grid>
        <Grid item xs={6} align="center">
          <Create onClick={() => navigate("/createEvent")} />
        </Grid> */}
      </Grid>
    </Box>
  );
}
