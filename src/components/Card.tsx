import Card from "@mui/material/Card";
import {Box, CardContent, Typography} from "@mui/material";
import React from "react";
interface Props {
  name: String;
}

const CardComponent = ({name}: Props) => {
  return (
    <Box sx={{padding: 5,borderRadius:5}}>
      <Card sx={{minWidth: 275, width: 100, height: 200}}>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;
