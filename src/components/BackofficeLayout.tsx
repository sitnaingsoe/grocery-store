import React, {ReactNode, useEffect} from "react";
import TopBar from "./TopBar";
import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import {useAppDispatch} from "@/store/hook";
import { fetchData } from "@/store/slices/userSlice";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({children}: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Box sx={{bgcolor: "#E8E1D9",width:"100%",height:"100%"}}>
      <TopBar />
      <Box sx={{display: "flex"}}>
        <Box sx={{width: 280}}>
          <SideBar />
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
