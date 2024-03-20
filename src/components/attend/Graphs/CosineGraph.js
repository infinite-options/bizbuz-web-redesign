import React from 'react'
import Loading from "../../common/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import pfp from "../../../images/pfp.jpg"
import Highcharts from "../../../util/networking";
import HighchartsReact from "highcharts-react-official";
import useAbly from "../../../util/ably";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
// const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;

export default function CosineGraph({registergraph}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj, userObj } = location.state;
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [eventUsers, setEventUsers] = useState();
    const [nodesarr,setNodesarr]=useState([]);
    const { onAttendeeEnterExit, subscribe, unSubscribe } = useAbly(
        eventObj.event_uid
    );
    const fetchAttendees = async () => {
        setLoading(true);
        let response;
        if(registergraph){
            response = await axios.get(
                `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}`
            );
        }
        else{
            response = await axios.get(
                `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}&attendFlag=1`
            );
        }
        const data = response["data"];
        // console.log("attendees get:",data["attendees"]);
        let updatedUsers = { ...eventUsers };
        let nodesImg = [];
        let users=data["attendees"];
        // console.log("length of attendees",users.length);
        for(let i=0;i<users.length;i++){
            let user_obj=users[i];
            // console.log("logging:",users[i]);
            const qa= await  axios.get(`${BASE_URL}/eventRegistrant?eventId=${eventObj.event_uid}&registrantId=${user_obj.user_uid}`)
            updatedUsers[user_obj.first_name]={
                user_uid: user_obj.user_uid,
                images: user_obj.images,
                qas:JSON.parse(qa.data.registrant.eu_qas),
                first_name:user_obj.first_name,
                last_name:user_obj.last_name
            }
            
            let img_url=user_obj.images.replace(/[\[\]"]/g,'')
            
            if (img_url == ''){
                img_url=pfp
            }
            // console.log("images",users[i],"right here",img_url);
            nodesImg.push({
                id:user_obj.first_name,
                // image:img_url,
                marker:{
                    symbol: `url(${img_url})`,
                    width: 50,
                    height: 50,
                }
            })
        }
        setEventUsers(updatedUsers);
        setAttendees(data["attendees"]);
        // console.log("added new attendee in handle");

        setNodesarr(nodesImg);
        setLoading(false);
    };
    const get_cosine_data = async ()=>{
        // console.log("response",eventObj.event_uid);   
        setLoading(true);  
        try{
            if(eventUsers!==undefined){
                let arg=JSON.stringify(eventUsers);
                // let temp="%7B%22marty1%22%3A%7B%22user_uid%22%3A%22100-000077%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000077%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22swimming%22%7D%5D%2C%22first_name%22%3A%22marty1%22%2C%22last_name%22%3A%22%22%7D%2C%22mart3%22%3A%7B%22user_uid%22%3A%22100-000080%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000080%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22surfing%22%7D%5D%2C%22first_name%22%3A%22mart3%22%2C%22last_name%22%3A%22%22%7D%2C%22mart2%22%3A%7B%22user_uid%22%3A%22100-000081%22%2C%22images%22%3A%22%5B%5C%22https%3A%2F%2Fs3-us-west-1.amazonaws.com%2Fio-find-me%2Fuser%2F100-000080%2Fimg_cover%5C%22%5D%22%2C%22qas%22%3A%5B%7B%22id%22%3A1%2C%22question%22%3A%22What%20Are%20you%20really%20good%20at%3F%22%2C%22answer%22%3A%22running%22%7D%5D%2C%22first_name%22%3A%22mart2%22%2C%22last_name%22%3A%22%22%7D%7D"
                let response = await axios.get(
                    `${BASE_URL}/algorithmgraph?EventUsers=${encodeURIComponent(JSON.stringify(eventUsers))}`
                )
                // console.log("response of alg",response.data);
                if(response!==undefined || response.data!==undefined){
                    response=response.data;
                    const jsonStr = response.replace(/'/g, '"')
                    response = JSON.parse(jsonStr);
                    let graph_data=[]
                    for (let key in response) {
                        for(let i=0;i<response[key].length;i++){
                            graph_data.push([response[key][i]["from"],response[key][i]["to"]]);
                        }
                    }
                    // for (const key of Object.keys(response)) {
                    //     console.log("this is the key", key);
                    // }
                    // setNodeData(graph_data);
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
        setLoading(false);
    }
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
    useEffect(()=>{
        fetchAttendees();
        onAttendeeEnterExit((m) => {
            fetchAttendees();
        });
    },[])
    useEffect(()=>{
        get_cosine_data();
    },[eventUsers]);
    // useEffect(()=>{
    //     console.log("obj",eventObj,userObj);
    // },[])
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
