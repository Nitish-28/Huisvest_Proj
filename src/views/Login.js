import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ApiConnection from "../components/ApiConnection";
import { ToastContainer, toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
export default function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        localStorage.setItem("token", data.token);
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

        setTimeout(() => {
          navigate("/home");
          window.location.reload(); // Force a page reload after navigation
        }, 500);
      } else {
        setErrorMessage(data.message || "Login failed");
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-sec-white">
        {/* Left Side for Image */}

        {/* Right Side for Login Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-main-white shadow-md p-16 rounded-md w-full max-w-lg">
          <div className="text-sm">
            <p className="flex items-center gap-1">
              <FaCheck className="mr-2" /> <b>Gratis</b> huizen bekijken
            </p>
            <p className="flex items-center gap-1">
              <FaCheck className="mr-2" /> <b>Personelijk </b>  dashboard als verkoper
            </p>
            <p className="flex items-center gap-1">
              <FaCheck className="mr-2" /> Sla uw <b>favoriete</b> woningen op
            </p>
          </div>
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 mt-10">
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
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
              <p className="mt-2 text-center text-sm text-red-600">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="mt-2 text-center text-sm text-green-600">{successMessage}</p>
            )}

            <p className="mt-10 text-center text-sm text-gray-500">
              Nog geen account?{" "}
              <a
                href="/Register"
                className="font-semibold leading-6 text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform"
              >
                Registreer gratis
              </a>
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
       <img src="https://images.pexels.com/photos/565324/pexels-photo-565324.jpeg"></img>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
