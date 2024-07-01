import Card from "@mui/material/Card";
import {Box, CardContent, Typography} from "@mui/material";
import React from "react";
import Link from "next/link";
interface Props {
  name: string;
  href: string;
}

const CardComponent = ({name, href}: Props) => {
  return (
    <Link href={href} style={{textDecoration: "none", color: "#000000"}}>
      <Box sx={{padding: 5, borderRadius: 5}}>
        <Card sx={{minWidth: 275, width: 100, height: 200}}>
          <CardContent>
            <Typography sx={{fontSize: 14}}>
              {name}
            </Typography>   
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
};

export default CardComponent;
