import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/ui/navbar";


export const metadata: Metadata = {
  title: "Unify",
  description: "A Canadian University Application Platform",
  applicationName: "Unify Canada",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="root-container"
        className={"antialiased bg-[#f3f3f3]"}
      >
        <NavbarWrapper/>
        {children}
      </body>
    </html>
  );
}
