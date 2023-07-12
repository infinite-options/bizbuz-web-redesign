import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ReactComponent as BackIcon } from "../../assets/arrow-circle-left.svg";
import { ReactComponent as NextIcon } from "../../assets/arrow-square-right.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import NoImage from "../../assets/NoImage.png";

const preDefQestions = [
  "What is your current role?",
  "What are you really good at?",
  "What are a few things you need?",
];

const event = {
  event_uid: 1,
  event_title: "Career Fair",
  event_start_date: "07/07/2023",
  event_start_time: "09:00 AM",
  event_end_time: "11:00 AM",
  event_location: "San Jose, CA",
  event_photo: "[]",
};

const EventReview = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h1" sx={{ mt: "114px" }}>
        {"Create new Event"}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
        <Typography variant="h2">{"Event Review"}</Typography>
        <Card key={event.event_uid}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                {event.event_title}
              </Typography>
              <Grid container rowSpacing={1}>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row">
                      <CalendarIcon />
                      &nbsp;
                      <Typography variant="body1">
                        {new Date(event.event_start_date).toLocaleString(
                          "default",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <ClockIcon />
                      &nbsp;
                      <Typography variant="body1">
                        {`${event.event_start_time} - ${event.event_end_time}`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <MarkerIcon />
                  &nbsp;
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 12, maxWidth: "80%" }}
                  >
                    {event.event_location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {JSON.parse(event.event_photo).length === 0 ? (
              <CardMedia
                component="img"
                height="174px"
                image={NoImage}
                alt="default"
              />
            ) : (
              <CardMedia
                component="img"
                height="174px"
                image={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                alt="event"
              />
            )}
          </CardActionArea>
        </Card>
        <Stack
          spacing={2}
          direction="row"
          style={{
            width: "92vw",
            position: "fixed",
            bottom: "15px",
            maxWidth: "550px",
          }}
        >
          <Button variant="contained" onClick={() => navigate(-1)} fullWidth>
            <BackIcon />
            {"Back"}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/eventReview")}
            fullWidth
          >
            <NextIcon />
            {"Next"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventReview;
