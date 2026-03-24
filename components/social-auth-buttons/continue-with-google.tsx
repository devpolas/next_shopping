import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export default function ContinueWithGoogle() {
  return (
    <Button variant='outline' className='w-full'>
      <span className='flex flex-row gap-2'>
        <span>
          <FcGoogle />
        </span>
        <span>Continue with Google</span>
      </span>
    </Button>
  );
}
