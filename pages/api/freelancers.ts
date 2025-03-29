import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const freelancers = await prisma.freelancer.findMany({
        include: {
          services: true,
          orderItems: true,
        },
      });
      return res.status(200).json(freelancers);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      return res.status(500).json({ error: "Error fetching freelancers" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, freelancerOrigin, yearsOfExperience } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const freelancer = await prisma.freelancer.create({
        data: {
          name,
          freelancerOrigin: freelancerOrigin || null,
          yearsOfExperience: yearsOfExperience
            ? parseInt(yearsOfExperience)
            : null,
        },
        include: {
          services: true,
        },
      });

      return res.status(201).json(freelancer);
    } catch (error) {
      console.error("Error creating freelancer:", error);
      return res.status(500).json({ error: "Error creating freelancer" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
