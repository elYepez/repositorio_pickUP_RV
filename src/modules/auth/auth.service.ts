import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "PASSENGER" | "DRIVER";
  gender: "MALE" | "FEMALE" | "OTHER";
}

export class AuthService {
  static async register(data: RegisterData) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        gender: data.gender,
      },
    });

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }
}