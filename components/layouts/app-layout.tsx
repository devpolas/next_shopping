import MobileDownNav from "../navbar/mobile-down-nav";
import { Navbar } from "../navbar/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col mx-auto max-w-[1536px] min-h-screen'>
      <Navbar />
      <section className='flex-1 bg-muted'>{children}</section>
      <MobileDownNav />
    </main>
  );
}
