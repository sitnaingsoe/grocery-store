import BackofficeLayout from "@/components/BackofficeLayout";

import {Box} from "@mui/material";
import {useSession} from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  const {data} = useSession();

  return (
    <Box>
      {/*<Chart />   */}
      DashBoard {data?.user?.name}
    </Box>
  );
};

export default DashboardPage;
