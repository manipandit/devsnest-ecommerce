"use client";
import { signupAction } from "@/actions/signup";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { generateOTP } from "@/utils/otp";
import axios from "axios";

function SubmitButton() {
  const { pending } = useFormStatus();
  // console.log("isPending: ", pending);

  return (
    <div className="pt-10 flex justify-center">
      <Button label="Create Account" pending={pending} />
    </div>
  );
}
export default function Signup() {
  const { push } = useRouter();
  const [state, formAction] = useFormState(signupAction, null);

  useEffect(() => {
    if (state?.success) {
      const email = state.email;

      const otp = generateOTP();
      localStorage.setItem("otp", otp);

      axios.post(`/api/send`, { email, otp }).then(() => {
        push(`/verify?email=${email}`);
      });
    }
  }, [state?.success]); // Run only when state.success changes

  return (
    <div>
      <div className="w-[576px] h-[691px] mb-6  border border-[#C1C1C1] rounded-[20px] mt-[40px]">
        <div className="text-[32px] font-semibold flex justify-center pt-6">
          Create your account
        </div>
        <form action={formAction}>
          <div className="pt-5 flex justify-center">
            <Input
              label="Name"
              placeholder="Enter name"
              type="text"
              name="name"
              // onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="pt-5 flex justify-center">
            <Input
              label="Email"
              placeholder="Enter email"
              type="email"
              name="email"
              // onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="pt-5 flex justify-center">
            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
              name="password"
              // onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <SubmitButton />
        </form>
        <div className="pt-10 text-[#333333] flex justify-center">
          Have an Account?
          <Link
            href={"/login"}
            className="text-[16px] pl-3 text-black font-medium"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
