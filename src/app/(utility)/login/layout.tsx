import "@/app/globals.scss";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
        id="login-layout-container"
      >
        {children}
    </div>
  );
}
