import SignUpForm from "@/components/forms/SignUpForm";
import { cookies } from "next/headers";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage() {
validateRequest

  return (
    <div className="flex min-h-[80dvh] items-center justify-center py-24">
      <SignUpForm />
    </div>
  );
}
