import LoginContext, { LoginInitState } from "./util/LoginContext";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AttendeeDetails from "./components/edit/AttendeeDetails";
import AttendeeGraph from "./components/attend/AttendeeGraph";
import BroadcastMessage from "./components/edit/BroadcastMessage";
import Container from "@mui/material/Container";
import CreateBizCard from "./components/edit/CreateBizCard";
import CreateEvent from "./components/create/CreateEvent";
import CurrentEvents from "./components/attend/CurrentEvents";
import CurrentRsvp from "./components/rsvp/CurrentRsvp";
import EarlyArrival from "./components/attend/EarlyArrival";
import EditEvent from "./components/edit/EditEvent";
import EmailSignup from "./components/signup/EmailSignup";
import EmailSignupForm from "./components/signup/EmailSignupForm";
import EventAttendees from "./components/attend/EventAttendees";
import EventCode from "./components/create/EventCode";
import EventDashboard from "./components/attend/EventDashboard";
import EventDetails from "./components/create/EventDetails";
import EventImage from "./components/create/EventImage";
import EventInfo from "./components/find/EventInfo";
import EventLocation from "./components/create/EventLocation";
import EventQuestionnaire from "./components/find/EventQuestionnaire";
import EventQuestions from "./components/create/EventQuestions";
import EventRegistrants from "./components/attend/EventRegistrants";
import EventReview from "./components/create/EventReview";
import EventTitle from "./components/create/EventTitle";
import FindBy from "./components/find/FindBy";
import GoogleSignupForm from "./components/signup/GoogleSignupForm";
import Landing from "./components/Landing";
import Login from "./components/login/Login";
import NetworkingActivity from "./components/attend/NetworkingActivity";
import OverallNetwork from "./components/attend/OverallNetwork";
import RegisteredGraph from "./components/attend/RegisteredGraph";
import RegistrationConfirmation from "./components/find/RegistrationConfirmation";
import RsvpEventInfo from "./components/rsvp/RsvpEventInfo";
import Signup from "./components/signup/Signup";
import ValidationCode from "./components/signup/ValidationCode";
import ViewRegistrants from "./components/edit/ViewRegistrants";

const App = () => {
	const [loginState, setLoginState] = useState(LoginInitState);

	const isSignedIn =
		document.cookie
			.split("; ")
			.find((row) => row.startsWith("loggedIn=")) !== undefined
			? loginState.loggedIn
				? loginState.loggedIn
				: document.cookie
						.split("; ")
						.find((row) => row.startsWith("loggedIn="))
						.split("=")[1]
			: loginState.loggedIn;
	useEffect(
		() => console.log("curUser = ", loginState.user_uid),
		[loginState.user_uid]
	);
	return (
		<Container maxWidth="sm">
			<LoginContext.Provider
				value={{
					loginState: loginState,
					setLoginState: setLoginState,
				}}
			>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/email-signup" element={<EmailSignup />} />
					<Route
						path="/google-signup-form"
						element={<GoogleSignupForm />}
					/>
					<Route
						path="/email-signup-form"
						element={<EmailSignupForm />}
					/>
					<Route path="/validate-code" element={<ValidationCode />} />
					<Route path="/createEvent" element={<CreateEvent />} />
					<Route path="/editEvent" element={<EditEvent />} />
					<Route
						path="/viewRegistrants"
						element={<ViewRegistrants />}
					/>
					<Route
						path="/broadcastMessage"
						element={<BroadcastMessage />}
					/>
					<Route
						path="/attendeeDetails"
						element={<AttendeeDetails />}
					/>
					<Route path="/createBizCard" element={<CreateBizCard />} />
					<Route path="/eventDetails" element={<EventDetails />} />
					<Route path="/eventLocation" element={<EventLocation />} />
					<Route path="/eventTitle" element={<EventTitle />} />
					<Route path="/eventImage" element={<EventImage />} />
					<Route
						path="/eventQuestions"
						element={<EventQuestions />}
					/>
					<Route path="/eventReview" element={<EventReview />} />
					<Route path="/eventCode" element={<EventCode />} />
					<Route path="/findEvent" element={<FindBy />} />
					<Route path="/currentEvents" element={<CurrentEvents />} />
					<Route path="/earlyArrival" element={<EarlyArrival />} />
					<Route
						path="/eventRegistrants"
						element={<EventRegistrants />}
					/>
					<Route
						path="/eventAttendees"
						element={<EventAttendees />}
					/>
					<Route
						path="/eventDashboard"
						element={<EventDashboard />}
					/>
					<Route
						path="/overallNetwork"
						element={<OverallNetwork />}
					/>
					<Route
						path="/networkingActivity"
						element={<NetworkingActivity />}
					/>
					<Route
						path="/eventInfo/:registrationCode"
						element={<EventInfo />}
					/>
					<Route
						path="/eventQuestionnaire"
						element={<EventQuestionnaire />}
					/>
					<Route path="/attendeegraph" element={<AttendeeGraph />} />
					<Route
						path="/registrantgraph"
						element={<RegisteredGraph />}
					/>
					<Route
						path="/registrationConfirmation"
						element={<RegistrationConfirmation />}
					/>
					<Route path="/currentRsvp" element={<CurrentRsvp />} />
					<Route path="/rsvpEventInfo" element={<RsvpEventInfo />} />
				</Routes>
			</LoginContext.Provider>
		</Container>
	);
};

export default App;
