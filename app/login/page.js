'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../globals.css';

const Login = () => {
  const id="jkjk"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim().length > 0) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim().length > 0) {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch(`https://plypicker-backend-3a25.onrender.com/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok === false) {
        toast.error(data.error, {
          autoClose: 1000,
        });
      }
      else if(response.status === 200) {
        const token = data.token;
        toast.success('Login Successful', {
          autoClose: 1000,
        });
        setTimeout(() => {
          router.push('/list');
        }, 2000);
        localStorage.setItem("token", token);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">Login</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="font-semibold text-xs">
          Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <label htmlFor="password" className="font-semibold text-xs mt-3">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <p>New account?</p>
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-500 px-1"
          >
            Sign Up
          </a>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Login;