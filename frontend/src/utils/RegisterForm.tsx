import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import Button from "./Button";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded bg-white p-10 px-16 shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-semibold">Register</h2>
        <div className="flex flex-col gap-6">
          {/* first name */}
          <div className="relative flex items-center">
            <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
            <div className="w-full">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
          </div>
          {/* last name */}
          <div className="relative flex items-center">
            <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
            <div className="w-full">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
          </div>
          {/* /////////// */}
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
          <div className="relative flex items-center">
            <KeyIcon className="mr-3 h-5 w-5 text-gray-400" />
            <div className="w-full">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full rounded border px-3 py-2"
                  required
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-400"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="mr-2"
              required
            />
            <label htmlFor="agreeToTerms" className="text-gray-700">
              I agree to the terms of service
            </label>
          </div>
        </div>
        <Button type="submit" className="mx-auto mt-10 block">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
