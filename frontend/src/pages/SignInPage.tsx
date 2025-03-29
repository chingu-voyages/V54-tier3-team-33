import React from "react";
import SigninForm from "../utils/SigninForm";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SignInPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col text-darktext">
      <div className="flex w-full items-start justify-between px-6 pt-5">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36" />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;
