"use client";

import React from 'react';
import { Form, TextField, Label, Input, FieldError, Description, Button, Card } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("Form Submitted with:", userData);

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password
    }, {
      onSuccess: () => {
        toast.success("Login successful! Redirecting to home...");
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1500);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Login failed. Please check your credentials.");
      }
    });

    console.log("LogIn response:", { data, error });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <ToastContainer />

      <Card className="w-full max-w-md shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 rounded-2xl">
        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please login to your account
            </p>
          </div>

          <Form
            className="flex w-full flex-col gap-5"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={onSubmit}
          > 
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="font-semibold text-sm text-gray-700 dark:text-gray-300">Email</Label>
              <Input name="email" placeholder="Your Email Address" className="mt-1" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="font-semibold text-sm text-gray-700 dark:text-gray-300">Password</Label>
              <Input name="password" placeholder="Enter your password" type="password" className="mt-1" />
              <Description className="text-xs text-gray-400 mt-1">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <div className="flex gap-3 mt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 hover:opacity-95 text-white font-bold rounded-xl shadow-lg border-none transition-all py-3"
              >
                Submit
              </Button>
              <Button 
                type="reset" 
                variant="secondary"
                className="rounded-xl border border-gray-300 dark:border-gray-700 font-semibold px-5"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;