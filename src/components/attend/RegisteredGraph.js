import React, { useEffect } from 'react'
import CosineGraph from './Graphs/CosineGraph'
import Stack from "@mui/material/Stack";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import OverallNetwork from './OverallNetwork';
import ClassGraph from './Graphs/ClassGraph';
import CosineResults from './Graphs/CosineResults';
function RegisteredGraph() {
    console.log("in cosine register graph");
    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj, userObj, isBusiness } = location.state;

    return (
        <div>
            <Stack direction="row" sx={{ mt: "36px" }}>
                <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
                <BackIcon
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    onClick={() => navigate(-1, { state: { eventObj, userObj } })}
                />
            </Stack>
            <h1>Registrant Graph</h1>
            {isBusiness? <ClassGraph eventObj={eventObj} userObj={userObj} registergraph={true}/> :<CosineGraph eventObj={eventObj} userObj={userObj} registergraph={true} />}
            <CosineResults eventObj={eventObj} userObj={userObj}/>
        </div>
    )
}

export default RegisteredGraph