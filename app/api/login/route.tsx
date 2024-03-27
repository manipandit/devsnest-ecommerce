import prisma from "@/db";
import { LoginBody } from "@/zod/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { createSecretKey } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // schema validation
    const { success } = LoginBody.safeParse(body);
    if (!success)
      return NextResponse.json({ message: "Invalid Inputs", success: false });

    // check if user doesnt exist
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json({
        message: "User does not exist",
        success: false,
        redirect: "/signup",
      });
    }

    // check if the user is verified or not
    const isVerified = existingUser.isVerified;
    if (!isVerified) {
      return NextResponse.json({
        message: "Email is not verified",
        success: false,
        redirect: `/verify/?id=${existingUser.id}`,
      });
    }

    // check if email and password are correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid)
      return NextResponse.json({
        message: "Incorrect password",
        success: false,
      });

    // generate a jwt token
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    const secret = createSecretKey(process.env.JWT_SECRET_KEY || "", "utf-8");
    const alg = "HS256";

    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg })
      .sign(secret);

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 30 * 1000,
    });

    return NextResponse.json({ message: "Login successful", success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error logging in", error: error });
  }
}
