import React, { useEffect } from "react";
import { useMatchesDispatch } from "../../context/matches/context";
import { Outlet } from "react-router-dom";
import { fetchMatches } from "../../context/matches/actions";

const MatchesContainer = () => {
  const dispatchMatches = useMatchesDispatch();
  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, [dispatchMatches]);
  return <Outlet />;
};

export default MatchesContainer;