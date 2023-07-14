
import React from "react";
import {useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";
const EventQuestionnaire = () => {
    const location = useLocation();
    const {event} = location.state;
    const navigate = useNavigate();

    return ( 
        <Box display="flex" justifyContent="center" flexDirection="column">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Brand style={{ marginTop: "36px" }} />
                <Back onClick={() => navigate(-1)} />
            </Box>
            <Typography 
                variant="h1" 
                sx={{
                    mt: "80px",
                    color: "#FFF",
                    fontFamily: "Fira Sans Condensed",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
            >
                {"Event Questionnaire"}
            </Typography>
            <Box
                display="flex"
                width="347px"
                flexDirection="column"
                justifyContent="center"
                flexShrink={0}
                sx={{
                    typography: {
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "22.5px",
                    },
                    textIndent: "1em",
                    textAlign: "justify",
                    marginTop: "8px",
                }}
                >
                <Stack
                    direction="column"
                    justifyContent="center"
                    spacing={2}
                    sx={{ mt: 4 }}
                >
                    {JSON.parse(event.pre_event_questionnaire).map((question, index) => (
                        <Box key={question.id} sx={{ marginBottom: "16px"}}>
                            <Typography variant="body1">{`${index + 1}. ${question.question}`}</Typography>
                            <Grid item sx={{ pl: "0 !important"}}>
                                <FormControl sx={{ width: "129px"}} variant="outlined">
                                    <OutlinedInput
                                    // value={location}
                                    // onChange={(e) => {
                                    //     setIsLoading(true);
                                    //     setLocation(e.target.value);
                                    // }}
                                    sx={{
                                        width: "350px",
                                        height: "56px",
                                        marginLeft: '18dp',
                                        fontSize: 12,
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        marginTop: '16px',
                                    }}
                                    />
                                </FormControl>
                            </Grid>
                        </Box>
                    ))}
                </Stack>
            </Box>
            <Button
              variant="contained"
              sx={{
                display: 'flex',
                width: '352.5px',
                height: '56px',
                padding: '8px 14px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
                borderRadius: '8px',
                background: '#3C8F7D',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                mt: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#FFFFFF', 
                position: 'fixed', 
                bottom: '20px', 
                left: '0', 
                right: '0', 
              }}
              color="secondary"
              onClick={() => {
                navigate("/registrationConfirmation",  {state: { event: event},});
               }}
            >
              Finish Registration
            </Button>
        </Box>
     );
}
 
export default EventQuestionnaire;