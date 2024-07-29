import SignInForm from "@/components/forms/SignInForm";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center py-24">
      <SignInForm />
    </div>
  );
}
