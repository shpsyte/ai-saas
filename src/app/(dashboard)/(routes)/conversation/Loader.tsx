import Image from "next/image";
import React from "react";

export const Loader = () => {
  return (
    <>
      <div className="relative h-10 w-10 animate-spin">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">Genius is thinking....</p>
    </>
  );
};
