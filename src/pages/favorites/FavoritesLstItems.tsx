/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { useArticlesState } from "../../context/articles/context";
import { Link } from "react-router-dom";
import { usePreferencesState } from "../../context/preferences/context";
import { useSportsState } from "../../context/sports/context";
import { useMatchesState } from "../../context/matches/context";
import { API_ENDPOINT } from "../../config/constants";
import { LocationMarkerIcon, RefreshIcon } from "@heroicons/react/outline";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
// import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/outline";

export default function FavouriteListItems() {
  //   const [selectedSport, setSelectedSport] = useState<string | null>("Trending");

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

  return (
    <>
      <div
        className="flex flex overflow-x-auto gap-2 pb-1 rounded-l-md py-2"
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
            <div className="flex overflow-x-auto gap-2 pb-1 rounded-l-md py-2">
              <div className="overflow-y-auto max-h-[470px]">
                {filteredMatches
                  // .filter((match: any) => match.isRunning)
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
                        {match.isRunning && <ScoreCard matchID={match.id} />}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
