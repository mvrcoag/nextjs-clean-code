import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { db } from "./db";

type Session = {
  id?: number;
  email?: string;
};

async function getSession() {
  const session = await getIronSession<Session>(cookies(), {
    password: process.env.SESSION_SECRET!,
    cookieName: process.env.SESSION_NAME!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
    },
  });
  return session;
}

export async function getAuthUser() {
  const session = await getSession();

  const userId = session.id;

  if (!userId) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, userId),
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function setSession(data: Session) {
  const session = await getSession();

  session.id = data.id;
  session.email = data.email;

  await session.save();
}

export async function clearSession() {
  const session = await getSession();

  session.destroy();
}
