"use client";
import {
  Calendar,
  Coins,
  Home,
  Search,
  Settings,
  Tv,
  User,
} from "lucide-react";
import Link from "next/link";
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
// import { title } from "process";
// import { url } from "inspector";
// import { iconNames } from "lucide-react/dynamic";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/main",
    icon: Home,
  },
  {
    title: "User",
    url: "/users",
    icon: User,
  },
  {
    title: "Coin Bundle",
    url: "/coin",
    icon: Coins,
  },
  {
    title: "Stream",
    url: "/stream",
    icon: Tv,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className="z-30">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex  items-center justify-between mb-4">
              <SidebarGroupLabel className="text-xl">
                Alturalabz
              </SidebarGroupLabel>
            </div>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
