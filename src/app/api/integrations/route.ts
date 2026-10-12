import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Support Center Integrations API",
    version: "1.0.0",
    modules: [
      "commands",
      "applications",
      "scenarios",
      "manuals",
      "tickets",
      "bitacora",
      "reports",
      "ai",
      "admin",
    ],
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      received: true,
      data: body,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error procesando el payload de integración" },
      { status: 400 }
    );
  }
}
