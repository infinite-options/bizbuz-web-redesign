import React from 'react'
import GraphOfRegistered from './Graphs/GraphOfRegistered'
import Stack from "@mui/material/Stack";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
function RegisteredGraph() {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventObj, userObj } = location.state;
    return (
        <div>
            <Stack direction="row" sx={{ mt: "36px" }}>
                <Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
                <BackIcon
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    onClick={() => navigate(-1, { state: { eventObj, userObj } })}
                />
            </Stack>
            <GraphOfRegistered eventObj={eventObj} userObj={userObj} registergraph={true} />
        </div>
    )
}

export default RegisteredGraph