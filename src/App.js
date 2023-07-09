import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Landing from "./components/Landing";
import CreateEvent from "./components/create/CreateEvent";
import EventDetails from "./components/create/EventDetails";
import EventLocation from "./components/create/EventLocation";
import FindBy from "./components/find/FindBy";
import EventTitle from "./components/create/EventTitle";
import EventImage from "./components/create/EventImage";
import EventQuestions from "./components/create/EventQuestions";
import EventReview from "./components/create/EventReview";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import EmailSignup from "./components/signup/EmailSignup";
import GoogleSignupForm from "./components/signup/GoogleSignupForm";
import EmailSignupForm from "./components/signup/EmailSignupForm";
import ValidationCode from "./components/signup/ValidationCode";
import LoginContext, { LoginInitState } from "./LoginContext";

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
        {" "}
        <Routes>
          <Route path="/" element={<Landing />} />{" "}
          <Route exact path="/login" element={<Login />} />{" "}
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/email-signup" element={<EmailSignup />} />
          <Route
            exact
            path="/google-signup-form"
            element={<GoogleSignupForm />}
          />
          <Route
            exact
            path="/email-signup-form"
            element={<EmailSignupForm />}
          />
          <Route exact path="/validate-code" element={<ValidationCode />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/eventDetails" element={<EventDetails />} />
          <Route path="/eventLocation" element={<EventLocation />} />
          <Route path="/eventTitle" element={<EventTitle />} />
          <Route path="/eventImage" element={<EventImage />} />
          <Route path="/eventQuestions" element={<EventQuestions />} />
          <Route path="/eventReview" element={<EventReview />} />
          <Route path="/findEvent" element={<FindBy />} />
        </Routes>
      </LoginContext.Provider>
    </Container>
  );
};

export default App;
