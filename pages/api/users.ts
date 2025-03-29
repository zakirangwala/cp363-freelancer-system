import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    db.query("SELECT * FROM User", (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { name, email, password } = req.body;
    db.query(
      "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res
            .status(201)
            .json({ message: "User created successfully", results });
        }
      }
    );
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
