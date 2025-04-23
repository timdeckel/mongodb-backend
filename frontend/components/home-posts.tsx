"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { type HomepagePostsData } from "@/lib/schemas";
import { getPosts } from "@/lib/queries";
import { useRouter } from "next/navigation";

export const HomePosts = ({
  initialData,
  limit,
}: {
  initialData: HomepagePostsData;
  limit: number;
}) => {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        return await getPosts(limit, pageParam);
      },
      getNextPageParam: (lastPage) => lastPage?.nextPage,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      initialPageParam: 1,
    });

  const currentPosts = data.pages.map((page) => page?.posts || []).flat();

  return (
    <section className="flex flex-col items-center gap-10">
      {currentPosts.map(({ id, title, author, comments }) => (
        <div
          key={id}
          role="button"
          onClick={() => router.push(`/posts/${id}`)}
          className="flex w-full flex-col rounded-md bg-gray-600 p-4"
        >
          <span className="flex items-center gap-2 ">{author.username}</span>
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="flex items-center mt-4 justify-between">
            <p className="flex items-center gap-2">
              Comments: {comments?.length}
            </p>
          </div>
        </div>
      ))}
      <Loader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
};

const Loader = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) => {
  const loader = useRef(null);

  useEffect(() => {
    const { current: svg } = loader;
    if (!svg) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(svg);
    return () => {
      observer.unobserve(svg);
    };
  }, [loader, fetchNextPage, isFetchingNextPage]);

  if (!hasNextPage) {
    return null;
  }

  return (
    <svg
      ref={loader}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
