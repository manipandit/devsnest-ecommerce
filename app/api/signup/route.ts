import prisma from "@/db";
import { SignupBody } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // schema validation 
    const {success} = SignupBody.safeParse(body);
    if(!success) return NextResponse.json({message:"Invalid inputs", success: false});

    // check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(existingUser) return NextResponse.json({message: "User already exists", success : false});

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // add the user to the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({message: "User created successfully", success: true, id: user.id});
  } catch (error) {
    
    return NextResponse.json({message: "Error creating user", error: error});
  }
}

export async function PUT(req: NextRequest){
  try {
    const {userId} = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    console.log("user: ",user)
    if(!user){
      return NextResponse.json({message: "User not found", success: false});
    }

    const verifiedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isVerified: true
      }
    })

     console.log(verifiedUser)

    return NextResponse.json({message: "Email verification successful", success: true});
  } catch (error) {
    return NextResponse.json({message: "Error verifying email", error: error});
  }
}
