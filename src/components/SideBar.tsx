import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
const SideBar = () => {
  const slideBarItems = [
    {id: 1, name: "Dashboard", icon: <DashboardIcon />, link: "/backoffice/dashboard"},
    {id: 2, name: "Order", icon: <ListAltIcon />, link: "/backoffice/order"},
    {id: 3, name: "Product Category", icon: <CategoryIcon />, link: "/backoffice/product-category"},
    {id: 4, name: "Product", icon: <InventoryIcon />, link: "/backoffice/product"},
    {id: 5, name: "Customer", icon: <PersonOutlineIcon />, link: "/backoffice/customer"},
    {id: 6, name: "Mail", icon: <EmailIcon />, link: "/backoffice/mail"},
    {id: 7, name: "Send", icon: <SendIcon />, link: "/backoffice/sent-mail"},
  ];
  return (
    <Box sx={{bgcolor: "#F4A442", height: "100vh"}}>
      <List>
        {slideBarItems.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}>
            <ListItem key={item.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Link
        href={"/backoffice/setting"}
        style={{
          textDecoration: "none",
          cursor: "pointer",
          color: "black",
        }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>
    </Box>
  );
};

export default SideBar;
