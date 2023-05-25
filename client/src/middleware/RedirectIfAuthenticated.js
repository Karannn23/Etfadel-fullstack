import React from "react";
import { Navigate } from "react-router-dom";

function RedirectIfAuthenticated({ Component }) {
  if (localStorage.getItem("otpToken") && localStorage.getItem("token")) {
    // console.log("rie1");
    return <Navigate to="/dashboard" />;
  } else if (localStorage.getItem("token")) {
    // console.log("rie2");
    <Navigate to="/otp" />;
  }
  return <Component />;
}
export default RedirectIfAuthenticated;
