"use server";

import { z } from "zod";
import { signUpSchema } from "@/components/forms/SignUpForm";
import { signInSchema } from "@/components/forms/SignInForm";
import { RequestResetSchema } from "@/components/forms/ReguestResetForm";
import { Argon2id } from "oslo/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { generatePasswordResetToken, validatePasswordResetToken } from "@/lib/token";

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

    const session = await lucia.createSession(user.id, {
      role: user.role, // Add the user's role to the session data
    });
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
  const session = await lucia.createSession(user.id, {
    role: user.role, // Add the user's role to the session data
  });
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { success: true };
};

export const requestPasswordReset = async (values: z.infer<typeof RequestResetSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const token = await generatePasswordResetToken(user.id);
    // Send email with reset link (implementation depends on your email service)
    // await sendResetEmail(email, token);

    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to request password reset" };
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const userId = await validatePasswordResetToken(token);
    if (!userId) {
      return { success: false, error: "Invalid or expired token" };
    }

    const hashedPassword = await new Argon2id().hash(password);

    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });

    // Invalidate the used token
    await prisma.passwordResetToken.delete({ where: { token } });

    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to reset password" };
  }
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
