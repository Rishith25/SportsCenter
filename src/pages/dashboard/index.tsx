import React, { Suspense, useEffect } from "react";
import Matches from "../matches";
import Articles from "../articles";
import Filter from "../filter";
import ErrorBoundary from "../../components/ErrorBoundary";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchPreferences } from "../../context/preferences/actions";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchSports } from "../../context/sports/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchTeams } from "../../context/teams/actions";
import { useTeamsDispatch } from "../../context/teams/context";

const Dashboard: React.FC = () => {
  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();
  const articlesDispatch = useArticlesDispatch()
  const preferencesDispatch = usePreferencesDispatch();

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
    fetchArticles(articlesDispatch)
    fetchPreferences(preferencesDispatch);
  }, []);
  return (
    <div className=" min-h-screen">
      <div className="bg-white p-4 shadow rounded-lg mb-4">
        <h3 className="text-xl text-black font-semibold">Matches</h3>
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <Matches />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="flex">
        <div className="w-3/4 p-4 shadow rounded-lg bg-white text-black">
          <h3 className="text-xl font-semibold mb-4">News</h3>
          <ErrorBoundary>
            <Suspense
              fallback={<div className="suspense-loading">Loading...</div>}
            >
              <Articles />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="w-1/4 p-4 shadow rounded-lg bg-white text-black ml-4">
          <h3 className="text-xl font-semibold mb-4">Filter</h3>
          <ErrorBoundary>
            <Suspense
              fallback={<div className="suspense-loading">Loading...</div>}
            >
              <Filter />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;