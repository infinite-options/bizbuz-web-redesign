import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAbly from "../../util/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Stack from "@mui/material/Stack";
import Highcharts from "../../util/networking";
import HighchartsReact from "highcharts-react-official";
import NoUserImage from "../../assets/NoUserImage.png";
import RegisteredCardComponent from "../registered-card-component";
import NewCardComponent from "../new-card-component";

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
          maxIterations: 10,
          initialPositions: "circle",
          initialPositionRadius: 150,
          attractiveForce: () => 0,
          repulsiveForce: () => 100,
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

  const handleNodeClick = (e) => {
    navigate("/attendeeDetails", {
      state: { event: eventObj, user: userObj, id: e.id },
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
      <Stack direction="row" sx={{ mt: "36px" }}>
        <Brand />
        <BackIcon
          style={{ marginLeft: "auto" }}
          onClick={() => navigate(-1, { state: { eventObj, userObj } })}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 6 }}
      >
        <NewCardComponent
          event={eventObj}
          isRegisteredEventCard={true}
          totalRegistrants={eventObj.registrants}
        />
      </Stack>

      <Stack
        spacing={2}
        direction="column"
        sx={{
          circular: {
            clipPath: "circle()",
          },
        }}
      >
        <Typography align="center" variant="h5" gutterBottom>
          {eventObj.name}
        </Typography>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Stack>
    </Box>
  );
};

export default OverallNetwork;
