import { client } from "./clients";
import { homepagePostsSchema, postPageSchema } from "./schemas";

export const getPost = async (id: string) => {
  try {
    const response = await client.get(`/posts/${id}`);

    const { data, error } = postPageSchema.safeParse(response.data);
    if (error) {
      console.log(error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error fetching post:", err);
    return null;
  }
};

export const getPosts = async (limit: number, page: number) => {
  try {
    const response = await client.get("/posts", {
      params: { limit, page },
    });

    const { data, error } = homepagePostsSchema.safeParse(response.data);
    if (error) {
      console.error("Schema validation failed1:", error.format());
      return null;
    }

    return data;
  } catch {
    console.error("Schema validation failed and returned null");
    return null;
  }
};
