import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "./reset-password-form";
import { Suspense } from "react";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Next Shopping Reset Password Page",
};

export default function ResetPassword() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your new password and confirm password below to reset your
          account password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingSpinner text='Reset Form Loading...' />}>
          <ResetPasswordForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
