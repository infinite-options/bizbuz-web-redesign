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
      <Brand style={{ marginTop: "36px", marginBottom: "1rem" }} />
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 10 }}
        // sx={{ mt: "5% !important" }}
      >
        <Grid item xs={6} align="center">
          <Register />
        </Grid>
        <Grid item xs={6} align="center">
          <Search onClick={() => navigate("/findEvent")} />
        </Grid>
        <Grid item xs={6} align="center">
          <Attend />
        </Grid>
        <Grid item xs={6} align="center">
          <Create
            onClick={() => {
              if (
                document.cookie !== "" &&
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("loggedIn=")) !== undefined
              ) {
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("loggedIn="))
                  .split("=")[1] === "true"
                  ? navigate("/createEvent", {
                      state: {
                        email: document.cookie
                          .split("; ")
                          .find((row) => row.startsWith("user_email="))
                          .split("=")[1],
                        user: document.cookie
                          .split("; ")
                          .find((row) => row.startsWith("user_details="))
                          .split("=")[1],
                      },
                    })
                  : navigate("/login", {
                      state: { path: "/createEvent" },
                    });
              } else {
                navigate("/login", {
                  state: { path: "/createEvent" },
                });
              }
            }}
            // onClick={() => navigate("/createEvent")}
          />
        </Grid>
      </Grid>
      <Footer style={{ alignSelf: "center", position: "fixed", bottom: "0" }} />
    </Box>
  );
};

export default Landing;
