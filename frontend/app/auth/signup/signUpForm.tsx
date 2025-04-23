"use client";

import { signUpSchema, SignUpValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignUp } from "@/actions/signUp";
import { handleServerActionError } from "@/lib/errorHandeling";
import FormError from "@/components/FormError/formError";

const SignUpForm = () => {
  const { mutate } = useMutation({
    mutationFn: async (values: SignUpValues) => {
      handleServerActionError(await SignUp(values));
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values: SignUpValues) => mutate(values))}
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
        Create
      </button>
    </form>
  );
};

export default SignUpForm;
