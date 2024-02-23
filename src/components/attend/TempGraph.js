import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Highcharts from "../../util/networking";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;
function TempGraph() {
    const location = useLocation();
    const { eventObj, userObj } = location.state;
    const [eventUsers, setEventUsers] = useState();
    const [nodeData,setNodeData]=useState();
    const [nodesarr,setNodesarr]=useState([]);
    const getAllEventUsers = async ()=>{
        try{
            const response = await axios.get(
                `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}`
            );
            if(response!==undefined &&response.data!==undefined && response.data.attendees!==undefined){
                // setEventUsers(response.data.data.attendees);
                let updatedUsers = { ...eventUsers };
                let nodesImg = [...nodesarr];
                for( let i=0; i<response.data.attendees.length;i++){
                    const attendee = response.data.attendees[i];
                    const qa= await  axios.get(`${BASE_URL}/eventRegistrant?eventId=${eventObj.event_uid}&registrantId=${attendee.user_uid}`)
                    console.log("qa:",JSON.parse(qa.data.registrant.eu_qas));
                    updatedUsers[attendee.first_name] = {
                        user_uid: attendee.user_uid,
                        images: attendee.images,
                        qas:JSON.parse(qa.data.registrant.eu_qas),
                        first_name:attendee.first_name,
                        last_name:attendee.last_name
                    };
                    let img_url=attendee.images.replace(/[\[\]"]/g,'')
                    nodesImg.push({
                        id:attendee.first_name,
                        image:img_url,
                        marker:{
                            radius:20
                        }
                    })
                    console.log("image response",attendee.images.replace(/[\[\]]/g,''));
                    // attendee_map[response.data.attendees[i].first_name]=(response.data.attendees[i].user_uid,response.data.attendees[i].images);
                }
                setEventUsers(updatedUsers);
                setNodesarr(nodesImg);
                console.log("response: ",updatedUsers,nodesImg);
    
            }
        }catch(error){
            console.log("error in getting",error);
        }
        
    }
    const get_cosine_data = async ()=>{
        // console.log("response",eventObj.event_uid);     
        try{
            if(eventUsers!==undefined){
                console.log("before call",eventUsers);
                let arg=JSON.stringify(eventUsers);
                console.log("before call",encodeURIComponent(JSON.stringify(eventUsers)));
                // let temp="%7B%22marty1%22%3A%7B%22user_uid%22%3A%22100-000077%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000077%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22swimming%22%7D%5D%2C%22first_name%22%3A%22marty1%22%2C%22last_name%22%3A%22%22%7D%2C%22mart3%22%3A%7B%22user_uid%22%3A%22100-000080%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000080%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22surfing%22%7D%5D%2C%22first_name%22%3A%22mart3%22%2C%22last_name%22%3A%22%22%7D%2C%22mart2%22%3A%7B%22user_uid%22%3A%22100-000081%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000080%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22running%22%7D%5D%2C%22first_name%22%3A%22mart2%22%2C%22last_name%22%3A%22%22%7D%7D"
                let response = await axios.get(
                    `${LOCAL_URL}/algorithmgraph?EventUsers=${encodeURIComponent(JSON.stringify(eventUsers))}`
                )
                console.log("response of alg",response.data);
                if(response!==undefined || response.data!==undefined){
                    response=response.data;
                    // console.log("inside",response.replace(/'/g, '"'));
                    
                    response = JSON.parse(response.replace(/'/g, '"'));
                    let graph_data=[]
                    for (let key in response) {
                        for(let i=0;i<response[key].length;i++){
                            graph_data.push([key,response[key][i][0]]);
                        }
                    }
                    setNodeData(graph_data);
                    
                    setOptions({
                        series: [{
                            data:graph_data,
                            nodes:nodesarr,
                        }]
                    })
                }      
            }
        }
        catch(error){
            console.log("error in getting algorithm",error)
        }
    }
    useEffect(()=>{
        console.log("info:",eventObj,userObj,userObj.user_uid);
        getAllEventUsers();
        
    },[])    
    useEffect(()=>{
        console.log("nodes arr:",nodesarr[0]);
        
    },[nodesarr])
    useEffect(()=>{
        get_cosine_data();
    },[eventUsers])
    const [options, setOptions] = useState({
        chart: {
            type: "networkgraph",
            height: 400,
            backgroundColor: "transparent",
            margin: 25,
            reflow: false,
        },
        title: {
            text: null
        },
        plotOptions: {
            networkgraph: {
                // turboThreshold: 0,
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
                    // click(e) {
                    //   handleNodeClick(e.point);
                    // },
                  },
                },
            },
        },
        series: [{
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
            data: []
        }],
        credits: {
            enabled: false,
        },
    });

    return (
        // <></>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

export default TempGraph