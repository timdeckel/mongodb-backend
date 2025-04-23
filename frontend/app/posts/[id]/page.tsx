import { notFound } from "next/navigation";
import Link from "next/link";

import { getPost } from "@/lib/queries";
import { auth } from "@/lib/auth";
import { DeletePostButton } from "@/components/delete-post-button";
import { CreateCommentForm } from "@/components/comment-form";
import { DeleteCommentButton } from "@/components/delete-comment-button";

export const revalidate = 900;

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  if (!post) {
    console.log("post not found");
    return notFound();
  }

  const isAUserLoggedIn = await auth.isLoggedIn();
  const user = await auth.getUser();
  const isAuthor = user && user.id === post.author.id;

  return (
    <main className="main p-6">
      <article className="space-y-4 rounded-lg bg-gray-500 p-6">
        <header className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-zinc-600">
              {post.author.username}
            </span>
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          {isAuthor && (
            <div className="flex gap-3">
              <Link
                href={`/posts/${post.id}/edit`}
                className="rounded-xl bg-neutral-700 p-2 text-white hover:bg-neutral-500"
              >
                edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </header>
        <p>{post.content}</p>
      </article>
      {user && <CreateCommentForm postId={post.id} />}
      {post.comments &&
        post.comments.length > 0 &&
        post.comments?.map((comment, index) => (
          <div className="relative m-2 rounded bg-gray-300 p-4" key={index}>
            <h2 className="flex items-center gap-2">
              {comment.author.username}
            </h2>
            <p>{comment.content}</p>

            {(isAuthor || user?.id === comment.author._id) && (
              <DeleteCommentButton postId={post.id} commentId={comment._id} />
            )}
          </div>
        ))}
    </main>
  );
}
