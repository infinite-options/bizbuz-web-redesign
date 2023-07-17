import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { ReactComponent as Down } from "../../assets/down.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import EventDefaultImage from "../../assets/event-default.svg";

const EventListsWithFilter = () => {
  const location = useLocation();
  const { events } = location.state;
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Brand style={{ marginTop: "36px" }} />
        <Back onClick={() => navigate("/findEvent")} />
      </Box>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100vh",
          flexShrink: 0,
        }}
      >
        {events.length > 0 ? (
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2, p: 2 }}
            style={{
              backgroundColor: "white",
              marginTop: "1rem",
              minWidth: "100%",
              borderRadius: "25px 25px 0px 0px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
                height: "0px",
              }}
              onClick={() => navigate("/findEvent")}
            >
              <Down />
            </Box>

            {events.map((event) => {
              return (
                <Card sx={{ minWidth: 275 }}>
                  <Box bgcolor={"#3a8d75"}>
                    <CardContent>
                      <Typography
                        variant="h2"
                        color="secondary"
                        mb={1}
                        align="end"
                      >
                        {dayjs(event.event_start_date).format("MMMM DD")}
                      </Typography>
                      <Typography variant="h2" color="secondary" mb={1}>
                        {event.event_title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Box>
                          {JSON.parse(event.event_photo).length === 0 ? (
                            <CardMedia
                              component="img"
                              height="174px"
                              image={EventDefaultImage}
                              alt="default"
                              sx={{ borderRadius: 3 }}
                            />
                          ) : (
                            <CardMedia
                              component="img"
                              height="174px"
                              image={`${JSON.parse(
                                event.event_photo
                              )}?${Date.now()}`}
                              alt="event"
                              sx={{ borderRadius: 3 }}
                            />
                          )}
                        </Box>
                        <Stack spacing={1}>
                          <Typography
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                            color="secondary"
                            variant="body2"
                          >
                            <ClockIcon mr={1} />
                            <span>
                              {event.event_start_time} - {event.event_end_time}
                            </span>
                          </Typography>
                          <Typography
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                            color="secondary"
                            variant="body2"
                          >
                            <MarkerIcon mr={1} />
                            <span> {event.event_location}</span>
                          </Typography>
                          <Button
                            variant="contained"
                            color="buttonAlternative"
                            size="small"
                            sx={{ height: 40 }}
                            onClick={() => {
                              navigate("/eventInfo", {
                                state: { event: event },
                              });
                            }}
                          >
                            Register
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        ) : (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mt: 2, p: 2 }}
            style={{
              backgroundColor: "white",
              marginTop: "1rem",
              minWidth: "100%",
              borderRadius: "25px 25px 0px 0px",
              width: "389px",
              height: "732px",
            }}
          >
            <Box
              sx={{ mt: -82 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
                height: "0px",
              }}
              onClick={() => navigate("/findEvent")}
            >
              <Down />
            </Box>
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              style={{ color: "Black" }}
            >
              No Events Available For Now
            </Typography>
          </Stack>
        )}
      </Grid>
    </Box>
  );
};

export default EventListsWithFilter;
