export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: "dashboard.view",

  // Commands
  COMMANDS_VIEW: "commands.view",
  COMMANDS_CREATE: "commands.create",
  COMMANDS_EDIT: "commands.edit",
  COMMANDS_DELETE: "commands.delete",

  // Combos
  COMBOS_VIEW: "combos.view",
  COMBOS_CREATE: "combos.create",
  COMBOS_EDIT: "combos.edit",
  COMBOS_DELETE: "combos.delete",

  // Applications
  APPLICATIONS_VIEW: "applications.view",
  APPLICATIONS_CREATE: "applications.create",
  APPLICATIONS_EDIT: "applications.edit",
  APPLICATIONS_DELETE: "applications.delete",

  // Scenarios
  SCENARIOS_VIEW: "scenarios.view",
  SCENARIOS_CREATE: "scenarios.create",
  SCENARIOS_EDIT: "scenarios.edit",
  SCENARIOS_DELETE: "scenarios.delete",

  // Manuals
  MANUALS_VIEW: "manuals.view",
  MANUALS_UPLOAD: "manuals.upload",
  MANUALS_EDIT: "manuals.edit",
  MANUALS_DELETE: "manuals.delete",
  MANUALS_DOWNLOAD: "manuals.download",

  // Reports
  REPORTS_VIEW: "reports.view",
  REPORTS_CREATE: "reports.create",
  REPORTS_EDIT: "reports.edit",
  REPORTS_DELETE: "reports.delete",
  REPORTS_GENERATE: "reports.generate",

  // Tickets
  TICKETS_VIEW: "tickets.view",
  TICKETS_CREATE: "tickets.create",
  TICKETS_EDIT: "tickets.edit",
  TICKETS_DELETE: "tickets.delete",

  // Bitácora
  BITACORA_VIEW: "bitacora.view",
  BITACORA_CREATE: "bitacora.create",
  BITACORA_EXPORT: "bitacora.export",

  // AI Assistant
  AI_VIEW: "ai.view",
  AI_QUERY: "ai.query",
  AI_MANAGE_KNOWLEDGE: "ai.manage_knowledge",

  // Admin & Users
  USERS_VIEW: "users.view",
  USERS_CREATE: "users.create",
  USERS_EDIT: "users.edit",
  USERS_DISABLE: "users.disable",

  ROLES_VIEW: "roles.view",
  ROLES_EDIT: "roles.edit",

  AUDIT_VIEW: "audit.view",
} as const;

export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const DEFAULT_ROLE_PERMISSIONS: Record<string, PermissionCode[]> = {
  JEFE: Object.values(PERMISSIONS),
  ASISTENTE: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.COMMANDS_VIEW,
    PERMISSIONS.COMMANDS_CREATE,
    PERMISSIONS.COMMANDS_EDIT,
    PERMISSIONS.COMBOS_VIEW,
    PERMISSIONS.APPLICATIONS_VIEW,
    PERMISSIONS.SCENARIOS_VIEW,
    PERMISSIONS.MANUALS_VIEW,
    PERMISSIONS.MANUALS_UPLOAD,
    PERMISSIONS.MANUALS_DOWNLOAD,
    PERMISSIONS.TICKETS_VIEW,
    PERMISSIONS.TICKETS_CREATE,
    PERMISSIONS.TICKETS_EDIT,
    PERMISSIONS.BITACORA_VIEW,
    PERMISSIONS.BITACORA_CREATE,
    PERMISSIONS.BITACORA_EXPORT,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_GENERATE,
    PERMISSIONS.AI_VIEW,
    PERMISSIONS.AI_QUERY,
  ],
  TECNICO: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.COMMANDS_VIEW,
    PERMISSIONS.COMBOS_VIEW,
    PERMISSIONS.APPLICATIONS_VIEW,
    PERMISSIONS.SCENARIOS_VIEW,
    PERMISSIONS.MANUALS_VIEW,
    PERMISSIONS.MANUALS_DOWNLOAD,
    PERMISSIONS.TICKETS_VIEW,
    PERMISSIONS.TICKETS_EDIT,
    PERMISSIONS.BITACORA_VIEW,
    PERMISSIONS.BITACORA_CREATE,
    PERMISSIONS.AI_VIEW,
    PERMISSIONS.AI_QUERY,
  ],
};
