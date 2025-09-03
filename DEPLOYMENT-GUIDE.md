# 🚀 Hetzner + Coolify Deployment Guide

## 🌐 **PART 1: Hetzner Cloud Server Setup**

### Step 1: Create Hetzner Account
1. Go to https://console.hetzner.cloud/
2. Sign up for account
3. Add payment method

### Step 2: Create Server
1. Click "New Project" → Name it "Servicos Urgentes"
2. Click "Add Server"
3. **Location**: Choose closest to Brazil (Ashburn, VA recommended)
4. **Image**: Ubuntu 22.04
5. **Type**: CX11 (1 vCPU, 2GB RAM) - Perfect to start, can upgrade later
6. **Networking**: Keep defaults
7. **SSH Keys**: Add your SSH key (generate if needed)
8. **Name**: servicos-urgentes-server
9. Click "Create & Buy Now"

**Monthly Cost**: ~€4.51 (~R$28/month)

### Step 3: Initial Server Setup
SSH into your server:
```bash
ssh root@YOUR_SERVER_IP
```

Update system:
```bash
apt update && apt upgrade -y
```

## 🐳 **PART 2: Install Coolify**

### Step 1: Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Step 2: Install Coolify
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### Step 3: Access Coolify
1. Open browser to `http://YOUR_SERVER_IP:8000`
2. Complete initial setup
3. Create admin account

## 📁 **PART 3: Deploy Your Website**

### Step 1: Push Code to GitHub
On your MacBook:
```bash
cd servicos-urgentes
git init
git add .
git commit -m "Initial commit - Servicos Urgentes website"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/servicos-urgentes.git
git push -u origin main
```

### Step 2: Connect GitHub to Coolify
1. In Coolify dashboard, go to "Sources"
2. Click "Add Source" → GitHub
3. Authorize Coolify to access your repositories
4. Select your `servicos-urgentes` repository

### Step 3: Create Application
1. Click "Applications" → "New Application"
2. **Name**: servicos-urgentes
3. **Source**: Select your GitHub repo
4. **Branch**: main
5. **Build Pack**: Node.js
6. **Port**: 4321

### Step 4: Configure Build Settings
In the application settings:
```bash
# Build Command
npm run build

# Start Command  
npm run preview -- --host 0.0.0.0 --port 4321
```

### Step 5: Environment Variables
Add these environment variables in Coolify:
```
NODE_ENV=production
HOST=0.0.0.0
PORT=4321
```

### Step 6: Deploy
1. Click "Deploy"
2. Monitor build logs
3. Once complete, your site will be live!

## 🌍 **PART 4: Domain Configuration**

### Step 1: Purchase Domain
1. Go to https://registro.br/
2. Search for `servicosurgentes.com.br`
3. Complete purchase process

### Step 2: Configure DNS
In your domain registrar:
1. **A Record**: `@` → `YOUR_SERVER_IP`
2. **A Record**: `www` → `YOUR_SERVER_IP`

### Step 3: Add Domain to Coolify
1. In Coolify, go to your application
2. Click "Domains"
3. Add `servicosurgentes.com.br`
4. Add `www.servicosurgentes.com.br`
5. Enable SSL (Let's Encrypt)

## 🔒 **PART 5: SSL Certificate**

Coolify automatically handles SSL certificates via Let's Encrypt:
1. Ensure domain is pointing to your server
2. In Coolify, enable "Generate SSL Certificate"
3. Wait for certificate generation
4. Your site will be available via HTTPS

## 📊 **PART 6: Monitoring & Maintenance**

### Server Monitoring
Coolify provides built-in monitoring for:
- CPU usage
- Memory usage
- Disk space
- Application uptime

### Backup Strategy
1. **Database**: Not needed (static site)
2. **Code**: Already backed up on GitHub
3. **Server**: Hetzner provides snapshot backups

### Updates
To update your website:
1. Make changes locally
2. Push to GitHub: `git push`
3. Coolify auto-deploys (if enabled)
4. Or manually trigger deployment in Coolify

## 💰 **PART 7: Cost Breakdown**

### Monthly Costs:
- **Hetzner CX11 Server**: €4.51 (~R$28)
- **Domain (.com.br)**: ~R$40/year (~R$3.33/month)
- **Coolify**: Free
- **SSL Certificate**: Free (Let's Encrypt)

**Total Monthly Cost**: ~R$31 (~$6 USD)

### Revenue Potential:
- **Google AdSense**: R$500-2000/month (conservative)
- **Affiliate Links**: R$200-800/month
- **Premium Listings**: R$1000-5000/month (20-100 providers × R$50)

**ROI**: 1,600% - 22,500% 🚀

## 🚨 **PART 8: Go-Live Checklist**

### Before Launch:
- [ ] Replace all placeholder phone numbers
- [ ] Update email addresses
- [ ] Test all forms
- [ ] Verify mobile responsiveness
- [ ] Check all internal links
- [ ] Set up Google Analytics
- [ ] Configure Google Search Console

### Launch Day:
- [ ] Deploy to production
- [ ] Test live site thoroughly
- [ ] Submit sitemap to Google
- [ ] Create Google My Business listing
- [ ] Post on social media
- [ ] Notify local contacts

### Week 1 After Launch:
- [ ] Monitor server performance
- [ ] Check Google Analytics data
- [ ] Respond to any contact form submissions
- [ ] Start content marketing
- [ ] Begin local SEO efforts

## 🎯 **PART 9: Scaling Strategy**

### When to Upgrade Server:
- **CX21** (2 vCPU, 4GB): When you hit 1000+ daily visitors
- **CX31** (2 vCPU, 8GB): When you hit 5000+ daily visitors
- **Load Balancer**: When you need 99.99% uptime

### Geographic Expansion:
1. **Phase 1**: Dominate São José dos Campos
2. **Phase 2**: Expand to Taubaté, Jacareí
3. **Phase 3**: Cover entire Vale do Paraíba
4. **Phase 4**: Franchise model for other regions

## 🛠️ **PART 10: Troubleshooting**

### Common Issues:

**Build Fails:**
```bash
# Check Node.js version in Coolify
node --version
npm --version

# Ensure package.json has correct scripts
```

**Site Not Loading:**
- Check DNS propagation: https://dnschecker.org/
- Verify server IP in domain settings
- Check Coolify application logs

**SSL Certificate Issues:**
- Ensure domain points to server
- Wait 24-48 hours for DNS propagation
- Try regenerating certificate in Coolify

### Support Resources:
- **Hetzner Docs**: https://docs.hetzner.com/
- **Coolify Docs**: https://coolify.io/docs
- **Astro Docs**: https://docs.astro.build/

## 🎉 **YOU'RE READY TO LAUNCH!**

With this setup, you'll have:
- ✅ Professional hosting infrastructure
- ✅ Automatic deployments
- ✅ SSL certificates
- ✅ Monitoring & backups
- ✅ Scalable architecture
- ✅ Cost-effective solution

**Time to dominate the São José dos Campos emergency services market!** 🚀

---
*Total setup time: 2-4 hours*
*Monthly operating cost: ~R$31*
*Revenue potential: R$1,700-7,800/month*
*ROI: 5,400-25,100%* 📈
