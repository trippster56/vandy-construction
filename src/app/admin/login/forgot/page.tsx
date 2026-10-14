import AuthHeading from "../auth-heading";
import ForgotForm from "./forgot-form";

export const metadata = {
  title: "Reset password | Vandy Construction Admin",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeading
        title="Reset password"
        description="Enter your email and we'll send you a link to set a new password. New team members use this to set their first one."
      />
      <ForgotForm />
    </>
  );
}
