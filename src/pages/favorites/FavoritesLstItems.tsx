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
  return (
    <div className="">
      <div className="border p-3 rounded-md">
        <p className="text-xl font-semibold text-gray-800 dark:text-white">
          Saved articles
        </p>

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
      </div>
    </div>
  );
}
