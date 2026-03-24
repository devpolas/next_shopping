import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SigninForm() {
  return (
    <form>
      <div className='flex flex-col gap-6'>
        <div className='gap-2 grid'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' placeholder='m@example.com' required />
        </div>
        <div className='gap-2 grid'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <a
              href='#'
              className='inline-block ml-auto text-sm hover:underline underline-offset-4'
            >
              Forgot your password?
            </a>
          </div>
          <Input id='password' type='password' required />
        </div>
      </div>

      <Button type='submit' className='mt-4 w-full'>
        Login
      </Button>
    </form>
  );
}
