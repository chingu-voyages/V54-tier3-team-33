import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuthenticatedUser } from "../store/slices/authSlice.ts";
import { AppDispatch } from "../store/store.ts";
import toast from "react-hot-toast";

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      dispatch(fetchAuthenticatedUser());
      navigate("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      console.log((error as Error).message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const autoFillTestAccount = () => {
    setFormData({
      email: "predragjan944@gmail.com",
      password: "987654321111",
    });
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="xs:w-[450px] w-full px-4">
        <h2 className="mb-6 text-center text-3xl font-semibold">
          Sign in to your account
        </h2>
        <p className="mb-6 text-center">
          New to eBuy?{" "}
          <Link
            to="/createacc"
            className="text-primary font-semibold underline"
          >
            Create account
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="formInput w-full" // ✅ added w-full just like in create page
              required
            />
          </div>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="formInput w-full" // ✅ added w-full
              required
            />
            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer" // ✅ matched icon placement
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
          className="mt-5 w-full"
        >
          {" "}
          {/* ✅ consistent button styling */}
          Sign In
        </Button>
        <div className="text-darktext/70 mt-5 flex flex-col items-center gap-4 rounded-xl bg-gray-200/40 p-4 text-center">
          {" "}
          {/* ✅ matched info section style */}
          <p>You can also use our account for testing purposes</p>
          <Button
            variant="secondary"
            className="border-primary/40 w-full text-sm !font-medium" // ✅ full width button
            onClick={autoFillTestAccount}
          >
            Use test account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
