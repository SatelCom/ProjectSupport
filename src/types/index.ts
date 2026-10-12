export type RoleName = "JEFE" | "ASISTENTE" | "TECNICO";

export interface UserSession {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  role: RoleName;
  permissions: string[];
}

export type ResourceCardType =
  | "APPLICATION"
  | "COMMAND"
  | "COMBO"
  | "MANUAL"
  | "MODULE"
  | "EXTERNAL_LINK"
  | "SCENARIO";

export interface ResourceCardProps {
  id: string;
  title: string;
  description?: string;
  type: ResourceCardType;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  status?: "ACTIVE" | "INACTIVE";
  badge?: string;
  category?: string;
  metadata?: Record<string, string | number | undefined>;
}

export interface ServiceResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
