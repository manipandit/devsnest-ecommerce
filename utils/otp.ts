export function generateOTP() {
  let otp = '';
  for (let i = 0; i < 8; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit from 0 to 9
  }
  console.log("Generated OTP:", otp);
  return otp;
}

