import {z} from "zod"

export const SignupBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const LoginBody = z.object({
    email: z.string().email(),
    password: z.string()
})