import * as React from "react";
import Appbar from "./Appbar";
import { Outlet } from "react-router-dom";
import Dashboard from "../../pages/dashboard";
import { useArticlesDispatch } from "../../context/articles/context";
import { useSportsDispatch } from "../../context/sports/context";
import { useMatchesDispatch } from "../../context/matches/context";
import { useTeamsDispatch } from "../../context/teams/context";
import { fetchMatches } from "../../context/matches/actions";
import { fetchArticles } from "../../context/articles/actions";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";
import { useEffect } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const AccountLayout = () => {
  const ArticlesDispatch = useArticlesDispatch();
  const SportsDispatch = useSportsDispatch();
  const MatchesDispatch = useMatchesDispatch();
  const TeamsDispatch = useTeamsDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
    fetchArticles(ArticlesDispatch);
    fetchSports(SportsDispatch);
    fetchTeams(TeamsDispatch);
  }, []);
  return (
    <>
      <ErrorBoundary>
        <Appbar />
        <main>
          <div className="py-6 px-2">
            <Dashboard/>
            <Outlet />
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default AccountLayout;
