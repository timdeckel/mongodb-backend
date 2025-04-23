"use server";
import { ServerActionResponse, handleAxiosError } from "@/lib/errorHandeling";
import { signUpSchema, SignUpValues } from "@/lib/schemas";
import { redirect } from "next/navigation";
import { client } from "@/lib/clients";

export const SignUp = async (
  data: SignUpValues
): Promise<ServerActionResponse> => {
  try {
    const parseData = signUpSchema.parse(data);
    await client.post("/auth/signup", parseData);
  } catch (error) {
    return handleAxiosError(error);
  }

  redirect("/auth/login");
};
