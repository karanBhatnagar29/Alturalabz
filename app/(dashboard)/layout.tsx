import { AppSidebar } from "@/components/ui/app-sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "../../components/ui/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center justify-start">
          <SidebarTrigger />
          <Header />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
