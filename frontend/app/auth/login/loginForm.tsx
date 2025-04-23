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
      className="flex flex-col  gap-12 my-8"
    >
      <p>Enter your details!</p>
      <input
        {...register("username")}
        className="input"
        placeholder="username"
      />
      <FormError error={errors.username?.message} />
      <input
        {...register("password")}
        className="input"
        placeholder="password"
      />
      <FormError error={errors.password?.message} />
      <button type="submit" className="button">
        Log In
      </button>
    </form>
  );
};

export default LogInForm;
