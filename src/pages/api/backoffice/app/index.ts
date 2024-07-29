import {prisma} from "@/utils/prisma";
import type {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

// Serverless function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  try {
    if (method === "GET") {
      const session = await getSession({req});
      if (session) {
        const {user} = session;
        if (user) {
          const name = user?.name as string;
          const email = user?.email as string;

          const userFromDb = await prisma.user.findFirst({where: {email}});
          if (userFromDb) {
            const company = await prisma.company.findFirst({where: {userId: userFromDb.id}});
            if (company) {
              const productCategories = await prisma.productCategory.findMany({
                where: {companyId: company.id, isArchived: false},
              });

              const productCategoriesIds = productCategories.map((item) => item.id);
              const productCategoryProducts = await prisma.productCategoryProduct.findMany({
                where: {productCategoryId: {in: productCategoriesIds}},
              });
              const productIds = productCategoryProducts.map((item) => item.productId);

              const products = await prisma.product.findMany({
                where: {id: {in: productIds}, isArchived: false},
              });

              return res.status(200).json({
                message: "User already exists in the database",
                company,
                productCategories,
                products,
                user: userFromDb,
                productCategoryProducts,
              });
            }
          } else {
            const newUser = await prisma.user.create({
              data: {name, email},
            });
            const newCompany = await prisma.company.create({
              data: {
                name: "Default company",
                email: "Default email",
                city: "Default city",
                userId: newUser.id,
              },
            });

            const companyId = newCompany.id;
            const defaultProductCategory = await prisma.productCategory.create({
              data: {
                name: "default ProductCategory",
                isAvailable: true,
                companyId,
                isArchived: false,
              },
            });

            const productCategoryId = defaultProductCategory.id;
            const defaultProduct = await prisma.product.create({
              data: {
                name: "default Product",
                price: 0,
                isArchived: false,
              },
            });
            const defaultProductCategoryProduct = await prisma.productCategoryProduct.create({
              data: {
                productId: defaultProduct.id,
                productCategoryId: productCategoryId,
              },
            });

            return res.status(200).json({
              company: newCompany,
              user: newUser,
              products: [defaultProduct],
              productCategories: [defaultProductCategory],
              productCategoryProducts: [defaultProductCategoryProduct],
            });
          }
        } else {
          return res.status(401).json({message: "User not authenticated"});
        }
      } else {
        return res.status(401).json({message: "Session not found"});
      }
    } else if (method === "POST") {
      return res.status(200).send("OK POST location");
    } else if (method === "PUT") {
      return res.status(200).send("OK PUT location");
    } else if (method === "DELETE") {
      return res.status(200).send("OK DELETE location");
    } else {
      return res.status(405).send("Invalid method");
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({message: "Internal server error", error: error.message});
  }
}
