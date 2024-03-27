"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Login {
  email: string;
  password: string;
}

export default function Login() {
  const { push } = useRouter();
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setLogin((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const loginHandler = async () => {
    try {
      const { data } = await axios.post(`/api/login`, login, {
        withCredentials: true,
      });

      if (!data.success) {
        toast.error(data.message);
        if (data?.redirect) push(data.redirect);
      }

      if (data.success) push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="w-[576px] h-[614px] mb-6  border border-[#C1C1C1] rounded-[20px] mt-[40px]">
        <div className="text-[32px] font-semibold flex justify-center pt-6">
          Login
        </div>
        <div className="pt-8 flex justify-center font-medium text-[24px] leading-7">
          Welcome back to ECOMMERCE
        </div>
        <div className="pt-3  flex justify-center text-[16px] font-normal">
          The next gen business marketplace
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
          <Button label="Login" onClick={loginHandler} />
        </div>

        <div className="pt-10 text-[#333333] flex justify-center">
          Don't have an Account?
          <Link
            href={"/signup"}
            className="text-[16px] pl-3 text-black font-medium"
          >
            SIGNUP
          </Link>
        </div>
      </div>
    </div>
  );
}
