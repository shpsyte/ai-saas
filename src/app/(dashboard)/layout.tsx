import { PropsWithChildren } from "react";

import { getApiLimitCount } from "@/lib/api.limit";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default async function DashboardLayour({ children }: PropsWithChildren) {
  const apiLimitCount = (await getApiLimitCount()) ?? 0;
  return (
    <div className="relative h-full">
      <div className="hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
