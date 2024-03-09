"use client";

import { Zap } from "lucide-react";

import { useProModal } from "@/hooks/use-pro-modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ProModal() {
  const proModal = useProModal();
  return (
    <>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 py-1 font-bold ">
                Upgrade to Pro
                <Badge variant="premium" className="py-1 text-sm uppercase ">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-center font-medium text-zinc-900">
              Tools to help you grow your business!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size="lg" variant="premium" className="w-full">
              Upgrade
              <Zap className="ml-2 h-4 w-4 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
