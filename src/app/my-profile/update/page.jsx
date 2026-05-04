"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Spinner } from "@heroui/react"; 
import { FaUser, FaArrowLeft, FaImage, FaEnvelope } from "react-icons/fa";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const uploadToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name cannot be empty!");
    if (!email.trim()) return alert("Email cannot be empty!");

    try {
      setLoading(true);
      let uploadedImageUrl = session?.user?.image || "";
      let uploadedCoverUrl = session?.user?.coverImage || "";

      if (imageFile) {
        uploadedImageUrl = await uploadToImgBB(imageFile);
      }

      if (coverFile) {
        uploadedCoverUrl = await uploadToImgBB(coverFile);
      }
      
      await authClient.updateUser({
        name: name,
        email: email,
        image: uploadedImageUrl,
        customFields: {
          coverImage: uploadedCoverUrl
        }
      });

      alert("Profile updated successfully!");

      window.location.assign("/my-profile");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner size="lg" color="success" label="Loading..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="max-w-md w-full p-8 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You must be logged in to update profile.</p>
          <Button onClick={() => window.location.assign("/login")} className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold h-11 rounded-xl">
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl shadow-sm">

        <button 
          type="button"
          onClick={() => window.location.assign("/my-profile")}
          className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1 font-semibold mb-4 hover:underline select-none bg-transparent border-0 cursor-pointer outline-none"
        >
          <FaArrowLeft /> Back to Profile
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          Update Information
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Change your name, email, profile picture, and cover photo.
        </p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <FaUser className="text-gray-400 text-sm" /> Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-teal-500 transition-all text-gray-800 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <FaEnvelope className="text-gray-400 text-sm" /> Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-teal-500 transition-all text-gray-800 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <FaImage /> Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer border border-gray-200 p-1.5 rounded-xl bg-transparent"
            />
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <FaImage /> Cover Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer border border-gray-200 p-1.5 rounded-xl bg-transparent"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold h-11 rounded-xl mt-2 shadow-lg hover:opacity-90 transition-all"
          >
            {loading ? "Saving Changes..." : "Save Profile & Images"}
          </Button>
        </form>
      </Card>
    </div>
  );
}