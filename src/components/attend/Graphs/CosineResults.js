import { TrySharp } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;
function CosineResults() {
    const location = useLocation();
    const { eventObj, userObj } = location.state;
    const [users,setUsers]=useState([])
    const [results,setResults]=useState("");
    const fetchUsers= async()=>{
        try{
            const response = await axios.get(
                `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}`
            );
            const data = response["data"];
            let users=data["attendees"];
            let updatedUsers = {};
            for(let i=0;i<users.length;i++){
                let user_obj=users[i];
                // const qa= await  axios.get(`${BASE_URL}/eventRegistrant?eventId=${eventObj.event_uid}&registrantId=${user_obj.user_uid}`)
                updatedUsers[user_obj.first_name]={
                    user_uid: user_obj.user_uid,
                    images: user_obj.images,
                    // qas:JSON.parse(qa.data.registrant.eu_qas),
                    first_name:user_obj.first_name,
                    last_name:user_obj.last_name,
                    event_id : eventObj.event_uid
                }
            }
            console.log("updated users",updatedUsers);
            setUsers(updatedUsers)
        }catch(error){
            console.log("error in fetching users",error);
        }
        
    }
    const fetchResults = async()=>{
        try{
            let payload ={}
            payload["event_id"] = eventObj.event_uid;

            payload["user_ids"] = [];

            for( let key in users){
                payload["user_ids"].push(users[key]["user_uid"])
            }
            
            console.log("users object", users)
            console.log("the value of payload",payload);
            if(users!==undefined && users.length !== 0 ){
                console.log("the endpoint is",users);
                // old api call
                // let response = await axios.get(
                //     //  old api call
                //     // `${BASE_URL}/showcosineresults?EventUsers=${encodeURIComponent(JSON.stringify(users))}`
                // )
                let response = await axios.post(
                    `${BASE_URL}/showcosineresults`,
                    payload,
                    {
                        headers: {
                          'Content-Type': 'application/json',
                          // Add any other necessary headers here
                        },
                      }
                )
                const fixedString = response["data"].replace(/'/g, '"');
                setResults(JSON.parse(fixedString));
                console.log("this is the result",response["data"]);
                
            }
        }catch(error){
            console.log("error in results of cosine",error)
        }
    }
    useEffect(()=>{
        fetchUsers();
    },[]);
    useEffect(()=>{
        fetchResults();
    },[users])
    useEffect(()=>{
        console.log("results",typeof(results),results);
    },[results]);
    return (
        <div>
            {(results!== undefined && results.length!=0)? 
                (results.map((obj,i)=>(
                    <div key={i} style={{width:"150%"}}>
                        <h1 style={{color:'white',display:'flex'}}>
                        {obj[0]} 
                        {obj[3].map((res, i) => {
                            return (
                                <div key={i} >
                                    <h3>({res["answer"]})</h3>
                                </div>
                            );
                        })}
                        &

                        {obj[1]} 
                        {obj[4].map((res, i) => {
                            return (
                                <div key={i} >
                                    <h3>({res["answer"]})</h3>
                                </div>
                            );
                        })} 
                        = {obj[2]}</h1>
                    </div>
                )))
                :
                "" 
            }
        </div>
    )
}

export default CosineResults