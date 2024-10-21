"use server";

import { clearSession } from "./session";

export async function logout() {
  await clearSession();
}
