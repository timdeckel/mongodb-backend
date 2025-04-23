"use client";
import Link from "next/link";
import LogInForm from "./loginForm";

const Login = () => {
  return (
    <div className="flex w-full flex-col gap-2 font-bold bg-gray-600 p-2 rounded">
      <h1 className="text-xl">Login</h1>
      <LogInForm />
      <Link href="/auth/signup">Dont have an account? Sign up here</Link>
    </div>
  );
};

export default Login;
