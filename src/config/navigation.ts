import {
  LayoutDashboard,
  Terminal,
  Layers,
  Compass,
  FileText,
  Ticket,
  ClipboardList,
  FileSpreadsheet,
  Bot,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { PERMISSIONS, type PermissionCode } from "./permissions";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  permission?: PermissionCode;
  badge?: string;
  items?: {
    title: string;
    href: string;
    permission?: PermissionCode;
  }[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavSection[] = [
  {
    title: "Operaciones",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        permission: PERMISSIONS.DASHBOARD_VIEW,
      },
      {
        title: "Tickets",
        href: "/tickets",
        icon: Ticket,
        permission: PERMISSIONS.TICKETS_VIEW,
      },
      {
        title: "Bitácora",
        href: "/bitacora",
        icon: ClipboardList,
        permission: PERMISSIONS.BITACORA_VIEW,
      },
    ],
  },
  {
    title: "Herramientas Técnicas",
    items: [
      {
        title: "Comandos & Combos",
        href: "/commands",
        icon: Terminal,
        permission: PERMISSIONS.COMMANDS_VIEW,
      },
      {
        title: "Aplicaciones",
        href: "/applications",
        icon: Layers,
        permission: PERMISSIONS.APPLICATIONS_VIEW,
      },
      {
        title: "Escenarios",
        href: "/scenarios",
        icon: Compass,
        permission: PERMISSIONS.SCENARIOS_VIEW,
      },
      {
        title: "Manuales",
        href: "/manuals",
        icon: FileText,
        permission: PERMISSIONS.MANUALS_VIEW,
      },
    ],
  },
  {
    title: "Inteligencia & Reportes",
    items: [
      {
        title: "AI Assistant",
        href: "/ai",
        icon: Bot,
        permission: PERMISSIONS.AI_VIEW,
        badge: "Gemini",
      },
      {
        title: "Report Builder",
        href: "/reports",
        icon: FileSpreadsheet,
        permission: PERMISSIONS.REPORTS_VIEW,
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        title: "Administración",
        href: "/admin",
        icon: ShieldCheck,
        permission: PERMISSIONS.USERS_VIEW,
        items: [
          {
            title: "Usuarios",
            href: "/admin#users",
            permission: PERMISSIONS.USERS_VIEW,
          },
          {
            title: "Roles y Permisos",
            href: "/admin#roles",
            permission: PERMISSIONS.ROLES_VIEW,
          },
          {
            title: "Auditoría",
            href: "/admin#audit",
            permission: PERMISSIONS.AUDIT_VIEW,
          },
        ],
      },
    ],
  },
];
