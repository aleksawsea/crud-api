# crud-api
A simple HTTP API for managing “users” in an in-memory database, built with TypeScript and Node.js.

---

## Prerequisites

- **Node.js** v22.x.x or newer
- **npm** v8.x.x or newer

---

## Installation

1. **Clone the repo**
   ```bash
   git clone https://your.git.repo/url.git
   cd url
2. **Install dependencies**
  npm install
3. **Environment variables**   
  Create .env in the project root and set:   
  `PORT=4000`   
  This is the base port for the HTTP server.

4. **Available Scripts**   
- development mode (hot-reload via ts-node-dev)   
npm run start:dev   
Launches src/index.ts under ts-node-dev with automatic restart on file changes.

- build production bundle (Webpack)   
npm run build   
Invokes Webpack (via webpack.config.ts) to produce a single dist/bundle.ts.   

- production mode   
npm run start:prod   
Runs npm run build and then executes node dist/bundle.ts.   

5. **API Endpoints**   
- **GET** - Get an array of all users.   
  /api/users   
- **GET** - Get one user by ID.   
  /api/users/{userId}   
  Returns 400 if the ID format is invalid, 404 if missing.   
- **POST** - Create a new user.   
  /api/users   
  Body must include username (string), age (number), hobbies (array of strings).   
  Returns 400 if missing/invalid. Returns 201 + created record.   
- **PUT** - Update an existing user (partial).   
  /api/users/{userId}   
  Same ID validation as GET. Returns 200 + updated record.   
- **DELETE** - Delete a user.
  /api/users/{userId}   
  Returns 204 on success, 400 if ID invalid, 404 if not found.   

Any non-existent route (e.g. /foo/bar) will return 404 with a JSON body:
  `{ "message": "Endpoint not found" }`
