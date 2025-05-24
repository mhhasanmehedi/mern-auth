import {
  Activity,
  Building2,
  Home,
  LogOut,
  PanelsTopLeft,
  TvMinimal,
  User,
  UserPen,
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
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";

// Menu items.

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

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
            icon: Activity,
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
      title: "Chatrabash",
      url: "/user/chatrabash",
      icon: Building2,
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: UserPen,
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
                      location.pathname === item.url &&
                      "bg-primary hover:bg-primary hover:text-white text-white"
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
