import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import EventCard from "../common/EventCard";
import Grid from "@mui/material/Grid";
import Loading from "../common/Loading";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { getCookieParam } from "../../util/helper";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const LOCAL_URL = process.env.REACT_APP_SERVER_LOCAL;
const CurrentEvents = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const location = useLocation();
	const [userEvents, setUserEvents] = useState([]);

	const handleEventClick = async (event) => {
		if (getCookieParam(document, "loggedIn=") !== undefined) {
			if (getCookieParam(document, "loggedIn=") === "true") {
				setLoading(true);
				const userObj = JSON.parse(
					getCookieParam(document, "user_details=")
				);
				const response = await axios.get(
					`${BASE_URL}/eventStatus?eventId=${event.event_uid}&userId=${userObj.user_uid}`
				);
				if (response.data.hasRegistered) {
					navigate("/earlyArrival", {
						state: {
							email: getCookieParam(document, "user_email="),
							user: userObj,
							eventObj: event,
						},
					});
				} else {
					navigate("/eventQuestionnaire", {
						state: { event: event },
					});
				}
			} else {
				navigate("/login", {
					state: { path: "/earlyArrival", eventObj: event },
				});
			}
		} else {
			navigate("/login", {
				state: { path: "/earlyArrival", eventObj: event },
			});
		}
	};

	const getEventsByUser = async () => {
		let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const response = await axios.get(
			`${BASE_URL}/GetEvents?event_start_date=${new Date().toLocaleDateString()}&timeZone=${user_timezone}`
		);
		setEvents(response.data.result);
		setLoading(false);
	};

	useEffect(() => {
		getEventsByUser();
	}, []);

	const getUserRegisteredEvents = useCallback(async () => {
		if (location.state.isUserLoggedIn) {
			let user = location.state.user;
			let user_uid =
				typeof user === "string"
					? JSON.parse(user).user_uid
					: user.user_uid;

			let user_timezone =
				Intl.DateTimeFormat().resolvedOptions().timeZone;
			await axios
				.get(
					BASE_URL +
						`/GetEventUser?timeZone=${user_timezone}&eu_user_id=${user_uid}`
				)
				.then((response) => {
					setUserEvents(response.data.result);
				});
		}
	}, [location.state.isUserLoggedIn, location.state.user]);

	useEffect(() => {
		getUserRegisteredEvents();
	}, [getUserRegisteredEvents]);
	return (
		<Box display="flex" flexDirection="column">
			<Stack direction="row" sx={{ mt: "36px" }}>
				<Brand
					onClick={() => navigate("/")}
					style={{ cursor: "pointer" }}
				/>
				<BackIcon
					style={{ marginLeft: "auto" }}
					onClick={() => navigate("/")}
				/>
			</Stack>
			<Loading isLoading={isLoading} />
			<Stack
				direction="column"
				justifyContent="center"
				spacing={2}
				sx={{ mt: 6 }}
			>
				{events.length > 0 ? (
					<div>
						<Typography
							gutterBottom
							variant="h2"
							component="div"
							style={{
								textAlign: "center",
								color: "white",
								marginBottom: 10,
							}}
						>
							{"Today's Events"}
						</Typography>
						{events.map((event) => {
							const userEvent = userEvents.find(
								(item) => item.event_uid === event.event_uid
							);
							return (
								<div style={{ padding: 10 }}>
									<EventCard
										key={event.event_uid}
										event={event}
										onCardClick={handleEventClick}
										isRegistered={
											userEvent === undefined
												? false
												: true
										}
										isList={true}
									/>
								</div>
							);
						})}
					</div>
				) : (
					<Box
						display="flex"
						justifyContent="center"
						flexDirection="column"
					>
						<Grid
							container
							rowSpacing={{ xs: 1, sm: 10 }}
							sx={{ mt: "18% !important" }}
						></Grid>
						<Grid item xs={5} align="center">
							<Typography
								gutterBottom
								variant="h2"
								component="div"
								style={{ color: "white" }}
							>
								{"No Events Available For Now"}
							</Typography>
						</Grid>
					</Box>
				)}
			</Stack>
		</Box>
	);
};

export default CurrentEvents;
