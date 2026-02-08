import React from "react";
import Link from "next/link";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from "@mui/material";

interface Props {
  name: string;
  href: string;
  assetUrl: string;
  description?: string; // optional product description
}

const CardComponent: React.FC<Props> = ({ name, href, assetUrl, description }) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Card sx={{ maxWidth: 345, m: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={assetUrl}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CardComponent;
