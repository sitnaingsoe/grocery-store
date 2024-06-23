import {prisma} from "@/utils/prisma";
import {WhereToVote} from "@mui/icons-material";
import {fstat} from "fs";
import type {NextApiRequest, NextApiResponse} from "next";

// Serverless function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    const productCategories = await prisma.productCategory.findMany();
    return res.status(200).json({productCategories});
  } else if (method === "POST") {
    const {name, isAvailable, companyId} = req.body;
    const isValid = name && isAvailable !== undefined;
    if (!isValid) return res.status(400).send("Bad request");
    const productCategory = await prisma.productCategory.create({
      data: {name, isAvailable, companyId},
    });
    return res.status(200).json({productCategory});
  }
}
