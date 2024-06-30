import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";
import {signOut} from "next-auth/react";
import {useAppSelector} from "@/store/hook";

const TopBar = () => {
  const {company} = useAppSelector((state) => state.company);

  if (!company) return null;
  

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{bgcolor: "#125C13"}}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <Avatar sx={{bgcolor: "#9DB2BF"}}>GS</Avatar>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Grocery Store
          </Typography>
          <Typography sx={{flexGrow: 1, fontSize: 25}}>Donkey</Typography>
          <Button color="inherit" onClick={() => signOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
