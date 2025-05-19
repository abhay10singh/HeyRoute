import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) return invalidCredentials();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return invalidCredentials();

    const token = signToken(user._id);
   // app/api/auth/login/route.ts
const response = NextResponse.json(
  { success: true, user: { id: user._id, name: user.name } },
  { status: 200 }
);

response.cookies.set({
  name: 'token',
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
  domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
});
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function invalidCredentials() {
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
