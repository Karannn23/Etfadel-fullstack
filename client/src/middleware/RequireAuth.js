import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ Component }) {
  // console.log(localStorage.getItem("token"))
  if (!localStorage.getItem("token") && !localStorage.getItem("otpToken")) {
    // console.log("re1");
    return <Navigate to="/" />;
  } else if (!localStorage.getItem("otpToken")) {
    // console.log("re2");
    return <Navigate to="/otp" />;
  }
  return <Component />;
}
export default RequireAuth;
