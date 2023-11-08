/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useArticlesState } from "../../context/articles/context";
import { Link } from "react-router-dom";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { useSportsState } from "../../context/sports/context";
import { useMatchesState } from "../../context/matches/context";
import { API_ENDPOINT } from "../../config/constants";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { fetchPreferences } from "../../context/preferences/actions";
import { toast } from "react-toastify";
// import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/outline";

export default function FavouriteListItems() {
  const isAuthenticated = !!localStorage.getItem("authToken");

  const dispatchPreferences = usePreferencesDispatch;
  const Preferencesstate: any = usePreferencesState();

  const articleState: any = useArticlesState();
  const sportState: any = useSportsState();
  const matchState: any = useMatchesState();
  const preferencesState: any = usePreferencesState();

  const { articles, isLoading, isError, errorMessage } = articleState;
  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;
  const { matches, isLoading3, isError3, errorMessage3 } = matchState;

  if (isLoading || isLoading1 || isLoading2) {
    return <span>Loading articles...</span>;
  }
  if (isError || isError1 || isError2) {
    return <span>{errorMessage || errorMessage1 || errorMessage2}</span>;
  }

  let filteredArticles: any[] = [];
  if (preferences && preferences.articles && preferences.articles.length > 0) {
    preferences.articles.forEach((preferenceArticleId: any) => {
      articles.forEach((article: { id: any }) => {
        if (article.id == preferenceArticleId) {
          console.log(article);
          filteredArticles.push(article);
        }
      });
    });
  }

  let initialSelectedArticles = [];
  if (preferences && preferences.articles) {
    initialSelectedArticles = preferences.articles || [];
  }
  let [favouriteArticles, setSelectedArticles] = useState(
    initialSelectedArticles
  );

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedArticles(preferences.articles || []);
    }
  }, [dispatchPreferences, preferences]);

  const handleSubmitArticle = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    const existingPreferences = {
      sports: preferences.sports,
      teams: preferences.teams,
      articles: favouriteArticles || [],
      matches: preferences.matches || [],
    };

    const updatedPreferences = {
      ...existingPreferences,
      articles: favouriteArticles,
    };

    try {
      console.log("selectedArticle", favouriteArticles);
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

  const handleToggleFavoriteArticle = (id: number) => {
    if (isAuthenticated) {
      const isSaved = favouriteArticles.includes(id);
      if (isSaved) {
        // The article is already in favorites, so remove it by its ID
        const updatedArticleIds = favouriteArticles.filter(
          (articleId: number) => articleId !== id
        );
        setSelectedArticles(updatedArticleIds);
        console.log("Removed from favorites", updatedArticleIds);
        window.location.reload( )
      } else {
        // The article is not in favorites, so add it by its ID
        setSelectedArticles([...favouriteArticles, id]);
        console.log("Added to favorites", [...favouriteArticles, id]);
      }
    }
  };

  let filteredMatches: any[] = [];
  if (preferences && preferences.matches && preferences.matches.length > 0) {
    preferences.matches.forEach((preferenceMatchId: any) => {
      matches.forEach((match: { id: any }) => {
        if (match.id == preferenceMatchId) {
          console.log(match);
          filteredMatches.push(match);
        }
      });
    });
    console.log(filteredMatches);
  }

  let initialSelectedMatches = [];
  if (preferences && preferences.matches) {
    initialSelectedMatches = preferences.articles || [];
  }
  const [favouriteMatches, setSelectedMatches] = useState(
    initialSelectedMatches
  );

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedMatches(preferences.matches || []);
    }
  }, [dispatchPreferences, preferences]);

  const handleSubmitMatch = async (event: React.FormEvent<HTMLFormElement>) => {
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
      fetchPreferences(dispatchPreferences);
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

  const handleToggleFavoriteMatch = (id: number) => {
    if (isAuthenticated) {
      const isSaved = favouriteMatches.includes(id);
      if (isSaved) {
        // The article is already in favorites, so remove it by its ID
        const updatedArticleIds = favouriteMatches.filter(
          (matchID: number) => matchID !== id
        );
        setSelectedMatches(updatedArticleIds);
        console.log("Removed from favorites", updatedArticleIds);
        window.location.reload();
      } else {
        // The article is not in favorites, so add it by its ID
        setSelectedMatches([...favouriteMatches, id]);
        console.log("Added to favorites", [...favouriteMatches, id]);
      }
    }
  };

  return (
    <>
      <div
        className="flex overflow-x-auto gap-2 pb-1 rounded-l-md py-2"
        style={{ width: "100%" }}
      >
        <div className="border p-3 rounded-md">
          {/* <p className="text-xl font-semibold text-gray-800 dark:text-white">
      Saved articles
    </p> */}
          {isLoading ? (
            <div>Loading...</div>
          ) : filteredMatches.length === 0 ? (
            <div className="flex h-[10vh] items-center justify-center ">
              <div className="text-xl font-semibold text-gray-600 dark:text-white">
                No Saved Matches
              </div>
            </div>
          ) : (
            <div className="gap-2 rounded-l-md">
              <div className="flex flex-row overflow-x-auto max-w-full gap-2 rounded-l-md py-2">
                {filteredMatches
                  .map((match: any) => (
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
                        {<ScoreCard matchID={match.id} />}
                        {isAuthenticated ? (
                          <div className="flex justify-end ">
                            <form onSubmit={handleSubmitMatch}>
                              {isAuthenticated ? (
                                <button
                                  value={match.id}
                                  data-article-id={match.id}
                                  type="submit"
                                  onClick={() =>
                                    handleToggleFavoriteMatch(match.id)
                                  }
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
              </div>
              <br />
            </div>
          )}
        </div>
      </div>
      <br />
      {isLoading ? (
        <div>Loading...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex h-[10vh] items-center justify-center ">
          <div className="text-xl font-semibold text-gray-600 dark:text-white">
            No Saved articles
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[470px]">
          {filteredArticles.map((article: any) => (
            <div
              key={article.id}
              className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg mb-4 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-64 h-40 object-cover rounded-lg border border-gray-300"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-bold font-medium text-gray-600 text-lg dark:text-gray-400">
                          {article.sport.name}
                        </p>
                        {/* Add date and time here */}
                      </div>
                      {isAuthenticated ? (
                        <div className="flex">
                          <form onSubmit={handleSubmitArticle}>
                            {isAuthenticated ? (
                              <button
                                value={article.id}
                                data-article-id={article.id}
                                type="submit"
                                onClick={() =>
                                  handleToggleFavoriteArticle(article.id)
                                }
                              >
                                {favouriteArticles.includes(article.id) ? (
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
                                    stroke="currentColor"
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
                  <h5 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                    {article.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {article.summary}
                  </p>
                  <Link key={article.id} to={`news/${article.id}`}>
                    <button
                      type="button"
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
