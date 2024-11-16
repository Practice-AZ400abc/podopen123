import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req) {
  try {
    const { email, password, confirmPassword, role } = await req.json();

    if (!email || !password || !confirmPassword || !role) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      completedProfile: false,
      emailVerified: false,
    });

    await sendEmail({ email: user.email, userId: user._id, emailType: 'verify' });

    return NextResponse.json(
      { message: 'User registered successfully. Please verify your email.' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
