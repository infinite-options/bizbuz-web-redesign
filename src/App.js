import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Landing from "./components/Landing";
import CreateEvent from "./components/create/CreateEvent";
import EditEvent from "./components/edit/EditEvent";
import BroadcastMessage from "./components/edit/BroadcastMessage";
import ViewRegistrants from "./components/edit/ViewRegistrants";
import AttendeeDetails from "./components/edit/AttendeeDetails";
import CreateBizCard from "./components/edit/CreateBizCard";
import EventDetails from "./components/create/EventDetails";
import EventLocation from "./components/create/EventLocation";
import FindBy from "./components/find/FindBy";
import EventInfo from "./components/find/EventInfo";
import EventQuestionnaire from "./components/find/EventQuestionnaire";
import RegistrationConfirmation from "./components/find/RegistrationConfirmation";
import CurrentEvents from "./components/attend/CurrentEvents";
import EarlyArrival from "./components/attend/EarlyArrival";
import EventRegistrants from "./components/attend/EventRegistrants";
import EventAttendees from "./components/attend/EventAttendees";
import EventTitle from "./components/create/EventTitle";
import EventDashboard from "./components/attend/EventDashboard";
import OverallNetwork from "./components/attend/OverallNetwork";
import NetworkingActivity from "./components/attend/NetworkingActivity";
import EventImage from "./components/create/EventImage";
import EventQuestions from "./components/create/EventQuestions";
import EventReview from "./components/create/EventReview";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import EmailSignup from "./components/signup/EmailSignup";
import GoogleSignupForm from "./components/signup/GoogleSignupForm";
import EmailSignupForm from "./components/signup/EmailSignupForm";
import ValidationCode from "./components/signup/ValidationCode";
import EventCode from "./components/create/EventCode";
import LoginContext, { LoginInitState } from "./LoginContext";
import CurrentRsvp from "./components/rsvp/current-rsvp";
import RsvpEventInfo from "./components/rsvp/rsvp-event-info";

const App = () => {
  const [loginState, setLoginState] = useState(LoginInitState);

  const isSignedIn =
    document.cookie.split("; ").find((row) => row.startsWith("loggedIn=")) !==
    undefined
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
          <Route path="/google-signup-form" element={<GoogleSignupForm />} />
          <Route path="/email-signup-form" element={<EmailSignupForm />} />
          <Route path="/validate-code" element={<ValidationCode />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/editEvent" element={<EditEvent />} />
          <Route path="/viewRegistrants" element={<ViewRegistrants />} />
          <Route path="/broadcastMessage" element={<BroadcastMessage />} />
          <Route path="/attendeeDetails" element={<AttendeeDetails />} />
          <Route path="/createBizCard" element={<CreateBizCard />} />
          <Route path="/eventDetails" element={<EventDetails />} />
          <Route path="/eventLocation" element={<EventLocation />} />
          <Route path="/eventTitle" element={<EventTitle />} />
          <Route path="/eventImage" element={<EventImage />} />
          <Route path="/eventQuestions" element={<EventQuestions />} />
          <Route path="/eventReview" element={<EventReview />} />
          <Route path="/eventCode" element={<EventCode />} />
          <Route path="/findEvent" element={<FindBy />} />
          <Route path="/currentEvents" element={<CurrentEvents />} />
          <Route path="/earlyArrival" element={<EarlyArrival />} />
          <Route path="/eventRegistrants" element={<EventRegistrants />} />
          <Route path="/eventAttendees" element={<EventAttendees />} />
          <Route path="/eventDashboard" element={<EventDashboard />} />
          <Route path="/overallNetwork" element={<OverallNetwork />} />
          <Route path="/networkingActivity" element={<NetworkingActivity />} />
          <Route path="/eventInfo" element={<EventInfo />} />
          <Route path="/eventQuestionnaire" element={<EventQuestionnaire />} />
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
