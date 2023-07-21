import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import NoImage from "../../assets/NoImage.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CreateBizCard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { event, user} = location.state;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phrase, setPhrase] = useState("");
    const [agreement, setAgreement] = useState(false);


    const handleChange = (e) => {
        setAgreement(e.target.checked);
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
            <FormControlLabel
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
                  textAlign: "center",
                  color: "#FFFFFF",
                },
                m: 2,
              }}
              required
              control={
              <Checkbox checked={agreement} onChange={handleChange}  />}
              label="I agree to let this information be shared with other participants"
            />
            <Box sx={{ ml: "18px", mt: "32px", display: "flex", alignItems: "center" }}>
                <Avatar
                    src={NoImage}
                    sx={{
                        width: "67px",
                        height: "67px",
                        bgcolor: "#ff5722",
                        alignSelf: "center",
                    }}
                />
                <Button 
                    variant="contained" 
                    sx={{ 
                        ml: "135px",
                        backgroundColor: eventTypeColor,
                    }}>
                    Upload Image
                </Button>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="30vh" 
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                    width: "352.5px",
                    height: "56px",
                    mt: "56px",
                    }}
                >
                    {"Save bizCard"}
                </Button>
            </Box>
        </Box>
     );
}
 
export default CreateBizCard;