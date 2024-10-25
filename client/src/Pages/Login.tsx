import React, { useState, useContext, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import LabelledInput from "./Register";
import axios from "axios";
import { BACKEND_URL } from "../config";

import { LoadingSpinner } from "../Components/LoadingSpinner";
export const Login: React.FC = () => {
  interface LoginInput {
    email: null | string;
    password: null | string;
  }

  const [loginInputs, setLoginInputs] = useState<LoginInput>({
    email: null,
    password: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  async function sendLoginRequest(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
        email: loginInputs.email,
        password: loginInputs.password,
      });

      const jwt = response.data;

      console.log(jwt);
    } catch (e) {
      console.log(`Error while loggin in: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (setUser) {
      setUser({ email: loginInputs.email, password: loginInputs.password });
    }
    navigate("/");
  };

  return (
    <>
      <Link
        to="/"
        className="w-full flex justify-around bg-violet-600 text-white hover:bg-violet-500 p-2 rounded-b-lg text-sm font-medium underline transition-all"
      >
        <div>Back to Home</div>
      </Link>
      <link
        rel="stylesheet"
        href="https://horizon-ui.com/shadcn-nextjs-boilerplate/_next/static/css/32144b924e2aa5af.css"
      />
      <div className="flex flex-col justify-center items-center bg-white h-[100vh]">
        <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
          <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
            <p className="text-[32px] font-bold text-violet-600">Sign In</p>
            <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
              Enter your email and password to sign in!
            </p>
            <div className="mt-8"></div>
            <div className="relative my-4">
              <div className="relative flex items-center py-1">
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
              </div>
            </div>
            <div>
              <form className="mb-4">
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <LabelledInput
                      type="email"
                      placeholder="Enter your email.."
                      label="Email"
                      onChange={(e) => {
                        setLoginInputs({
                          ...loginInputs,
                          email: e.target.value,
                        });
                      }}
                    />
                    <LabelledInput
                      type="password"
                      placeholder="Enter your new password.."
                      label="Password"
                      onChange={(e) => {
                        setLoginInputs({
                          ...loginInputs,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <button
                    onClick={sendLoginRequest}
                    className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-violet-600 text-primary-foreground hover:bg-violet-500 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                    type="submit"
                  >
                    {isLoading ? <LoadingSpinner /> : "Sign In"}
                  </button>
                </div>
              </form>
              <p>
                <Link
                  to="/"
                  className="font-medium text-zinc-950 dark:text-white text-sm"
                >
                  Forgot your password?
                </Link>
              </p>

              <p>
                <Link
                  to="/register"
                  className="font-medium text-zinc-950 dark:text-white text-sm"
                >
                  Don't have an account? Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
