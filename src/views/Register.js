import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Register() {
  const [isLegal, setIsLegal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    const registerButton = document.getElementById("register-button");
    if (isLegal && acceptedTerms) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }
  }, [isLegal, acceptedTerms]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "check-legal") {
      setIsLegal(checked);
      console.log(id, checked);
    } else if (id === "check-terms") {
      setAcceptedTerms(checked);
      console.log(id, checked);
    }
  };

  return (
    <>
      <Header />
      <div className="flex max-w min-h-screen flex-1 flex-col justify-center px-6 -mt-12 lg:px-8 bg-[#dddddd46]">
        <div className="bg-white px-40 p-8 rounded-md mx-auto">
          <div className="sm:mx-auto sm:w-20 sm:max-w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-auto w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
              />
            </svg>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
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
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                    required
                    autoComplete="none"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
