import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import calendarlogo from "../assets/Black and Red Minimal Calendar with Clock Logo (2).svg";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { loginUser, registerUser } from "../utils/auth";
import { getSession } from "../utils/session";
const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters" }),
});
type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onsubmit = async (data: FormData) => {
    console.log(data);
    reset();
    try {
      const response = await loginUser(data);
      response.detail == "Invalid Credentials"
        ? alert("Registration successful")
        : alert("Login successful");
    } catch (error: any) {
      if (error.message) {
        alert(error.message);
      }
    }
    navigate("/locations");
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex justify-center items-center space-x-1">
          <p className="text-3xl font-bold text-[#B32406]">Reserve Me</p>
          <img className="h-16" src={calendarlogo} alt="Calendar Logo" />
        </div>
        <div className="w-full max-w-md bg-white  p-8">
          <div className="text-left mb-6">
            <h1 className="text-3xl font-bold text-black text-center">
              Want to host an event?
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Just a few steps away, please enter your details...
            </p>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic placeholder:text-slate-400"
              />
              {errors.email && (
                <p
                  style={{ fontSize: "11px", color: "red", fontWeight: "bold" }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border placeholder:italic placeholder:text-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p
                  style={{ fontSize: "11px", color: "red", fontWeight: "bold" }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mb-4 ">
              <a
                href="#"
                className="text-sm text-blue-800 font-semibold  hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B32406] text-white py-2  rounded-md hover:bg-transparent hover:border hover:border-rose-500 hover:text-[#B32406]"
            >
              Sign in
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-sm text-blue-800 font-semibold  hover:underline cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
