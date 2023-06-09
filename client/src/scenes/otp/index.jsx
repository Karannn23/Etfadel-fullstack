import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from '@mui/material/Alert';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  TextField,
} from "@mui/material";
import jwt from "jwt-decode";

// eslint-disable-next-line
import { themeSettings } from "theme";

const OTP = () => {
  const navigate = useNavigate();

  // States for registration
  const decoded = jwt(localStorage.getItem("token"))
  const [otp, setOTP] = useState("");

  // States for checking the errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handling the email change
  

  // Handling the password change
  const handleOTP = (e) => {
    setOTP(e.target.value);
  };

  const user = {
    email : decoded.email,
    otp,
  };

  console.log(user);
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(true);
      setErrorMessage("Please enter OTP of valid length");
      return;
    } else {
      console.log("Submitting otp")
      const response = await fetch('https://admin-backend-ssph.onrender.com/general/otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(true);
        setErrorMessage(data.error);
      } else {
        setError(false);
        console.log("verified");
        // localStorage.setItem("DashBoardUserLoggedIn", true);
        localStorage.setItem('otpToken', JSON.stringify(data));
        navigate("/dashboard");
      }
    }
  }

  const handleResend = async (e) => {
    e.preventDefault();
    const decoded = jwt(localStorage.getItem("token"))
    const user = {
      email : decoded.email,
    };
      console.log("Resending otp")
      // eslint-disable-next-line
      const response = await fetch('https://admin-backend-ssph.onrender.com/general/otpresend', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(true);
        setErrorMessage(data.error);
      } else {
        setError(false);
        console.log("otp resent");
        // localStorage.setItem("DashBoardUserLoggedIn", true);
      }
    }


    const handleLogout = () => {  
      localStorage.removeItem('token');
      navigate("/");
  }

  const DisplayErrorMessage = () => {
    return (
       error ?  <Alert severity="error" sx={{ background: "white",
        color:"black",
        fontWeight: "bold"
        }}>
          {errorMessage}
        </Alert> : ""
    );
  };

  const theme = useTheme();

  return (
    <Box
      m="1.5rem 2rem"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        gap: "3rem"
      }}
    >
      <DisplayErrorMessage />
      <Box
        pt="2rem"
        sx={{
          backgroundColor: theme.palette.background.alt,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.2rem",
        }}
      >
        <Header title="" subtitle="Enter your OTP to login" />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "theme.palette.secondary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            m="1rem"
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}> 
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleOTP}
                  required
                  fullWidth
                  name="otp"
                  label="OTP"
                  type="password"
                  id="otp"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: "0.5rem 0", background: theme.palette.primary[400],
                "&:hover": { backgroundColor: theme.palette.primary[300]} 
                  }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleResend}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: "0.5rem 0", background: theme.palette.primary[400],
                "&:hover": { backgroundColor: theme.palette.primary[300]} 
                  }}
            >
              Resend OTP
            </Button>
            <Button
              onClick={handleLogout}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: "0.5rem 0", background: theme.palette.primary[400],
                "&:hover": { backgroundColor: theme.palette.primary[300]} 
                  }}
            >
              Back to main page
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OTP;
