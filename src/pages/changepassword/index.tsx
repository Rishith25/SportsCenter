import React from "react";

import { Outlet } from "react-router-dom";
import ChangePassword from "./ChangePassword";

const ChangePasswordIndex: React.FC = () => {
  return (
    <>
      <ChangePassword />
      <Outlet />
    </>
  );
};

export default ChangePasswordIndex;