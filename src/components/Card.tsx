import Card from "@mui/material/Card";
import {Box, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import Link from "next/link";
interface Props {
  name: string;
  href: string;
  assetUrl: string;
}

const CardComponent = ({name, href, assetUrl}: Props) => {
  return (
    <Link href={href} style={{textDecoration: "none", color: "#000000"}}>
      <Card sx={{maxWidth: 345}}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={assetUrl} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CardComponent;
