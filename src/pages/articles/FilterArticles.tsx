/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { useSportsDispatch, useSportsState } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";

const FilterArticles = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const state: any = useSportsState();
  const sportsDispatch = useSportsDispatch();
  
  useEffect(()=> {
    fetchSports(sportsDispatch);
  }, [sportsDispatch])
  const { sports, isLoading, isError, errorMessage } = state;
  // console.log(sports);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    // The event.preventDefault() will prevent the page to refresh on form submission
    const token = localStorage.getItem("authToken") ?? "";
    event.preventDefault();

  }

  const openModal = () => {
    setIsOpen(true);
  };

  // Then we add the closeModal function
  const closeModal = () => {
    setIsOpen(false);
  };

  // In the return statement, we will use the code for modal
  // that we've obtained from https://headlessui.com/react/dialog

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Sports
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      {sports.map((sport) => (
                        <label key={sport.id} className="block text-black">
                          <input
                            type="checkbox"
                          />
                          {sport.name}
                        </label>
                      ))}
                      <button type="submit" onClick={closeModal}>
                        Apply Filters
                      </button>
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
export default FilterArticles;
