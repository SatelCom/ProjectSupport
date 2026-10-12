"use client";

import * as React from "react";
import { Layers, Plus, Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/cards/resource-card";

export default function ApplicationsPage() {
  const [search, setSearch] = React.useState("");

  const apps = [
    {
      id: "app-1",
      title: "Wialon Platform",
      description: "Plataforma principal de rastreo satelital GPS, control de flotas, sensores de combustible y telemetría de eventos.",
      url: "https://hosting.wialon.com",
      category: "Plataforma GPS",
      user: "soporte_satelcom",
    },
    {
      id: "app-2",
      title: "SIPCOP PNP",
      description: "Sistema de Posicionamiento y Control de Patrullaje de la Policía Nacional del Perú.",
      url: "https://sipcop.pnp.gob.pe",
      category: "Seguridad y Patrullaje",
      user: "satelcom_operador",
    },
    {
      id: "app-3",
      title: "Portal GPS Satelcom",
      description: "Consola de administración interna de tarjetas SIM M2M (Claro, Entel, Movistar) y verificación de tráfico APN.",
      url: "https://portal.satelcom.pe",
      category: "Conectividad M2M",
      user: "noc_satelcom",
    },
    {
      id: "app-4",
      title: "Teltonika FOTA WEB",
      description: "Servidor de actualización masiva de firmware y envío remoto de configuraciones (.cfg) para dispositivos FMB.",
      url: "https://fota.teltonika.lt",
      category: "Firmware y Gestión",
      user: "fota_tech_satelcom",
    },
    {
      id: "app-5",
      title: "Suntech Sync Server",
      description: "Monitor de comandos vía socket y estado de paquetes de sincronización de equipos Suntech ST300/340.",
      url: "https://sync.suntech.com",
      category: "Hardware",
      user: "admin_satelcom",
    },
    {
      id: "app-6",
      title: "MTC SUTRAN Inspector",
      description: "Módulo de verificación de retransmisión de datos a la plataforma fiscalizadora SUTRAN / MTC.",
      url: "https://portal.sutran.gob.pe",
      category: "Fiscalización",
      user: "fiscal_satelcom",
    },
  ];

  const filteredApps = apps.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase()) ||
    app.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="size-6 text-primary" />
            Aplicaciones & Plataformas Externas
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Acceso centralizado a plataformas de telemetría y monitoreo con credenciales protegidas.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar plataformas externas..."
          className="pl-9 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => (
          <ResourceCard
            key={app.id}
            id={app.id}
            title={app.title}
            description={app.description}
            type="APPLICATION"
            category={app.category}
            actionLabel="Acceder a Plataforma"
            onAction={() => window.open(app.url, "_blank")}
            metadata={{
              Usuario: app.user,
              Clave: "•••••••• (Cifrada)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
