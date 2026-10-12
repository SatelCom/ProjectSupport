# Support Center — Satelcom

> Plataforma web interna para centralizar las herramientas utilizadas por el equipo de soporte técnico (monolito modular sobre Next.js App Router, Supabase PostgreSQL, Prisma y shadcn/ui `sidebar-07`).

---

## 1. Principios de Arquitectura

- **Monolito Modular:** Todo el sistema reside en una única aplicación Next.js bien estructurada y desacoplada, sin sobreingeniería (sin microservicios, Kubernetes, Kafka o Redis prematuros).
- **Seguridad en Servidor:** La interfaz nunca es la capa de seguridad. Las autorizaciones se evalúan mediante permisos `module.action` en Server Actions y Route Handlers.
- **Cifrado de Credenciales:** Las contraseñas técnicas (ej. `stlcm`, `admin`) y accesos a plataformas GPS se almacenan cifradas en base de datos mediante **AES-256-GCM**.
- **Almacenamiento Desacoplado:** Los archivos PDF y manuales se almacenan en **Google Drive**; PostgreSQL almacena únicamente metadatos (`driveFileId`, peso, tipo, fechas).
- **Asistente IA Basado en Hechos:** El servicio de IA (`GeminiService`) está abstraído mediante `AIService` y utiliza exclusivamente la **Knowledge Base** interna y los comandos registrados en PostgreSQL, impidiendo la invención de comandos inexistentes.

---

## 2. Estructura del Proyecto

```
support-center/
├── prisma/
│   ├── schema.prisma          # Definición de entidades y relaciones (PostgreSQL)
│   └── migrations/            # Historial de migraciones Prisma
├── public/
│   └── Logo_Satelcom.webp     # Recursos estáticos
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/         # Inicio de sesión con Supabase Auth
│   │   ├── (dashboard)/       # Layout principal basado en shadcn sidebar-07
│   │   │   ├── layout.tsx     # Shell con AppSidebar, Header, Breadcrumbs
│   │   │   ├── page.tsx       # Dashboard operativo
│   │   │   ├── commands/      # Comandos técnicos y Combos
│   │   │   ├── applications/  # Plataformas externas (Wialon, SIPCOP, etc.)
│   │   │   ├── scenarios/     # Escenarios de soporte situacionales
│   │   │   ├── manuals/       # Manuales técnicos y PDFs (Google Drive)
│   │   │   ├── tickets/       # Tickets con generador de mensaje WhatsApp
│   │   │   ├── bitacora/      # Bitácora global y resumen diario
│   │   │   ├── reports/       # Report Builder (exportador XLSX)
│   │   │   ├── ai/            # Asistente IA (Gemini API con grounding)
│   │   │   └── admin/         # Usuarios, roles, permisos y auditoría
│   │   └── api/
│   │       └── integrations/  # Route Handlers para integraciones externas
│   ├── modules/               # Capa de lógica de negocio independiente
│   │   ├── auth/
│   │   ├── users/
│   │   ├── permissions/
│   │   ├── commands/
│   │   ├── applications/
│   │   ├── scenarios/
│   │   ├── manuals/
│   │   ├── tickets/
│   │   ├── bitacora/
│   │   ├── reports/
│   │   ├── ai/
│   │   └── audit/
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/                # Componentes shadcn (sidebar, button, etc.)
│   │   ├── cards/             # ResourceCard unificado
│   │   ├── app-sidebar.tsx    # Sidebar configurable (sidebar-07)
│   │   ├── nav-main.tsx       # Navegación principal
│   │   ├── nav-user.tsx       # Perfil del técnico
│   │   └── team-switcher.tsx  # Selector de áreas operativas
│   ├── lib/                   # Infraestructura compartida
│   │   ├── db/prisma.ts       # Singleton de Prisma Client
│   │   ├── auth/supabase.ts   # Conector Supabase
│   │   ├── permissions/       # Verificador de permisos RBAC
│   │   ├── encryption/        # Cifrado simétrico AES-256-GCM
│   │   ├── storage/           # Abstracción de Google Drive
│   │   └── validation/        # Esquemas Zod
│   └── config/
│       ├── navigation.ts      # Configuración de rutas y permisos del menú
│       ├── permissions.ts     # Catálogo de códigos de permiso
│       └── constants.ts       # Estados, prioridades y tipos de actividad
├── .env.example               # Plantilla de variables de entorno
└── package.json
```

---

## 3. Variables de Entorno (.env)

Copiar `.env.example` a `.env` y configurar:
    
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

GEMINI_API_KEY="..."

GOOGLE_DRIVE_CLIENT_ID="..."
GOOGLE_DRIVE_CLIENT_SECRET="..."
GOOGLE_DRIVE_REFRESH_TOKEN="..."

ENCRYPTION_KEY="clave_hexadecimal_32_bytes_para_aes_256"
```

---

## 4. Scripts de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Validar TypeScript y compilar
npm run build

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones en Supabase
npx prisma migrate dev
```
