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
import { BellIcon } from "@heroicons/react/24/outline";
import { useArticlesDispatch, useArticlesState } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
const NewPreferences = () => {
  const sportState: any = useSportsState();
  const teamsState: any = useTeamsState();
  const articlesState: any = useArticlesState();
  const preferencesState: any = usePreferencesState();

  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();
  const articlesDispatch = useArticlesDispatch()
  const preferencesDispatch = usePreferencesDispatch();

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
    fetchArticles(articlesDispatch)
    fetchPreferences(preferencesDispatch);
  }, []);
  
  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { teams, isLoading2, isError2, errorMessage2 } = teamsState;
  const { preferences, isLoading3, isError3, errorMessage3 } = preferencesState;

  const [selectedSport, setSelectedSport] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedSport(preferences.sports || []);
      setSelectedTeam(preferences.teams || []);
      setSelectedArticle(preferences.articles || [])
    }
  }, [preferences]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";
    const userPreferences = {
      sports: selectedSport,
      teams: selectedTeam,
      articles: selectedArticle,
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          preferences: userPreferences,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update preferences: ${errorData.message}`);
      }
      console.log("Preferences updated successfully!");
      console.log("selectedSports", userPreferences);
      window.location.reload();
    } catch (error: any) {
      console.error("Failed to update preferences:", error.message);
    }
  };

  const handleSportClick = (sport: { id: any }) => {
    if (selectedSport.includes(sport.id)) {
      setSelectedSport(
        selectedSport.filter((selected: any) => selected !== sport.id)
      );
    } else {
      setSelectedSport([...selectedSport, sport.id]);
    }
  };

  if (sports.length === 0 && isLoading1) {
    return <span>Loading sports...</span>;
  }

  if (teams.length === 0 && isLoading1) {
    return <span>Loading teams...</span>;
  }

  if (isError1 || isError1) {
    return <span>{errorMessage1 || errorMessage1}</span>;
  }

  if (isLoading2) {
    return <span>Loading...</span>;
  }

  if (isError2) {
    return <span>{errorMessage2}</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="relative rounded-full bg-black-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-black font-bold leading-6 mb-2"
                  >
                    Preferences
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        {sports &&
                          sports.length > 0 &&
                          sports.map((sport: any) => (
                            <div key={sport.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`sport-${sport.id}`}
                                name={`sport-${sport.id}`}
                                className="h-4 w-4 text-white bg-primary rounded focus:ring-0 flex"
                                value={sport.name}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSelectedSport((prev: string[]) =>
                                    prev.includes(value)
                                      ? prev.filter(
                                          (item: string) => item !== value
                                        )
                                      : [...prev, value]
                                  );
                                }}
                                checked={selectedSport.includes(sport.name)}
                              />
                              <label
                                htmlFor={`sport-${sport.id}`}
                                className="ml-2 text-gray-700"
                              >
                                {sport.name}
                              </label>
                            </div>
                          ))}
                      </div>
                      <h1 className="text-lg font-medium leading-6 text-gray-900 mt-4">
                        Favourite Teams
                      </h1>
                      <div className="grid grid-cols-5 gap-3">
                        {teams.map((team: any) => (
                          <div key={team.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`team-${team.id}`}
                              name={`team-${team.id}`}
                              className="h-4 w-4 text-white bg-primary rounded focus:ring-0"
                              value={team.name}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedTeam((prev) =>
                                  prev.includes(value)
                                    ? prev.filter((item) => item !== value)
                                    : [...prev, value]
                                );
                              }}
                              checked={selectedTeam.includes(team.name)}
                            />
                            <label
                              htmlFor={`team-${team.id}`}
                              className="ml-2 text-gray-700"
                            >
                              {team.name}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          onClick={closeModal}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewPreferences;
