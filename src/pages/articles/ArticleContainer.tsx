import React, { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { Outlet } from "react-router-dom";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";

const ArticleContainer = () => {
  const articleDispatch = useArticlesDispatch();
  const sportsDispatch = useSportsDispatch()
  const preferencesDispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
    fetchSports(sportsDispatch)
    fetchPreferences(preferencesDispatch);
  }, [articleDispatch, sportsDispatch, preferencesDispatch]);
  return <Outlet />;
};

export default ArticleContainer;