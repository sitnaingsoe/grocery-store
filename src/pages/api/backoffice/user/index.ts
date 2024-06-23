// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {prisma} from "@/utils/prisma";
import {WhereToVote} from "@mui/icons-material";
import {fstat} from "fs";
import type {NextApiRequest, NextApiResponse} from "next";

// Serverless function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    const users = await prisma.user.findMany({where: {isArchive: false}});
    return res.status(200).json({users});
  } else if (method === "POST") {
    const {name, email} = req.body;

    const isValid = name && email;
    if (!isValid) return res.status(400).send("Bad request");
    const user = await prisma.user.create({data: {name, email}});

    

    return res.status(200).json({user});
  } else if (method === "PUT") {
    const {id, name, email} = req.body;
    req.body;
    const isValid = name && email;
    if (!isValid) return res.status(200).send("Bad request");
    const exist = await prisma.user.findFirst({where: {id}});
    if (!exist) return res.status(200).send("Bad request");
    const user = await prisma.user.update({data: {name, email}, where: {id}});
    return res.status(200).json({user});
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exist = await prisma.user.findFirst({where: {id}});
    if (!exist) return res.status(200).send("Bad request");
    await prisma.user.update({data: {isArchive: true}, where: {id}});
    return res.status(200).send("OK");
  }
  return res.status(405).send("Invalid method");
}
