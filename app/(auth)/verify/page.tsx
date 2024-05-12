"use client";
import Button from "@/components/Button";
import Code from "@/components/Code";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Suspense } from "react";
import { verifyUserAccount } from "@/actions/signup";

export default function Verify() {
  const [codeValues, setCodeValues] = useState<string[]>(Array(8).fill(""));
  const { push } = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const handleChange = (index: number, value: string) => {
    const newCodeValues = [...codeValues];
    newCodeValues[index] = value;
    setCodeValues(newCodeValues);
  };

  const verifyOtp = async () => {
    const userOtp = codeValues.join("");
    const otp = localStorage.getItem("otp");

    if (userOtp === otp) {
      localStorage.removeItem("otp");

      const data = await verifyUserAccount(email || "");

      if (data?.success) {
        toast.success("Email verified successfully");
        push("/login");
      }
    } else {
      toast.error("Invalid OTP, enter correct otp to verify");
    }
  };
  return (
    <Suspense>
      <div>
        <div className="w-[576px] h-[453px] border border-[#C1C1C1] rounded-[20px] mt-[40px]">
          <div className="text-[32px] font-semibold flex justify-center pt-6">
            Verify your email
          </div>
          <div className="pt-5 w-full  flex justify-center text-[16px] font-normal">
            <span className="max-w-[334px] text-center">
              Enter the 8 digit code you have received on{" "}
              <span className="font-medium">
                {email ? email.substring(0, 3) : "anu"}***@gmail.com
              </span>
            </span>
          </div>
          <div className="pt-11 w-full  flex flex-col gap-y-2 px-16">
            <div className="flex justify-start text-[16px] font-normal">
              Code
            </div>
            <div className="flex justify-center gap-x-3">
              {codeValues.map((value, index) => (
                <Code
                  key={index}
                  value={value}
                  onChange={(newValue) => handleChange(index, newValue)}
                />
              ))}
            </div>
          </div>

          <div className="pt-20 flex justify-center">
            <Button label="Verify" onClick={verifyOtp} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
