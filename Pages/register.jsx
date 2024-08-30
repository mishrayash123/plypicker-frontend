import React, { useState } from "react";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validation
    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (!role) {
      // Validate role selection
      toast.error("Please select a role");
      hasError = true;
    }

    if (hasError) return;

    try {
        const response = await fetch(`https://plypicker-backend-3a25.onrender.com/api/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, role }),
        });
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        toast.success('Register Successfully', {
          autoClose: 1000
        })
        console.log('Register Successfully')
        setTimeout(() => {
          router.push('/login');
        }, 2000);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">Register</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="font-semibold text-xs mt-3">
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
        <div className="flex items-center font-semibold text-xs mt-3">
          <label className="mx-4">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={handleRoleChange}
              className="mr-1"
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="team member"
              checked={role === "team member"}
              onChange={handleRoleChange}
              className="mr-1"
            />
            Team Member
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          Sign Up
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <p>Already have an account?</p>
          <a href="/login" className="text-blue-400 hover:text-blue-500 px-1">
            {" "}
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;