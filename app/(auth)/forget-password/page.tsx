import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgetPasswordForm from "./forget-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Next Shopping Forget Password Page",
};

export default function ForgetPassword() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>
          Please provide the email address associated with your account. We will
          send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgetPasswordForm />
      </CardContent>
    </Card>
  );
}
