"use client";
import CommentForm from "@/components/commentForm";
import commentOperations from "@/operations/commentOperations";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import Image from "next/image";

interface Comment {
  id: string;
  comment: string;
}

interface Comments {
  getComments: Comment[];
}

export default function Home() {
  const { data } = useQuery<Comments>(commentOperations.Queries.getAllComment);
  const comments = data?.getComments;
  return (
    <main className="flex">
      <div className="border border-border w-72">Aside</div>
      <div className="flex-1 h-screen border border-border flex flex-col justify-end p-4">
        <div className="">
          {comments?.map(({ comment, id }) => (
            <p key={id}>{comment}</p>
          ))}
        </div>

        <CommentForm />
      </div>
      <div className="border border-border w-72">Aside</div>
    </main>
  );
}
