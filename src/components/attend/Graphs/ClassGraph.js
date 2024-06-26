import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAbly from "../../../util/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../../assets/back.svg";
import Stack from "@mui/material/Stack";
import { transformGraph } from "../../../util/helper";
import Highcharts from "../../../util/networking";
import HighchartsReact from "highcharts-react-official";
import NoUserImage from "../../../assets/NoUserImage.png";
import EventCard from "../../common/EventCard";
import Loading from '../../common/Loading';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;
function ClassGraph({registergraph}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj, userObj } = location.state;
    const { onAttendeeEnterExit, unSubscribe, isAttendeePresent } = useAbly(
      eventObj.event_uid
    );
    const [isLoading, setLoading] = useState(false);
    // useEffect(()=>{
    //   console.log("data:",eventObj,userObj);
    // },[])
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
    
    const refreshGraph = async ({ data }) => {
      try{
        if(registergraph){
          const response = await axios.get(
            `${BASE_URL}/networkingGraph?eventId=${eventObj.event_uid}&registrant="True"`
          );
          data=response["data"];
        }
        else{
          const response = await axios.get(
            `${BASE_URL}/networkingGraph?eventId=${eventObj.event_uid}`
          );
          data=response["data"];
        }
        const [nodesArr, linksArr] = transformGraph(
          data["user_groups"],
          data["users"],
          true,
          handleUserImage,
          userObj.user_uid
        );
        // console.log("linksarr",linksArr)
        setOptions({
          series: [
            {
              data: linksArr,
              nodes: nodesArr,
            },
          ],
        });
      }
      catch(error){
        console.log("refresh graph",error);
      }
    };
  
    const handleNodeClick = (e) => {
      // console.log("this is e",e,"userOBJ",e.id)
      navigate("/attendeeDetails", {
        state: { event: eventObj, user: userObj, id: e.id },
      });
    };
    useEffect(() => {
      //need
      // isAttendeePresent(userObj.user_uid, (m) =>  (m));
      // registergraphdata();
      try{
        refreshGraph("");
      }
      catch(error){
        console.log("refresh graph",error);
      }
      isAttendeePresent(userObj.user_uid, (m) => refreshGraph(m));
      onAttendeeEnterExit((m) => {
        try{
          refreshGraph(m);
        }
        catch(error){
          console.log("refresh graph",error);
        }
      });
      return () => unSubscribe();
    }, []);
    return (
        <div>
            
            <Loading isLoading={isLoading} />
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default ClassGraph