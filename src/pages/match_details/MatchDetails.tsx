/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMatchDetailsDispatch,
  useMatchDetailsState,
} from "../../context/match_details/context";
import { matchDetails } from "../../context/match_details/actions";
import { Transition, Dialog } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const MatchDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();
  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  const MatchDetailsState = useMatchDetailsState();
  const { matchID } = useParams();

  const matchDetailsDispatch = useMatchDetailsDispatch();
  useEffect(() => {
    matchDetails(matchDetailsDispatch, matchID);
  }, [matchDetailsDispatch, matchID]);
  const selectedMatch = MatchDetailsState?.matches?.find(
    (match) => `${match.id}` === matchID
  );

  if (MatchDetailsState?.isLoading) {
    return <span className="text-black dark:text-white">Loading...</span>;
  }
  if (MatchDetailsState?.isError) {
    return <span>{MatchDetailsState?.errorMessage}</span>;
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        {MatchDetailsState?.isLoading ? (
          <div className="text-black">Loading...</div>
        ) : MatchDetailsState?.matches ? (
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
            static={true}
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
              <div className="fixed inset-0 bg-black bg-opacity-25 " />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto ">
              <div className="flex min-h-screen items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-xl ">
                    <div className="flex items-start justify-between ">
                      <>
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          <h2 className="text-2xl font-medium text-black tracking-tight text-slate-700 mb-4">
                            {selectedMatch?.name}
                          </h2>
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
                      </>
                    </div>
                    <div className="text-md text-gray-600 dark:text-gray-400">
                      {selectedMatch?.isRunning ? (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center p-1 rounded-full bg-green-700 animate-pulse dark:bg-green-300" />
                              <p className="px-1 text-green-700 text-md dark:text-green-300">
                                Live now
                              </p>
                            </div>
                            <div className="flex items-center justify-end text-sm py-3 gap-1 dark:text-neutral-300">
                              <CalendarDaysIcon className="w-4 h-4 dark:text-white" />
                              <p className="dark:text-white text-md">
                                {new Date(
                                  selectedMatch?.startsAt
                                ).toDateString()}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between space-x-4 rounded-md text-black">
                        <div className="flex items-center space-x-2">
                          <div className="font-semibold dark:text-white">
                            {selectedMatch?.teams[0].name}
                          </div>
                          <div className="bg-green-500 text-white px-2 rounded-md">
                            {selectedMatch?.score[selectedMatch?.teams[0].name]}
                          </div>
                        </div>
                        <div className="text-gray-400 font-bold justify-between">
                          vs
                        </div>
                        <div className="bg-green-500 text-white px-2 rounded-md">
                          {selectedMatch?.score[selectedMatch?.teams[1].name]}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="font-semibold dark:text-white">
                            {selectedMatch?.teams[1].name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedMatch?.story ? (
                        <>
                          <p className="text-md font-bold text-black dark:text-white">
                            Story:
                          </p>
                          <p className="p-1 text-justify">
                          {selectedMatch?.story}
                          </p>
                        </>
                      ) : ""}
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

export default MatchDetails;
