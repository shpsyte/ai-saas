import { UserButton } from "@clerk/nextjs";

import { getApiLimitCount } from "@/lib/api.limit";

import MobileSidebar from "./mobile-sidebar";

export default async function Navbar() {
  const apiLimiteCount = await getApiLimitCount();
  return (
    <>
      <div className="flex items-center p-4">
        <MobileSidebar apilimit={apiLimiteCount ?? 0} />
        <div className="flex w-full justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
}
