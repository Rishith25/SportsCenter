/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import MatchesListItems from "./MatchesListItems";

const MatchesList: React.FC = () => {
  const dispatchMatches = useMatchesDispatch();
  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);

  return (
    <div
      className="flex overflow-x-auto gap-2 pb-1 rounded-l-md py-2"
      style={{ width: "100%" }}
    >
      <MatchesListItems />
    </div>
  );
};
export default MatchesList;
