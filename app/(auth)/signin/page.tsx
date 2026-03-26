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
            Sign up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SigninForm />
      </CardContent>
      <CardFooter>
        <ContinueWithGoogle />
      </CardFooter>
    </Card>
  );
}
