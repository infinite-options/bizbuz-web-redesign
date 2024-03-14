import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Highcharts from "../../util/networking";
import HighchartsReact from "highcharts-react-official";
import useAbly from "../../util/ably";
import axios from "axios";
import Loading from "../common/Loading";
import Stack from "@mui/material/Stack";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import OverallNetwork from './OverallNetwork';
import CosineGraph from './Graphs/CosineGraph'
import pfp from "../../images/pfp.jpg"
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;
function AttendeeGraph() {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj, userObj, isBusiness } = location.state;
    useEffect(()=>{
        console.log("isbusiness",isBusiness);
    },[]);
    return (
        <>
            {isBusiness ?  
                <OverallNetwork eventObj={eventObj} userObj={userObj}/>
                : 
                <div>
                    <Stack direction="row" sx={{ mt: "36px" }}>
                        <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
                        <BackIcon
                            style={{ marginLeft: "auto", cursor: "pointer" }}
                            onClick={() => navigate(-1, { state: { eventObj, userObj } })}
                        />
                    </Stack>
                    <CosineGraph eventObj={eventObj} userObj={userObj} registergraph={false} />
                    
                </div>
            }
        </>
        
    )
}

export default AttendeeGraph