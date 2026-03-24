import SignupForm from "@/components/auth-forms/signup-form";
import ContinueWithGoogle from "@/components/social-auth-buttons/continue-with-google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function SignupPage() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your credentials below to create an account
        </CardDescription>
        <CardAction>
          <Link className='hover:underline' href={"/signin"}>
            Sign In
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <ContinueWithGoogle />
      </CardFooter>
    </Card>
  );
}
