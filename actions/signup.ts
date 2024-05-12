"use server"

import prisma from "@/db";
import bcrypt from "bcrypt";
import { SignupBody } from "@/zod/types";


export async function signupAction(prevData: any, formData: FormData){
    try {

        // const {name, email, password} = Object.fromEntries(formData); or below method to extract name, email and password
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log(name, email, password);

        // schema validation 
        const {success} = SignupBody.safeParse({name, email, password});
        if(!success)  throw new Error("Invalid inputs");

        // check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) throw new Error("User already exists");

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
        
        return {message: "User created successfully", success: true, email: user.email};
    } catch (error) {
        console.log(error);
    }
}

export async function verifyUserAccount(email: string){
    try {
         // check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!existingUser) return {message: "Unauthorized", success: false};

        await prisma.user.update({
            where: {
                email
            },
            data: {
                isVerified: true,
            }
        })


        return {message: "email verified successfully", success: true};
    } catch (error) {
        console.log(error);
        
    }
}