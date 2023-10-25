// src/pages/signup/SignupForm.tsx
import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });
      const data = await response.json();

      // if successful, save the token in localStorage
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      return navigate("/account");
      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      console.log("Sign-up successful");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      {/* Origami-Inspired Shape */}
      <div className="absolute w-64 h-64 bg-yellow-400 transform rotate-45 -top-20 -left-20 rounded-md"></div>
      <div className="max-w-md w-full bg-white rounded-lg shadow-md relative z-10 p-8">
        <div className="text-black">
          <div>
            <Link to="/account" className="text-blue-500 hover:underline">
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-black rounded-md py-2 px-3 bg-white hover:bg-white-800 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="userEmail"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full border border-black rounded-md py-2 px-3 bg-white hover:bg-white-800 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="userPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full border border-black rounded-md py-2 px-3 bg-white hover:bg-white-800 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 text-center"></div>
        </form>
        <div className="mt-4 text-center text-black">
          Have an account?
          <div>
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
