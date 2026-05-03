// "use client";

// import React from 'react';
// import { Form, TextField, Label, Input, FieldError, Description, Button, Card } from "@heroui/react";
// import { authClient } from '@/lib/auth-client';
// import { useRouter } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginPage = () => {
//   const router = useRouter();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const userData = Object.fromEntries(formData.entries());
//     console.log("Form Submitted with:", userData);

//     const { data, error } = await authClient.signIn.email({
//       email: userData.email,
//       password: userData.password
//     }, {
//       onSuccess: () => {
//         toast.success("Login successful! Redirecting to home...");
//         setTimeout(() => {
//           router.push('/');
//           router.refresh();
//         }, 1500);
//       },
//       onError: (ctx) => {
//         toast.error(ctx.error.message || "Login failed. Please check your credentials.");
//       }
//     });

//     console.log("LogIn response:", { data, error });
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
//       <ToastContainer />

//       <Card className="w-full max-w-md shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 rounded-2xl">
//         <div className="p-6 md:p-8">
//           <div className="mb-6 text-center">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
//               Welcome Back
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Please login to your account
//             </p>
//           </div>

//           <Form
//             className="flex w-full flex-col gap-5"
//             render={(props) => <form {...props} data-custom="foo" />}
//             onSubmit={onSubmit}
//           > 
//             <TextField
//               isRequired
//               name="email"
//               type="email"
//               validate={(value) => {
//                 if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                   return "Please enter a valid email address";
//                 }
//                 return null;
//               }}
//             >
//               <Label className="font-semibold text-sm text-gray-700 dark:text-gray-300">Email</Label>
//               <Input name="email" placeholder="Your Email Address" className="mt-1" />
//               <FieldError className="text-xs text-red-500 mt-1" />
//             </TextField>

//             <TextField
//               isRequired
//               minLength={8}
//               name="password"
//               type="password"
//               validate={(value) => {
//                 if (value.length < 8) {
//                   return "Password must be at least 8 characters";
//                 }
//                 if (!/[A-Z]/.test(value)) {
//                   return "Password must contain at least one uppercase letter";
//                 }
//                 if (!/[0-9]/.test(value)) {
//                   return "Password must contain at least one number";
//                 }
//                 return null;
//               }}
//             >
//               <Label className="font-semibold text-sm text-gray-700 dark:text-gray-300">Password</Label>
//               <Input name="password" placeholder="Enter your password" type="password" className="mt-1" />
//               <Description className="text-xs text-gray-400 mt-1">
//                 Must be at least 8 characters with 1 uppercase and 1 number
//               </Description>
//               <FieldError className="text-xs text-red-500 mt-1" />
//             </TextField>

//             <div className="flex gap-3 mt-4">
//               <Button 
//                 type="submit" 
//                 className="flex-1 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 hover:opacity-95 text-white font-bold rounded-xl shadow-lg border-none transition-all py-3"
//               >
//                 Submit
//               </Button>
//               <Button 
//                 type="reset" 
//                 variant="secondary"
//                 className="rounded-xl border border-gray-300 dark:border-gray-700 font-semibold px-5"
//               >
//                 Reset
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;

"use client";

import React from 'react';
import { Form, TextField, Label, Input, FieldError, Description, Button, Card } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const router = useRouter();

  // Email & Password Login handler
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    await authClient.signIn.email({
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
  };

  // Google Login handler
  // const handleGoogleLogin = async () => {
  //   await authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: "/",
  //     onSuccess: () => {
  //       toast.success("Login successful with Google!");
  //     },
  //     onError: (ctx) => {
  //       toast.error(ctx.error.message || "Google login failed.");
  //     }
  //   });
  // };
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      toast.success("Login successful with Google!");
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    };
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
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

            <div className="flex gap-3 mt-2">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 hover:opacity-95 text-white font-bold rounded-xl shadow-lg border-none transition-all py-3"
              >
                Login
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-950 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <Button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-xl shadow-sm transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.422-5.192l-6.239-5.263C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.239,5.263C42.42,35.421,44,29.988,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-teal-500 hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;