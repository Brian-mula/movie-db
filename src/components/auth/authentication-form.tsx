"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function AuthenticationForm({ pageType }: { pageType: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (password) {
      setPasswordError(false);
    }
    if (email) {
      setEmailError(false);
    }
    if (username) {
      setUsernameError(false);
    }
  }, [email, password, username]);

  //   handle email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  //   toggle password visisbility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  // handle password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Reset error state on change
  };
  // handle username
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // Reset error state on change
  };

  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // Validate password
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // If there are any errors, do not proceed
    if (!password || !email) {
      return;
    }
    const data = {
      email,
      password,
    };
  };
  return (
    <div className="w-full max-w-md">
      <form className="bg-secondary/90 shadow-md border-t-4 border-t-secondary rounded-2xl px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center justify-center mb-4">
          <img
            src="/logos/logo-text.png"
            alt="Movie app Logo"
            className="h-10"
          />
        </div>
        <h1 className="py-4 font-bold text-2xl text-accent text-center">
          {pageType === "login" ? "Login to your account" : "Create an account"}
        </h1>
        <p className="pb-8 text-center text-[#171717]">
          {pageType === "login"
            ? "Welcome back! Please enter your details."
            : "Join us today! Please enter your details."}
        </p>
        {pageType === "register" && (
          <div className="mb-4">
            <label
              className="block text-primary-content text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              value={username}
              onChange={handleUsernameChange}
              className={`shadow appearance-none border-2 transition-all duration-300 ease-in-out backdrop-blur-[10px] ${
                usernameError ? "border-red-500" : "border-transparent"
              }  w-full py-3 rounded-lg px-3 text-background leading-tight focus:outline-none focus:shadow-outline focus:border-[#2E7D32] focus:shadow-[0_0_0_4px_rgba(46,125,50,0.1)] placeholder:text-primary-content/50  `}
              id="username"
              type="text"
              placeholder="e.g John"
            />
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-primary-content text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            className={`shadow appearance-none border-2 transition-all duration-300 ease-in-out backdrop-blur-[10px] ${
              emailError ? "border-red-500" : "border-transparent"
            }  w-full py-3 rounded-lg px-3 text-background leading-tight focus:outline-none focus:shadow-outline focus:border-[#2E7D32] focus:shadow-[0_0_0_4px_rgba(46,125,50,0.1)] placeholder:text-primary-content/50 `}
            id="email"
            type="email"
            placeholder="abc@gmail.com"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-primary-content text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div
            className={`flex space-x-2 items-center mb-3  border ${
              passwordError ? "border-red-500" : "border-accent"
            } w-full rounded-lg px-2`}
          >
            <input
              value={password}
              onChange={handlePasswordChange}
              className=" appearance-none  rounded w-[96%] py-3 h-full flex-grow px-3 text-background  leading-tight focus:outline-none focus:shadow-outline "
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="*****"
            />
            <button
              className="cursor-pointer"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <input type="checkbox" />
            <label
              className="text-primary-content text-sm font-medium"
              htmlFor="remember"
            >
              Remember Me
            </label>
          </div>
          {pageType === "login" && (
            <a
              className="inline-block align-baseline font-bold text-sm text-accent hover:text-accent"
              href="#"
            >
              Forgot Password?
            </a>
          )}
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={handleSubmit}
            type="button"
            className="p-4 flex cursor-pointer space-x-2 items-center justify-center bg-[#114243] w-full rounded-lg text-success-content font-bold"
          >
            <span>🔒</span>
            <span>
              {pageType == "login" ? "Sign In Securely" : "Sign Up Securely"}
            </span>
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link
            className="inline-block align-baseline font-normal text-sm text-primary-content hover:text-accent"
            href={`${pageType === "login" ? "/register" : "/login"}`}
          >
            {pageType === "login"
              ? " Don't have an account?"
              : "Already have an account"}{" "}
            <span className="text-accent">
              {pageType === "login" ? "Register here" : "Login here"}
            </span>
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2025 movie app corp. All rights reserved.
      </p>
    </div>
  );
}

export default AuthenticationForm;
