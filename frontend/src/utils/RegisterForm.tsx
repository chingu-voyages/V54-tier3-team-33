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
    username: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form submission logic here
    alert("Form submitted");
    console.log("Form submitted", formData);
    // clear form
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
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
        className="w-full max-w-sm rounded bg-white p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>
        <div className="flex flex-col gap-6">
          <div className="relative flex items-center">
            <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
            <div className="w-full">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
          </div>
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
        <Button
          type="submit"
          className="mt-4 w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
