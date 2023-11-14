import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (username: string) => {
  return jwt.sign(username, process.env.JWT_KEY!);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY!);
  } catch (err) {
    return null;
  }
};
