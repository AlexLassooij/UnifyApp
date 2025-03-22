import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
