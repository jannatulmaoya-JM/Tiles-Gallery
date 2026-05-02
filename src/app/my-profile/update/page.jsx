
"use client";

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.user.update({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        setLoading(false);
      } else {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          router.push('/my-profile');
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-teal-600"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-200 px-4 text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <Link href="/login" className="btn bg-teal-500 text-white mt-4">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <ToastContainer />
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-6 md:p-8 border border-base-200 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-1 text-gray-800 dark:text-white">
          Update Profile
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Change your account information
        </p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-teal-500 transition-all rounded-xl"
            />
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-sm">Photo URL</span>
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter direct image URL"
              className="input input-bordered w-full focus:ring-2 focus:ring-teal-500 transition-all rounded-xl"
            />
          </div>

          <div className="form-control mt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn flex-1 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-bold border-none hover:opacity-90 transition-all rounded-xl shadow-lg"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
            </button>
            <Link href="/my-profile" className="btn btn-outline border-gray-300 dark:border-gray-700 font-semibold px-5 rounded-xl">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;