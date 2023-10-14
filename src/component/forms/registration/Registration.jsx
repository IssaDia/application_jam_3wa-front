import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema as validationSchema } from "../validationSchema";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

const Register = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle registration logic here with values.email, values.password, and values.agreeTerms
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                type="text"
                name="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Confirm your password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Terms and Conditions
              </label>
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  className="text-blue-500"
                />
                <label className="ml-2 text-gray-700" htmlFor="agreeTerms">
                  I agree to the Terms and Conditions
                </label>
              </div>
              <ErrorMessage
                name="agreeTerms"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Register
              </button>
            </div>
          </Form>
        </Formik>
        <div className="mt-4 text-center">
          <p>
            Already a member?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
