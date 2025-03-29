import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const services = await prisma.service.findMany({
        include: {
          freelancer: true,
        },
      });
      return res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ error: "Error fetching services" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, description, price, freelancerID } = req.body;

      if (!name || !description || !price || !freelancerID) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const service = await prisma.service.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          freelancerID: parseInt(freelancerID),
        },
        include: {
          freelancer: true,
        },
      });

      return res.status(201).json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      return res.status(500).json({ error: "Error creating service" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
