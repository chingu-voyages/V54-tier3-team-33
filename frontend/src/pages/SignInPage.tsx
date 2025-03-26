import React from "react";
import SigninForm from "../utils/SigninForm";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SignInPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="m-7 mr-auto mb-0 flex justify-center bg-red-50">
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
