import React, { useState } from 'react';
import Header from "../components/Header";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://chrisouboter.com/api/auth/login', {
      email,
      password
    });

    const data = response.data;
    console.log(data);

    if (response.status === 200) {
      // If login is successful, store the token and show a success message
      localStorage.setItem('token', data.token); // Save the token for future authenticated requests
      setSuccessMessage('Login successful');
      setErrorMessage('');
    } else {
      // Handle error message
      setErrorMessage(data.message || 'Login failed');
      setSuccessMessage('');
    }
  } catch (error) {
    console.log(error);
    setErrorMessage('An error occurred. Please try again.');
  }
};


  return (
    <>
      <Header />
      <div className="flex max-w min-h-screen flex-1 flex-col justify-center px-6 -mt-32 lg:px-8 bg-[#dddddd46]">
        <div className="bg-white px-32 p-16 rounded-md mx-auto">
          <div className="sm:mx-auto sm:w-20 sm:max-w-20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto h-1 w-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#4db2b0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#62e3e1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 ease-in-out transform"
                >
                  Sign in
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
              Don't have an account?{' '}
              <a href="/Register" className="font-semibold leading-6 text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
