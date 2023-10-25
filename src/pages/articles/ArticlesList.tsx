/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ArticlesListItems from "./ArticlesListItems";
import { fetchSports } from "../../context/sports/actions";
import {
  useSportsState,
  useSportsDispatch,
} from "../../context/sports/context";
import { fetchPreferences } from "../../context/preferences/actions";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import {
  useArticlesState,
  useArticlesDispatch,
} from "../../context/articles/context";
import { useTeamsState, useTeamsDispatch } from "../../context/teams/context";

const ArticlesList: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  
  const sportState: any = useSportsState();
  const teamsState: any = useTeamsState();
  const articlesState: any = useArticlesState();
  const preferencesState: any = usePreferencesState();

  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();
  const articleDispatch = useArticlesDispatch();
  const preferencesDispatch = usePreferencesDispatch();

  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { teams, isLoading2, isError2, errorMessage2 } = teamsState;
  const { articles, isLoading3, isError3, errorMessage3 } = articlesState;
  const { preferences, isLoading4, isError4, errorMessage4 } = preferencesState;

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchPreferences(preferencesDispatch);
  }, [sportsDispatch, preferencesDispatch]);
  // console.log(sports);
  const [selectedSport, setSelectedSport] = useState<any | null>({
    id: 0,
    name: "Trending",
  });

  const handleSportClick = (sport: any) => {
    setSelectedSport(sport);
    console.log(sport);
  };

  if (articlesState.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="">
        {/* Render sport buttons */}
        <div>
          <button
            onClick={() => handleSportClick({ id: 0, name: "Trending" })}
            className={`mr-4 px-3 p-2 rounded-full ${
              selectedSport.id === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Trending
          </button>
          {isAuthenticated
            ? preferences && preferences.sports && preferences.sports.length > 0
              ? sports
                  .filter((sport: any) =>
                    preferences.sports.includes(sport.name)
                  )
                  .map((sport: any) => (
                    <button
                      key={sport.id}
                      onClick={() => handleSportClick(sport)}
                      className={`mr-4 px-4 p-2 rounded-full ${
                        selectedSport === sport
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {sport.name}
                    </button>
                  ))
              : sports.map((sport: any) => (
                  <button
                    key={sport.id}
                    onClick={() => handleSportClick(sport)}
                    className={`mr-4 px-4 p-2 rounded-full ${
                      selectedSport === sport
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {sport.name}
                  </button>
                ))
            : sports.map((sport: any) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportClick(sport)}
                  className={`mr-4 px-4 p-2 rounded-full ${
                    selectedSport === sport
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {sport.name}
                </button>
              ))}
        </div>
        <div className="mt-5">
          <ArticlesListItems selectedSport={selectedSport} />
        </div>
      </div>
    </>
  );
};
export default ArticlesList;
