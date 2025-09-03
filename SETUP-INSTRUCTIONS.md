# 🚀 Serviços Urgentes - Complete Setup Guide

## 📋 **PART 1: Setting Up on Your MacBook Air**

### Prerequisites (You Already Have These!)
- ✅ Node.js installed
- ✅ npm installed  
- ✅ VS Code installed
- ✅ Git installed

### Step 1: Get the Project Files
1. Download the `servicos-urgentes-complete.tar.gz` file
2. Extract it to your desired location:
   ```bash
   tar -xzf servicos-urgentes-complete.tar.gz
   cd servicos-urgentes
   ```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Your site will be available at: `http://localhost:4321`

### Step 4: Test Everything
- Visit `http://localhost:4321` in your browser
- Test all navigation links
- Check responsive design (resize browser window)
- Test service pages: `/servicos/encanador`, `/servicos/chaveiro`, etc.
- Test registration page: `/cadastro`
- Test contact page: `/contato`

## 🛠️ **PART 2: Customization Before Going Live**

### Update Contact Information
Edit these files to replace placeholder info:

**src/components/Header.astro** - Line 15:
```astro
<a href="tel:+5512YOURPHONE" class="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
  📞 (12) YOUR-PHONE
</a>
```

**src/components/Footer.astro** - Lines 8-9:
```astro
<a href="tel:+5512YOURPHONE" class="text-white hover:text-red-200 font-bold text-lg">
  📞 (12) YOUR-PHONE
</a>
```

**src/pages/contato.astro** - Multiple locations:
- Replace `(12) 99999-9999` with your real phone
- Replace `contato@servicosurgentes.com.br` with your real email

### Update Domain References
Search and replace `servicosurgentes.com.br` with your actual domain when you get it.

## 📊 **PART 3: Adding Google AdSense (Revenue Stream #1)**

### Step 1: Create AdSense Account
1. Go to https://www.google.com/adsense/
2. Sign up with your Google account
3. Add your domain when you have it

### Step 2: Add AdSense Code
Add this to `src/layouts/Layout.astro` in the `<head>` section:
```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOURPUBID"
     crossorigin="anonymous"></script>
```

### Step 3: Add Ad Placements
High-value locations for emergency service ads:
- **Header banner** (below navigation)
- **Between service cards** on homepage
- **Sidebar on service pages**
- **Bottom of contact page**

Example ad unit:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOURPUBID"
     data-ad-slot="YOURSLOTID"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## 🔗 **PART 4: Adding Affiliate Links (Revenue Stream #2)**

### Tool Affiliate Opportunities
Add affiliate links for:
- **Plumbing tools** (Amazon, Home Depot)
- **Electrical equipment** (Amazon, Grainger)
- **Locksmith tools** (specialized suppliers)
- **HVAC equipment** (HVAC suppliers)

### Implementation
Add affiliate links in service pages like this:
```html
<div class="bg-blue-50 p-4 rounded-lg mt-6">
  <h3 class="font-bold mb-2">🛠️ Ferramentas Recomendadas</h3>
  <p class="text-sm text-gray-600 mb-3">Produtos que nossos profissionais recomendam:</p>
  <a href="YOUR-AFFILIATE-LINK" class="text-blue-600 hover:underline">
    Kit de Ferramentas Profissional →
  </a>
</div>
```

## 💰 **PART 5: Premium Listings (Revenue Stream #3)**

### Manual Approval System
The registration form (`/cadastro`) already includes:
- ✅ Professional verification fields
- ✅ Document requirements
- ✅ Experience validation
- ✅ Coverage area selection

### Pricing Structure
- **Basic Listing**: Free (limited visibility)
- **Premium Listing**: R$ 50/month
  - Priority placement
  - Featured badge
  - Direct contact display
  - Customer review highlights

### Implementation
1. Set up payment processing (PagSeguro, Mercado Pago)
2. Create admin dashboard for approvals
3. Add premium features to listings

## 🌐 **PART 6: Domain & Hosting Setup**

### Domain Purchase
1. Buy `servicosurgentes.com.br` from Registro.br
2. Configure DNS to point to your Hetzner server

### Hetzner Server Setup
1. Create Hetzner Cloud server (CX11 is sufficient to start)
2. Install Coolify on the server
3. Connect your GitHub repository
4. Deploy via Coolify

## 📈 **PART 7: SEO & Marketing Launch**

### Google Setup
1. **Google Search Console**
   - Add your domain
   - Submit sitemap: `yourdomain.com/sitemap.xml`
   
2. **Google My Business**
   - Create business listing
   - Add service areas (São José dos Campos regions)
   
3. **Google Analytics**
   - Track visitor behavior
   - Monitor conversion rates

### Local SEO
1. **Directory Submissions**
   - Guia Mais (local directory)
   - Google My Business
   - Facebook Business
   
2. **Content Marketing**
   - Blog posts about emergency situations
   - Seasonal content (winter heating, summer AC)
   - Local news tie-ins

### Social Media
1. **Facebook Business Page**
   - Post emergency tips
   - Share customer testimonials
   - Local community engagement
   
2. **Instagram Business**
   - Before/after photos (with permission)
   - Emergency prevention tips
   - Behind-the-scenes content

## 🎯 **PART 8: The Vibe Marketer's Local Domination Strategy**

### Phase 1: Foundation (Weeks 1-4)
- ✅ Website live (YOU'RE HERE!)
- Set up Google My Business
- Create social media accounts
- Submit to local directories

### Phase 2: Content & SEO (Weeks 5-12)
- Publish weekly blog posts
- Optimize for local keywords
- Build local backlinks
- Collect first customer testimonials

### Phase 3: Paid Advertising (Weeks 13-24)
- Google Ads for emergency keywords
- Facebook local advertising
- Retargeting campaigns
- Seasonal promotions

### Phase 4: Scale & Dominate (Months 6+)
- Expand to neighboring cities
- Add more service categories
- Franchise/licensing opportunities
- Exit strategy planning

## 🚨 **EMERGENCY KEYWORDS TO TARGET**

High-value, low-competition keywords for São José dos Campos:
- "encanador emergência são josé dos campos"
- "chaveiro 24 horas sjc"
- "eletricista urgente vale do paraíba"
- "conserto ar condicionado são josé"
- "desentupimento são josé dos campos"

## 📞 **IMPORTANT NEXT STEPS**

1. **Replace ALL placeholder phone numbers** with your real number
2. **Set up Google AdSense** account
3. **Purchase domain** servicosurgentes.com.br
4. **Create social media** accounts
5. **Set up Google My Business** listing

## 🎉 **YOU'RE READY TO DOMINATE!**

You now have:
- ✅ Professional website
- ✅ Zero direct competition
- ✅ Multiple revenue streams
- ✅ Local SEO optimization
- ✅ Mobile-responsive design
- ✅ Conversion-optimized pages

The blue ocean is waiting for you in São José dos Campos! 🌊

---
*Built with ❤️ using Astro + Tailwind CSS*
*Following The Vibe Marketer's Local Domination Blueprint*
