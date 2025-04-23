"use server";
import { auth } from "../lib/auth";
import { client } from "../lib/clients";
import { ServerActionResponse, handleAxiosError } from "../lib/errorHandeling";
import { logInSchema, LogInValues } from "../lib/schemas";
import { redirect } from "next/navigation";

export const LogIn = async (
  data: LogInValues
): Promise<ServerActionResponse> => {
  try {
    const parseData = logInSchema.parse(data);
    const response = await client.post("/auth/login", parseData);
    await auth.setAccessToken(response.data.accesstoken);
  } catch (error) {
    return handleAxiosError(error);
  }
  redirect("/");
};
