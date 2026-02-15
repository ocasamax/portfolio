import { LayoutGrid, Palette, Share2, Stamp, Globe } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ContactCard } from "@/components/ContactCard";

const navItems = [
  { title: "UI Design", url: "/ui-design", icon: Palette },
  { title: "Social Media", url: "/social-media", icon: Share2 },
  { title: "Branding", url: "/branding", icon: Stamp },
  { title: "Web", url: "/web", icon: Globe },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/40">
      <div className="px-6 py-8">
        <span className="text-base font-semibold tracking-tight text-foreground">Portfolio</span>
      </div>

      <ContactCard compact />

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                      activeClassName="bg-muted text-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
