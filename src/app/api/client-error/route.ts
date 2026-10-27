const MAX_BODY = 8_000;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : undefined);

export const POST = async (request: Request) => {
  const raw = await request.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY) return new Response(null, { status: 204 });
  try {
    const body = JSON.parse(raw) as Record<string, unknown>;
    console.error(
      "[client-error]",
      JSON.stringify({
        tool: text(body.tool, 80),
        action: text(body.action, 40),
        message: text(body.message, 500),
        stack: text(body.stack, 3000),
        fileType: text(body.fileType, 60),
        fileSize: typeof body.fileSize === "number" ? body.fileSize : undefined,
        page: text(body.page, 200),
        userAgent: text(request.headers.get("user-agent"), 300),
      }),
    );
  } catch {
    console.error("[client-error] unreadable report");
  }
  return new Response(null, { status: 204 });
};
