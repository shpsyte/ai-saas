"use client";

import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-green-700",
  },
];

export default function Sidebar() {
  return (
    <>
      <div className="flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white">
        <div className="flex-1 px-3 py-2">
          <Link href="/dashboard" className="mb-14 flex items-center pl-3">
            <div className="relative mr-4 h-8 w-8">
              <Image fill alt="logo" src="/logo.png" />
            </div>
            <h1 className={cn("text-2xl font-bold", montserrat.className)}>
              Genius
            </h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route, index) => {
              return (
                <Link
                  href={route.href}
                  key={route.label}
                  className="group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white"
                >
                  <div className="flex flex-1 items-center">
                    <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                    {route.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}