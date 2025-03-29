import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

// handles cart operations (get all carts, create new cart)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // fetch all carts with related items and services
      const carts = await prisma.cart.findMany({
        include: {
          items: {
            include: {
              service: {
                include: {
                  freelancer: true,
                },
              },
            },
          },
          user: true,
        },
      });
      return res.status(200).json(carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
      return res.status(500).json({ error: "Error fetching carts" });
    }
  } else if (req.method === "POST") {
    try {
      const { userId } = req.body;

      // validate required fields
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // create new cart with relationships
      const cart = await prisma.cart.create({
        data: {
          userID: parseInt(userId),
        },
        include: {
          items: {
            include: {
              service: {
                include: {
                  freelancer: true,
                },
              },
            },
          },
          user: true,
        },
      });

      return res.status(201).json(cart);
    } catch (error) {
      console.error("Error creating cart:", error);
      return res.status(500).json({ error: "Error creating cart" });
    }
  } else {
    // handle unsupported methods
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
