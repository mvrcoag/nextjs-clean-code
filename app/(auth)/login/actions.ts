"use server";

import { compare } from "@/lib/crypt";
import { db } from "@/lib/db";
import { getAuthUser, setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function login(formData: FormData) {
  const user = await getAuthUser();

  if (user)
    return {
      error: "Ya tienes una sesión activa",
    };

  const rawFormData = Object.fromEntries(formData.entries());

  const parsedData = loginSchema.safeParse(rawFormData);

  if (!parsedData.success)
    return {
      error: "Datos inválidos",
    };

  const userExists = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, parsedData.data.email.toLowerCase()),
  });

  if (!userExists) {
    return {
      error: "Usuario no encontrado",
    };
  }

  const passwordMatch = await compare(
    parsedData.data.password,
    userExists.password
  );

  if (!passwordMatch) {
    return {
      error: "Contraseña incorrecta",
    };
  }

  await setSession({
    email: userExists.email,
    id: userExists.id,
  });

  return redirect("/");
}
