"use server";

import { auth } from "@/lib/auth";
import { client } from "@/lib/clients";
import { handleAxiosError } from "@/lib/errorHandeling";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteComment = async (postId: string, commentId: string) => {
  const accessToken = await auth.getAccessToken();

  if (!accessToken) {
    return { error: "you have to be logged in to delete a comment" };
  }

  try {
    await client.delete(`/posts/${postId}/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
  } catch (error) {
    return handleAxiosError(error);
  }

  revalidatePath("/");
  redirect(`/posts/${postId}`);
};
