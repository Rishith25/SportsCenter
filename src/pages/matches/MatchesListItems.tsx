/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useMatchesState } from "../../context/matches/context";
import { MapPinIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";
import { toast } from "react-toastify";
export default function MatchesListItems() {
  const isAuthenticated = !!localStorage.getItem("authToken");

  const dispatchPreferences = usePreferencesDispatch;
  const Preferencesstate: any = usePreferencesState();

  const { preferences, isLoading2, isError2, errorMessage2 } = Preferencesstate;

  let initialSelectedMatches = [];
  if (preferences && preferences.matches) {
    initialSelectedMatches = preferences.articles || [];
  }
  const [favouriteMatches, setSelectedMatches] = useState(initialSelectedMatches);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedMatches(preferences.matches || []);
    }
    fetchPreferences(dispatchPreferences);
  }, [dispatchPreferences, preferences]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    const existingPreferences = {
      sports: preferences.sports,
      teams: preferences.teams,
      articles: preferences.articles,
      matches: favouriteMatches,
    };

    const updatedPreferences = {
      ...existingPreferences,
      matches: favouriteMatches,
    };

    try {
      console.log("favouriteMatches", favouriteMatches);
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          preferences: updatedPreferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save : ${errorData.message}`);
      }

      console.log("saved successfully!");
      console.log("updatedPreferences", updatedPreferences);
    } catch (error: any) {
      console.error("Failed to save :", error.message);
      toast.error("Changes failed. Please try again.", {
        autoClose: 3000,
      });
    }
    toast.success("Changes Saved successfully!", {
      autoClose: 3000,
    });
  };

  const handleToggleFavorite = (id: number) => {
    if (isAuthenticated) {
      const isSaved = favouriteMatches.includes(id);
      if (isSaved) {
        // The article is already in favorites, so remove it by its ID
        const updatedArticleIds = favouriteMatches.filter(
          (matchID: number) => matchID !== id
        );
        setSelectedMatches(updatedArticleIds);
        console.log("Removed from favorites", updatedArticleIds);
      } else {
        // The article is not in favorites, so add it by its ID
        setSelectedMatches([...favouriteMatches, id]);
        console.log("Added to favorites", [...favouriteMatches, id]);
      }
    }
  };

  const state: any = useMatchesState();

  const { matches, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span className="text-black dark:text-white">Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches
        .filter((match: any) => match.isRunning)
        .map((match: any) => (
          // <Link key={match.id} to={`${match.id}`}>
          <div
            key={match.id}
            className="bg-white w-96 h-48 border border-gray-300 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg p-2 py-3 relative"
            style={{
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "ellipsis",
            }}
          >
            {/* Sport Name Box */}
            <div className="bg-blue-400 text-white text-sm font-semibold py-2 px-4 rounded-t-lg absolute top-0 left-0 right-0 text-center">
              {match.sportName}
            </div>
            <div className="">
              {match.isRunning && <ScoreCard matchID={match.id} />}
              {isAuthenticated ? (
                <div className="flex justify-end ">
                  <form onSubmit={handleSubmit}>
                    {isAuthenticated ? (
                      <button
                        value={match.id}
                        data-article-id={match.id}
                        type="submit"
                        onClick={() => handleToggleFavorite(match.id)}
                      >
                        {favouriteMatches.includes(match.id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="red"
                            className="w-6 h-6"
                          >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="red"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        )}
                      </button>
                    ) : null}
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      {matches
        .filter((match: any) => !match.isRunning)
        .slice(0, 5)
        .map((match: any) => (
          // <Link key={match.id} to={`${match.id}`}>
          <div
            key={match.id}
            className="bg-white w-96 h-48 border border-gray-300 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg p-2 py-3 relative"
            style={{
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "ellipsis",
            }}
          >
            {/* Sport Name Box */}
            <div className="bg-blue-400 text-white text-sm font-semibold py-2 px-4 rounded-t-lg absolute top-0 left-0 right-0 text-center">
              {match.sportName}
            </div>

            <div className="">{<ScoreCard matchID={match.id} />}</div>
            {isAuthenticated ? (
              <div className="flex justify-end ">
                <form onSubmit={handleSubmit}>
                  {isAuthenticated ? (
                    <button
                      value={match.id}
                      data-article-id={match.id}
                      type="submit"
                      onClick={() => handleToggleFavorite(match.id)}
                    >
                      {favouriteMatches.includes(match.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="w-6 h-6"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="red"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      )}
                    </button>
                  ) : null}
                </form>
              </div>
            ) : null}
          </div>
        ))}
    </>
  );
}

const ScoreCard = ({ matchID }: { matchID: number }) => {
  const [fetchScores, setFetchScores] = useState(false);
  const [match, setMatch] = useState<string>();
  // console.log(match);
  const fetchMatch = async () => {
    setFetchScores(true);
    await fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setFetchScores(false);
      });
  };

  useEffect(() => {
    fetchMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchID]);

  return match ? (
    <div key={match.id}>
      <Link to={`matches/${match.id}`}>
        <div className="flex py-4">
          {match.isRunning ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center py-3 text-sm text-gray-600 dark:text-gray-400 justify-between">
                <div className="flex items-center">
                  <CalendarDaysIcon className="h-4 w-4 dark:text-white" />
                  <div className="px-1 dark:text-white">
                    {new Date(match.endsAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center p-1 rounded-full bg-green-700 animate-pulse dark:bg-green-300" />
                    <p className="items-end px-1 text-green-700 text-sm dark:text-green-300">
                      Live now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex text-sm py-3 text-neutral-500 gap-1 dark:text-neutral-300">
              <CalendarDaysIcon className="w-4 h-4 dark:text-white" />
              <p className="dark:text-white">
                {new Date(match.endsAt).toDateString()}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between space-x-4 rounded-md text-black">
          <div className="flex items-center space-x-2">
            <div className="font-semibold dark:text-white">
              {match?.teams[0].name}
            </div>
            <div className="bg-green-500 text-white px-2 rounded-md">
              {match?.score[match?.teams[0].name]}
            </div>
          </div>
          <div className="text-gray-400 font-bold justify-between">vs</div>
          <div className="bg-green-500 text-white px-2 rounded-md">
            {match?.score[match?.teams[1].name]}
          </div>
          <div className="flex items-center space-x-2">
            <div className="font-semibold dark:text-white">
              {match?.teams[1].name}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex py-2 items-end justify-between">
        <MapPinIcon className="w-4 h-4 text-sm text-gray-600  dark:text-white" />
        <p className="px-1 text-sm text-gray-600 dark:text-white">
          {match?.location}
        </p>
        <div style={{ flex: 1 }}></div>
        <button onClick={fetchMatch} className="rounded-full">
          <ArrowPathIcon
            className={`w-6 h-6 text-black dark:text-white  ${
              fetchScores && "rotate-180"
            } transition-all`}
          />
        </button>
      </div>
    </div>
  ) : null;
};
