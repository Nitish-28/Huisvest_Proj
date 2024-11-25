import Header from "../components/Header";
import ApiConnection from "../components/ApiConnection";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [isLegal, setIsLegal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [email, setEmail] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const [name, setName] = useState("");
  const [nameCount, setNameCount] = useState(0);

  const navigate = useNavigate();

  // Email validation logic
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address.";
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validationMessage = validateEmail(newEmail);
    setEmailValidationMessage(validationMessage);
  };

  // Password validation logic
  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return ""; // Valid password
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setPasswordValidationMessage(validationMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword !== password) {
      setPasswordMismatchMessage("Passwords do not match.");
    } else {
      setPasswordMismatchMessage("");
    }
  };

  useEffect(() => {
    const registerButton = document.getElementById("register-button");
    if (
      isLegal &&
      acceptedTerms &&
      !passwordValidationMessage &&
      !emailValidationMessage &&
      password === confirmPassword
    ) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }
  }, [
    isLegal,
    acceptedTerms,
    passwordValidationMessage,
    emailValidationMessage,
    password,
    confirmPassword,
  ]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "check-legal") {
      setIsLegal(checked);
    } else if (id === "check-terms") {
      setAcceptedTerms(checked);
    } else if (id === "check-verhuurder") {
      setIsSeller(checked);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Send the registration request
      const response = await axios.post(
        `${ApiConnection()}/api/auth/register`,
        {
          name,
          email,
          password,
          isSeller,
        }
      );

      // Successful registration
      const data = response.data;
      setLoading(false);
      localStorage.setItem("token", data.token); // Store token in local storage
      toast.info("Registered and logged in successfully!", {
        position: "bottom-right",
        autoClose: 5000,
      });

      setTimeout(() => {
        navigate("/home"); // Redirect to home
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.warning("Error occurred, please try again later.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-sec-white min-h-screen flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex max-w min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-sec-white">
        <div className="bg-main-white px-40 shadow-md p-4 m-4 rounded-md mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Aanmelden
            </h2>
            <p className="mt-2 text-sm">
              Maak je account aan, zodat je kan genieten van al de genotten van
              het platform.
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-3">
                  <input
                    id="user"
                    name="user"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    autoComplete="none"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-3">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="none"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {emailValidationMessage && (
                    <p className="text-sm text-red-600">
                      {emailValidationMessage}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {passwordValidationMessage && (
                      <p className="text-sm text-red-600">
                        {passwordValidationMessage}
                      </p>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-3">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    autoComplete="none"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {passwordMismatchMessage && (
                    <p className="text-sm text-red-600">
                      {passwordMismatchMessage}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative flex flex-col rounded-xl bg-white shadow">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                  <div
                    role="button"
                    className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <label
                      htmlFor="check-legal"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="check-legal"
                          onChange={handleCheckboxChange}
                          className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-tert-blue checked:border-slate-800"
                        />
                        <label
                          htmlFor="check-legal"
                          className="cursor-pointer ml-2 text-slate-600 text-sm"
                        >
                          Are you over 18?
                        </label>
                      </div>
                    </label>
                  </div>
                  <div
                    role="button"
                    className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <label
                      htmlFor="check-terms"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="check-terms"
                          onChange={handleCheckboxChange}
                          className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-tert-blue checked:border-slate-800"
                        />
                        <label
                          htmlFor="check-terms"
                          className="cursor-pointer ml-2 text-slate-600 text-sm"
                        >
                          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="1"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </span>

                          <p>
                            I agree with the{" "}
                            <a
                              href="#"
                              className="font-medium hover:text-slate-800 underline"
                            >
                              terms and conditions
                            </a>
                            .
                          </p>
                        </label>
                      </div>
                    </label>
                  </div>
                </nav>
              </div>
              <div className="relative flex flex-col rounded-xl bg-white shadow">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                  <div
                    role="button"
                    className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <label className="flex w-full cursor-pointer items-center px-3 py-2">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="check-verhuurder"
                          onChange={handleCheckboxChange}
                          className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-tert-blue checked:border-slate-800"
                        />
                        <span className="ml-2 text-slate-600 text-sm">
                          Registreer als verhuurder?
                        </span>
                      </div>
                    </label>
                  </div>
                </nav>
              </div>

              <div>
                <button
                  type="submit"
                  id="register-button"
                  disabled={true}
                  className="w-full flex justify-center rounded-md transition-all bg-[#4db2b0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#62e3e1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#62e3e1] disabled:bg-gray-300"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Have an account?{" "}
              <a
                href="/Login"
                className="font-semibold leading-6 text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
