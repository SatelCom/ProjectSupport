"use client";

import * as React from "react";
import {
  ShieldCheck,
  Users,
  Key,
  History,
  UserPlus,
  CheckCircle2,
  XCircle,
  X,
  Mail,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserItem {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "JEFE" | "ASISTENTE" | "TECNICO";
  status: "ACTIVE" | "INACTIVE";
}

interface AuditItem {
  id: string;
  user: string;
  action: string;
  entity: string;
  date: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<"users" | "roles" | "audit">("users");
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  // Estados del nuevo usuario a registrar
  const [newName, setNewName] = React.useState("");
  const [newUsername, setNewUsername] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newRole, setNewRole] = React.useState<"JEFE" | "ASISTENTE" | "TECNICO">("TECNICO");

  const [users, setUsers] = React.useState<UserItem[]>([
    { id: "u-1", name: "Carlos Mendoza", username: "cmendoza", email: "carlos.mendoza@satelcom.pe", role: "TECNICO", status: "ACTIVE" },
    { id: "u-2", name: "Pedro Castillo", username: "pcastillo", email: "pedro.castillo@satelcom.pe", role: "TECNICO", status: "ACTIVE" },
    { id: "u-3", name: "María Ramos", username: "mramos", email: "maria.ramos@satelcom.pe", role: "ASISTENTE", status: "ACTIVE" },
    { id: "u-4", name: "Luis Valdivia", username: "lvaldivia", email: "luis.valdivia@satelcom.pe", role: "JEFE", status: "ACTIVE" },
  ]);

  const [auditLogs, setAuditLogs] = React.useState<AuditItem[]>([
    { id: "a-1", user: "Luis Valdivia", action: "COMMAND_UPDATED", entity: "CPU Reset Teltonika", date: "2026-10-12 11:20" },
    { id: "a-2", user: "Luis Valdivia", action: "USER_ROLE_ASSIGNED", entity: "cmendoza -> TECNICO", date: "2026-10-11 16:40" },
    { id: "a-3", user: "María Ramos", action: "MANUAL_UPLOADED", entity: "Manual_FMB920_Satelcom_v2.pdf", date: "2026-10-10 09:15" },
    { id: "a-4", user: "Luis Valdivia", action: "REPORT_CONFIG_CREATED", entity: "Backup General Flota", date: "2026-10-09 14:00" },
  ]);

  const handleToggleUserStatus = (id: string) => {
    // Regla Sección 4: Desactivar suavemente (soft-disable) en lugar de eliminar físicamente
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : u
      )
    );
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newUsername) return;

    const created: UserItem = {
      id: `u-${Date.now()}`,
      name: newName,
      username: newUsername.toLowerCase().trim(),
      email: newEmail.toLowerCase().trim(),
      role: newRole,
      status: "ACTIVE",
    };

    setUsers((prev) => [created, ...prev]);

    // Registrar en auditoría
    const auditEntry: AuditItem = {
      id: `a-${Date.now()}`,
      user: "Administrador Actual",
      action: "USER_CREATED",
      entity: `${created.username} (${created.role})`,
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);

    // Reset formulario
    setNewName("");
    setNewUsername("");
    setNewEmail("");
    setNewRole("TECNICO");
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="size-6 text-primary" />
            Administración del Sistema
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Gestión interna de usuarios, control de roles, matriz de permisos y auditoría de eventos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            className="cursor-pointer gap-1.5"
          >
            <Users className="size-4" />
            <span>Usuarios</span>
          </Button>
          <Button
            size="sm"
            variant={activeTab === "roles" ? "default" : "outline"}
            onClick={() => setActiveTab("roles")}
            className="cursor-pointer gap-1.5"
          >
            <Key className="size-4" />
            <span>Roles & Permisos</span>
          </Button>
          <Button
            size="sm"
            variant={activeTab === "audit" ? "default" : "outline"}
            onClick={() => setActiveTab("audit")}
            className="cursor-pointer gap-1.5"
          >
            <History className="size-4" />
            <span>Auditoría</span>
          </Button>
        </div>
      </div>

      {/* Tab: Usuarios */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Total de usuarios registrados: <b>{users.length}</b> (Creación centralizada en este módulo)
            </span>
            <Button
              size="sm"
              className="gap-2 text-xs cursor-pointer"
              onClick={() => setShowCreateModal(true)}
            >
              <UserPlus className="size-3.5" />
              <span>Crear Nuevo Usuario</span>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3 px-4">Nombre Completo</th>
                  <th className="py-3 px-4">Usuario</th>
                  <th className="py-3 px-4">Correo</th>
                  <th className="py-3 px-4">Rol Asignado</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-foreground">{u.name}</td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">{u.username}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold px-2 py-0.5 rounded bg-muted text-[11px] text-foreground">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 font-medium px-2 py-0.5 rounded text-[11px] ${
                          u.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                        }`}
                      >
                        {u.status === "ACTIVE" ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs cursor-pointer h-7"
                        onClick={() => handleToggleUserStatus(u.id)}
                      >
                        {u.status === "ACTIVE" ? "Desactivar" : "Activar"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal / Dialog para Crear Usuario Interno */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div className="flex items-center gap-2">
                <UserPlus className="size-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Crear Usuario de Soporte</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Nombre y Apellidos</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="pl-8 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Nombre de Usuario (Username)</label>
                <Input
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="ej. jperez"
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Correo Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="jperez@satelcom.pe"
                    className="pl-8 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Rol Operativo</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["TECNICO", "ASISTENTE", "JEFE"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewRole(r)}
                      className={`p-2 rounded-lg border text-center font-semibold text-xs cursor-pointer transition-all ${
                        newRole === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                  className="cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button type="submit" size="sm" className="cursor-pointer">
                  Guardar y Habilitar Acceso
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Roles y Permisos */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <h3 className="font-bold text-base text-foreground">JEFE</h3>
            <p className="text-xs text-muted-foreground mt-1">Acceso total al sistema, auditoría, reportes y gestión de usuarios.</p>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs space-y-1.5 font-mono text-muted-foreground">
              <div>✓ commands.*</div>
              <div>✓ tickets.*</div>
              <div>✓ reports.*</div>
              <div>✓ users.*</div>
              <div>✓ audit.*</div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <h3 className="font-bold text-base text-foreground">ASISTENTE</h3>
            <p className="text-xs text-muted-foreground mt-1">Gestión operativa de tickets, bitácora y carga de manuales técnicos.</p>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs space-y-1.5 font-mono text-muted-foreground">
              <div>✓ commands.view/create</div>
              <div>✓ tickets.view/create/edit</div>
              <div>✓ bitacora.view/export</div>
              <div>✓ manuals.upload/download</div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <h3 className="font-bold text-base text-foreground">TECNICO</h3>
            <p className="text-xs text-muted-foreground mt-1">Operación directa en campo, consulta de comandos, resolución de tickets y registro de actividades.</p>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs space-y-1.5 font-mono text-muted-foreground">
              <div>✓ commands.view</div>
              <div>✓ applications.view</div>
              <div>✓ tickets.view/edit</div>
              <div>✓ bitacora.view/create</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Auditoría */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3 px-4">Fecha y Hora</th>
                  <th className="py-3 px-4">Usuario Responsable</th>
                  <th className="py-3 px-4">Acción Auditada</th>
                  <th className="py-3 px-4">Entidad / Recurso Afectado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">{log.date}</td>
                    <td className="py-3.5 px-4 font-semibold text-foreground">{log.user}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-foreground font-medium">{log.entity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
