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
    const isValid = name && isAvailable !== undefined && companyId;
    if (!isValid) return res.status(400).send("Bad request");
    const productCategory = await prisma.productCategory.create({
      data: {name, isAvailable, companyId},
    });
    return res.status(200).json({productCategory});
  } else if (method === "PUT") {
    const {id, isAvailable, name, companyId} = req.body;
    const isValid = id && isAvailable !== undefined && companyId && name;
    if (!isValid) res.status(400).send("Bad Request");
    const exist = await prisma.productCategory.findFirst({where: {id}});
    console.log(exist);
    if (!exist) res.status(404).send("Doest not exist ");
    const updatedProductCategory = await prisma.productCategory.update({
      data: {name, isAvailable},
      where: {id},
    });
    return res.status(200).json({updatedProductCategory});
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exist = await prisma.productCategory.findFirst({where: {id}});
    if (!exist) return res.status(400).send("Bad Request");
    await prisma.productCategory.delete({where: {id}});
    return res.status(200).send("OK");
  }
  return res.status(400).send("Method not Found");
}
