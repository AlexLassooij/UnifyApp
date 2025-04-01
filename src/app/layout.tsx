import type { Metadata } from "next";
import "./globals.css";
import { PublicComponentWrapper, PublicNavbar } from "@/components/ui/navbar";
import CallToActionPage from "@/components/screens/call_to_action"
import Footer from "@/components/screens/footer"
import { AuthProvider } from "@/store/authProvider";

export const metadata: Metadata = {
  title: "Unify",
  description: "A Canadian University Application Platform",
  applicationName: "Unify Canada",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        id="root-container"
        className={"antialiased bg-[#f3f3f3]"}
      >
        <AuthProvider>
          <PublicComponentWrapper>
            <PublicNavbar />
          </PublicComponentWrapper>
          {children}
          <PublicComponentWrapper>
            <CallToActionPage />
            <Footer />
          </PublicComponentWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}