import { auth } from "@/lib/auth";
import { registerCalendarTools } from "@/lib/mcp-tools";
import { createMcpHandler } from "mcp-handler";

// Manually enforce MCP auth using Better Auth API per docs
const handler = async (req: Request) => {
    const session = await auth.api.getMcpSession({ headers: req.headers });
    if (!session) {
        return new Response(null, { status: 401 });
    }

    // Create the MCP handler with real user ID from session
    const mcpHandler = createMcpHandler(
        (server) => {

            // Register all Google Calendar tools with real user ID
            registerCalendarTools(server, session.userId);
        },
        {
            capabilities: {
                tools: {},
            },
        },
        {
            basePath: "/api",
            verboseLogs: false,
            maxDuration: 60,
        }
    );

    return mcpHandler(req);
};

export { handler as GET, handler as POST };
