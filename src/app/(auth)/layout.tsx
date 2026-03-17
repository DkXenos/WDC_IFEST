import "./../globals.css";
import NavigationBar from "@/components/common/main/NavigationBar";
import Dock from "@/components/common/main/Dock";

import AuthLayoutContent from "@/components/common/auth/AuthLayoutContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthLayoutContent>
        {children}
      </AuthLayoutContent>
    </>
  );
}
