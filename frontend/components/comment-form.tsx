"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { commentSchema, type CommentData } from "@/lib/schemas";
import { handleServerActionError } from "@/lib/errorHandeling";
import FormError from "@/components/FormError/formError";
import { createComment } from "@/actions/create-comment";

export const CreateCommentForm = ({ postId }: { postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CommentData) => {
      handleServerActionError(await createComment(values, postId));
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (values: CommentData) => {
    mutate(values);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 "
    >
      <textarea
        {...register("content")}
        placeholder="comment..."
        className="input font-bold bg-gray-600 p-2 rounded"
      />
      <FormError error={errors.content?.message} />
      <button
        type="submit"
        className=" m-auto font-bold bg-gray-600 py-2 px-10 cursor-pointer rounded hover:bg-neutral-500"
      >
        {isPending ? "uploading comment..." : "comment"}
      </button>
    </form>
  );
};
