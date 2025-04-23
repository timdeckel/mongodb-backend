import { cookies } from "next/headers";
import { client } from "./clients";
import "server-only";
import { type ProfileData, profileSchema } from "./schemas";

const setAccessToken = async (accesstoken: string) => {
  const cookieStore = await cookies();
  cookieStore.set("access-token", accesstoken, { httpOnly: true });
};

const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("access-token");
};

const deleteAccessToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
};

const getUser = async (): Promise<ProfileData | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const response = await client.get("/profile", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const { data, error } = profileSchema.safeParse(response.data);
    if (error) {
      console.log("Validation failed:", error.format());
      return null;
    }

    return data;
  } catch (err) {
    console.log("Not logged in or token invalid");
    return null;
  }
};

const isLoggedIn = async (): Promise<boolean> => {
  const user = await getUser();
  return !!user;
};

export const auth = {
  setAccessToken,
  getAccessToken,
  deleteAccessToken,
  getUser,
  isLoggedIn,
};
