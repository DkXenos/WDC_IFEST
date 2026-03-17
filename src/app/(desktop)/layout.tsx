import "./../globals.css";
import NavigationBar from "@/components/common/main/NavigationBar";
import Dock from "@/components/common/main/Dock";
import WindowRenderer from "@/components/common/main/WindowRenderer";
import ZenModeOverlay from "@/components/common/main/ZenModeOverlay";
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
      <ZenModeOverlay />
      <Dock />
      <InteractiveTutorial />
      <Toaster richColors position="top-center" />
    </>
  );
}
