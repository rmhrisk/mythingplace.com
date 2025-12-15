# Changelog

## v2.0 - Full Shop Launch (December 2024)

### Major Changes
- ✨ Transformed from "coming soon" page to full product catalog
- 🛍️ Added interactive product grid with expand/collapse functionality
- 🎨 Implemented category filtering (Art & Stories, Jewelry & Wearables, Clay & Sculpture)
- 💳 Integrated Stripe payment links for each product
- 📱 Fully responsive design (mobile, tablet, desktop)

### File Structure Updates
- Separated CSS into `css/style.css`
- Separated JavaScript into `js/shop.js`
- Created JSON-based product catalog in `data/products.json`
- Organized image storage in `images/products/`
- Added comprehensive documentation (README.md, DEPLOYMENT.md)

### Features
- **Product Tiles**: Clickable tiles that expand to show full details
- **Smart Grid**: Adapts layout based on screen size (1-3 columns)
- **Category Filters**: Toggle buttons to filter products by category
- **Sold Out State**: Automatic handling of unavailable items
- **Image Support**: Graceful fallbacks when images aren't available
- **Hero Section**: Optional featured image at top of page
- **Email Signup**: Formspree integration for newsletter signups
- **Thank You Page**: Post-purchase confirmation page

### Maintenance Made Easy
- Nicole can update products by editing `data/products.json`
- Adding products = drop image in folder + update JSON
- No code knowledge required for day-to-day maintenance
- Clear README with step-by-step instructions

### Technical Improvements
- Accessible (ARIA labels, semantic HTML)
- Performance optimized (efficient grid rendering)
- SEO friendly (proper heading structure, meta tags)
- Browser compatible (modern browsers)

## v1.0 - Coming Soon Page (Initial Launch)

- Single-page "coming soon" design
- Email signup form
- Brand identity established (colors, fonts, logo)
- Mobile-first responsive design

---

**Next Steps**:
1. Add real product photos
2. Create Stripe payment links
3. Configure custom domain
4. Launch! 🚀
