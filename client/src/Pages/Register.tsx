import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { LoadingSpinner } from "../Components/LoadingSpinner";

export const Register: React.FC = () => {
  interface SignupInput {
    name: null | string;
    email: null | string;
    password: null | string;
  }

  const [registerInputs, setRegisterInputs] = useState<SignupInput>({
    name: null,
    email: null,
    password: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  async function sendRegisterRequest(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name: registerInputs.name,
        email: registerInputs.email,
        password: registerInputs.password,
      });

      const jwt = response.data;

      console.log(jwt);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

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
            <p className="text-[32px] font-bold text-violet-600">Register</p>
            <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
              Enter your Name Email and Password to sign up!
            </p>
            <div className="mt-2"></div>
            <div className="relative my-4">
              <div className="relative flex items-center py-1">
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
              </div>
            </div>
            <div>
              <form className="mb-2">
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <LabelledInput
                      type="text"
                      placeholder="Enter your name.."
                      label="Name"
                      onChange={(e) => {
                        setRegisterInputs({
                          ...registerInputs,
                          name: e.target.value,
                        });
                      }}
                    />

                    <LabelledInput
                      type="email"
                      placeholder="Enter your email.."
                      label="Email"
                      onChange={(e) => {
                        setRegisterInputs({
                          ...registerInputs,
                          email: e.target.value,
                        });
                      }}
                    />
                    <LabelledInput
                      type="password"
                      placeholder="Enter your new password.."
                      label="Password"
                      onChange={(e) => {
                        setRegisterInputs({
                          ...registerInputs,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <button
                    onClick={sendRegisterRequest}
                    className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-violet-600 text-primary-foreground hover:bg-violet-500 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                    type="submit"
                  >
                    {isLoading ? <LoadingSpinner /> : "Sign up"}
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
                  to="/login"
                  className="font-medium text-zinc-950 dark:text-white text-sm"
                >
                  Already have an Account? Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <>
      <label className="text-zinc-950 dark:text-white" htmlFor="email">
        {label}
      </label>
      <input
        onChange={onChange}
        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
        placeholder={placeholder}
        type={type || "text"}
        name="email"
        required
      />
    </>
  );
}
