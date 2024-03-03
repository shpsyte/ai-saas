import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayour({ children }: PropsWithChildren) {
  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
