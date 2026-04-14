import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export interface LayoutOutletContext {
  setMobileHeaderAction: (action: ReactNode | null) => void;
}

export function Layout() {
  const [mobileHeaderAction, setMobileHeaderAction] = useState<ReactNode | null>(null);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex h-14 items-center justify-between border-b border-border/40 px-4 md:hidden">
            <SidebarTrigger />
            {mobileHeaderAction}
          </header>
          <main className="flex-1 px-6 py-10 md:px-12 lg:px-16">
            <Outlet context={{ setMobileHeaderAction }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
