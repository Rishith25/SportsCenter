import React from "react";

import MatchDetails from "./MatchDetails";

import { Outlet } from "react-router-dom";

const MatchDetailsIndex: React.FC = () => {
  return (
    <>
      <MatchDetails />
      <Outlet />
    </>
  );
};

export default MatchDetailsIndex;