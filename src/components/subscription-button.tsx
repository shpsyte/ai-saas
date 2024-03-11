"use client";

import { Zap } from "lucide-react";
import { useState } from "react";

import { api } from "@/lib/api";

import { Button } from "./ui/button";

type SubscriptionButtonProps = {
  isPro?: boolean;
};

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await api.get("/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        variant={isPro ? "default" : "premium"}
        onClick={handleClick}
        disabled={loading}
      >
        {isPro ? "Manage subscribtion" : "Upgrade"}
        {!isPro && <Zap className="ml-2 h-4 w-4" />}
      </Button>
    </>
  );
};
