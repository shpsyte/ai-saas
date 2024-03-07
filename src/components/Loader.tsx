import Image from "next/image";
import React from "react";

export const Loader = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 h-10 w-10 animate-spin lg:col-span-6">
          <Image alt="logo" fill src="/logo.png" />
        </div>
        <p className="col-span-12 text-sm text-muted-foreground lg:col-span-6">
          Genius is thinking....
        </p>
      </div>
    </>
  );
};
