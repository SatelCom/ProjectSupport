"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import type { NavItem, NavSection } from "@/config/navigation";

function NavCollapsibleItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const Icon = item.icon;
  const isChildActive =
    Boolean(item.items?.some((subItem) => pathname.startsWith(subItem.href))) ||
    pathname.startsWith(item.href);

  const [isOpen, setIsOpen] = React.useState(isChildActive);

  React.useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
      render={<SidebarMenuItem />}
    >
      <CollapsibleTrigger
        render={<SidebarMenuButton tooltip={item.title} />}
      >
        <Icon className="size-4 shrink-0" />
        <span>{item.title}</span>
        <ChevronRightIcon className="ml-auto size-4 transition-transform duration-200 group-data-open/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton
                render={
                  <Link
                    href={subItem.href}
                    className={pathname === subItem.href ? "font-semibold text-primary" : ""}
                  />
                }
              >
                <span>{subItem.title}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function NavMain({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.title} className="py-2">
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            {section.title}
          </SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const Icon = item.icon;
              const hasSubItems = Boolean(item.items && item.items.length > 0);
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (hasSubItems) {
                return (
                  <NavCollapsibleItem
                    key={item.title}
                    item={item}
                    pathname={pathname}
                  />
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={
                      <Link
                        href={item.href}
                        className={isActive ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : ""}
                      />
                    }
                    tooltip={item.title}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
