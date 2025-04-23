"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPost } from "@/actions/create-post";
import { postActionSchema, type PostValues } from "@/lib/schemas";
import { handleServerActionError } from "@/lib/errorHandeling";
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
      className="flex w-full flex-col gap-2 font-bold bg-gray-600 p-2 rounded"
    >
      <input
        {...register("title")}
        type="text"
        placeholder="title"
        className="border-1 border-gray-400 rounded p-2"
      />
      <FormError error={errors.title?.message} />
      <textarea
        {...register("content")}
        placeholder="content"
        className="border-1 border-gray-400 rounded p-2"
      />
      <FormError error={errors.content?.message} />
      <button
        type="submit"
        className="font-bold bg-gray-500 px-10 py-2 m-auto rounded hover:bg-neutral-500"
      >
        {isPending ? "uploading post..." : "post"}
      </button>
    </form>
  );
};
