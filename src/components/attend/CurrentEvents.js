import { useEffect, useState } from "react";

import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import EventCard from "../common/EventCard";
import Grid from "@mui/material/Grid";
import Loading from "../common/Loading";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CurrentEvents = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const handleEventClick = (event) => {
		if (
			document.cookie !== "" &&
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("loggedIn=")) !== undefined
		) {
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("loggedIn="))
				.split("=")[1] === "true"
				? navigate("/earlyArrival", {
						state: {
							email: document.cookie
								.split("; ")
								.find((row) => row.startsWith("user_email="))
								.split("=")[1],
							user: JSON.parse(
								document.cookie
									.split("; ")
									.find((row) =>
										row.startsWith("user_details=")
									)
									.split("=")[1]
							),
							eventObj: event,
						},
				  })
				: navigate("/login", {
						state: { path: "/earlyArrival", eventObj: event },
				  });
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
					<Box
						display="flex"
						justifyContent="center"
						flexDirection="column"
						spacing={2}
					>
						<Grid item xs={5} align="center">
							<Typography
								gutterBottom
								variant="h2"
								component="div"
								style={{ color: "white", marginBottom: 20 }}
							>
								{"Today's Events"}
							</Typography>
						</Grid>
						<Grid item xs={5} align="center" spacing={5}>
							{events.map((event) => {
								return (
									<div style={{ padding: 10 }}>
										<EventCard
											key={event.event_uid}
											event={event}
											onCardClick={handleEventClick}
											isRegistered={true}
											isList={true}
										/>
									</div>
								);
							})}
						</Grid>
					</Box>
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
