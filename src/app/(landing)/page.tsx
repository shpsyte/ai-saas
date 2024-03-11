"use client";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="flex text-center text-4xl font-bold text-gray-800">
          {`Welcome to the `}
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <TypewriterComponent
              options={{
                strings: ["NextJS Starter", "Starter Kit", "Boilerplate"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-100 p-2 font-mono">
            pages/index.tsx
          </code>
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline">Go to Login</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
