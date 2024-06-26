import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { ReactComponent as Back } from "../../assets/back.svg";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import Button from "@mui/material/Button";
import EventCard from "../common/EventCard";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const EventInfo = () => {
	const location = useLocation();
	const { event } = location.state;
	const navigate = useNavigate();

	return (
		<Box display="flex" justifyContent="center" flexDirection="column">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Brand
					style={{ marginTop: "36px" }}
					onClick={() => navigate("/")}
				/>
				<Back onClick={() => navigate(-1)} />
			</Box>
			<Stack
				direction="column"
				justifyContent="center"
				spacing={2}
				sx={{ mt: 10 }}
			>
				
				<EventCard
					event={event}
					// onRegisterClick={() => {
						onButtonClick={() => {
							console.log("herer")
						navigate("/eventQuestionnaire", {
							state: { event: event },
						});
					}}
				/>
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
						<Typography key={question.id} variant="body1">
							{`${index + 1}. ${question.question}`}
						</Typography>
					)
				)}
			</Box>
			<Button
				variant="contained"
				sx={{
					width: "100%",
					height: "56px",
					mt: "auto",
					marginLeft: "auto",
					marginRight: "auto",
					bottom: "-36px",
					left: "0",
					right: "0",
				}}
				onClick={() => {
					navigate("/eventQuestionnaire", {
						state: { event: event },
					});
				}}
			>
				{"Continue Registration"}
			</Button>
		</Box>
	);
};

export default EventInfo;
