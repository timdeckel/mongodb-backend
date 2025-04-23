"use client";

import { useMutation } from "@tanstack/react-query";

import { deletePost } from "@/actions/delete-post";
import { handleServerActionError } from "@/lib/errorHandeling";
import { Children } from "react";

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deletePost(postId));
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className="rounded-xl bg-neutral-700 p-2 text-white hover:bg-neutral-500"
    >
      Delete
    </button>
  );
};
