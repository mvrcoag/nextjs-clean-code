"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";
import { saveTask } from "./actions";

export default function SaveForm() {
  async function action(formData: FormData) {
    const res = await saveTask(formData);
    if (res?.error) {
      alert(res.error);
    }
  }

  return (
    <form className="space-y-4" action={action}>
      <div>
        <Label htmlFor="name">Título</Label>
        <Input id="name" name="name" />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" />
      </div>
      <div className="flex items-center gap-2">
        <Input id="isDone" name="isDone" type="checkbox" className="w-fit" />
        <Label htmlFor="isDone">Completada</Label>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
}
