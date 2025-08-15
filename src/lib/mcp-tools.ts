import { z } from "zod";
import { listCalendars, listEvents, createEvent, updateEvent, deleteEvent, listColors, getFreeBusy, searchEvents, getCurrentTime, getEvent, moveEvent } from "./calendar";
import { auth } from "./auth";

// Create authInfo using Better Auth's getAccessToken API (like Mirror-Mind pattern)
async function getAuthInfo(userId: string) {
    try {
        const { accessToken } = await auth.api.getAccessToken({
            body: {
                providerId: "google",
                userId: userId
            }
        });

        if (!accessToken) {
            throw new Error("No Google access token available. Please connect your Google account.");
        }

        // Return simplified authInfo - Better Auth handles refresh automatically
        return {
            accessToken,
            // Note: We don't need refresh token, clientId, scopes, or expiryDate
            // because Better Auth's getAccessToken() handles all of that internally
        };
    } catch (error: unknown) {
        if (error instanceof Error && error.message?.includes("No account found")) {
            throw new Error("No Google account connected. Please connect your Google account first.");
        }
        throw error;
    }
}

// Minimal wrapper to register core Google Calendar tools on our existing MCP handler factory
interface McpServer {
    tool: (
        name: string,
        description: string,
        schema: Record<string, unknown>,
        handler: (...args: unknown[]) => Promise<{ content: Array<{ type: string; text: string }> }>
    ) => void;
}

export function registerCalendarTools(server: McpServer, userId: string) {
    server.tool(
        "list-calendars",
        "List all available calendars",
        {},
        async () => {
            const authInfo = await getAuthInfo(userId);
            const items = await listCalendars(authInfo);
            return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
        }
    );

    server.tool(
        "list-events",
        "List events from a calendar within a time range",
        {
            calendarId: z.string(),
            timeMin: z.string().optional(),
            timeMax: z.string().optional(),
            timeZone: z.string().optional(),
            maxResults: z.number().optional(),
            q: z.string().optional()
        },
        async (args: { calendarId: string; timeMin?: string; timeMax?: string; timeZone?: string; maxResults?: number; q?: string }) => {
            const authInfo = await getAuthInfo(userId);
            const items = await listEvents({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
        }
    );

    server.tool(
        "create-event",
        "Create a new calendar event",
        {
            calendarId: z.string(),
            summary: z.string(),
            description: z.string().optional(),
            start: z.string(),
            end: z.string(),
            timeZone: z.string().optional(),
            location: z.string().optional(),
            attendees: z.array(z.object({ email: z.string().email() })).optional(),
            colorId: z.string().optional(),
            reminders: z.any().optional(),
            recurrence: z.array(z.string()).optional()
        },
        async (args: { calendarId: string; summary: string; description?: string; start: string; end: string; timeZone?: string; location?: string; attendees?: Array<{ email: string }>; colorId?: string; reminders?: unknown; recurrence?: string[] }) => {
            const authInfo = await getAuthInfo(userId);
            const data = await createEvent({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "update-event",
        "Update an existing calendar event",
        {
            calendarId: z.string(),
            eventId: z.string(),
            summary: z.string().optional(),
            description: z.string().optional(),
            start: z.string().optional(),
            end: z.string().optional(),
            timeZone: z.string().optional(),
            location: z.string().optional(),
            attendees: z.array(z.object({ email: z.string().email() })).optional(),
            colorId: z.string().optional(),
            reminders: z.any().optional(),
            recurrence: z.array(z.string()).optional(),
            sendUpdates: z.enum(["all", "externalOnly", "none"]).optional()
        },
        async (args: { calendarId: string; eventId: string; summary?: string; description?: string; start?: string; end?: string; timeZone?: string; location?: string; attendees?: Array<{ email: string }>; colorId?: string; reminders?: unknown; recurrence?: string[]; sendUpdates?: "all" | "externalOnly" | "none" }) => {
            const authInfo = await getAuthInfo(userId);
            const data = await updateEvent({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "delete-event",
        "Delete a calendar event",
        {
            calendarId: z.string(),
            eventId: z.string(),
            sendUpdates: z.enum(["all", "externalOnly", "none"]).optional()
        },
        async (args: { calendarId: string; eventId: string; sendUpdates?: "all" | "externalOnly" | "none" }) => {
            const authInfo = await getAuthInfo(userId);
            const data = await deleteEvent({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "list-colors",
        "List color IDs for calendars and events",
        {},
        async () => {
            const authInfo = await getAuthInfo(userId);
            const data = await listColors(authInfo);
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "get-freebusy",
        "Query free/busy information for calendars",
        {
            calendars: z.array(z.object({ id: z.string() })),
            timeMin: z.string(),
            timeMax: z.string(),
            timeZone: z.string().optional(),
            groupExpansionMax: z.number().int().max(100).optional(),
            calendarExpansionMax: z.number().int().max(50).optional()
        },
        async (args: { calendars: Array<{ id: string }>; timeMin: string; timeMax: string; timeZone?: string; groupExpansionMax?: number; calendarExpansionMax?: number }) => {
            const authInfo = await getAuthInfo(userId);
            const data = await getFreeBusy({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "search-events",
        "Search for events in a calendar by text query",
        {
            calendarId: z.string(),
            query: z.string(),
            timeMin: z.string(),
            timeMax: z.string(),
            timeZone: z.string().optional(),
            maxResults: z.number().optional()
        },
        async (args: { calendarId: string; query: string; timeMin: string; timeMax: string; timeZone?: string; maxResults?: number }) => {
            const authInfo = await getAuthInfo(userId);
            const items = await searchEvents({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
        }
    );

    server.tool(
        "get-current-time",
        "Get current system time and timezone information",
        {},
        async () => {
            const data = getCurrentTime();
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "get-event",
        "Get details of a specific calendar event",
        {
            calendarId: z.string(),
            eventId: z.string()
        },
        async (args: { calendarId: string; eventId: string }) => {
            const authInfo = await getAuthInfo(userId);
            const data = await getEvent({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );

    server.tool(
        "move-event",
        "Move an event from one calendar to another",
        {
            sourceCalendarId: z.string(),
            targetCalendarId: z.string(),
            eventId: z.string()
        },
        async (args: { sourceCalendarId: string; targetCalendarId: string; eventId: string }) => {
            const authInfo = await getAuthInfo(userId);
            const data = await moveEvent({ ...args, authInfo });
            return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
        }
    );
}