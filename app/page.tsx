import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Heading3 } from "@/components/typography/typography";

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <Heading3 text='Next Shopping' className={"text-green-400"} />
    </div>
  );
}
