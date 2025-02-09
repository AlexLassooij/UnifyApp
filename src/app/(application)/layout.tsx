import "@/app/globals.scss";


// This is the main app layout, which wraps all pages in the app. So this is where the navbar should be placed
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
        id="application-layout-container"
      >
        {children}
    </div>
  );
}
