"use client";

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button, Card, Chip, Spinner } from "@heroui/react";
import Link from 'next/link';
import { FaSignOutAlt, FaIdCard, FaEnvelope, FaCalendarAlt, FaShoppingBag, FaUserEdit } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner size="lg" color="success" label="Loading profile..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="max-w-md w-full p-8 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You must be logged in to view your profile.</p>
          <Button 
            onClick={() => window.location.assign("/login")} 
            className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold h-11 rounded-xl border-0 cursor-pointer flex items-center justify-center"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  const { user } = session;

  const purchases = [
    { id: "ORD-9281", date: "2026-04-12", items: "Premium Porcelain Tiles (Box of 4)", total: "$120.00", status: "Delivered" },
    { id: "ORD-8812", date: "2026-04-28", items: "Granite Finish Floor Tiles", total: "$340.50", status: "In Transit" },
    { id: "ORD-7519", date: "2026-05-02", items: "Ceramic Wall Tiles (White Glossy)", total: "$89.99", status: "Processing" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-12 select-none">
      
      {/* Cover & Profile Header */}
      <div className="relative bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="h-48 md:h-80 w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-4 right-4 text-white/40 text-xs md:text-sm font-medium bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            TileCraft Premium Account
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 relative z-10 text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-950 shadow-lg bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
              )}
            </div>

            <div className="flex-1 mb-2 md:mb-4">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
                {user.name}
              </h1>
              <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold mt-1 flex items-center justify-center md:justify-start gap-1">
                <FaIdCard className="inline" /> Customer ID: <span className="font-mono bg-teal-50 dark:bg-teal-900/40 px-2 py-0.5 rounded border border-teal-100 dark:border-teal-800">{user.id ? user.id.slice(0, 10).toUpperCase() : "CID-001294"}</span>
              </p>
            </div>

            {/* Buttons Section */}
            {/* Buttons Section */}
<div className="flex gap-3 mb-4">
 
  <Link href="/my-profile/update">
    <Button
      className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-5 h-11 rounded-xl shadow-lg transition-all flex items-center gap-2"
    >
      <FaUserEdit /> Edit Profile
    </Button>
  </Link>
  
  <Button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 h-11 rounded-xl shadow-lg transition-all flex items-center gap-2"
  >
    <FaSignOutAlt /> Log Out
  </Button>
</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Info */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
              Profile Info
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-teal-500">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-400 font-medium">Email Address</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-teal-500">
                  <FaCalendarAlt className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Joined Since</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "May 3, 2026"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Purchase History Table */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FaShoppingBag className="text-teal-500" /> Recent Purchase History
              </h3>
              <Chip variant="flat" color="success" className="font-semibold text-xs border border-green-200 dark:border-green-900">
                Active Customer
              </Chip>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 border-b pb-4">
              Review your recently purchased items and current status.
            </p>

            <div className="overflow-x-auto w-full border border-gray-100 dark:border-gray-800 rounded-2xl">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left bg-transparent">
                <thead>
                  <tr className="bg-gray-50/80 dark:bg-gray-900/40">
                    <th className="px-4 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Items</th>
                    <th className="px-4 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {purchases.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/40 dark:hover:bg-gray-900/10 transition-colors">
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-gray-700 dark:text-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item.items}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                        {item.date}
                      </td>
                      <td className="px-4 py-3.5 text-sm font-bold text-teal-600 dark:text-teal-400">
                        {item.total}
                      </td>
                      <td className="px-4 py-3.5">
                        <Chip
                          size="sm"
                          variant="dot"
                          color={
                            item.status === "Delivered"
                              ? "success"
                              : item.status === "In Transit"
                              ? "warning"
                              : "primary"
                          }
                          className="font-semibold text-xs capitalize"
                        >
                          {item.status}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}