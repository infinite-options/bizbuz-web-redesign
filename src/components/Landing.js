import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../assets/brand.svg";
import { ReactComponent as Footer } from "../assets/footer.svg";
import { ReactComponent as RSVPs } from "../assets/rsvps.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Attend } from "../assets/attend.svg";
import { ReactComponent as Create } from "../assets/create.svg";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedOut, setLoggedOut] = useState(false);
  const handleLogout = () => {
    document.cookie =
      "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedOut(true);
    setTimeout(() => {
      setLoggedOut(false);
    }, 1000);
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Brand style={{ marginTop: "36px", marginBottom: "5rem" }} />
      <Grid container rowSpacing={{ xs: 1, sm: 10 }} columnSpacing={{ xs: 1 }}>
        <Grid item xs={6} align="center">
          <Search
            onClick={() => navigate("/findEvent")}
            style={{ cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={6} align="center">
          <RSVPs
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
                  ? navigate("/currentRsvp", {
                      state: {
                        email: document.cookie
                          .split("; ")
                          .find((row) => row.startsWith("user_email="))
                          .split("=")[1],
                        user: JSON.parse(
                          document.cookie
                            .split("; ")
                            .find((row) => row.startsWith("user_details="))
                            .split("=")[1]
                        ),
                      },
                    })
                  : navigate("/login", {
                      state: { path: "/currentRsvp" },
                    });
              } else {
                navigate("/login", {
                  state: { path: "/currentRsvp" },
                });
              }
            }}
            style={{ cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={6} align="center">
          <Attend
            onClick={() => navigate("/currentEvents")}
            style={{ cursor: "pointer" }}
          />
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
                        user: JSON.parse(
                          document.cookie
                            .split("; ")
                            .find((row) => row.startsWith("user_details="))
                            .split("=")[1]
                        ),
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
            style={{ cursor: "pointer" }}
          />
        </Grid>
      </Grid>
      {isLoggedOut && (
        <p
          style={{
            alignSelf: "center",
            color: "#FFF",
            fontFamily: "Fira Sans Condensed",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          You have logged out
        </p>
      )}
      <Footer
        style={{
          alignSelf: "center",
          position: "fixed",
          bottom: "0",
          zIndex: "auto",
        }}
        onClick={handleLogout}
      />
    </Box>
  );
};

export default Landing;
