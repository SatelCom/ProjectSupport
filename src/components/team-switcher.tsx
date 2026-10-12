"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDownIcon, ShieldCheck, Radio, Headphones } from "lucide-react";

const SUPPORT_TEAMS = [
  {
    name: "Satelcom Support",
    role: "Soporte Nivel 1 & 2",
    logo: Headphones,
  },
  {
    name: "Operaciones GPS",
    role: "Monitoreo & Plataformas",
    logo: Radio,
  },
  {
    name: "Administración TI",
    role: "Infraestructura & Config",
    logo: ShieldCheck,
  },
];

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(SUPPORT_TEAMS[0]);

  const LogoIcon = activeTeam.logo;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground cursor-pointer"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-xs">
              <LogoIcon className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold tracking-tight">{activeTeam.name}</span>
              <span className="truncate text-xs text-muted-foreground">{activeTeam.role}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4 opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Áreas de Operación
              </DropdownMenuLabel>
              {SUPPORT_TEAMS.map((team) => {
                const ItemIcon = team.logo;
                return (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2.5 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border bg-muted/40">
                      <ItemIcon className="size-3.5" />
                    </div>
                    <div className="grid flex-1 text-left text-xs">
                      <span className="font-medium text-foreground">{team.name}</span>
                      <span className="text-[10px] text-muted-foreground">{team.role}</span>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
