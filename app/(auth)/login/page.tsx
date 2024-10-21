"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export default function Login() {
  async function action(formData: FormData) {
    const res = await login(formData);

    if (res.error) {
      alert(res.error);
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Inicia sesión</CardTitle>
          <CardDescription>
            Ingresa tus datos para acceder a tus tareas
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required name="password" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-4 w-full">
              <SubmittButton />
              <p className="text-right">
                ¿No tienes una cuenta?{" "}
                <Link href="/signup" className="text-blue-500 underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function SubmittButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending}>
      {pending ? "Enviando..." : "Iniciar sesión"}
    </Button>
  );
}
