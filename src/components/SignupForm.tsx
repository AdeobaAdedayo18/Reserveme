import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerUser } from "../utils/auth";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(8, { message: "8 characters, 1 UpperCase" }),
});
type FormData = z.infer<typeof schema>;
const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onsubmit = async (data: FormData) => {
    console.log(data);
    reset();
    // try {
    //   await registerUser(data);

    //   alert("Registration successful");
    // } catch (error: any) {
    //   if (error.message) {
    //     alert(error.message);
    //   }
    // }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white  p-8">
        <div className="text-left mb-6">
          <h1 className="text-4xl font-bold text-black">Book Your Event Now</h1>
          <p className="text-sm text-gray-500">
            Easily reserve your spot for upcoming events.
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p style={{ fontSize: "11px", color: "red", fontWeight: "bold" }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p style={{ fontSize: "11px", color: "red", fontWeight: "bold" }}>
                {errors.username.message}
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
              placeholder="password must be atleast 8 characters"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p style={{ fontSize: "11px", color: "red", fontWeight: "bold" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end mb-4 ">
            <a
              href="#"
              className="text-sm text-blue-500 underline hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B32406] text-white py-2 rounded-md hover:bg-transparent hover:border hover:border-rose-500 hover:text-[#B32406]"
          >
            Sign up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-blue-500 underline cursor-pointer"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
