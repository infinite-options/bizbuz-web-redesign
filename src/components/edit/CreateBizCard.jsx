import * as React from "react";
import { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadPhotos from "./UploadPhotos";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Select, MenuItem } from "@mui/material";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CreateBizCard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { event, userDetails, user_uid, user, edit} = location.state;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [email, setEmail] = useState("");
    const [phrase, setPhrase] = useState("");
    const [agreement, setAgreement] = useState(false);
    const imageState = useState([]);

    const loadUserDetails = () => {
        setFirstName(userDetails.first_name);
        setLastName(userDetails.last_name);
        setPhoneNumber(userDetails.phone_number);
        setCompany(userDetails.company);
        setTitle(userDetails.title);
        setPhrase(userDetails.catch_phrase);
        setCurrentRole(userDetails.role);
        setEmail(userDetails.email);
        loadImages();
      };
    const loadImages = async () => {
    const files = [];
    const images = JSON.parse(userDetails.images);
    if (images !== null && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
        files.push({
            index: i,
            image: images[i],
            file: null,
            coverPhoto: i === 0,
        });
        }
        imageState[1](files);
    }
    };
    useEffect(() => {
    if (userDetails && edit) {
        loadUserDetails();
    }
    }, [userDetails]);
    const handleChange = (e) => {
        setAgreement(e.target.checked);
    };

    const UpdateProfile = async () => {
        if(edit){
            const body = {
                profile_uid: userDetails.profile_uid,
                profile_user_id: user_uid,
                title: title,
                company: company,
                catch_phrase: phrase,
                role: currentRole,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
              };
              const files = imageState[0];
              console.log(files);
              let i = 0;
              for (const file of imageState[0]) {
                let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
                if (file.file !== null) {
                  console.log("if file not null");
                  body[key] = file.file;
                } else {
                  console.log("if else");
                  body[key] = file.image;
                }
              }
        
              let headers = {
                "content-type": "application/json",
              };
              let requestBody = JSON.stringify(body);
              if (files !== null) {
                headers = {};
                requestBody = new FormData();
                for (const key of Object.keys(body)) {
                  requestBody.append(key, body[key]);
                }
              }
              console.log(requestBody);
        
              const response = await fetch(BASE_URL + "/UserProfile", {
                method: "PUT",
                headers: headers,
                body: requestBody,
              });
        
              const data = await response.json();
        }else{
            const body = {
                profile_user_id: user_uid,
                title: title,
                company: company,
                catch_phrase: phrase,
                role: currentRole,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                };
                const files = imageState[0];
                let i = 0;
                console.log(files);
                for (const file of imageState[0]) {
                let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
                if (file.file !== null) {
                    body[key] = file.file;
                } else {
                    body[key] = file.image;
                }
                }
                let headers = {
                "content-type": "application/json",
                };
                let requestBody = JSON.stringify(body);
                if (files !== null) {
                headers = {};
                requestBody = new FormData();
                for (const key of Object.keys(body)) {
                    requestBody.append(key, body[key]);
                }
                }
        
                const response = await fetch(BASE_URL + "/UserProfile", {
                method: "POST",
                headers: headers,
                body: requestBody,
                });

                console.log(response);
        
                const data = await response.json();
        }
    };

    const getEventTypeColor = (eventType) => {
        const eventTypeColors = {
          "Party or Event": "#90CAED",
          "Business Marketing": "#3A8D75",
          "Social Mixer": "#F26457",
          "Other": "#AA0E00",
          // Add more event types and their corresponding colors here
        };
        // Return the color based on event_type
        return eventTypeColors[eventType] || "#3A8D75"; // Default color
      };
    
    const eventTypeColor = getEventTypeColor(event.event_type);

    const canBeSubmitted = () => {
        const isValid = agreement; // checkbox for terms
    
        if (isValid) {
          document.getElementById("submitButton").removeAttribute("disabled");
        } else {
          document.getElementById("submitButton").setAttribute("disabled", true);
        }
        console.log({ agreement });
      };
      useEffect(() => canBeSubmitted(), [agreement]);

    return ( 
        <Box display="flex" flexDirection="column">
            <Stack direction="row" sx={{ mt: "36px" }}>
                <Brand />
                <BackIcon style={{ marginLeft: "auto" }} onClick={() => navigate(-1)} />
            </Stack>
            <Typography
                variant="h1"
                sx={{
                mt: "60px",
                color: "#FFF",
                fontFamily: "Fira Sans Condensed",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                }}
            >
                {"Create Your Own bizCard"}
            </Typography>
            <Typography
                variant="h1"
                sx={{
                    mt: "32px",
                    ml: "8px",
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "1.5", // Adjust the line height to create spacing between lines
                    textAlign: "center", // Center the text
                    whiteSpace: "pre-wrap", // Allow line breaks where needed
                }}
            >
                {"Simply enter the information below and we’ll create a bizCard for you!"}
            </Typography>
            <Box sx={{ml:"18px", mt:"32px"}}>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="First Name"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        sx={{
                        width: "350px",
                        fontWeight: 500,
                        height: "58px",
                        marginLeft: "18dp",
                        fontSize: "16px",
                        fontFamily: "Inter",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        marginTop: "16px",
                        "& .MuiInputBase-input::placeholder": {
                            color: "black",
                          },
                        }}
                    />
                    </FormControl>
                </Grid>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="Last Name"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        sx={{
                            width: "350px",
                            fontWeight: 500,
                            height: "58px",
                            marginLeft: "18dp",
                            fontSize: "16px",
                            fontFamily: "Inter",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            marginTop: "16px",
                            "& .MuiInputBase-input::placeholder": {
                                color: "black",
                                },
                        }}
                    />
                    </FormControl>
                </Grid>
            </Box>
            <Box sx={{ml:"18px", mt:"32px"}}>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="Company"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={company}
                        onChange={(e) => {
                            setCompany(e.target.value);
                        }}
                        sx={{
                        width: "350px",
                        fontWeight: 500,
                        height: "58px",
                        marginLeft: "18dp",
                        fontSize: "16px",
                        fontFamily: "Inter",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        marginTop: "16px",
                        "& .MuiInputBase-input::placeholder": {
                            color: "black",
                          },
                        }}
                    />
                    </FormControl>
                </Grid>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="Title"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        sx={{
                            width: "350px",
                            fontWeight: 500,
                            height: "58px",
                            marginLeft: "18dp",
                            fontSize: "16px",
                            fontFamily: "Inter",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            marginTop: "16px",
                            "& .MuiInputBase-input::placeholder": {
                                color: "black",
                                },
                        }}
                    />
                    </FormControl>
                </Grid>
            </Box>
            <Box sx={{ml:"18px", mt:"32px"}}>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="Phone Number"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                        sx={{
                        width: "350px",
                        fontWeight: 500,
                        height: "58px",
                        marginLeft: "18dp",
                        fontSize: "16px",
                        fontFamily: "Inter",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        marginTop: "16px",
                        "& .MuiInputBase-input::placeholder": {
                            color: "black",
                          },
                        }}
                    />
                    </FormControl>
                </Grid>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="Email"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        sx={{
                            width: "350px",
                            fontWeight: 500,
                            height: "58px",
                            marginLeft: "18dp",
                            fontSize: "16px",
                            fontFamily: "Inter",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            marginTop: "16px",
                            "& .MuiInputBase-input::placeholder": {
                                color: "black",
                                },
                        }}
                    />
                    </FormControl>
                </Grid>
            </Box>
            <Box sx={{ml:"18px", mt:"48px"}}>
            <Grid item sx={{ pl: "0 !important" }}>
                <FormControl sx={{ width: "129px" }} variant="outlined">
                    <Select
                        value={currentRole}
                        onChange={(e) => {
                            setCurrentRole(e.target.value);
                        }}
                        sx={{
                            width: "350px",
                            fontWeight: 500,
                            height: "58px",
                            marginLeft: "18dp",
                            fontSize: "16px",
                            fontFamily: "Inter",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            marginTop: "16px",
                        }}
                        displayEmpty
                        >
                        <MenuItem disabled value="">
                            <em>Current Role</em>
                        </MenuItem>
                        <MenuItem value="Looking for Next Opportunity">Looking for Next Opportunity</MenuItem>
                        <MenuItem value="Founder">Founder</MenuItem>
                        <MenuItem value="VC">VC</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item sx={{ pl: "0 !important" }}>
                    <FormControl sx={{ width: "129px" }} variant="outlined">
                    <OutlinedInput
                        placeholder="Words to live by"
                        startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                        }
                        value={phrase}
                        onChange={(e) => {
                            setPhrase(e.target.value);
                        }}
                        sx={{
                        width: "350px",
                        fontWeight: 500,
                        height: "58px",
                        marginLeft: "18dp",
                        fontSize: "16px",
                        fontFamily: "Inter",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        marginTop: "16px",
                        "& .MuiInputBase-input::placeholder": {
                            color: "black",
                          },
                        }}
                    />
                    </FormControl>
                </Grid>
            </Box>
            <Grid
                container
                alignItems="center"
                sx={{
                    width: "312px",
                    height: "87px",
                    top: "938px",
                    left: "48px",
                    typography: {
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: "18px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: "#FFFFFF",
                    },
                    m: 2,
                }}
                >
                <Grid item>
                    <FormControlLabel
                    control={<Checkbox color="default" checked={agreement} onChange={handleChange}/>}
                    label="I agree to let this information be shared with other participants"
                    />
                </Grid>
            </Grid>

            <UploadPhotos state={imageState} />

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="30vh" 
            >
                <Button
                    id="submitButton"
                    variant="contained"
                    color="primary"
                    sx={{
                    width: "352.5px",
                    height: "56px",
                    mt: "56px",
                    backgroundColor: "rgba(59, 140, 117, 1)",
                    }}
                    onClick={UpdateProfile}
                >
                    {"Save bizCard"}
                </Button>
            </Box>
        </Box>
     );
}
 
export default CreateBizCard;