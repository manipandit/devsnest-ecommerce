import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const url = new URL(req.url);
        const categoryId = url.searchParams.get('categoryId') || "";

    
       const headers = new Headers(req.headers);
       const userId = headers.get('userId') ||  '';
        // console.log(userId, categoryId);

        // check if the selection table has this categoryId for this user and if yes then delete the category, else add

        const category = await prisma.selection.findFirst({
            where:{
                categoryId,
                userId
            }
        })


        // if there is no category in the selection table then add it to the table
        if(!category){
            const newCategory = await prisma.selection.create({
                data: {
                    categoryId: categoryId,
                    userId: userId
                }
            })
            // console.log(newCategory);
            return NextResponse.json({message: "Selected category", success: true});
        }

        // delete the category
        const removedCategory = await prisma.selection.delete({
            where: {
                selectionId: category.selectionId
            }
        })
        return NextResponse.json({message: "removed category from saved list", success: true});
    } catch (error) {
            return NextResponse.json({message: "Something went wrong", success: false});
        
    }
}

export async function GET(req: NextRequest){
    try {
        const headers = new Headers(req.headers);
        const userId = headers.get('userId') ||  '';
        const selectedCategories = await prisma.selection.findMany({
            where: {
                userId
            },
            select: {
                categoryId: true
            }
        });

        return NextResponse.json({selectedCategories});
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", success: false});
        
    }
}