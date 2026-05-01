"use client";

import React from 'react'
import { Form, TextField,  Label, Input, FieldError, Description, Button } from "@heroui/react";
import { authClient } from '@/lib/auth-client';


const LoginPage = () => {
 
    const onSubmit = async(e) => {
       e.preventDefault();
       const formData = new FormData(e.currentTarget);
       const userData = Object.fromEntries(formData.entries());
       console.log("From Submitted with:", userData)
     
       const {data, error}= await authClient.signIn.email({
        name: userData.name,
        email:userData.email,
        password:userData.password
       })
       console.log("LogIn response:",{data,error})
   
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <Form
      className="flex w-96 flex-col gap-4 "
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >   <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input name="name" placeholder="Your Name" />
            <FieldError />
        </TextField>
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
        <Label>Email</Label>
        <Input   name="email" placeholder="Your Email Address" />
        <FieldError />
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
        <Label>Password</Label>
        <Input name="password" placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          {/* <Check /> */}
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
     </div>
  );
};



export default LoginPage;

// "use client";

// import React, { useState } from 'react';
// import { Form, TextField, Label, Input, FieldError, Description, Button } from "@heroui/react";
// import { authClient } from '@/lib/auth-client';
// import { useRouter } from 'next/navigation';

// const LoginPage = () => {
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
 
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const userData = Object.fromEntries(formData.entries());
//     console.log("Form Submitted with:", userData);
     
//     // Better Auth এর সঠিক মেথড হলো signIn.email
//     const { data, error: authError } = await authClient.signIn.email({
//       email: userData.email,
//       password: userData.password,
//     }, {
//       onRequest: () => setLoading(true),
//       onSuccess: () => {
//         setLoading(false);
//         // সফলভাবে লগইন হলে ইউজারকে যেখানে রিডাইরেক্ট করতে চান
//         router.push('/all-tiles'); 
//       },
//       onError: (ctx) => {
//         setLoading(false);
//         setError(ctx.error.message || 'Login failed. Please check your credentials.');
//       }
//     });

//     if (authError) {
//       console.error("LogIn Error:", authError);
//     } else {
//       console.log("LogIn success response:", data);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <Form
//         className="flex w-96 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
//         render={(props) => <form {...props} data-custom="foo" />}
//         onSubmit={onSubmit}
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>

//         {/* কোনো ভুল হলে তা এখানে দেখাবে */}
//         {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

//         <TextField
//           isRequired
//           name="name"
//           className="flex flex-col gap-1"
//           validate={(value) => {
//             if (value.length < 3) {
//               return "Name must be at least 3 characters";
//             }
//             return null;
//           }}
//         >
//           <Label className="text-sm font-medium text-gray-700">Name</Label>
//           <Input name="name" placeholder="Your Name" className="rounded-md border border-gray-300 p-2 text-sm focus:outline-none" />
//           <FieldError className="text-xs text-red-500" />
//         </TextField>

//         <TextField
//           isRequired
//           name="email"
//           type="email"
//           className="flex flex-col gap-1"
//           validate={(value) => {
//             if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//               return "Please enter a valid email address";
//             }
//             return null;
//           }}
//         >
//           <Label className="text-sm font-medium text-gray-700">Email</Label>
//           <Input name="email" placeholder="Your Email Address" className="rounded-md border border-gray-300 p-2 text-sm focus:outline-none" />
//           <FieldError className="text-xs text-red-500" />
//         </TextField>

//         <TextField
//           isRequired
//           minLength={8}
//           name="password"
//           type="password"
//           className="flex flex-col gap-1"
//           validate={(value) => {
//             if (value.length < 8) {
//               return "Password must be at least 8 characters";
//             }
//             return null;
//           }}
//         >
//           <Label className="text-sm font-medium text-gray-700">Password</Label>
//           <Input type="password" name="password" placeholder="Enter your password" className="rounded-md border border-gray-300 p-2 text-sm focus:outline-none" />
//           <Description className="text-xs text-gray-500">Must be at least 8 characters</Description>
//           <FieldError className="text-xs text-red-500" />
//         </TextField>

//         <div className="flex gap-2 mt-2">
//           <Button 
//             type="submit" 
//             isDisabled={loading}
//             className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:bg-blue-400"
//           >
//             {loading ? 'Logging in...' : 'Submit'}
//           </Button>
//           <Button 
//             type="reset" 
//             className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
//           >
//             Reset
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default LoginPage;