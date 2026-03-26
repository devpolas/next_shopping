import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "./reset-password-form";

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
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}
