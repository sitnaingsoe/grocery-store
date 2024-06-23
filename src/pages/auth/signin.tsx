import TopBar from "@/components/TopBar";
import {Box, Button, Typography} from "@mui/material";
import {signIn} from "next-auth/react";
import React from "react";

const signin = () => {
  return (
    <Box sx={{height: "100vh"}}>
      <TopBar />
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", mt: 1}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 5,
            width: 400,
            height: 500,
            bgcolor: "#ffff",
            boxShadow: 5,
          }}>
          <Typography sx={{textAlign: "center", m: 5, fontSize: 30}}>
            Login To Grocery Store
          </Typography>
          <Button
            sx={{mb: 3}}
            variant="contained"
            onClick={() => {
              signIn("google", {callbackUrl: "/backoffice/dashboard"});
            }}>
            Sign in with Google
          </Button>
          <Button
            sx={{mb: 3}}
            variant="contained"
            onClick={() => {
              signIn("google", {callbackUrl: "/backoffice"});
            }}>
            Sign in with Google
          </Button>
          <Button
            sx={{mb: 3}}
            variant="contained"
            onClick={() => {
              signIn("google", {callbackUrl: "/backoffice"});
            }}>
            Sign in with Google
          </Button>
          <Button
            sx={{mb: 3}}
            variant="contained"
            onClick={() => {
              signIn("google", {callbackUrl: "/backoffice"});
            }}>
            Sign in with Google
          </Button>
          <Button
            sx={{mb: 3}}
            variant="contained"
            onClick={() => {
              signIn("google", {callbackUrl: "/backoffice"});
            }}>
            Sign in with Google
          </Button>
          <Button
            sx={{mb: 3}}
            variant="contained"
            onClick={() => {
              signIn("google", {callbackUrl: "/backoffice"});
            }}>
            Sign in with
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default signin;
