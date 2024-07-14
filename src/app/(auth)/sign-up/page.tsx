import SignUpForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default function SignUpPage() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
