import React, {ReactNode, useEffect} from "react";
import TopBar from "./TopBar";
import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {fetchData} from "@/store/slices/appSlice";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({children}: Props) => {
  const {init} = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(fetchData());
    }
  }, [init]);

  return (
    <Box sx={{bgcolor: "#EEEEEE", width: "100%",height:"100%"}}>
      <TopBar />
      <Box sx={{display: "flex"}}>
        <Box sx={{width: "20%"}}>
          <SideBar />
        </Box>
        <Box sx={{width: "100%", height:"auto"}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
