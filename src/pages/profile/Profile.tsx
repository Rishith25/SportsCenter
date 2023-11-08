/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { Toaster } from "react-hot-toast";
import { ThemeContext } from "../../context/theme";

type Inputs = {
  current_password: string;
  new_password: string;
};

export default function Profile() {
  let [isOpen, setIsOpen] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState(null);
  const [isLoading, setloading] = useState<boolean>(false);

  const user = localStorage.getItem("userData") ?? "";
  console.log(user);
  const userProfile = JSON.parse(user);
  console.log(userProfile);
  let navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-100 ${theme ?? ""}`}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex font-bold justify-between text-lg  leading-6 text-gray-900 items-center dark:text-white"
                  >
                    Profile
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* Light Theme */}
                    <div className="border rounded p-4 m-4 shadow-md text-black dark:text-white">
                      <div className="flex justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="black"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-10 h-8 border rounded-2xl ring-1 ring-opacity-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632"
                          />
                        </svg>
                      </div>
                      <div className="text-center">{userProfile?.name}</div>

                      <div className="text-center text-gray-500">
                         {userProfile?.email}
                      </div>
                      <strong className="ml-4">Preferences</strong>
                      <div className="flex justify-between mr-4 ml-4">
                        <div>
                          <strong>Teams:</strong>
                          <ul className="list-disc pl-4">
                            {userProfile?.preferences.teams.map(
                              (team, index) => (
                                <li key={index}>{team}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <strong>Sports:</strong>
                          <ul className="list-disc pl-4">
                            {userProfile?.preferences.sports.map(
                              (sport, index) => (
                                <li key={index}>{sport}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
