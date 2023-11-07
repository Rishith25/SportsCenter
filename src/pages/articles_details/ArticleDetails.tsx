/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useArticleDetailsDispatch,
  useArticleDetailsState,
} from "../../context/articles_details/context";
import { articleDetails } from "../../context/articles_details/actions";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { toast } from "react-toastify";
import { API_ENDPOINT } from "../../config/constants";
import { fetchPreferences } from "../../context/preferences/actions";

const ArticleDetails: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  let [isOpen, setIsOpen] = useState(true);

  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);

  const navigate = useNavigate();
  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const ArticleDetailsState = useArticleDetailsState();
  const { articleID } = useParams();

  const dispatchPreferences = usePreferencesDispatch;
  const Preferencesstate: any = usePreferencesState();

  const { preferences, isLoading2, isError2, errorMessage2 } = Preferencesstate;

  let initialSelectedArticles = [];
  if (preferences && preferences.articles) {
    initialSelectedArticles = preferences.articles || [];
  }
  let [favouriteArticles, setSelectedArticles] = useState(
    initialSelectedArticles
  );

  const articleDetailsDispatch = useArticleDetailsDispatch();
  useEffect(() => {
    articleDetails(articleDetailsDispatch, articleID);
    if (preferences && preferences.sports && preferences.teams) {
      fetchPreferences(dispatchPreferences);
      setSelectedArticles(preferences.articles || []);
    }
  }, []);

  const selectedArticle = ArticleDetailsState?.articles?.find(
    (article) => `${article.id}` === articleID
  );

  if (
    ArticleDetailsState?.articles.length === 0 &&
    ArticleDetailsState?.isLoading
  ) {
    return <>Loading...</>;
  }
  if (ArticleDetailsState?.isError) {
    return <>No such Project!</>;
  }

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
      <Transition appear show={isOpen} as={Fragment}>
        {ArticleDetailsState?.isLoading ? (
          <div className="text-black">Loading...</div>
        ) : ArticleDetailsState?.articles ? (
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center p-4 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-162 max-w-lg p-6 mx-auto bg-white rounded-2xl shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {selectedArticle?.title}
                      </Dialog.Title>
                      <button
                        onClick={closeModal}
                        className="text-indigo-600 text-lg dark:text-indigo-400 hover:underline focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600 dark:text-indigo-400 hover:underline"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    {isAuthenticated ? (
                      <div className="flex">
                        <form onSubmit={handleSubmit}>
                          {isAuthenticated ? (
                            <button
                              value={selectedArticle?.id}
                              data-article-id={selectedArticle?.id}
                              type="submit"
                              onClick={() =>
                                handleToggleFavorite(selectedArticle?.id)
                              }
                            >
                              {favouriteArticles.includes(
                                selectedArticle?.id
                              ) ? (
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
                    <div className="mt-2">
                      <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4 dark:text-white" />
                        {new Date(selectedArticle?.date).toDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold">Sport:</span>{" "}
                        {selectedArticle?.sport?.name}
                      </p>
                      <div className="my-4 w-64">
                        <img
                          src={selectedArticle?.thumbnail}
                          alt={selectedArticle?.title}
                          className="rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold">Content:</span>{" "}
                        {selectedArticle?.content}
                      </p>
                      {/* <h3 className="text-lg font-medium mt-4 text-indigo-600 dark:text-indigo-300">
                      Teams:
                    </h3> */}
                      {selectedArticle?.teams &&
                        selectedArticle.teams.length > 0 && (
                          <div className="flex space-x-2">
                            <h3 className="text-lg font-medium mt-4 text-indigo-600 dark:text-indigo-300">
                              <span className="font-bold">Teams</span>
                            </h3>
                            <br />
                            {selectedArticle?.teams?.map((team) => (
                              <div
                                key={team.id}
                                className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-600 dark:text-indigo-100 rounded-md"
                              >
                                {team.name}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        ) : (
          <div className="text-black">Loading...</div>
        )}
      </Transition>
    </>
  );
};

export default ArticleDetails;
