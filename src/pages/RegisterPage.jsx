import React, { useState } from "react";

const RegisterPage = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Terms and Conditions
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              className="text-blue-500"
              checked={agreeTerms}
              onChange={handleAgreeTermsChange}
            />
            <label className="ml-2 text-gray-700" htmlFor="agreeTerms">
              I agree to the Terms and Conditions
            </label>
          </div>
        </div>
        <div>
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
            disabled={!agreeTerms}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
