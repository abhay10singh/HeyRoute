// src/app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/models/User'     

const SignupSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(3).max(100).email(),
  password: z.string().min(8).max(30),
})

export async function POST(req: NextRequest) {
  try {
    const parsed = SignupSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }
    const { name ,email, password } = parsed.data

    console.log('Connecting to Mongo…')
    await connectToDatabase()
    console.log('Mongo connected')

    if (await User.findOne({ email })) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    // Generate and store salt if your schema expects it:
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await User.create({ name , email, password: hash , salt })

    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
