import SignUpForm from "@/components/forms/SignUpForm";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return
  }

  const { user } = await lucia.validateSession(sessionId);
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center py-24">
      <SignUpForm />
    </div>
  );
}
