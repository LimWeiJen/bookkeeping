import { client } from '../database';
import { verifyToken } from '../auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { Entry } from '../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Verify JWT token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decodedToken = verifyToken(token);
    if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' });

    try {
      await client.connect();
      const db = client.db("database");

      // Retrieve user data based on the user ID from the decoded token
      const username = decodedToken;
      const user = await db.collection('users').findOne({ username: username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const entries: Array<Entry> = req.body.entries;

      await db.collection('users').updateOne({ username }, { $push: {
        entires: [...entries]
      }})
      
      return res.status(201).json({ message: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
