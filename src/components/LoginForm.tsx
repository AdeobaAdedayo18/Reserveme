import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import calendarlogo from "../assets/Black and Red Minimal Calendar with Clock Logo (2).svg";
import { loginUser } from "../utils/auth";
const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters" }),
});
type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const params = new URLSearchParams(location.search);
  const callbackUrl = params.get("callbackUrl") || "/locations";
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success === false) {
        toast({ title: "Authentication failed", variant: "destructive" });
      } else {
        // Preserve ALL booking parameters including selectedSlots
        const bookingParams = new URLSearchParams({
          purpose: params.get("purpose") || "",
          date: params.get("date") || "",
          selectedSlots: params.get("selectedSlots") || "",
          startTime: params.get("startTime") || "",
          endTime: params.get("endTime") || "",
        });

        if ((await response).role === "admin") {
          navigate("/admin");
        } else {
          // Pass ALL parameters to callback URL
          navigate(`${callbackUrl}?${bookingParams.toString()}`);
        }
        toast({ title: "Authentication Successful" });
        reset();
      }
    } catch (error) {
      toast({ title: "Authentication failed", variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex justify-center items-center space-x-1">
          <p className="text-3xl font-bold text-rose-600">ReserveMe</p>
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#B32406] text-white py-2  rounded-md hover:bg-transparent hover:border hover:border-rose-500 hover:text-[#B32406]"
            >
              {isLoading ? "Loading..." : "Sign in"}
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
