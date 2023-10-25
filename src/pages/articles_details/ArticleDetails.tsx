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

const ArticleDetails: React.FC = () => {
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

  const articleDetailsDispatch = useArticleDetailsDispatch();
  useEffect(() => {
    articleDetails(articleDetailsDispatch, articleID);
  }, [articleDetailsDispatch, articleID]);

  const selectedArticle = ArticleDetailsState?.articles?.find(
    (article) => `${article.id}` === articleID
  );
  // console.log("G", selectedArticle);

  if (ArticleDetailsState?.articles.length === 0 && ArticleDetailsState?.isLoading) {
    return <>Loading...</>;
  }
  if (ArticleDetailsState?.isError) {
    return <>No such Project!</>;
  }
  
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
        ) : <div className="text-black">Loading...</div>}
      </Transition>
    </>
  );
};

export default ArticleDetails;
