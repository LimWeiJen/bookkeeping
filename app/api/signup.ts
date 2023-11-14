// pages/api/signup.js

import { client } from '../database';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      await client.connect();
      const db = client.db("database")

      // Check if the username already exists
      const existingUser = await db.collection('users').findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      // TODO: add a proper user object
      const newUser = {
        username,
        password: hashedPassword,
      };

      await db.collection('users').insertOne(newUser);

      // Generate JWT token for the new user
      const token = generateToken(username);

      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
