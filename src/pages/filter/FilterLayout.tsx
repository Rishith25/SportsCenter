/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { fetchSports } from "../../context/sports/actions";
import {
  useSportsState,
  useSportsDispatch,
} from "../../context/sports/context";
import { API_ENDPOINT } from "../../config/constants";
import { fetchPreferences } from "../../context/preferences/actions";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchTeams } from "../../context/teams/actions";
import { useTeamsDispatch, useTeamsState } from "../../context/teams/context";
import { usePreferencesState } from "../../context/preferences/context";
import { Link } from "react-router-dom";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";

const FilterLayout = () => {
  const sportState: any = useSportsState();
  const teamsState: any = useTeamsState();
  const articlesState: any = useArticlesState();
  const preferencesState: any = usePreferencesState();

  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();
  const articleDispatch = useArticlesDispatch();
  const preferencesDispatch = usePreferencesDispatch();

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
    fetchArticles(articleDispatch);
    fetchPreferences(preferencesDispatch);
  }, []);

  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { teams, isLoading2, isError2, errorMessage2 } = teamsState;
  const { articles, isLoading3, isError3, errorMessage3 } = articlesState;
  const { preferences, isLoading4, isError4, errorMessage4 } = preferencesState;

  // console.log(preferences);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const FilterArticles = articlesState.articles.filter((article: any) => {
    let sportArticles = !selectedSport || article.sport.name === selectedSport;
    const teamArticles =
      !selectedTeam ||
      article.teams.some((team: any) => team.name === selectedTeam);
    return sportArticles && teamArticles;
  });

  if (isLoading3) {
    return <span className="text-black dark:text-white">Loading...</span>;
  }

  if (isError3) {
    return <span>{errorMessage3}</span>;
  }


  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <div className="mt-2">
      <div className="mb-3">
        <label
          htmlFor="sport"
          className="block text-sm text-black font-medium text-gray-700"
        >
          Select a Sport:
        </label>
        <select
          id="sport"
          name="sport"
          className="mt-1 p-2 block w-full text-black border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => {
            const selectedSport = e.target.value;
            setSelectedSport(selectedSport);
            setSelectedTeam("");
          }}
          value={selectedSport || ""}
        >
          <option value="">Select a Sport</option>
          {isAuthenticated
            ? preferences && preferences.sports && preferences.sports.length > 0
              ? sports
                  .filter((sport: any) =>
                    preferences.sports.includes(sport.name)
                  )
                  .map((sport: any) => (
                    <option key={sport.id} value={sport.name}>
                      {sport.name}
                    </option>
                  ))
              : sports.map((sport: any) => (
                  <option key={sport.id} value={sport.name}>
                    {sport.name}
                  </option>
                ))
            : sports.map((sport: any) => (
                <option key={sport.id} value={sport.name}>
                  {sport.name}
                </option>
              ))}
        </select>
      </div>

      {
        <div className="mb-3">
          <label
            htmlFor="team"
            className="block text-sm text-black font-medium text-gray-700"
          >
            Select Teams for {selectedSport}:
          </label>
          <select
            id="team"
            name="team"
            className="mt-1 p-2 block text-black w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => {
              const selectedTeam = e.target.value;
              setSelectedTeam(selectedTeam);
            }}
            value={selectedTeam || ""}
          >
            <option value="">Select Teams</option>
            {teams
              .filter((team: any) => team.plays === selectedSport) // Use "===" instead of "=="
              .map((team: any) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
        </div>
      }
      {articlesState.isLoading3 ? (
        <div>Loading</div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto ">
          {isAuthenticated
            ? preferences && preferences.sports && preferences.sports.length > 0
              ? FilterArticles.filter((article: any) =>
                  preferences.sports.some((sport: any) =>
                    article.sport.name.includes(sport)
                  )
                ).map((article: any) => (
                  <div
                    key={article.id}
                    style={{}}
                    className="my-7 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
                  >
                    <a href="#">
                      <img
                        className="rounded-t-lg h-44 w-full"
                        src={article.thumbnail}
                        alt=""
                      />
                    </a>
                    <div className="p-4">
                      <a href="#">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {article.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
                        {article.summary}
                      </p>
                      <Link key={article.id} to={`/account/news/${article.id}`}>
                        <a className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Read more
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))
              : FilterArticles.map((article: any) => (
                  <div
                    key={article.id}
                    style={{}}
                    className="my-7 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
                  >
                    <a href="#">
                      <img
                        className="rounded-t-lg h-44 w-full"
                        src={article.thumbnail}
                        alt=""
                      />
                    </a>
                    <div className="p-4">
                      <a href="#">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {article.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
                        {article.summary}
                      </p>
                      <Link key={article.id} to={`/account/news/${article.id}`}>
                        <a className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Read more
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))
            : FilterArticles.map((article: any) => (
                <div
                  key={article.id}
                  style={{}}
                  className="my-7 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg h-44 w-full"
                      src={article.thumbnail}
                      alt=""
                    />
                  </a>
                  <div className="p-4">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {article.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
                      {article.summary}
                    </p>
                    <Link key={article.id} to={`/account/news/${article.id}`}>
                      <a className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default FilterLayout;
