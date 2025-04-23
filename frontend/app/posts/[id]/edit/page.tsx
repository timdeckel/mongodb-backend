import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getPost } from "@/lib/queries";
import { EditPostForm } from "./form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);
  const user = await auth.getUser();
  const isAuthor = user && user.id === post?.author.id;

  if (!post || !isAuthor) {
    return notFound();
  }

  return (
    <main className="rounded-md bg-gray-600 p-4">
      <h1 className=" text-xl">edit post</h1>
      <EditPostForm
        defaultValues={{ title: post.title, content: post.content }}
        postId={post.id}
      />
    </main>
  );
}
