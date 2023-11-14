import { client } from '../database';
import { verifyToken } from '../auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

      // Exclude sensitive information like password before sending the response
      const { password, ...userData } = user;

      res.status(200).json({ user: userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
