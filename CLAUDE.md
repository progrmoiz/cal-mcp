# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Google Calendar MCP (Model Context Protocol) server that provides a web interface and API for connecting Google Calendar to AI assistants like Claude. It eliminates the complex Google Cloud setup process by providing a hosted OAuth flow and MCP endpoint.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Commands

- `npx drizzle-kit generate` - Generate database migrations
- `npx drizzle-kit migrate` - Run database migrations
- `npx drizzle-kit studio` - Open Drizzle Studio

## Environment Variables

Required for local development:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `BETTER_AUTH_SECRET` - Random string for auth security
- `BETTER_AUTH_URL` - Base URL (http://localhost:3000 for dev)
- `DATABASE_URL` - PostgreSQL connection string

## Architecture

### Authentication Flow
- Uses Better Auth with Google OAuth provider
- MCP plugin handles session management for AI clients
- User sessions stored in PostgreSQL database
- Access tokens automatically refreshed by Better Auth

### MCP Integration
- Main MCP endpoint: `/api/[transport]/route.ts`
- Session validation via `auth.api.getMcpSession()`
- Calendar tools registered per authenticated user
- Uses `mcp-handler` package for streamable HTTP transport

### Google Calendar API
- OAuth with offline access for refresh tokens
- Comprehensive calendar operations (CRUD, search, move, colors, freebusy)
- Error handling for expired tokens and invalid grants
- Automatic token refresh via Google OAuth client

### Database Schema
- User, session, account tables for auth
- OAuth application and consent tables for MCP
- Uses Drizzle ORM with PostgreSQL

### Key Files
- `src/lib/auth.ts` - Better Auth configuration
- `src/lib/calendar.ts` - Google Calendar API wrapper functions
- `src/lib/mcp-tools.ts` - MCP tool registration and session handling
- `src/lib/schema.ts` - Drizzle database schema
- `src/app/api/[transport]/route.ts` - MCP endpoint handler

## MCP Tools Available

Core calendar operations:
- `list-calendars` - Get all user calendars
- `list-events` - Get events from calendar with time range
- `create-event` - Create new calendar event
- `update-event` - Modify existing event
- `delete-event` - Remove event
- `get-event` - Get specific event details
- `move-event` - Move event between calendars
- `search-events` - Text search within events
- `list-colors` - Get color options for calendars/events
- `get-freebusy` - Check availability
- `get-current-time` - Get system time and timezone

## Authentication Error Handling

The calendar functions include robust error handling:
- 401 errors trigger re-authentication prompts
- Invalid refresh tokens detected and cleared
- 404 errors for missing events/calendars
- 403 errors for permission issues