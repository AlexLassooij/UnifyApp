import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Unify",
  description: "All the university information in one place",
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
        {children}
      </body>
    </html>
  );
}
