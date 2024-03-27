import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

// test endpoint to seed the database with categories data
export async function POST(req: NextRequest){
    try {
        const categories = await req.json();

        const data = await prisma.category.createMany({
            data: categories
        })
        return NextResponse.json({message: "Added categories successfully", success: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Something went wrong", success: false})
    }
}

export async function GET(){
    try {
        const products = await prisma.category.findMany();

        return NextResponse.json({products});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Something went wrong", success: false})
    }
}