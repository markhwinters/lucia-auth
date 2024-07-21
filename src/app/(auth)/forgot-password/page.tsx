import RequestResetForm from "@/components/forms/ReguestResetForm";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function ForgotPassword() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return
  }

  const { user } = await lucia.validateSession(sessionId);
  if (user) {
    redirect("/dashboard");
  }

  return (
   <div className="flex min-h-[80dvh] items-center justify-center py-24"><RequestResetForm /></div>
  )
}
