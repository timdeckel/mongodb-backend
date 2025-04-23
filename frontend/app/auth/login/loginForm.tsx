"use client";

import { LogInValues, logInSchema } from "../../../lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "@/actions/logIn";
import { handleServerActionError } from "@/lib/errorHandeling";
import FormError from "@/components/FormError/formError";

const LogInForm = () => {
  const { mutate } = useMutation({
    mutationFn: async (values: LogInValues) => {
      handleServerActionError(await LogIn(values));
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex flex-col flex w-full flex-col gap-2 font-bold bg-gray-500 p-2 rounded  gap-12 my-8"
    >
      <p className="text-xl">Enter your details!</p>
      <input
        {...register("username")}
        className="border-1 border-gray-400 rounded p-2"
        placeholder="username"
      />
      <FormError error={errors.username?.message} />
      <input
        {...register("password")}
        className="border-1 border-gray-400 rounded p-2"
        placeholder="password"
      />
      <FormError error={errors.password?.message} />
      <button
        type="submit"
        className="font-bold bg-gray-600 px-10 py-2 m-auto rounded hover:bg-neutral-500"
      >
        Log In
      </button>
    </form>
  );
};

export default LogInForm;
