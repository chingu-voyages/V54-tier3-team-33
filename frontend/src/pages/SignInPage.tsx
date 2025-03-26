import React from "react";
import SigninForm from "../utils/SigninForm";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SignInPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex justify-center mr-auto mb-0 bg-red-50 m-7">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;