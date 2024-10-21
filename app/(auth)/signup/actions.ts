"use server";

import { encrypt } from "@/lib/crypt";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getAuthUser, setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signup(formData: FormData) {
  const user = await getAuthUser();

  if (user)
    return {
      error: "Ya tienes una sesión activa",
    };

  const rawFormData = Object.fromEntries(formData.entries());

  const parsedData = signUpSchema.safeParse(rawFormData);

  if (!parsedData.success)
    return {
      error: "Datos inválidos",
    };

  const passwordHash = await encrypt(parsedData.data.password);

  const createdUser = await db
    .insert(users)
    .values({
      email: parsedData.data.email.toLowerCase(),
      name: parsedData.data.name,
      password: passwordHash,
    })
    .returning();

  await setSession({
    email: parsedData.data.email,
    id: createdUser[0].id,
  });

  return redirect("/");
}
