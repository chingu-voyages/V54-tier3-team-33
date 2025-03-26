import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful", data);

      // Navigate to profile page
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full rounded p-10 px-16">
        <h2 className="mb-3 text-center text-3xl font-semibold">
          Sign in to your account
        </h2>
        <p className="mb-6 text-center">
          New to eBay? <Link to="/createacc" className="underline">Create account</Link>{" "}
        </p>
        <div className="flex flex-col gap-6">
          <div className="relative flex items-center">
            <EnvelopeIcon className="mr-3 h-5 w-5 text-gray-400" />
            <div className="w-full">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
          </div>
          <div className="relative flex items-center">
            <LockClosedIcon className="mr-3 h-5 w-5 text-gray-400" />
            <div className="w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded border px-3 py-2"
                  required
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-400"
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
          </div>
        </div>
        <Button type="submit" className="mx-auto mt-10 block">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
