import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAbly from "../../util/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Highcharts from "../../util/networking";
import HighchartsReact from "highcharts-react-official";
import NoUserImage from "../../assets/NoUserImage.png";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const OverallNetwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const { onAttendeeUpdate, unSubscribe } = useAbly(eventObj.event_uid);
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
        turboThreshold: 0,
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          initialPositions: "circle",
          attractiveForce: () => 0,
          repulsiveForce: () => 100,
        },
        point: {
          events: {
            click(e) {
              // handleNodeClick(e.point);
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

  const handleUserImage = (images) => {
    const imagesArr = JSON.parse(images);
    return imagesArr.length > 0 ? imagesArr[0] : NoUserImage;
  };

  const refreshGraph = async () => {
    const response = await axios.get(
      `${BASE_URL}/overallGraph?eventId=${eventObj.event_uid}`
    );
    const data = response["data"];
    let nodesArr = [];
    data["users"].forEach((u) => {
      nodesArr.push({
        id: u.user_uid,
        mass: 1,
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

  useEffect(() => {
    refreshGraph();
    onAttendeeUpdate((m) => {
      refreshGraph();
    });
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
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        <RegisteredCardComponent event={eventObj} />
      </Stack>

      <Stack spacing={2} direction="column">
        <Typography align="center" variant="h5" gutterBottom>
          {eventObj.name}
        </Typography>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            width: "203px",
            height: "48px",
            padding: "8px 14px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            borderRadius: "8px",
            background: "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            mt: "16px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          color="secondary"
          onClick={() => navigate(-1, { state: { eventObj, userObj } })}
        >
          {"Back"}
        </Button>
      </Box>
    </Box>
  );
};

export default OverallNetwork;
