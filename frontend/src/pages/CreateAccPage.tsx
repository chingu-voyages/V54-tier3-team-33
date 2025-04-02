import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CreateForm from "../utils/CreateForm";

const CreateAccPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col text-darktext">
      <div className="flex w-full items-start justify-between px-6 pt-5">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36" />
        </Link>
        <span className="flex gap-1">
          <p className="sm:block text-lg hidden">Already have an account? </p>
          <Link to="/signinpage" className="font-semibold underline">
            {" "}
            Sign in
          </Link>
        </span>
      </div>
      <div className="flex items-center justify-center">
        <CreateForm />
      </div>
    </div>
  );
};

export default CreateAccPage;
