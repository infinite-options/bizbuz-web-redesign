import { createContext } from "react";

const LoginContext = createContext();

export default LoginContext;

export const LoginInitState = {
  loggedIn: false,
  reload: false,
  user_uid: "",
  user_email: "",
  user_details: "",
};
