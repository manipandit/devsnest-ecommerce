import { sendMail } from "@/utils/email";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const {email, otp} = await request.json();
  try {
    await sendMail(
          "Ecommerce - OTP for email verification",
          email,
          `Hi,
            Thank you for choosing Ecommerce. Use the following OTP to complete to verify your email address
            
            ${otp}`
        );

      return NextResponse.json({"message": "Email sent successfully"}, {status: 200});
  } catch (error) {
      return NextResponse.json({"message": "Something went wrong"}, {status: 500});
    
  }
}
