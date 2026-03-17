import "./../globals.css";
import NavigationBar from "@/components/common/main/NavigationBar";
import Dock from "@/components/common/main/Dock";
import WindowRenderer from "@/components/common/main/WindowRenderer";
import InteractiveTutorial from "@/components/common/main/InteractiveTutorial";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      {children}
      <WindowRenderer />
      <Dock />
      <InteractiveTutorial />
      <Toaster richColors position="top-center" />
    </>
  );
}
