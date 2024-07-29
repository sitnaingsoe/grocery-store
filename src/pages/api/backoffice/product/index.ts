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
    const {name, price, productCategoryIds} = req.body;
    const isValid = name && price && productCategoryIds;
    if (!isValid) res.status(400).send("Unauthorized");
    const product = await prisma.product.create({data: {name, price, isArchived: false}});
    const productCategoryProduct = await prisma.$transaction(
      productCategoryIds.map((itemId: number) =>
        prisma.productCategoryProduct.create({
          data: {productCategoryId: itemId, productId: product.id},
        }),
      ),
    );
    return res.status(200).json({product, productCategoryProduct});
  } else if (method === "PUT") {
    const {id, name, price, productCategoryIds} = req.body;
    const isValid = id && name && price && productCategoryIds.length > 0;
    if (!isValid) res.status(400).send("Unauthorised");
    const isexist = await prisma.product.findFirst({where: {id}});
    if (!isexist) return res.status(400).send("data not found");
    const updatedProduct = await prisma.product.update({data: {name, price}, where: {id}});
    if (productCategoryIds.length) {
      const productCategoryProcuts = await prisma.productCategoryProduct.findMany({
        where: {productId: id},
      });
      // Remove
      const toRemove = productCategoryProcuts.filter(
        (item) => !productCategoryIds.includes(item.productCategoryId),
      );
      if (toRemove.length) {
        await prisma.productCategoryProduct.deleteMany({
          where: {id: {in: toRemove.map((item) => item.id)}},
        });
      }
      // Add
      const toAdd = productCategoryIds.filter(
        (productCategoryId: number) =>
          !productCategoryProcuts.find((item) => item.productCategoryId === productCategoryId),
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((productCategoryId: number) =>
            prisma.productCategoryProduct.create({
              data: {productId: id, productCategoryId},
            }),
          ),
        );
      }
    }
    const productCategoryProducts = await prisma.productCategoryProduct.findMany({
      where: {productId: id},
    });

    return res.status(200).json({updatedProduct, productCategoryProducts});
  } else if (method === "DELETE") {
    const {id} = req.query;
    const productId = Number(id);
    const isValid = productId;
    if (!isValid) res.status(400).send("Bad Request");
    const exist = await prisma.product.findFirst({where: {id: productId}});
    if (!exist) return res.status(401).send("Unauthorized Access");
    await prisma.product.update({data: {isArchived: true}, where: {id: productId}});
    return res.status(200).send("Ok");
  }
  return res.status(405).send("Invalid method");
}
