"use server";

import { z } from "zod";
import { signUpSchema } from "@/components/forms/SignUpForm";
import { signInSchema } from "@/components/forms/SignInForm";
import { Argon2id } from "oslo/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const exisitingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (exisitingUser) {
      return { error: "User already exists", successs: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        username: values.username,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true };
  } catch (error) {}
};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });
  if (!user || !user.hashedPassword) {
    return { success: false, error: "Invalid Credentials!" };
  }
  const passwordMatch = await new Argon2id().verify(
    user.hashedPassword,
    values.password
  );
  if (!passwordMatch) {
    return { success: false, error: "Invalid Credentials!" };
  }
  // successfully login
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { success: true };
};

export const logOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};
