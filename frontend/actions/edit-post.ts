"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { client } from "@/lib/clients";
import { handleAxiosError } from "@/lib/errorHandeling";
import { postActionSchema, type PostValues } from "@/lib/schemas";

export const editPost = async ({
  data,
  postId,
}: {
  data: PostValues;
  postId: string;
}) => {
  const parsedData = postActionSchema.parse(data);
  const accessToken = await auth.getAccessToken();

  if (!accessToken) {
    return { error: "you have to be logged in to edit a post" };
  }

  try {
    await client.put(`/posts/${postId}`, parsedData, {
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
