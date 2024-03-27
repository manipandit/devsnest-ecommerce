"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SignUp {
  name: string;
  email: string;
  password: string;
}
export default function Signup() {
  const { push } = useRouter();
  const [signup, setSignup] = useState<SignUp>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (field: string, value: string) => {
    setSignup((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const signupHandler = async () => {
    try {
      const { data } = await axios.post(`/api/signup`, signup, {
        withCredentials: true,
      });

      if (!data.success) {
        alert(data.message);
        return;
      }

      if (data.success) push(`/verify/?id=${data.id}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="w-[576px] h-[691px] mb-6  border border-[#C1C1C1] rounded-[20px] mt-[40px]">
        <div className="text-[32px] font-semibold flex justify-center pt-6">
          Create your account
        </div>
        <div className="pt-5 flex justify-center">
          <Input
            label="Name"
            placeholder="Enter name"
            type="text"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="pt-5 flex justify-center">
          <Input
            label="Email"
            placeholder="Enter email"
            type="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="pt-5 flex justify-center">
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div className="pt-10 flex justify-center">
          <Button label="Create Account" onClick={signupHandler} />
        </div>
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
