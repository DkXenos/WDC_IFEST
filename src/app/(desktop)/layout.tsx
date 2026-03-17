import "./../globals.css";
import NavigationBar from "@/components/common/main/NavigationBar";
import Dock from "@/components/common/main/Dock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      {children}
      <Dock />
    </>
  );
}
