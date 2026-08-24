# KOBA Clothing Brand - Setup Guide

## Quick Start

### 1. Connect to Shopify

To enable e-commerce functionality, you'll need a Shopify store:

1. Create a Shopify store at https://www.shopify.com/
2. Generate a Storefront Access Token:
   - Go to Settings → Apps and integrations → Develop apps
   - Create a custom app named "KOBA Website"
   - Copy the Storefront Access Token

3. Update `js/shopify-config.js`:
   ```javascript
   const SHOPIFY_CONFIG = {
       storefrontAccessToken: 'YOUR_TOKEN_HERE',
       shopName: 'your-store-name',
       apiVersion: '2024-01',
   };
   ```

### 2. Add Your Products

**Option A: Use Shopify Admin**
- Add products through your Shopify dashboard
- The website will automatically fetch and display them

**Option B: Manual Updates**
- Edit `SAMPLE_PRODUCTS` in `js/main.js`
- Add your clothing items with names, prices, and descriptions

### 3. Customize the Design

#### Color Scheme
Update CSS variables in `css/style.css` to match your brand:
```css
:root {
    --navy: #0a1628;      /* Main dark background */
    --midnight: #1a2a4a;  /* Secondary dark */
    --gold: #d4af37;      /* Accent color */
    --white: #f5f5f5;     /* Text color */
    --teal: #2d6a7e;      /* Accent highlight */
}
```

#### Logo & Branding
- Replace "KOBA" text in navigation with your logo
- Update hero section heading and tagline
- Modify social media links in footer

### 4. Add Product Images

Create an `images/` folder and:
- Add product images
- Update product cards with image paths instead of emoji

### 5. Contact Form Integration

For the contact form to work, set up email handling:

**Option A: Using Formspree**
1. Go to https://formspree.io/
2. Create a form
3. Update the form action in `index.html`

**Option B: Backend Service**
- Set up a Node.js/Python backend to handle form submissions
- Send emails via SendGrid, Mailgun, or similar

### 6. Deploy Your Website

#### Option A: GitHub Pages
```bash
# Push to GitHub
git add .
git commit -m "Initial KOBA website setup"
git push origin main

# Enable GitHub Pages in repository settings
# Select 'main' branch as source
```

#### Option B: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option C: Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: (none needed for static site)
3. Set publish directory: (root directory)

### 7. Configure Domain

1. Purchase a domain
2. Point DNS to your hosting provider:
   - **GitHub Pages**: Add CNAME record
   - **Vercel**: Add custom domain in dashboard
   - **Netlify**: Add custom domain in site settings

## Features Implemented

✅ **Night Time Resort Design**
- Deep navy and midnight blue color scheme
- Gold accents for luxury feel
- Teal highlights for sophistication
- Starry background animation

✅ **Product Catalog**
- Grid layout with hover effects
- Search functionality
- Category filtering
- Product cards with images, names, prices

✅ **Shopping Cart**
- Add/remove items
- Cart modal display
- Total price calculation
- Checkout integration ready

✅ **Contact Form**
- Email collection
- Message submission
- Form validation

✅ **Responsive Design**
- Mobile-friendly layout
- Tablet and desktop optimized
- Touch-friendly buttons

## Next Steps

1. ✏️ **Customize Content**
   - Update product information
   - Add your brand story
   - Write compelling descriptions

2. 🎨 **Add Media**
   - Product photography
   - Brand imagery
   - Hero section background

3. 🔧 **Configure Services**
   - Shopify integration
   - Email notifications
   - Analytics (Google Analytics)

4. 🌐 **Domain & DNS**
   - Register your domain
   - Configure DNS settings
   - Set up SSL certificate

5. 📱 **Testing**
   - Test on mobile devices
   - Verify checkout flow
   - Test contact form
   - Cross-browser testing

## Support

For help with:
- **Shopify**: https://help.shopify.com/
- **GitHub Pages**: https://docs.github.com/en/pages
- **Web Design**: Refer to CSS comments in `style.css`

## License

© 2024 KOBA. All rights reserved.
