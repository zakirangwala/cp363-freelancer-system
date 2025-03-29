import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

// handles cart item operations (get, create, update, delete)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // fetch all cart items with related data
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

      // validate required fields
      if (!cartId || !serviceId || !quantity) {
        return res
          .status(400)
          .json({ error: "Cart ID, Service ID, and quantity are required" });
      }

      // create new cart item with relationships
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

      // validate required fields for update
      if (!id || !quantity) {
        return res.status(400).json({ error: "ID and quantity are required" });
      }

      // update cart item quantity
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

      // validate required fields for deletion
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      // remove cart item
      await prisma.cartItem.delete({
        where: { id: parseInt(id as string) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      return res.status(500).json({ error: "Error deleting cart item" });
    }
  } else {
    // handle unsupported methods
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
