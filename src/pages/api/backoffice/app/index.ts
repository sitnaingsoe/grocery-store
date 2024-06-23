import {prisma} from "@/utils/prisma";
import type {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

// Serverless function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    const session = await getSession({req});
    if (session) {
      const {user} = session;
      console.log(session);
    }

    return res.status(200).send("OK GET location");
  } else if (method === "POST") {
    return res.status(200).send("OK GET location");
  } else if (method === "PUT") {
    return res.status(200).send("OK GET location");
  } else if (method === "DELETE") {
    return res.status(200).send("OK GET location");
  }
  return res.status(405).send("Invalid method");
}
