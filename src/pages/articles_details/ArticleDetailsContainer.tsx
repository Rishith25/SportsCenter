/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { articleDetails } from "../../context/articles/actions";
import { Outlet, useParams } from "react-router-dom";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";

const ArticleDetailsContainer = () => {
  const { articleID } = useParams<{ articleID: string}>();
  const articleDetailsDispatch = useArticlesDispatch();
  const preferencesDispatch = usePreferencesDispatch();
  useEffect(() => {
    articleDetails(articleDetailsDispatch, articleID);
    fetchPreferences(preferencesDispatch);
  }, [articleDetailsDispatch, articleID],);
  return <Outlet />;
};

export default ArticleDetailsContainer;