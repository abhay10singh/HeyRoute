// src/lib/auth.js
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('Define JWT_SECRET in .env.local');

export function signToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET);
}

export function verifyToken(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, JWT_SECRET) as { id: string };
}