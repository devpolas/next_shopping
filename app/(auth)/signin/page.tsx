import Link from "next/link";
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
import { Heading4 } from "@/components/typography/typography";
import SigninForm from "./signin-form";
import { Metadata } from "next";
import { FieldSeparator } from "@/components/ui/field";

export const metadata: Metadata = {
  title: "Signin",
  description: "Next Shopping Signin Page",
};

export default async function SigninPage() {
  return (
    <Card className='w-full max-w-sm'>
      <Heading4 className={"text-center"} text='Welcome Back' />
      <CardHeader>
        <CardTitle>Signin to your account</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
        <CardAction>
          <Link className='hover:underline' href={"/signup"}>
            Signup
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SigninForm />
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
