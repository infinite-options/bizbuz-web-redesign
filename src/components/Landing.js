import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../assets/brand.svg";
import { ReactComponent as Footer } from "../assets/footer.svg";
import { ReactComponent as Register } from "../assets/register.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Attend } from "../assets/attend.svg";
import { ReactComponent as Create } from "../assets/create.svg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Brand style={{ marginTop: "36px" }} />
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 10 }}
        sx={{ mt: "18% !important" }}
      >
        <Grid item xs={6} align="center">
          <Register />
        </Grid>
        <Grid item xs={6} align="center">
          <Search />
        </Grid>
        <Grid item xs={6} align="center">
          <Attend />
        </Grid>
        <Grid item xs={6} align="center">
          <Create onClick={() => navigate("/createEvent")} />
        </Grid>
      </Grid>
      <Footer style={{ alignSelf: "center", position: "fixed", bottom: "0" }} />
    </Box>
  );
};

export default Landing;
