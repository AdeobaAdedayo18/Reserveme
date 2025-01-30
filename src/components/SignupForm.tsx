import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    ),
});

type FormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    reset();
    try {
      await registerUser(data);

      alert("Registration successful");
      navigate("/locations");
    } catch (error: any) {
      if (error.message) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto">
      <div className="text-left mb-6">
        <h1 className="text-4xl font-bold text-black">Book Your Event Now</h1>
        <p className="text-sm text-gray-500">
          Easily reserve your spot for upcoming events.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-black">
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B32406]"
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 font-bold">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-black">
            Full Name
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B32406]"
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-500 font-bold">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-black">
            Phone Number
          </label>
          <div className="flex">
            <div className="w-[100px] px-4 py-2 bg-gray-50 border rounded-l-md text-gray-500 flex items-center justify-center">
              +234
            </div>
            <input
              {...register("phoneNumber")}
              type="tel"
              placeholder="Enter your phone number"
              className="flex-1 px-4 py-2 border border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#B32406]"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-[11px] text-red-500 font-bold">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-black">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password must be at least 8 characters"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B32406]"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 font-bold">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#B32406] text-white py-2 rounded-md hover:bg-transparent hover:border hover:border-rose-500 hover:text-[#B32406] transition-all duration-200"
        >
          Sign up
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
