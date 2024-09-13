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

  const handleTermsAccept = (e) => {
    setAcceptedTerms(true);
  }

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
        <>
        <h1 className="flex items-center justify-center  p-4">Welcome to Huisvest</h1>
        <div className="flex items-center justify-center">
          
          <div className="p-6 bg-white rounded shadow-md">  
            <h2 className="text-center text-xl font-bold mb-4 p-4">
              Select Your Date of Birth
            </h2>
            <input
              type="date"
              onChange={handleDateChange}
              className="block p-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        </>
      ) : (
        acceptedTerms ? (
          <>
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-20 sm:max-w-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mx-auto h-1 w-auto"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-3">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Register
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Have an account?{" "}
                  <a
                    href="/Login"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-center text-xl font-bold mb-4">
              Terms of service
            </h2>
            <p>dsjnhggbjiyvvvvvvvvvvvvvvvvvvvvvv bla bla bla</p>
            <button onClick={handleTermsAccept} className="bg-blue-200 p-2 rounded-md">Accept</button>
          </div>
        </div>
        )
      )}
    </>
  );
}
