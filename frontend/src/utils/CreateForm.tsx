import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

const CreateForm: React.FC = () => {
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
      console.log(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full px-3">
        <h2 className="mb-6 text-3xl font-semibold">Create an Account</h2>
        <div className="flex w-96 flex-col gap-4">
          {/* first name */}
          <div className="flex gap-4">
            <div className="relative flex items-center">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="formInput"
                required
              />
            </div>
            {/* last name */}
            <div className="relative flex items-center">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="formInput"
                required
              />
            </div>
          </div>
          {/* email */}
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
          {/* password */}
          <div className="relative flex items-center">
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
          {/* confirm password */}
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="formInput"
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
        <Button type="submit" className="mt-5 w-full">
          Create an Account
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
