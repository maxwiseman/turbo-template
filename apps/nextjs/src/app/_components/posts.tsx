"use client";

import type { Key } from "react";
import { use } from "react";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";
import { CreatePostSchema } from "@acme/validators";

import { api } from "~/trpc/react";

export function CreatePostForm(): React.ReactElement {
  const form = useForm({
    schema: CreatePostSchema,
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.post.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post",
      );
    },
  });

  function submit(data: { title: string; content: string }): void {
    toast.promise(createPost.mutateAsync(data), {
      loading: "Creating post...",
      success: "Post created!",
      error: "Failed to create post!",
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-2xl flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          submit(data);
        })}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Create</Button>
      </form>
    </Form>
  );
}

export function PostList(props: {
  posts: Promise<RouterOutputs["post"]["all"]>;
}): React.ReactElement {
  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- its fine
  const initialData = use(props.posts);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- its fine
  const { data: posts } = api.post.all.useQuery(undefined, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- its fine
    initialData,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its fine
  if (posts.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No posts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- its fine */}
      {posts.map((p: { id: Key | null | undefined }) => {
        return <PostCard key={p.id} post={p} />;
      })}
    </div>
  );
}

export function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
}): React.ReactElement {
  const utils = api.useUtils();
  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a post"
          : "Failed to delete post",
      );
    },
  });

  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its fine */}
        <h2 className="text-2xl font-bold text-primary">{props.post.title}</h2>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its fine */}
        <p className="mt-2 text-sm">{props.post.content}</p>
      </div>
      <div>
        <Button
          variant="ghost"
          className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access -- its fine
            deletePost.mutate(props.post.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export function PostCardSkeleton(props: {
  pulse?: boolean;
}): React.ReactElement {
  const { pulse = true } = props;
  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2
          className={cn(
            "w-1/4 rounded bg-primary text-2xl font-bold",
            pulse && "animate-pulse",
          )}
        >
          &nbsp;
        </h2>
        <p
          className={cn(
            "mt-2 w-1/3 rounded bg-current text-sm",
            pulse && "animate-pulse",
          )}
        >
          &nbsp;
        </p>
      </div>
    </div>
  );
}
