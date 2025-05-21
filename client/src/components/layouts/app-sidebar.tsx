import {
  Home,
  LogOut,
  PanelsTopLeft,
  TvMinimal,
  User,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";

// Menu items.

export function AppSidebar() {
  const location = useLocation();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const items = [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: TvMinimal,
    },
    ...(user?.role === "admin"
      ? [
          {
            title: "Activities",
            url: "/user/activities",
            icon: Home,
          },
        ]
      : []),
    ...(user?.role === "admin"
      ? [
          {
            title: "Users",
            url: "/user/users",
            icon: Users,
          },
        ]
      : []),
    {
      title: "Profile",
      url: "/user/profile",
      icon: User,
    },
    {
      title: "Frontend",
      url: "/",
      icon: PanelsTopLeft,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      location.pathname === item.url && "bg-accent text-white"
                    } `}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="bg-amber-600 text-white hover:bg-amber-500"
                >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
