import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
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
      console.log((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full px-3">
        <h2 className="mb-6 text-3xl text-center font-semibold">
          Sign in to your account
        </h2>
        <p className="mb-6 text-center">
          New to eBay?{" "}
          <Link to="/createacc" className="underline">
            Create account
          </Link>{" "}
        </p>
        <div className="flex w-96 flex-col gap-4">
          <div className="relative flex items-center">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="formInput"
              required
            />
          </div>
          <div className="relative flex items-center">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="formInput"
                required
              />
              <div
                className="absolute top-1/2 right-1 -translate-y-1/2 transform cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlashIcon className="size-9 p-2" />
                ) : (
                  <EyeIcon className="size-9 p-2" />
                )}
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-5 w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
