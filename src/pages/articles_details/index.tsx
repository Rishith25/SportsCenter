import React from "react";

import ArticleDetails from "./ArticleDetails";

import { Outlet } from "react-router-dom";

const ArticleDetailsIndex: React.FC = () => {
  return (
    <>
      <ArticleDetails />
      <Outlet />
    </>
  );
};

export default ArticleDetailsIndex;