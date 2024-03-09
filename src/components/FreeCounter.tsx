"use client";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { useProModal } from "@/hooks/use-pro-modal";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { MAX_FREE_COUNT } from "@/constants";

import { Button } from "./ui/button";

type FreeCounterProps = {
  apiLimitCounter: number;
};
export default function FreeCounter({ apiLimitCounter }: FreeCounterProps) {
  const { onOpen } = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="px-3">
        <Card className="border-0 bg-white/10">
          <CardContent className="py-6 ">
            <div className="mb-4 space-y-2 text-center text-sm text-white ">
              <p>
                {apiLimitCounter} / {MAX_FREE_COUNT}
                Free Generations
                <Progress
                  className="h-3"
                  value={(apiLimitCounter / MAX_FREE_COUNT) * 100}
                />
              </p>
            </div>
            <Button className="w-full" variant="premium" onClick={onOpen}>
              Upgrade
              <Zap className="ml-2 h-4 w-4 fill-white " />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
