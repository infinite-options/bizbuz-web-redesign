import { Card, CardContent, CardMedia } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Button from "@mui/material/Button";
import { ReactComponent as ClockBlackIcon } from "../../assets/clock-black.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import DefaultEventImage from "../../assets/event-default.png";
import Grid from "@mui/material/Grid";
import Loading from "../common/Loading";
import Map from "./Map";
import { ReactComponent as MarkerBlackIcon } from "../../assets/marker-black.svg";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import useLocalStorage from "../../util/localStorage";
import { useState } from "react";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;
const EventReview = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = location.state;
	const [getEvent, setEvent, removeEvent] = useLocalStorage("event");
	const event = getEvent();
	const [isLoading, setLoading] = useState(false);
	console.log("local storage functions getEvent, setEvent, removeEvent" ,getEvent, setEvent, removeEvent)
	console.log("event" , event)
	const handleAddEvent = async () => {
		setLoading(true);
		const user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		event.user_timezone = user_timezone;
		const headers = {
			// "content-type": "application/json",
		};
		const requestBody = new FormData();
		for (const key of Object.keys(event)) {
			if (typeof event[key] === "object" && key !== "img_cover") {
				requestBody.append(key, JSON.stringify(event[key]));
			} else if (key === "img_cover") {
				requestBody.append(key, getImage(event[key]));
			} else {
				requestBody.append(key, event[key]);
			}
		}
		const response = await fetch(BASE_URL + "/AddEvent", {
			method: "POST",
			headers: headers,
			body: requestBody,
		});
		removeEvent();
		const data = await response.json();
		setLoading(false);
		navigate("/eventCode", { state: { event: data.result[0] } });
	};

	const handleUpdateEvent = async () => {
		const user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		event.user_timezone = user_timezone;
		const headers = {
			// "content-type": "application/json",
		};
		const requestBody = new FormData();
		const fileName = "img_cover";
		for (const key of Object.keys(event)) {
			if (typeof event[key] === "object" && key !== "img_cover") {
				requestBody.append(key, JSON.stringify(event[key]));
			} else if (key === fileName && event[key]) {
				requestBody.append(key, getImage(event[key]));
			} else {
				requestBody.append(key, event[key]);
			}
		}
		if (!requestBody.has(fileName)){
			let val = JSON.parse(event["event_photo"]);
			// if( val.length == 0) requestBody.append(fileName, "")
			if( val.length == 0) console.log("do nothing")
			else requestBody.append(fileName, val[0])
			// requestBody.append(fileName, JSON.parse(event["event_photo"])[0]);

		}
		console.log("request body", requestBody)
		const response = await fetch(BASE_URL + "/UpdateEvent", {
			method: "PUT",
			headers: headers,
			body: requestBody,
		});
		removeEvent();
		const data = await response.json();
		navigate("/editEvent", { state: { event: data.result[0], user } });
	};

	const getImage = (img) => {
		if (!img) {
			return null;
		}
		var arr = img.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[arr.length - 1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], "cover.jpeg", { type: mime });
	};

	const getEventTypeColor = () => {
		const eventTypeColors = {
			"Business Marketing": {
				backgroundColor: "#3A8D75",
				textColor: "secondary",
				clockIcon: <ClockIcon />,
				markerIcon: <MarkerIcon />,
			},
			"Party or Event": {
				backgroundColor: "#90CAED",
				textColor: "#222222",
				clockIcon: <ClockBlackIcon />,
				markerIcon: <MarkerBlackIcon />,
			},
			"Social Mixer": {
				backgroundColor: "#F26457",
				textColor: "#222222",
				clockIcon: <ClockBlackIcon />,
				markerIcon: <MarkerBlackIcon />,
			},
			Other: {
				backgroundColor: "#AA0E00",
				textColor: "secondary",
				clockIcon: <ClockIcon />,
				markerIcon: <MarkerIcon />,
			},
		};
		return (
			eventTypeColors[event.event_type] || {
				backgroundColor: "#3a8d75",
				textColor: "secondary",
				clockIcon: <ClockBlackIcon />,
				markerIcon: <MarkerBlackIcon />,
			}
		);
	};
	const eventTypeColor = getEventTypeColor();

	const handleChange = (route) => {
		event.isReview = true;
		setEvent(event);
		navigate(route, { state: { user } });
	};

	const handleHomeClick = (e) => {
		e.stopPropagation();
		const shouldNavigate = window.confirm(
			"Sure? Your progress will be lost."
		);
		if (shouldNavigate) {
			navigate("/");
		}
	};

	return (
		<Box display="flex" flexDirection="column">
			<Stack direction="row" sx={{ mt: "36px" }}>
				<Brand
					style={{ cursor: "pointer" }}
					onClick={handleHomeClick}
				/>
				<BackIcon
					style={{ marginLeft: "auto", cursor: "pointer" }}
					onClick={() => navigate(-1)}
				/>
			</Stack>
			<Loading isLoading={isLoading} />
			<Typography variant="h1" sx={{ mt: "58px" }}>
				{"Create new Event"}
			</Typography>
			<Stack direction="column" spacing={2} sx={{ mt: "36px" }}>
				<Box
					display="flex"
					flexDirection="column"
					sx={{ minHeight: "62vh" }}
				>
					<Stack direction="column" spacing={2}>
						<Typography variant="h2">{"Event Review"}</Typography>
						<Card
							sx={{
								backgroundColor: eventTypeColor.backgroundColor,
								minWidth: 275,
							}}
						>
							<CardContent>
								<Typography
									variant="h2"
									color={eventTypeColor.textColor}
									mb={1}
									align="right"
									onClick={() =>
										handleChange("/eventDetails")
									}
									sx={{ cursor: "pointer" }}
								>
									{dayjs(event.event_start_date).format(
										"MMMM DD"
									)}
								</Typography>

								<Typography
									variant="h2"
									color={eventTypeColor.textColor}
									mb={1}
									onClick={() => handleChange("/eventTitle")}
									sx={{ cursor: "pointer" }}
								>
									{event.event_title}
								</Typography>
								<Stack direction="row" spacing={1}>
									<Box width="50%" mt={1}>
										{event.img_cover ? (
											<CardMedia
												component="img"
												height="120rem"
												image={event.img_cover}
												alt="default"
												sx={{
													borderRadius: 3,
													cursor: "pointer",
												}}
												onClick={() =>
													handleChange("/eventImage")
												}
											/>
										) : event.isEdit ? (
											<CardMedia
											// {DefaultEventImage}
												component="img"
												height="120rem"
												image={
													JSON.parse( event.event_photo )[0]
													// JSON.parse(
													// 	event.event_photo
													// ).length ==0? DefaultEventImage: JSON.parse(
													// 	event.event_photo
													// )[0]
												}
												alt="missing event image"
												sx={{
													borderRadius: 3,
													cursor: "pointer",
												}}
												onClick={() =>
													handleChange("/eventImage")
												}
											/>
										) : (
											<CardMedia
												component="img"
												height="120rem"
												image={DefaultEventImage}
												alt="event"
												sx={{
													borderRadius: 3,
													cursor: "pointer",
												}}
												onClick={() =>
													handleChange("/eventImage")
												}
											/>
										)}
									</Box>
									<Box
										width="50%"
										sx={{ height: "134px", py: 2 }}
									>
										<Grid container spacing={1}>
											<Grid item xs={2}>
												{eventTypeColor.clockIcon}
											</Grid>
											<Grid
												item
												xs={10}
												sx={{
													color: eventTypeColor.textColor,
													pt: "12px !important",
													cursor: "pointer",
												}}
												onClick={() =>
													handleChange(
														"/eventDetails"
													)
												}
											>
												{`${event.event_start_time} - ${event.event_end_time}`}
											</Grid>
											<Grid
												item
												xs={2}
												sx={{ pt: "17px !important" }}
											>
												{eventTypeColor.markerIcon}
											</Grid>
											<Grid
												item
												xs={10}
												sx={{
													color: eventTypeColor.textColor,
													pt: "12px !important",
													display: "-webkit-box",
													WebkitBoxOrient:
														"horizontal",
													WebkitBoxAlign: "center",
													cursor: "pointer",
												}}
												onClick={() =>
													handleChange(
														"/eventLocation"
													)
												}
											>
												<span
													style={{
														display: "-webkit-box",
														overflow: "hidden",
														WebkitLineClamp: 2,
														WebkitBoxOrient:
															"vertical",
													}}
												>
													{event.event_location}
												</span>
											</Grid>
										</Grid>
									</Box>
								</Stack>
							</CardContent>
						</Card>
						<Box
							sx={{
								color: "#000000",
								backgroundColor: "#FFFFFF",
								borderRadius: "8px",
								height: "100%",
								textAlign: "left",
								pl: 2,
								py: 2,
								fontFamily: "'Inter Variable', sans-serif",
								textTransform: "none",
								fontSize: 16,
								fontWeight: 600,
							}}
						>
							<Grid container rowSpacing={1}>
								<Grid item xs={6}>
									{"Event Type"}
								</Grid>
								<Grid
									item
									xs={6}
									onClick={() =>
										handleChange("/eventDetails")
									}
									sx={{
										fontWeight: "normal",
										cursor: "pointer",
									}}
								>
									{event.event_type}
								</Grid>
								<Grid item xs={6}>
									{"Accessibility"}
								</Grid>
								<Grid
									item
									xs={6}
									onClick={() => handleChange("/eventTitle")}
									sx={{
										fontWeight: "normal",
										cursor: "pointer",
									}}
								>
									{event.event_visibility}
								</Grid>
								<Grid item xs={6}>
									{"Event Capacity"}
								</Grid>
								<Grid
									item
									xs={6}
									onClick={() =>
										handleChange("/eventDetails")
									}
									sx={{
										fontWeight: "normal",
										cursor: "pointer",
									}}
								>
									{event.event_capacity}
								</Grid>
							</Grid>
						</Box>
						<Box
							sx={{
								color: "#000000",
								backgroundColor: "#FFFFFF",
								borderRadius: "8px",
								height: "100%",
								textAlign: "left",
								pl: 2,
								py: 2,
								fontFamily: "'Inter Variable', sans-serif",
								textTransform: "none",
								fontSize: 16,
								fontWeight: 600,
							}}
						>
							<Grid container rowSpacing={1}>
								<Grid item xs={12}>
									{"Pre-Event Questionnaire"}
								</Grid>
								{JSON.parse(event.pre_event_questionnaire).map(
									(q) => (
										<Grid
											item
											key={q.id}
											xs={12}
											onClick={() =>
												handleChange("/eventQuestions")
											}
											sx={{
												fontWeight: "normal",
												cursor: "pointer",
											}}
										>
											{q.question}
										</Grid>
									)
								)}
							</Grid>
						</Box>
						<Box
							sx={{
								color: "#000000",
								backgroundColor: "#FFFFFF",
								borderRadius: "8px",
								height: "100%",
								textAlign: "left",
								pl: 2,
								py: 2,
								fontFamily: "'Inter Variable', sans-serif",
								textTransform: "none",
								fontSize: 16,
								fontWeight: 600,
								cursor: "pointer",
							}}
							onClick={() => handleChange("/eventLocation")}
						>
							<Grid container rowSpacing={1}>
								<Grid item xs={6} sx={{ alignSelf: "center" }}>
									{"Event Location"}
								</Grid>
								<Grid item xs={6}>
									<Map
										latitude={event.lat}
										longitude={event.long}
										height="150px"
									/>
								</Grid>
							</Grid>
						</Box>
					</Stack>
				</Box>
				<Stack
					spacing={2}
					direction="row"
					sx={{
						width: "92vw",
						maxWidth: "550px",
						pb: 2,
					}}
				>
					{event.isEdit ? (
						<Button
							color="info"
							variant="contained"
							onClick={handleUpdateEvent}
							fullWidth
						>
							{"Update Event"}
						</Button>
					) : (
						<Button
							color="info"
							variant="contained"
							onClick={handleAddEvent}
							fullWidth
						>
							{"Create Event"}
						</Button>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default EventReview;
