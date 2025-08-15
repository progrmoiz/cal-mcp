import { google, calendar_v3 } from "googleapis";

type AuthInfo = {
    accessToken?: string;
    refreshToken?: string;
    clientId?: string;
    scopes?: string[];
    expiryDate?: number;
};

async function createOAuthClient(authInfo?: AuthInfo) {
    const oauth2 = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    if (authInfo?.accessToken) {

        const credentials = {
            access_token: authInfo.accessToken,
            refresh_token: authInfo.refreshToken,
            expiry_date: authInfo.expiryDate,
            token_type: 'Bearer'
        };
        oauth2.setCredentials(credentials);
        
        // Check if token is expired and refresh if needed
        if (authInfo.expiryDate && authInfo.expiryDate < Date.now() && authInfo.refreshToken) {
            try {
                const { credentials: newCredentials } = await oauth2.refreshAccessToken();
                oauth2.setCredentials(newCredentials);
            } catch (error: unknown) {
                const err = error as { message?: string; code?: number; status?: number };
                
                // Based on GitHub research - invalid_grant means refresh token is invalid
                if (err.message?.includes('invalid_grant') || err.code === 400) {
                    
                    // Clear invalid credentials to prevent further invalid refresh attempts
                    oauth2.setCredentials({});
                    throw new Error('Refresh token expired - re-authentication required');
                }
            }
        }
    }
    return oauth2;
}

export async function listCalendars(authInfo?: AuthInfo) {
    try {
        const auth = await createOAuthClient(authInfo);
        const cal = google.calendar({ version: "v3", auth });
        const res = await cal.calendarList.list();
        return res.data.items ?? [];
    } catch (error: unknown) {
        const err = error as { code?: number; status?: number; message?: string };
        if (err.code === 401 || err.status === 401) {
            throw new Error('Authentication failed: Access token is invalid or expired. Please re-authenticate with Google Calendar.');
        }
        throw error;
    }
}

export async function listEvents(params: {
    authInfo?: AuthInfo;
    calendarId: string;
    timeMin?: string;
    timeMax?: string;
    timeZone?: string;
    maxResults?: number;
    q?: string;
}) {
    try {
        const auth = await createOAuthClient(params.authInfo);
        const cal = google.calendar({ version: "v3", auth });
        const res = await cal.events.list({
            calendarId: params.calendarId,
            timeMin: params.timeMin,
            timeMax: params.timeMax,
            timeZone: params.timeZone,
            maxResults: params.maxResults,
            singleEvents: true,
            orderBy: "startTime",
            q: params.q
        });
        return res.data.items ?? [];
    } catch (error: unknown) {
        const err = error as { code?: number; status?: number; message?: string };
        if (err.code === 401 || err.status === 401) {
            throw new Error('Authentication failed: Access token is invalid or expired. Please re-authenticate with Google Calendar.');
        }
        throw error;
    }
}

export async function createEvent(params: {
    authInfo?: AuthInfo;
    calendarId: string;
    summary: string;
    description?: string;
    start: string;
    end: string;
    timeZone?: string;
    location?: string;
    attendees?: { email: string }[];
    colorId?: string;
    reminders?: calendar_v3.Schema$Event["reminders"];
    recurrence?: string[];
}) {
    const auth = await createOAuthClient(params.authInfo);
    const cal = google.calendar({ version: "v3", auth });
    const event: calendar_v3.Schema$Event = {
        summary: params.summary,
        description: params.description,
        location: params.location,
        attendees: params.attendees,
        colorId: params.colorId,
        reminders: params.reminders,
        recurrence: params.recurrence,
        start: params.timeZone
            ? { dateTime: params.start, timeZone: params.timeZone }
            : { dateTime: params.start },
        end: params.timeZone
            ? { dateTime: params.end, timeZone: params.timeZone }
            : { dateTime: params.end }
    };
    const res = await cal.events.insert({ calendarId: params.calendarId, requestBody: event });
    return res.data;
}

export async function updateEvent(params: {
    authInfo?: AuthInfo;
    calendarId: string;
    eventId: string;
    summary?: string;
    description?: string;
    start?: string;
    end?: string;
    timeZone?: string;
    location?: string;
    attendees?: { email: string }[];
    colorId?: string;
    reminders?: calendar_v3.Schema$Event["reminders"];
    recurrence?: string[];
    sendUpdates?: "all" | "externalOnly" | "none";
}) {
    const auth = await createOAuthClient(params.authInfo);
    const cal = google.calendar({ version: "v3", auth });
    const body: calendar_v3.Schema$Event = {};
    if (params.summary !== undefined) body.summary = params.summary;
    if (params.description !== undefined) body.description = params.description;
    if (params.location !== undefined) body.location = params.location;
    if (params.attendees !== undefined) body.attendees = params.attendees;
    if (params.colorId !== undefined) body.colorId = params.colorId;
    if (params.reminders !== undefined) body.reminders = params.reminders;
    if (params.recurrence !== undefined) body.recurrence = params.recurrence;
    if (params.start) body.start = params.timeZone ? { dateTime: params.start, timeZone: params.timeZone } : { dateTime: params.start };
    if (params.end) body.end = params.timeZone ? { dateTime: params.end, timeZone: params.timeZone } : { dateTime: params.end };
    const res = await cal.events.patch({
        calendarId: params.calendarId,
        eventId: params.eventId,
        sendUpdates: params.sendUpdates,
        requestBody: body
    });
    return res.data;
}

export async function deleteEvent(params: {
    authInfo?: AuthInfo;
    calendarId: string;
    eventId: string;
    sendUpdates?: "all" | "externalOnly" | "none";
}) {
    const auth = await createOAuthClient(params.authInfo);
    const cal = google.calendar({ version: "v3", auth });
    await cal.events.delete({ calendarId: params.calendarId, eventId: params.eventId, sendUpdates: params.sendUpdates });
    return { success: true };
}

export async function listColors(authInfo?: AuthInfo) {
    const auth = await createOAuthClient(authInfo);
    const cal = google.calendar({ version: "v3", auth });
    const res = await cal.colors.get({});
    return res.data;
}

export async function getFreeBusy(params: {
    authInfo?: AuthInfo;
    calendars: { id: string }[];
    timeMin: string;
    timeMax: string;
    timeZone?: string;
    groupExpansionMax?: number;
    calendarExpansionMax?: number;
}) {
    const auth = await createOAuthClient(params.authInfo);
    const cal = google.calendar({ version: "v3", auth });
    const res = await cal.freebusy.query({
        requestBody: {
            timeMin: params.timeMin,
            timeMax: params.timeMax,
            timeZone: params.timeZone,
            items: params.calendars,
            groupExpansionMax: params.groupExpansionMax,
            calendarExpansionMax: params.calendarExpansionMax
        }
    });
    return res.data;
}

export async function searchEvents(params: {
    authInfo?: AuthInfo;
    calendarId: string;
    query: string;
    timeMin: string;
    timeMax: string;
    timeZone?: string;
    maxResults?: number;
}) {
    try {
        const auth = await createOAuthClient(params.authInfo);
        const cal = google.calendar({ version: "v3", auth });
        const res = await cal.events.list({
            calendarId: params.calendarId,
            q: params.query,
            timeMin: params.timeMin,
            timeMax: params.timeMax,
            timeZone: params.timeZone,
            maxResults: params.maxResults || 250,
            singleEvents: true,
            orderBy: "startTime"
        });
        return res.data.items ?? [];
    } catch (error: unknown) {
        const err = error as { code?: number; status?: number; message?: string };
        if (err.code === 401 || err.status === 401) {
            throw new Error('Authentication failed: Access token is invalid or expired. Please re-authenticate with Google Calendar.');
        }
        throw error;
    }
}

export function getCurrentTime() {
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return {
        currentTime: now.toISOString(),
        localTime: now.toLocaleString(),
        timezone: timezone,
        timestamp: now.getTime()
    };
}

export async function getEvent(params: {
    authInfo?: AuthInfo;
    calendarId: string;
    eventId: string;
}) {
    try {
        const auth = await createOAuthClient(params.authInfo);
        const cal = google.calendar({ version: "v3", auth });
        const res = await cal.events.get({
            calendarId: params.calendarId,
            eventId: params.eventId
        });
        return res.data;
    } catch (error: unknown) {
        const err = error as { code?: number; status?: number; message?: string };
        if (err.code === 401 || err.status === 401) {
            throw new Error('Authentication failed: Access token is invalid or expired. Please re-authenticate with Google Calendar.');
        }
        if (err.code === 404 || err.status === 404) {
            throw new Error('Event not found. Please check the calendar ID and event ID.');
        }
        throw error;
    }
}

export async function moveEvent(params: {
    authInfo?: AuthInfo;
    sourceCalendarId: string;
    targetCalendarId: string;
    eventId: string;
}) {
    try {
        const auth = await createOAuthClient(params.authInfo);
        const cal = google.calendar({ version: "v3", auth });
        const res = await cal.events.move({
            calendarId: params.sourceCalendarId,
            eventId: params.eventId,
            destination: params.targetCalendarId
        });
        return res.data;
    } catch (error: unknown) {
        const err = error as { code?: number; status?: number; message?: string };
        if (err.code === 401 || err.status === 401) {
            throw new Error('Authentication failed: Access token is invalid or expired. Please re-authenticate with Google Calendar.');
        }
        if (err.code === 404 || err.status === 404) {
            throw new Error('Event or calendar not found. Please check the calendar IDs and event ID.');
        }
        if (err.code === 403 || err.status === 403) {
            throw new Error('Permission denied. You may not have write access to the target calendar.');
        }
        throw error;
    }
}