// src/app/api/user/me/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    // 1. Connect to MongoDB
    await connectToDatabase();

    // 2. Verify the JWT in the cookie and get payload
    const { id: userId } = verifyToken(req);

    // 3. Look up the user in the database
    const user = await User.findById(userId)
      .select('name email')
      .lean() as { _id: any; name: string; email: string } | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 4. Return the profile
    return NextResponse.json({
      id:    user._id.toString(),
      name:  user.name,
      email: user.email,
    });
  } catch (err) {
    // If token is invalid or missing:
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
