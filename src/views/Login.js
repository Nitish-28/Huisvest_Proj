import React, { createContext, useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Home from "./Home";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ApiConnection from "../components/ApiConnection";


export default function Login() {
  
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const useToken = () => useContext(TokenContext);
  const TokenContext = createContext();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(`${ApiConnection()}/api/auth/login`, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token); // Save the token for future authenticated requests
        setToken(data.token);
        setSuccessMessage("Login successful");
        setLoading(false);
        setErrorMessage("");

        toast.info("Logged in!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Show success message and redirect after 1 second
        setTimeout(() => {
          navigate("/home"); // Use the navigate function to redirect
          window.location.reload(); // Force a page reload after navigation
        }, 500); // 1000 milliseconds = 1 second
      } else {
        setErrorMessage(data.message || "Login failed");
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure loading is reset
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-sec-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-main-white shadow-md px-32 p-16 rounded-md">
            <div className="sm:mx-auto sm:w-20 sm:max-w-20"></div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Inloggen
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#4db2b0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#62e3e1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 ease-in-out transform"
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    ) : (
                      <div>Log in</div>
                    )}
                  </button>
                </div>
              </form>

              {errorMessage && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="mt-2 text-center text-sm text-green-600">
                  {successMessage}
                </p>
              )}

              <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/Register"
                  className="font-semibold leading-6 text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
