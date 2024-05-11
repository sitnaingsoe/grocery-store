import React, {ReactNode} from "react";
import TopBar from "./TopBar";
import Box from "@mui/material/Box";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({children}: Props) => {
  return (
    <Box sx={{bgcolor: "#E8E1D9"}}>
      <TopBar />
      <Box sx={{display: "flex"}}>
        <Box sx={{width: 240}}>
          <SideBar />
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
