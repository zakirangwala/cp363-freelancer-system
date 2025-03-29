import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

// handles order operations (get all orders)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // fetch all orders with related user, cart, and order items
      const orders = await prisma.order.findMany({
        include: {
          user: true,
          cart: true,
          orderItems: {
            include: {
              service: true,
              freelancer: true,
            },
          },
        },
      });
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ error: "Error fetching orders" });
    }
  } else {
    // handle unsupported methods
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
