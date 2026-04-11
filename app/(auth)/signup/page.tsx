import ContinueWithGoogle from "@/components/social-auth-buttons/continue-with-google";
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
import SignupForm from "./signup-form";
import { Metadata } from "next";
import { FieldSeparator } from "@/components/ui/field";
import MobileLogo from "@/components/logo/logo-mobile";
import { Heading4 } from "@/components/typography/typography";

export const metadata: Metadata = {
  title: "Signup",
  description: "Next Shopping Signup Page",
};

export default async function SignupPage() {
  return (
    <Card className='w-full max-w-sm'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <MobileLogo />
        <Heading4 text='Welcome to NextShop' />
      </div>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your credentials below to create an account
        </CardDescription>
        <CardAction>
          <Link className='hover:underline' href={"/signin"}>
            Signin
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>

      <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
        Or continue with
      </FieldSeparator>

      <CardFooter>
        <ContinueWithGoogle />
      </CardFooter>
    </Card>
  );
}
