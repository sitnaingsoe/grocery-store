import {Button, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";
interface Props {
  name: String;
}

const Card = ({name}: Props) => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
};

export default Card;
