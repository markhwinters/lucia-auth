import SignInForm from "@/components/forms/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
