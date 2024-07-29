// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {prisma} from "@/utils/prisma";
import {WhereToVote} from "@mui/icons-material";
import {fstat} from "fs";
import type {NextApiRequest, NextApiResponse} from "next";

// Serverless function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok");
  } else if (method === "POST") {
    return res.status(200).send("Ok");
  } else if (method === "PUT") {
    return res.status(200).send("Ok");
  } else if (method === "DELETE") {
    return res.status(200).send("Ok");
  }
  return res.status(405).send("Invalid method");
}
