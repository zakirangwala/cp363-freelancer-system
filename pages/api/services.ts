import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    db.query("SELECT * FROM Service", (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { title, description, price, freelancerId } = req.body;
    db.query(
      "INSERT INTO Service (title, description, price, freelancerId) VALUES (?, ?, ?, ?)",
      [title, description, price, freelancerId],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res
            .status(201)
            .json({ message: "Service created successfully", results });
        }
      }
    );
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
