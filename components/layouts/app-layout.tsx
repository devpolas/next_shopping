import Navbar from "../navbar/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='mx-auto w-11/12'>
      <Navbar />
      {children}
    </main>
  );
}
