/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { API_ENDPOINT } from "../../config/constants";

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
  if (isAuthenticated) {
    if (preferences && preferences.sports && preferences.sports.length > 0) {
      if (selectedSport.id == 0) {
        filterArticles = articles.filter((article: any) =>
          preferences.sports.some((sport: any) =>
            article.sport.name.includes(sport)
          )
        );
      } else {
        filterArticles = articles.filter(
          (article: any) => article.sport.id === selectedSport.id
        );
      }
    } else {
      if (selectedSport.id == 0) {
        filterArticles = articles;
      } else {
        filterArticles = articles.filter(
          (article: any) => article.sport.id === selectedSport.id
        );
      }
    }
  } else {
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

  
  let initialSelectedArticles = [];
  if (preferences && preferences.articles) {
    initialSelectedArticles = preferences.articles || []
  }
  let [favouriteArticles, setSelectedArticles] = useState(
    initialSelectedArticles
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (preferences && preferences.sports && preferences.teams) {
  //     setSelectedArticles(preferences.articles || []);
  //   }
  // }, [preferences]);

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleToggleFavorite = (id: number) => {
    if (isAuthenticated) {
      const isSaved = favouriteArticles.includes(id);
      if (isSaved) {
        // The article is already in favorites, so remove it by its ID
        const updatedArticleIds = favouriteArticles.filter(
          (articleId: number) => articleId !== id
        );
        setSelectedArticles(updatedArticleIds);
        console.log("Removed from favorites", updatedArticleIds);
      } else {
        // The article is not in favorites, so add it by its ID
        setSelectedArticles([...favouriteArticles, id]);
        console.log("Added to favorites", [...favouriteArticles, id]);
      }
    }
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
                  <div className="flex justify-between">
                    <div>
                      <p className="text-bold font-medium text-gray-600 text-lg dark:text-gray-400">
                        {article.sport.name}
                      </p>
                      {/* Add date and time here */}
                    </div>
                    {isAuthenticated ? (
                      <div className="flex">
                        <form onSubmit={handleSubmit}>
                          {isAuthenticated ? (
                            <button
                              value={article.id}
                              data-article-id={article.id}
                              type="submit"
                              onClick={() => handleToggleFavorite(article.id)}
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
