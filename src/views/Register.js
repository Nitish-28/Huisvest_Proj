import { useState } from "react";
import Header from "../components/Header";

export default function Register() {
  const [isLegal, setIsLegal] = useState(false); // State to check if user is above 18
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State to check if terms are accepted

  // Function to handle date selection
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const age = calculateAge(selectedDate);

    // Check if the user is at least 18 years old
    if (age >= 18) {
      setIsLegal(true);
    } else {
      setIsLegal(false);
      alert("You must be at least 18 years old to register.");
    }
  };

  const handleTermsAccept = () => {
    setAcceptedTerms(true);
  };

  // Helper function to calculate age
  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust if the user's birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      <Header />
      {!isLegal ? (
        <div className="flex items-center justify-center min-h-screen bg-[#dddddd46]">
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="default-datepicker"
              type="date"
              onChange={handleDateChange}
              className="bg-[#62e3e1] border border-[#4db2b0] text-black text-sm rounded-lg focus:ring-[#4db2b0] focus:border-[#4db2b0] block w-full ps-10 p-2.5"
              placeholder="Select date"
            />
          </div>
        </div>
      ) : acceptedTerms ? (
        <>
          <div className="flex max-w min-h-screen flex-1 flex-col justify-center px-6 -mt-20 lg:px-8 bg-[#dddddd46]">
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
                        placeholder=""
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
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                          Password
                        </label>
                        <div className="text-sm">
                          <a href="#" className="font-semibold text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform">
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

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#4db2b0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#62e3e1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 ease-in-out transform"
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
      ) : (
        <div className="flex items-center justify-center mt-52">
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-center text-xl font-bold mb-4">Terms of service</h2>
            <div className="text-center text-xl font-bold mb-4 p-4">
              <p>Do you accept the terms of service?</p>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleTermsAccept}
                className="bg-blue-200 flex items-center justify-center text-center font-bold mb-4 p-4 rounded-md"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
