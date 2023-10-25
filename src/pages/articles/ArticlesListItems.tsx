/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useArticlesDispatch,
  // useArticlesDispatch,
  useArticlesState,
} from "../../context/articles/context";
import { Link } from "react-router-dom";
import {
  useSportsDispatch,
  useSportsState,
} from "../../context/sports/context";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";

export default function ArticlesListItems({ selectedSport }: any) {
  const isAuthenticated = !!localStorage.getItem("authToken");

  const [isOpen, setIsOpen] = useState(false);
  const dispatchArticles = useArticlesDispatch;
  const Articlesstate: any = useArticlesState();

  const dispatchSports = useSportsDispatch;
  const Sportsstate: any = useSportsState();

    const dispatchPreferences = usePreferencesDispatch;
    const Preferencesstate: any = usePreferencesState();

  

  const { articles, isLoading, isError, errorMessage } = Articlesstate;

  const { sports, isLoading1, isError1, errorMessage1 } = Sportsstate;

  const { preferences, isLoading2, isError2, errorMessage2 } = Preferencesstate;



  let filterArticles = null;
  if(isAuthenticated){
    if(preferences && preferences.sports && preferences.sports.length > 0){
      if (selectedSport.id == 0) {
        filterArticles = articles.filter((article: any) =>
          preferences.sports.some((sport: any) => article.sport.name.includes(sport))
        );
      } else {
        filterArticles = articles.filter(
          (article: any) => article.sport.id === selectedSport.id
        );
      }
    } else{
      if (selectedSport.id == 0) {
        filterArticles = articles;
      } else {
        filterArticles = articles.filter(
          (article: any) => article.sport.id === selectedSport.id
        );
      }
    }
  } else{
    if (selectedSport.id == 0) {
      filterArticles = articles;
    } else {
      filterArticles = articles.filter(
        (article: any) => article.sport.id === selectedSport.id
      );
    }
  }
  

  if (filterArticles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (filterArticles.length == 0) {
    return <span>No Articles found</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="overflow-y-auto max-h-[470px] ">
        {filterArticles.map((article: any) => (
          <div
            key={article.id}
            className="block p-6 bg-white border border-gray-200 rounded-lg mb-4 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-64 h-full object-cover rounded-lg border border-gray-300"
                />
              </div>

              <div className="relative flex-grow">
                <div className="mt-4">
                  <p className="text-bold font-medium text-gray-600 dark:text-gray-400">
                    {article.sport.name}
                  </p>
                  {/* Add date and time here */}
                </div>
                <h5 className="text-2xl font-medium text-gray-900 dark:text-white">
                  {article.title}
                </h5>
                <p className="text-sm text-gray-600 p-4 dark:text-gray-400">
                  {article.summary}
                </p>
                <br />
                <Link key={article.id} to={`/account/news/${article.id}`}>
                  <button
                    type="button"
                    // onClick={openModal}
                    className="absolute bottom-0 right-0 mt-4 mr-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
