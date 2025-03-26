import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CreateForm from "../utils/CreateForm";

const CreateAccPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full px-6 pt-5 flex justify-between items-start">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36" />
        </Link>
        <p className="text-lg">Already have an account? <Link to="/signinpage" className="underline font-semibold">Sign in</Link></p>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <CreateForm />
      </div>
    </div>
  );
};

export default CreateAccPage;
