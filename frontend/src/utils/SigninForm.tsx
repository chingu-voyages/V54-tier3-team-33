import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

const SigninForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
      email: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded bg-white p-10 px-16 shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-semibold">Sign In</h2>
        <div className="flex flex-col gap-6">
          <div className="relative flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
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
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-3" />
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
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-10 mx-auto block"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;