import { Outlet } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
