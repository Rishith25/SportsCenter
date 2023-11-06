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

export default function ChangePassword() {
  let [isOpen, setIsOpen] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState(null);
  const [isLoading, setloading] = useState<boolean>(false);

  let navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isLoading) {
      setloading(true);
      const token = localStorage.getItem("authToken") ?? "";

      const { current_password, new_password } = data;

      try {
        const response = await fetch(`${API_ENDPOINT}/user/password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ current_password, new_password }),
        });

        setloading(false);

        if (response.ok) {
          //   successNotification("Password updated successfully");
          closeModal();
        }
        const Rdata = await response.json();
        if (Rdata.status === "error") {
          //   errorNotification(Rdata.message);
        }
      } catch (error) {
        console.log("Error while changing password:", error);
        setError(null);
        closeModal();
      }
    }
  };

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
                    Update Password
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mx-auto bg-white p-6 rounded-lg"
                    >
                      <div className="form-group mb-4">
                        <label
                          htmlFor="currentPassword"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          {...register("current_password", {
                            required: true,
                          })}
                          className="border border-black p-2 w-full rounded bg-white"
                        />
                        {errors.current_password && (
                          <span className="error text-red-500 text-xs">
                            {errors.current_password.message ||
                              "Current Password is required"}
                          </span>
                        )}
                      </div>

                      <div className="form-group mb-4">
                        <label
                          htmlFor="newPassword"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          {...register("new_password", { required: true })}
                          className="border border-black p-2 w-full rounded bg-white"
                        />
                        {errors.new_password && (
                          <span className="error text-red-500 text-xs">
                            {errors.new_password.message ||
                              "New Password is required"}
                          </span>
                        )}
                      </div>

                      <div className="button-group">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded"
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
}
