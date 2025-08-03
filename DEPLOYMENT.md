# Deployment Guide for Practo Clone

## Quick Deployment on Vercel (Recommended)

### Step 1: Prepare Your Repository
1. Make sure all your code is committed to GitHub
2. Ensure your repository is public or accessible to Vercel

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect it's a Next.js project
6. Click "Deploy"

### Step 3: Your Live URLs
After deployment, you'll get:
- **Frontend**: `https://your-project-name.vercel.app`
- **API**: `https://your-project-name.vercel.app/api/doctors`

## Alternative: Manual Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Upload the `out/` folder to Netlify

### Backend (Railway/Render)
1. Create a separate Node.js API server
2. Deploy on Railway or Render
3. Update frontend to use the external API URL

## Environment Variables (if needed)
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## Final Checklist
- [ ] Repository pushed to GitHub
- [ ] Project builds successfully (`npm run build`)
- [ ] All API endpoints work locally
- [ ] README.md updated with live URLs
- [ ] Responsive design tested

## Sample Live URLs for README
Replace these in your README.md:
```
🔗 Live Demo: https://practo-clone-your-name.vercel.app
📡 API Base: https://practo-clone-your-name.vercel.app/api
```
