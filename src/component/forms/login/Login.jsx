import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema as validationSchema } from "../validationSchema";
import { AuthUseCaseImpl } from "../../../useCases/useCases";
import useAuth from "../../../hooks/useAuth";
import AuthApiClient from "../../../api/ApiPlatform/AuthProvider";
import { AuthContext } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const authApiClient = new AuthApiClient();
  const authUseCase = new AuthUseCaseImpl(authApiClient);

  let navigate = useNavigate();

  const { login } = useAuth(authUseCase);
  const { authDispatch } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { token, user } = await login(values.email, values.password);
      authDispatch({ type: "LOGIN", payload: { token, user } });
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
            <div className="mb-6">
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
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
        <div className="mt-4 text-center">
          <p>
            Not a member?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
