import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Layout: React.FC = () => {
  return (
    <>
      <Header showAdvertising={true} />
      <Outlet />
    </>
  );
};

export default Layout;
