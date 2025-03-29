import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cartItems = await prisma.cartItem.findMany({
        include: {
          service: true,
          cart: true,
        },
      });
      return res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return res.status(500).json({ error: "Error fetching cart items" });
    }
  } else if (req.method === "POST") {
    try {
      const { cartId, serviceId, quantity } = req.body;

      if (!cartId || !serviceId || !quantity) {
        return res
          .status(400)
          .json({ error: "Cart ID, Service ID, and quantity are required" });
      }

      const cartItem = await prisma.cartItem.create({
        data: {
          cartID: parseInt(cartId),
          serviceID: parseInt(serviceId),
          quantity: parseInt(quantity),
        },
        include: {
          service: true,
          cart: true,
        },
      });

      return res.status(201).json(cartItem);
    } catch (error) {
      console.error("Error creating cart item:", error);
      return res.status(500).json({ error: "Error creating cart item" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, quantity } = req.body;

      if (!id || !quantity) {
        return res.status(400).json({ error: "ID and quantity are required" });
      }

      const cartItem = await prisma.cartItem.update({
        where: { id: parseInt(id) },
        data: { quantity: parseInt(quantity) },
        include: {
          service: true,
          cart: true,
        },
      });

      return res.status(200).json(cartItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      return res.status(500).json({ error: "Error updating cart item" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      await prisma.cartItem.delete({
        where: { id: parseInt(id as string) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      return res.status(500).json({ error: "Error deleting cart item" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
