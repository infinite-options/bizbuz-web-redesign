import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAbly from "../../util/ably";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import NoUserImage from "../../assets/NoUserImage.png";
import Highcharts from "../../util/networking";
import HighchartsReact from "highcharts-react-official";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NetworkingActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventObj = location.state
    ? location.state.eventObj
    : JSON.parse(localStorage.getItem("event"));
  const userObj = location.state
    ? location.state.userObj
    : JSON.parse(localStorage.getItem("user"));
  const { onAttendeeUpdate, subscribe, unSubscribe, detach } = useAbly(
    eventObj.event_uid
  );
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState({
    chart: {
      type: "networkgraph",
      height: 400,
      backgroundColor: "transparent",
      margin: 25,
      reflow: false,
    },
    title: {
      text: null,
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          linkLength: 50,
          initialPositions: "circle",
        },
        point: {
          events: {
            click(e) {
              handleNodeClick(e.point);
            },
          },
        },
      },
    },
    series: [
      {
        link: {
          width: 2,
          color: "white",
        },
        dataLabels: {
          enabled: false,
          linkFormat: "",
          allowOverlap: true,
        },
        id: "networking",
        data: [],
        nodes: [],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  const handleNodeClick = (e) => {
    navigate("/attendeeDetails", {
      state: { event: eventObj, user: userObj, id: e.id },
    });
  };

  const handleUserImage = (images) => {
    const imagesArr = JSON.parse(images);
    return imagesArr.length > 0 ? imagesArr[0] : NoUserImage;
  };

  const refreshGraph = async () => {
    const response = await axios.get(
      `${BASE_URL}/networkingGraph?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    const data = response["data"];
    let nodesArr = [];
    data["users"].forEach((u) => {
      nodesArr.push({
        id: u.user_uid,
        marker: {
          symbol: `url(${handleUserImage(u.images)})`,
          width: 50,
          height: 50,
        },
        name: `${u.first_name} is ${u.role}`,
        className: {
          clipPath: "circle()",
        },
      });
    });
    setOptions({
      series: [
        {
          data: data["links"],
          nodes: nodesArr,
        },
      ],
    });
  };

  const handleExitEvent = () => {
    axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=0`
    );
  };

  const broadcastAndExitSubscribe = () => {
    onAttendeeUpdate((m) => {
      refreshGraph();
    });
    subscribe((e) => {
      if (e.data === "Event ended") {
        handleExitEvent();
        detach();
        navigate("/");
      } else {
        setMessage(e.data);
        setShowAlert(true);
      }
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  useEffect(() => {
    refreshGraph();
    broadcastAndExitSubscribe();
    return () => unSubscribe();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Brand
        style={{ marginTop: "36px" }}
        onClick={() => {
          navigate("/");
        }}
      />
      <Snackbar
        open={showAlert}
        autoHideDuration={15000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleAlertClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        {/* <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                {eventObj.event_title}
              </Typography>
              <Grid container rowSpacing={{ xs: 1, sm: 10 }}>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <CalendarIcon />
                  &nbsp;
                  <Typography variant="body1">
                    {new Date().toLocaleString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={6} />
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <ClockIcon />
                  &nbsp;
                  <Typography variant="body1">
                    {`${eventObj.event_start_time} - ${eventObj.event_end_time}`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <MarkerIcon />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 12, maxWidth: "80%" }}
                  >
                    {eventObj.event_location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card> */}
        <RegisteredCardComponent event={eventObj} />
      </Stack>

      <Stack spacing={2} direction="column">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: "16px" }}
        color="primary"
        onClick={() => navigate("/")}
      >
        {"Leave Event"}
      </Button>
    </Box>
  );
};

export default NetworkingActivity;
