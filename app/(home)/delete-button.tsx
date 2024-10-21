"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteTask } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
  async function _delete() {
    const isConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (!isConfirmed) return;
    await deleteTask(id);
  }

  return (
    <Button variant="ghost" className="mr-4" onClick={_delete}>
      <Trash />
    </Button>
  );
}
