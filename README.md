# 🗓️ Google Calendar MCP Server

**I got tired of the Google Cloud setup BS, so I built this.**

**Connect your calendar in 30 seconds, not 3 hours.**

Skip the OAuth nightmare. No Google Cloud Console. No service accounts. No headaches. Just works with Claude Desktop, Cursor, Zed, or whatever MCP client you're using.

## ✨ Why This Rocks

- **🚀 Actually Easy Setup** - 30 seconds vs 3 hours of Google Cloud hell
- **🔒 OAuth That Works** - No token management headaches
- **🔧 Works Everywhere** - Claude, Cursor, Zed... if it does MCP, we got you
- **⚡ Deploy & Forget** - One-click Vercel deployment 
- **🗓️ Full Calendar Power** - Create, edit, delete events like a boss
- **🌐 Your Server** - Host it yourself, own your data
- **📱 Test Drive** - Web UI to make sure everything works before going live

## Just Want to Use It?

1. **Connect your calendar:**
   - Go to https://cal-mcp.com
   - Hit "Connect Google Calendar"
   - Do the OAuth dance
   - Copy your config

2. **Add to your MCP client:**

   **Option A: Streamable HTTP (Recommended)**
   ```json
   {
     "mcpServers": {
       "google-calendar": {
         "url": "https://cal-mcp.com/mcp"
       }
     }
   }
   ```

   **Option B: STDIO (Local Server)**
   ```json
   {
     "mcpServers": {
       "google-calendar": {
         "command": "npx",
         "args": ["-y", "mcp-remote", "https://cal-mcp.com/mcp"]
       }
     }
   }
   ```

## Want to Run Your Own?

1. **Grab the code:**
   ```bash
   git clone https://github.com/progrmoiz/cal-mcp
   cd cal-mcp
   npm install
   ```

2. **Google OAuth setup (yeah, still need this part):**
   - Hit up [Google Cloud Console](https://console.cloud.google.com/)
   - Make a project (or use an existing one)
   - Enable Google Calendar API
   - Create OAuth 2.0 credentials
   - Add this redirect URI: `http://localhost:3000/api/auth/callback/google`

3. **Environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Drop in your Google stuff:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   BETTER_AUTH_SECRET=any_random_string
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Fire it up:**
   ```bash
   npm run dev
   ```

5. **Connect your calendar:**
   - Go to http://localhost:3000
   - Hit "Connect Google Calendar"
   - Do the OAuth dance
   - Copy your config

## 🧪 Test Drive

Built-in web interface because who wants to debug blind?

- **Play with Events** - Create, edit, delete events right in the browser
- **OAuth Testing** - Make sure the auth flow actually works
- **Debug Mode** - See raw API responses when things go sideways
- **Sanity Check** - Verify everything works before plugging into your AI

Hit `http://localhost:3000` once you're running and give it a spin.

## What You Can Do

All the calendar stuff you'd expect:
- `list-calendars` - See all your calendars
- `list-events` - Get events for a date range
- `create-event` - Make new events
- `update-event` - Change existing events
- `delete-event` - Remove events
- `search-events` - Find events by text
- `get-event` - Get event details
- `move-event` - Move events between calendars
- `list-colors` - Get color options for calendars/events
- `get-freebusy` - Check when you're available
- `get-current-time` - Current time and timezone info

## For Builders

What's under the hood:
- Better Auth handling the OAuth mess
- MCP server that actually works
- Next.js for the web stuff
- TypeScript because we're not animals

## Going Live

Ready to deploy? Here's what you need:

1. **Environment Variables** - Set them on your hosting platform
2. **Database** - Point to your Neon PostgreSQL URL
3. **Google OAuth** - Update redirect URIs for your domain
4. **HTTPS** - Because OAuth demands it

## Security Stuff

- Better Auth handles tokens so you don't have to
- Secrets stay in environment variables where they belong
- Everything needs auth (obviously)
- Token refresh happens automatically

## 🛠️ When Things Break

Stuff not working? Try these:

### Your AI Tool Doesn't Do MCP
Not all AI tools support MCP yet. Check if yours does before pulling your hair out.

### Remote Connections Failing
Some tools do MCP but hate remote servers. Use the STDIO config instead.

### OAuth Acting Up
Did you actually complete the Google login? Try connecting again from the homepage.

### No MCP Support At All
Bug your AI tool's developers to add MCP support. The more people ask, the faster it happens.

## 🛠️ Architecture

Built with modern technologies for reliability and ease of use:

- **Next.js 15** - Full-stack framework with API routes
- **Better Auth** - Secure OAuth 2.0 authentication
- **MCP Handler** - Model Context Protocol server implementation
- **Google Calendar API** - Direct integration with Google's calendar services
- **Vercel** - Serverless deployment platform
- **TypeScript** - Type-safe development

## 🤝 Want to Help?

Contributions welcome! Here's how:

1. **🐛 Found a Bug?** - Open an issue, tell us what broke
2. **💡 Got Ideas?** - Issues are perfect for brainstorming
3. **🔧 Can Code?** - PRs for fixes and features always welcome
4. **📖 Hate Bad Docs?** - Make them better!
5. **🧪 Just Testing?** - Feedback is gold

**How to Contribute:**
1. Fork it
2. Branch it: `git checkout -b feature/cool-thing`
3. Code it (and test it!)
4. PR it with a good description

**If you want to contribute, here are some ideas worth tackling:**

- **📊 Google Sheets MCP** - Spreadsheets meet AI (imagine the possibilities!)
- **📧 Gmail MCP** - Email automation that doesn't suck
- **☁️ Google Drive MCP** - File management for the AI era
- **📝 Google Docs MCP** - Collaborative writing with AI superpowers

**Other Calendar Providers:**
- **📅 Outlook/Microsoft 365** - Because not everyone lives in Google land
- **🍎 Apple Calendar (CalDAV)** - For the Mac enthusiasts

Got another idea? **Just build it!**

The beauty of this setup is that it's dead simple to extend. Copy the auth flow, swap the API endpoints, and boom - you've got yourself a new MCP server.

Feel free to fork this repo and create a pull request. Let's build the future of productivity tools together, one API at a time. 🛠️

## 📄 License

MIT License - do whatever you want with it.

## 💬 Need Help?

- **📖 Docs**: This README + code comments
- **🐛 Bugs**: GitHub Issues
- **💬 Questions**: GitHub Discussions
- **📧 Collaboration**: Hit me up
