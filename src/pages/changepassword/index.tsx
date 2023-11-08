import React from "react";

import { Outlet } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { ToastContainer } from "react-toastify";

const ChangePasswordIndex: React.FC = () => {
  return (
    <>
      <ChangePassword />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default ChangePasswordIndex;