"use client";

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      onSuccess: () => {
        toast.success("Logged out successfully!");
        setTimeout(() => {
          router.push('/login');
          router.refresh();
        }, 1200);
      }
    });
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Access Denied</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Please login to view your profile.</p>
        <Link href="/login" className="btn bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white border-none px-6">
          Go to Login
        </Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <ToastContainer />
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-6 md:p-8 border border-base-200 rounded-2xl select-none">
        <div className="flex flex-col items-center text-center">
  
          <div className="relative mb-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-teal-500/30 p-1 shadow-sm"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-400" />
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
            {user.email}
          </p>

      
          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/my-profile/update"
              className="btn btn-outline border-teal-500 hover:bg-teal-500 hover:border-teal-500 text-teal-600 hover:text-white flex items-center justify-center gap-2 rounded-xl transition-all"
            >
              <FaEdit /> Edit Profile
            </Link>

            <button
              onClick={handleLogout}
             className="btn btn-sm sm:btn-md text-white font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 border-none hover:from-green-500 hover:via-teal-600 hover:to-blue-600 transition-all"
            >
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;