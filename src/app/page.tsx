"use client";
import CommentForm from "@/components/commentForm";
import { Button } from "@/components/ui/button";
import commentOperations from "@/operations/commentOperations";
// import { useQuery, useSubscription } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  comment: string;
}

interface Comments {
  getComments: Comment[];
}

interface SubscriptionDataProps {
  subscriptionData: {
    data: { commentCreated: { id: string; comment: string } };
  };
}

export default function Home() {
  const [comment, setComment] = useState<any>();

  // const { data, loading } = useSubscription(
  //   commentOperations.Subscriptions.commentCreated,
  //   {
  //     onData: (data) => {
  //       const newComment = data.data.data.commentCreated;
  //       setComment([...comment, newComment]);
  //     },
  //   }
  // );

  // console.log(comment);

  const { data, subscribeToMore } = useQuery<Comments>(
    commentOperations.Queries.getAllComment
  );

  useEffect(() => {
    subscribeToMore({
      document: commentOperations.Subscriptions.commentCreated,
      updateQuery: (prev, { subscriptionData }: SubscriptionDataProps) => {
        subscriptionData;

        if (!subscriptionData.data) return prev;
        // setComment(subscriptionData);
        const newComment = subscriptionData.data.commentCreated;

        const update = Object.assign({}, prev, {
          comments: [...prev.getComments, newComment],
        });

        setComment(update);

        return update;
      },
    });
  }, []);

  return (
    <main className="flex">
      <div className="border border-border w-72">Aside</div>
      <div className="flex-1 h-screen border border-border flex flex-col justify-end p-4">
        <div className="">
          {comment?.comments.map(({ comment, id }: Comment) => (
            <p key={id}>{comment}</p>
          ))}
        </div>

        <CommentForm />
      </div>
      <div className="border border-border w-72">Aside</div>
    </main>
  );
}
