import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function SignupForm() {
  return (
    <form>
      <div className='flex flex-col gap-6'>
        <div className='gap-2 grid'>
          <Label htmlFor='name'>Full Name</Label>
          <Input
            id='name'
            type='text'
            placeholder='Enter your full name'
            required
          />
        </div>
        <div className='gap-2 grid'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='Enter your password'
            required
          />
        </div>
        <div className='gap-2 grid'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='Enter your password'
            required
          />
        </div>
        <div className='gap-2 grid'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='Confirm your password'
            required
          />
        </div>
      </div>
      <Button type='submit' className='mt-4 w-full'>
        Create Account
      </Button>
    </form>
  );
}
