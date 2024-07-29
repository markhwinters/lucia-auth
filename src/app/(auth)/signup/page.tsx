import SignUpForm from "@/components/forms/SignUpForm";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignupPage() {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center py-24">
      <SignUpForm />
    </div>
  );
}
