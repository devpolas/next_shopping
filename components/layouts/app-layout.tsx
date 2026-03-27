import MobileDownNav from "../navbar/mobile-down-nav";
import Navbar from "../navbar/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <section className='flex-1 bg-muted px-4 md:px-8'>{children}</section>
      <MobileDownNav />
    </main>
  );
}
