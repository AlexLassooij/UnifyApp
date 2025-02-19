import "@/app/globals.scss";
import Navbar from "@/components/ui/navbar";

// This is the main app layout, which wraps all pages in the app. So this is where the navbar should be placed

/*
Example with more params : 
export default function AppLayout({ 
  children, 
  title, 
  isDarkMode 
}: Readonly<{ 
  children: React.ReactNode; 
  title: string; 
  isDarkMode: boolean; 
}>) {
*/

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div id="application-layout-container" className="flex h-screen">
    <Navbar />
    <main className="flex-1 bg-[#f3f3f3] p-8">{children}</main>
  </div>
  );
}
