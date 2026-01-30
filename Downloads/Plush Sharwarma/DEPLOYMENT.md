# 🚀 Netlify Deployment Guide

This guide will help you deploy your Plush Sharwarma website to Netlify as a static site.

## 📋 Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Your code pushed to a GitHub repository

---

## 🛠️ Quick Setup

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Plush Sharwarma"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/plush-sharwarma.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify and select your repository

3. **Configure Build Settings**
   
   Netlify will auto-detect the settings from `netlify.toml`, but verify:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - Click **"Deploy site"**

4. **Done!** 🎉
   - Your site will be live at: `https://random-name-12345.netlify.app`
   - You can customize the domain in Site settings

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your site locally**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

   Follow the prompts:
   - Authorize Netlify CLI
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (or leave blank for random)
   - Publish directory: `out`

---

## ⚙️ Configuration Files

All configuration is ready! Here's what was set up:

### `next.config.mjs`
```javascript
output: 'export'        // Enables static HTML export
images: {
  unoptimized: true    // Required for static hosting
}
trailingSlash: true    // Better compatibility
```

### `netlify.toml`
- Build command and publish directory configured
- Client-side routing redirects enabled
- Security headers added
- Static asset caching optimized

---

## 🧪 Test Your Build Locally

Before deploying, test the static export:

```bash
# Build the static site
npm run build

# The output will be in the 'out' folder
# Serve it locally to test (install serve if needed)
npx serve out
```

Visit `http://localhost:3000` to preview your static site.

---

## 🌐 Custom Domain

To use a custom domain:

1. Go to your Netlify site dashboard
2. Navigate to **Domain settings**
3. Click **"Add custom domain"**
4. Follow the DNS configuration instructions

---

## 🔧 Troubleshooting

### Build fails
- Check the Netlify deploy logs
- Ensure all dependencies are in `package.json`
- Verify `next.config.mjs` has `output: 'export'`

### Images not loading
- Images should be in the `public` folder
- Use relative paths: `/sequence/image.jpg`
- Ensure `images.unoptimized: true` is set

### Cart state resets on reload
- This is expected with client-side state (Zustand)
- Consider using `localStorage` persistence if needed

### 404 errors on routes
- Ensure `netlify.toml` has the redirect rule
- Clear Netlify cache and redeploy

---

## 📊 Performance Tips

Your site is already optimized with:
- ✅ Static HTML generation
- ✅ Asset caching headers
- ✅ Security headers
- ✅ Client-side routing

For even better performance:
- Enable Netlify's Asset Optimization
- Use Netlify's Image CDN (if upgrading from static export)
- Enable HTTPS (automatic with Netlify)

---

## 🎯 Next Steps

After deployment:
1. Test all interactions (menu, cart, drawer)
2. Verify animations work smoothly
3. Test on mobile devices
4. Share your live link! 🌯✨

---

**Need help?** Check the [Netlify docs](https://docs.netlify.com/) or [Next.js static export guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).
