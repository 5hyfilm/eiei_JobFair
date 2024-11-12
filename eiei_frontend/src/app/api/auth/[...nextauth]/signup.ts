// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define user data with default role
    const userData = {
      email,
      password: hashedPassword,
      role: 'user', // Set role to "user" by default
    };

    // Save user to the database (pseudo-code)
    // await db.users.create(userData);

    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
