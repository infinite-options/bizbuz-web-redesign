import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Button from "@mui/material/Button";
import EventCard from "../common/EventCard";
import ShareButtons from "../common/ShareButtons";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const RsvpEventInfo = () => {
	const location = useLocation();
	const { event, user } = location.state;
	const navigate = useNavigate();

	const userAnswers = JSON.parse(event.eu_qas);

	const isEventToday = dayjs(event.event_start_date).isSame(dayjs(), "day");

	const handleCancelRsvp = async () => {
		await axios.delete(
			BASE_URL +
				`/EventUser?userId=${user.user_uid}&eventId=${event.event_uid}`
		);
		navigate("/currentRsvp", { state: { user } });
	};

	return (
		<Box display="flex" justifyContent="center" flexDirection="column">
			<Stack direction="row" sx={{ mt: "36px" }}>
				<Brand
					onClick={() => navigate("/")}
					style={{ cursor: "pointer" }}
				/>
				<BackIcon
					style={{ marginLeft: "auto", cursor: "pointer" }}
					onClick={() => navigate(-1, { state: { user } })}
				/>
			</Stack>
			<Stack
				direction="column"
				justifyContent="center"
				spacing={2}
				sx={{ mt: 10 }}
			>
				<EventCard event={event} isRegistered={true} />
			</Stack>
			<Typography
				variant="h1"
				sx={{
					mt: "35px",
					color: "#FFF",
					fontFamily: "Fira Sans Condensed",
					fontSize: "22px",
					fontStyle: "normal",
					fontWeight: 500,
					lineHeight: "normal",
				}}
			>
				{"About The Event"}
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
				{event.event_description}
			</Box>
			<Typography
				variant="h1"
				sx={{
					mt: "35px",
					color: "#FFF",
					fontFamily: "Fira Sans Condensed",
					fontSize: "22px",
					fontStyle: "normal",
					fontWeight: 500,
					lineHeight: "normal",
				}}
			>
				{"Event Questions"}
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
				{JSON.parse(event.pre_event_questionnaire).map(
					(question, index) => (
						<div key={question.id}>
							<Typography key={question.id} variant="body1">
								{`${index + 1}. ${question.question}`}
							</Typography>
							<Typography variant="body1">
								Your Answer - {userAnswers[index].answer}
							</Typography>
						</div>
					)
				)}
			</Box>
			{isEventToday && (
				<Button
					variant="contained"
					sx={{
						width: "352.5px",
						height: "56px",
						mt: "auto",
						marginLeft: "auto",
						marginRight: "auto",
						position: "fixed",
						bottom: "96px",
						left: "0",
						right: "0",
					}}
					color="info"
					onClick={() => {
						navigate("/earlyArrival", {
							state: { eventObj: event, user },
						});
					}}
				>
					{"Attend Event"}
				</Button>
			)}
			<ShareButtons
				registrationCode={event.event_registration_code}
				sx={{ mt: "30px" }}
			/>
			<Button
				variant="contained"
				sx={{
					maxWidth: "600px",
					width: "100%",
					height: "56px",
					mt: "auto",
					marginLeft: "auto",
					marginRight: "auto",
					position: "fixed",
					bottom: "20px",
					left: "0",
					right: "0",
				}}
				onClick={handleCancelRsvp}
			>
				{"Cancel RSVP"}
			</Button>
		</Box>
	);
};

export default RsvpEventInfo;
