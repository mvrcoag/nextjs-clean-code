"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toggleTaskDone } from "./actions";

export default function DoneButton({
  id,
  isDone,
}: {
  id: number;
  isDone: boolean;
}) {
  async function _done() {
    const res = await toggleTaskDone(id);
    if (res?.error) {
      alert(res.error);
    }
  }

  return (
    <Button variant="ghost" className="mr-4" onClick={_done}>
      {isDone ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      )}
    </Button>
  );
}
