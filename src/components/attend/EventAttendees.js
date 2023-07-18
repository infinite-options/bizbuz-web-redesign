import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NoImage from "../../assets/NoImage.png";
import Highcharts from "../../util/networking";
import HighchartsReact from "highcharts-react-official";
import RegisteredCardComponent from "../registered-card-component";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventAttendees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
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
          linkLength: 50,
          initialPositions: "circle",
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
    return imagesArr.length > 0 ? imagesArr[0] : NoImage;
  };

  const refreshGraph = async () => {
    const response = await axios.get(
      `${BASE_URL}/networkingGraph?eventId=200-000098&userId=100-000038`
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
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: "16px" }}
        color="primary"
        onClick={() => navigate("/")}
      >
        Leave Event
      </Button>
    </Box>
  );
};

export default EventAttendees;