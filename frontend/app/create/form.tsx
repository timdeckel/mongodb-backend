"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPost } from "@/actions/create-post";
import { postActionSchema, type PostValues } from "@/lib/schemas";
import { handleServerActionError } from "@/lib/errorHandeling";
// import { FieldError } from '@/components/field-error'
import FormError from "@/components/FormError/formError";

export const CreatePostForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PostValues) => {
      handleServerActionError(await createPost(values));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValues>({
    resolver: zodResolver(postActionSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col gap-4"
    >
      <input
        {...register("title")}
        type="text"
        placeholder="title"
        className="input"
      />
      <FormError error={errors.title?.message} />
      <textarea
        {...register("content")}
        placeholder="content"
        className="input min-h-96 rounded-3xl"
      />
      <FormError error={errors.content?.message} />
      <button type="submit" className="button-primary">
        {isPending ? "uploading post..." : "post"}
      </button>
    </form>
  );
};
