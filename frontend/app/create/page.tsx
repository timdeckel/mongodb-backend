import { CreatePostForm } from "./form";

export default function CreatePage() {
  return (
    <main className="font-bold bg-gray-500 p-4 m-4 rounded ">
      <h1 className="font-bold text-xl ">create post</h1>
      <CreatePostForm />
    </main>
  );
}
