import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.css";
import {Box, Typography} from "@mui/material";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  return (
    <Box sx={{p: 15}}>
      <Typography variant="h1" sx={{mb: 2}}>
        Landing Page{" "}
      </Typography>
      <Link href={"http://localhost:3000/backoffice"}>
        <Box sx={{mb: 1, fontSize: 30}}>Backoffice Page </Box>
      </Link>
      <Box sx={{mb: 2, fontSize: 30}}>Home Page </Box>
    </Box>
  );
}
