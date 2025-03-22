import "@/app/globals.css";
import { Navbar } from "@/components/ui/navbar"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div id="public-layout-container" className="min-h-screen">
    <Navbar />
    <main className="flex-1 bg-[#f3f3f3] font-poppins">
        {children}
    </main>
  </div>
  );
}