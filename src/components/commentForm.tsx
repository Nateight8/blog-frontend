"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import commentOperations from "@/operations/commentOperations";
import { useMutation } from "@apollo/client";

const FormSchema = z.object({
  comment: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const [commentMutation, { data, loading }] = useMutation(
    commentOperations.Mutations.createComment
  );

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const { comment } = formData;
    commentMutation({ variables: { comment } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="leave a comment..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"outline"} type="submit">
          {loading === true ? "Loading..." : "Submit Comment"}
        </Button>
      </form>
    </Form>
  );
}
