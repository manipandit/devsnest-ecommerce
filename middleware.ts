import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {jwtVerify, decodeJwt, type JWTPayload} from "jose"


export async function middleware(request: NextRequest) {
    const cookie = cookies().get('token');
    const token = cookie?.value;

    if(!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    } 

    // verify jwt token
    const isValidToken = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY || ""));

    if(!isValidToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    const payload: JWTPayload = decodeJwt(token);
    // console.log("payload: ", payload)
    
    // mount userId to req headers 
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set('userId', payload.id as string);
    reqHeaders.set('randomToken', "mani");

    // console.log(reqHeaders);

    return NextResponse.next({
        request: {
           headers: reqHeaders,
        }
    });
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/api/category/select'],
}