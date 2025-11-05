# Fullstack Application with CI/CD

Complete fullstack application with automated deployment using GitHub Actions.

## Tech Stack

**Frontend**: React + TypeScript + Vite + TailwindCSS  
**Backend**: Node.js + Express + MongoDB  
**Deployment**: Render (Backend) + VPS with PM2 (Frontend)  
**CI/CD**: GitHub Actions

## Project Structure

```
admin-dashboard/     # React frontend
backend-API/         # Node.js backend
deployment/          # Deployment configuration
  ecosystem.config.js  # PM2 configuration
.github/workflows/   # CI/CD pipeline
```

## Local Development

### Backend Setup

```bash
cd backend-API
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start server:
```bash
npm run dev
```

Backend runs on http://localhost:3000

### Frontend Setup

```bash
cd admin-dashboard
npm install
```

Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:3000
```

Start development server:
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Deployment

### Required GitHub Secrets

Go to repository Settings > Secrets and variables > Actions and add:

- `RENDER_DEPLOY_HOOK` - Render deploy hook URL
- `BACKEND_URL` - Backend URL (https://your-app.onrender.com)
- `VPS_HOST` - VPS IP address
- `VPS_USER` - SSH username
- `VPS_SSH_KEY` - SSH private key
- `VPS_DEPLOY_PATH` - Deployment path (/var/www/frontend)

### MongoDB Atlas Setup

1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Allow network access (0.0.0.0/0)
5. Get connection string
6. Add to Render environment variables

### Render Setup

1. Create account at render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Root Directory: backend-API
   - Build Command: npm install
   - Start Command: node index.js
5. Add environment variables (MONGO_URI, PORT, JWT_SECRET, NODE_ENV)
6. Get deploy hook from Settings

### VPS Setup

```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2 serve
setcap 'cap_net_bind_service=+ep' /usr/bin/node
apt install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw --force enable
mkdir -p /var/www/frontend/logs
```

## CI/CD Pipeline

The pipeline triggers automatically on push to main branch.

**Step 1**: Deploy backend to Render  
**Step 2**: Build React frontend  
**Step 3**: Deploy frontend to VPS via rsync  
**Step 4**: Restart PM2

## Production URLs

Frontend: http://185.98.128.198  
Backend: https://backend-api.onrender.com

## Useful Commands

```bash
# Check PM2 status
ssh root@185.98.128.198
pm2 status
pm2 logs frontend-app

# Restart PM2
pm2 restart frontend-app

# Manual deployment
git push origin main
```

## API Endpoints

**Users**
- POST /api/users/register
- POST /api/users/login

**Games**
- GET /api/game
- POST /api/game
- GET /api/game/:id
- PUT /api/game/:id
- DELETE /api/game/:id

**Reviews**
- GET /api/review
- POST /api/review
- GET /api/review/:id
- PUT /api/review/:id
- DELETE /api/review/:id

**Game Lists**
- GET /api/gamelist
- POST /api/gamelist
- GET /api/gamelist/:id
- PUT /api/gamelist/:id
- DELETE /api/gamelist/:id

**Genres**
- GET /api/genre
- POST /api/genre
- GET /api/genre/:id
- PUT /api/genre/:id
- DELETE /api/genre/:id
