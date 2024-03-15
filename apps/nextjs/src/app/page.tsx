import { Suspense } from "react";

import { api } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export const runtime = "edge";

export default async function HomePage(): Promise<React.ReactElement> {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <div className="inline-block">
            <svg
              aria-label="Turbo logotype"
              height="63"
              role="img"
              viewBox="0 0 297 63"
              width="297"
            >
              <path
                d="M123.873 23.5315V15.2523H83.9727V23.5315H99.035V51.0625H108.81V23.5315H123.873Z"
                fill="hsl(var(--primary))"
              />
              <path
                d="M146.417 51.6112C158.686 51.6112 165.419 45.3768 165.419 35.1025V15.2523H155.643V34.1549C155.643 39.8905 152.651 43.1324 146.417 43.1324C140.182 43.1324 137.19 39.8905 137.19 34.1549V15.2523H127.414V35.1025C127.414 45.3768 134.147 51.6112 146.417 51.6112Z"
                fill="hsl(var(--primary))"
              />
              <path
                d="M180.383 39.1923H190.109L197.789 51.0625H209.011L200.333 38.1449C205.221 36.3993 208.213 32.509 208.213 27.2223C208.213 19.5415 202.478 15.2523 193.749 15.2523H170.607V51.0625H180.383V39.1923ZM180.383 31.4617V23.4318H193.251C196.692 23.4318 198.587 24.928 198.587 27.4717C198.587 29.8657 196.692 31.4617 193.251 31.4617H180.383Z"
                fill="hsl(var(--primary))"
              />
              <path
                d="M212.762 51.0625H238.347C246.327 51.0625 250.916 47.272 250.916 40.9379C250.916 36.6985 248.223 33.8058 245.031 32.509C247.225 31.4617 249.918 28.9679 249.918 25.0278C249.918 18.6937 245.43 15.2523 237.5 15.2523H212.762V51.0625ZM222.138 29.2672V23.1824H236.502C239.195 23.1824 240.692 24.2298 240.692 26.2248C240.692 28.2198 239.195 29.2672 236.502 29.2672H222.138ZM222.138 36.5988H237.4C240.043 36.5988 241.49 37.8955 241.49 39.8407C241.49 41.7858 240.043 43.0825 237.4 43.0825H222.138V36.5988Z"
                fill="hsl(var(--primary))"
              />
              <path
                d="M274.817 14.6538C262.298 14.6538 253.271 22.4842 253.271 33.1574C253.271 43.8307 262.298 51.661 274.817 51.661C287.336 51.661 296.313 43.8307 296.313 33.1574C296.313 22.4842 287.336 14.6538 274.817 14.6538ZM274.817 23.1325C281.401 23.1325 286.338 27.0228 286.338 33.1574C286.338 39.292 281.401 43.1823 274.817 43.1823C268.234 43.1823 263.296 39.292 263.296 33.1574C263.296 27.0228 268.234 23.1325 274.817 23.1325Z"
                fill="hsl(var(--primary))"
              />
              <path
                d="M31.3767 10.9706C20.1249 10.9706 10.9707 20.1248 10.9707 31.3766C10.9707 42.6284 20.1249 51.7826 31.3767 51.7826C42.6285 51.7826 51.7827 42.6284 51.7827 31.3766C51.7827 20.1248 42.6285 10.9706 31.3767 10.9706ZM31.3767 41.9368C25.5437 41.9368 20.8165 37.2096 20.8165 31.3766C20.8165 25.5436 25.5437 20.8164 31.3767 20.8164C37.2097 20.8164 41.9369 25.5436 41.9369 31.3766C41.9369 37.2096 37.2097 41.9368 31.3767 41.9368Z"
                fill="hsl(var(--primary))"
              />
              <path
                clipRule="evenodd"
                d="M33.0865 7.619V0C49.6469 0.8854 62.8025 14.5958 62.8025 31.3766C62.8025 48.1574 49.6469 61.864 33.0865 62.7532V55.1342C45.4289 54.2526 55.2025 43.9394 55.2025 31.3766C55.2025 18.8138 45.4289 8.5006 33.0865 7.619ZM13.3798 46.9565C10.108 43.1793 7.999 38.3685 7.6228 33.0865H0C0.3952 40.4775 3.3516 47.1845 7.9838 52.3487L13.376 46.9565H13.3798ZM29.6666 62.7532V55.1342C24.3808 54.758 19.57 52.6528 15.7928 49.3772L10.4006 54.7694C15.5686 59.4054 22.2756 62.358 29.6628 62.7532H29.6666Z"
                fill="url(#:S7:paint0_linear_2733_12955)"
                fillRule="evenodd"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id=":S7:paint0_linear_2733_12955"
                  x1="34.318"
                  x2="3.4317"
                  y1="4.4122"
                  y2="35.2986"
                >
                  <stop stopColor="#0096FF" />
                  <stop offset="1" stopColor="#FF1E56" />
                </linearGradient>
              </defs>
            </svg>
          </div>{" "}
          Template
        </h1>
        <AuthShowcase />

        <CreatePostForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList posts={posts} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
