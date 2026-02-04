import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";
import {signOut} from "next-auth/react";
import {useAppSelector} from "@/store/hook";
import {usePathname} from "next/navigation";

const TopBar = () => {
  const {company} = useAppSelector((state) => state.company);
  const pathname = usePathname();
  const name = pathname.split("/")[2];
  console.log(name);
  if (!company) return null;

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{bgcolor: "#615EFC", height: 85, p: 1}}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <Avatar sx={{bgcolor: "#9DB2BF"}}>SNS</Avatar>
          </IconButton>
          <Typography variant="h4" component="div" sx={{flexGrow: 1, fontStyle: "oblique"}}>
            {company.name}
          </Typography>
          <Typography sx={{flexGrow: 1, fontSize: 25}}>{name}</Typography>
          <Button color="inherit" onClick={() => signOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
