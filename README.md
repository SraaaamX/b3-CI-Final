# Fullstack Application with CI/CD

Complete fullstack application with automated deployment using GitHub Actions.

## Production URLs

- **Frontend**: http://185.98.128.198/
- **Backend**: https://backend-api-wy1r.onrender.com/

## Deployment Architecture

### Overview

This project uses a **dual-platform deployment strategy** with automated CI/CD:

- **Backend**: Deployed on **Render** (PaaS) with automatic builds and zero-downtime deployments
- **Frontend**: Deployed on **VPS** (185.98.128.198) using **PM2** process manager with **serve** static file server
- **CI/CD**: **GitHub Actions** orchestrates the entire deployment pipeline

## CI/CD Pipeline

### Pipeline Triggers

The deployment pipeline is triggered by:

1. **Automatic Trigger**: Any push to `main` or `master` branch
2. **Manual Trigger**: Via GitHub Actions UI using `workflow_dispatch` event

### Pipeline Steps

**Job 1: Deploy Backend**
- Triggers Render deploy hook via HTTP POST

**Job 2: Build & Deploy Frontend** (runs after Job 1)
1. Checkout code
2. Setup Node.js v20
3. Install dependencies
4. Build React app
5. Deploy to VPS via rsync
6. Deploy PM2 config
7. Restart PM2

### Secrets Used

**GitHub Secrets** (Repository Settings → Secrets and variables → Actions):
- `RENDER_DEPLOY_HOOK`
- `BACKEND_URL`
- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_DEPLOY_PATH`

## Rollback Procedures

### Backend Rollback (Render)

Go to Render dashboard → Service → Events tab → Click "Rollback" on previous deployment

### Frontend Rollback (VPS)

```bash
# Revert code and redeploy
git revert <commit-hash>
git push origin main
# Pipeline will automatically redeploy
```

## Validation Checklist

### Pre-Deployment
- [ ] Code builds successfully locally
- [ ] All GitHub secrets are configured
- [ ] No sensitive data in code

### Post-Deployment
- [ ] GitHub Actions workflow completed without errors
- [ ] Backend accessible: https://backend-api-wy1r.onrender.com/
- [ ] Frontend accessible: http://185.98.128.198/
- [ ] API endpoints respond correctly
- [ ] Frontend can communicate with backend
- [ ] PM2 process running on VPS

### Verification Commands

```bash
# Test backend
curl https://backend-api-wy1r.onrender.com/api/game

# Check VPS PM2 status
ssh root@185.98.128.198 "pm2 status"
```