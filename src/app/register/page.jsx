"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
   
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error) {
        setErrorMsg(error.message || "Registration failed. Please try again.");
        setLoading(false);
      } else {
        console.log("Registration success:", data);

        router.push('/login');
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please check your network connection.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12">
      {/* ১. কার্ড ডিজাইন */}
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8 border border-base-200">
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800 dark:text-white">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Sign up to get started with Tiles Gallery
        </p>

        {/* এরর মেসেজ প্রদর্শনের জন্য */}
        {errorMsg && (
          <div className="alert alert-error mb-4 py-2 text-sm text-white rounded-lg select-none">
            {errorMsg}
          </div>
        )}

        {/* ২. রেজিস্ট্রেশন ফর্ম */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          {/* নাম ফিল্ড */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder=" Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>

          {/* ইমেল ফিল্ড */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder=" Enter Your Email "
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="input input-bordered w-full focus:ring-2 focus:ring-teal-500 transition-all"
            />
            <span className="text-xs text-gray-400 mt-1">Must be at least 8 characters</span>
          </div>

          {/* সাইন আপ বাটন */}
          <div className="form-control mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="btn bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-bold border-none hover:opacity-90 w-full transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        {/* ৩. লগইন লিংক */}
        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-500 font-bold hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;