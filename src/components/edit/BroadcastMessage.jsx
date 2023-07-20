import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const BroadcastMessage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event, user } = location.state;
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [failed, setFailed] = useState([]);
    const [showDialogSendingEmail, setShowDialogSendingEmail] = useState(false);
    const [showDialogSendingText, setShowDialogSendingText] = useState(false);
    const [showSendingFailed, setShowSendingFailed] = useState(false);
    const [showSendingSuccess, setShowSendingSuccess] = useState(false);
    const [attendeesEmails, setAttendeesEmails] = useState([]);
    const [attendeesPhoneNumbers, setAttendeesPhoneNumbers] = useState([]);
    console.log(event);

    const fetchAttendees = async () => {
        const response = await axios.get(
          `${BASE_URL}/eventAttendees?eventId=${event.event_uid}`
        );
        const data = response["data"];
        let attendees = data.attendees;
        let emails = [];
        let phone_numbers = [];
        for (let i = 0; i < attendees.length; i++) {
          emails.push(attendees[i].email);
          phone_numbers.push(attendees[i].phone_number);
        }
        setAttendeesEmails(emails);
        setAttendeesPhoneNumbers(phone_numbers);
      };
    
      useEffect(() => {
        if (event && event.event_uid) {
          fetchAttendees();
        } else {
          setAttendeesEmails([]);
          setAttendeesPhoneNumbers([]);
        }
      }, []);

    const sendText = () => {
        let obj = {
          recipient: attendeesPhoneNumbers,
          subject: subject,
          message: message,
        };
        let newstate = Object.assign(obj, event);
        console.log(newstate);
        setShowDialogSendingText(true);
        axios.post(BASE_URL + "/SendTextAttendee", obj).then((response) => {
          setShowDialogSendingText(false);
          let failedMessages = [];
          for (let i = 0; i < response.data.message.length; i++) {
            if (response.data["message"][i].includes("failed")) {
              failedMessages.push(response.data["message"][i]);
            }
          }
    
          setFailed(failedMessages);
          if (failedMessages.length > 0) {
            setShowSendingFailed(true);
          } else {
            setShowSendingSuccess(true);
          }
        });
      }

      const sendMessages = () => {
        let obj = {
          recipient: attendeesEmails,
          subject: subject,
          message: message,
        };
        let newstate = Object.assign(obj, event);
        console.log(newstate);
        setShowDialogSendingEmail(true);
        axios.post(BASE_URL + "/SendEmailAttendee", obj).then((response) => {
          setShowDialogSendingEmail(false);
          let failedMessages = [];
          for (let i = 0; i < response.data.message.length; i++) {
            if (response.data["message"][i].includes("failed")) {
              failedMessages.push(response.data["message"][i]);
            }
          }
    
          setFailed(failedMessages);
          if (failedMessages.length > 0) {
            setShowSendingFailed(true);
          } else {
            setShowSendingSuccess(true);
          }
        });
      };

    return ( 
        <Box display="flex" flexDirection="column">
            <Stack direction="row" sx={{ mt: "36px" }}>
                <Brand />
                <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
            </Stack>
            <Typography variant="h1" sx={{ mt: "48px" }}>
                {"Broadcast Message"}
            </Typography>
            <Stack direction="column" spacing={2} sx={{ mt: "55px" }}>
                <Typography variant="h2">{"Title"}</Typography>
                <TextField
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                variant="outlined"
                placeholder="Limit to x characters"
                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                />
                <Typography variant="h2">{"Message"}</Typography>
                <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
                multiline
                rows={8}
                placeholder="Limit to x characters"
                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                />
            </Stack>
            <Box sx={{ display: "flex", gap: "52px", mt: "70px"}}>
                <Button
                    variant="contained"
                    onClick={sendMessages}
                    sx={{
                      display: "flex",
                      width: "164px",
                      height: "40px",
                      padding: "10px 16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "12px",
                      flexShrink: 0,
                      borderRadius: "8px",
                      background: "#AF2304",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    }}
                    >
                    Send Email
                </Button>
                <Button
                    variant="contained"
                    onClick={sendText}
                    sx={{
                      display: "flex",
                      width: "164px",
                      height: "40px",
                      padding: "10px 16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "12px",
                      flexShrink: 0,
                      borderRadius: "8px",
                      background: "#3B8C75",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    }}
                    >
                    Send Text
                </Button>
            </Box>
        </Box>
     );
}
 
export default BroadcastMessage;