import Image from "next/image";
import React from "react";

export const Empty = ({ label }: { label: string }) => {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center p-20 ">
        <div className="relative h-72 w-72">
          <Image alt="empty" fill src="/empty.png" />
        </div>
        <p className="text-center text-sm text-muted-foreground ">{label}</p>
      </div>
    </>
  );
};
