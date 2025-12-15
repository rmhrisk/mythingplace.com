# Deployment Guide for My Thing Place

## Current Setup

The site is configured for static hosting with:
- **Repository**: https://github.com/rmhrisk/mythingplace.com/
- **CDN**: Cloudflare
- **Email**: Formspree (form ID: xvgeyykq)
- **Payments**: Stripe (payment links to be configured)

## Quick Deploy

### Option 1: GitHub Pages (Recommended)

1. Go to repository Settings → Pages
2. Set Source to "Deploy from branch"
3. Select `main` branch and `/ (root)` folder
4. Save - site will be live at `https://rmhrisk.github.io/mythingplace.com/`

Then in Cloudflare:
1. Add CNAME record: `www` → `rmhrisk.github.io`
2. Add CNAME record: `@` → `rmhrisk.github.io` (or use A records)
3. Enable "Flatten CNAME" if needed

### Option 2: Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages
2. Connect to GitHub repository
3. Configure build:
   - Build command: (none needed - it's static)
   - Build output directory: `/`
4. Deploy!

## Setting Up Stripe

### Creating Payment Links

For each product Nicole wants to sell:

1. Log into Stripe Dashboard
2. Click "Payment Links" in the left sidebar
3. Click "+ New" to create a payment link
4. Configure:
   - **Product**: Create new or select existing
   - **Price**: Set the price (must match products.json)
   - **Quantity**: Usually 1 (unless selling multiples)
   - **After payment**: Redirect to a thank-you page or back to site
5. Copy the payment link (looks like `https://buy.stripe.com/test_abc123...`)
6. Paste into the corresponding product's `paymentLink` in `data/products.json`

### Testing vs Production

- **Test Mode**: Use test payment links during development
  - Test cards: `4242 4242 4242 4242` (Visa)
  - Any future expiry, any CVC
- **Live Mode**: Switch to live mode when ready to accept real payments
  - Create new payment links in live mode
  - Update all `paymentLink` values in products.json

### Important Stripe Settings

- **Tax**: Configure in Stripe → Settings → Tax
- **Shipping**: Can be added to payment links
- **Success URL**: Set to `https://mythingplace.com/thank-you.html` (or similar)
- **Customer emails**: Enable in payment link settings

## Formspree Configuration

Already configured with form ID: `xvgeyykq`

Email notifications go to the email associated with this Formspree account. To change:
1. Log into Formspree
2. Find form "My Thing Place – New signup"
3. Update notification settings

## File Structure for Deployment

```
mythingplace.com/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── shop.js         # Shop functionality
├── data/
│   └── products.json   # Product catalog (Nicole edits this)
├── images/
│   ├── hero.jpg        # Optional hero image
│   └── products/       # Product photos (Nicole adds these)
└── README.md           # User documentation
```

All files are static - no build process needed!

## Updating Content

### For Nicole (Simple Updates)

1. Add product photo to `images/products/`
2. Edit `data/products.json`
3. Commit and push to GitHub
4. Site updates automatically

### For You (Technical Updates)

- **Styles**: Edit `css/style.css`
- **Functionality**: Edit `js/shop.js`
- **Layout**: Edit `index.html`
- **Product Schema**: Modify `data/products.json` structure and update `js/shop.js`

## DNS Configuration (Cloudflare)

For custom domain `mythingplace.com`:

### If using GitHub Pages:
```
Type: CNAME
Name: www
Content: rmhrisk.github.io
Proxy: Enabled (orange cloud)

Type: CNAME
Name: @
Content: rmhrisk.github.io
Proxy: Enabled (orange cloud)
```

### If using Cloudflare Pages:
Cloudflare handles this automatically when you connect the domain.

## Security Considerations

1. **HTTPS**: Automatically handled by GitHub Pages or Cloudflare Pages
2. **Formspree**: Has built-in spam protection (honeypot included)
3. **Stripe**: All payment processing is handled by Stripe (PCI compliant)
4. **No sensitive data**: No API keys or secrets in the repository (all payment links are public anyway)

## Future Enhancements

Some ideas for future development:

- [ ] Add inventory tracking (would need a backend)
- [ ] Shopping cart (multiple items before checkout)
- [ ] Product variants (colors, sizes)
- [ ] Admin panel for Nicole to edit products without touching JSON
- [ ] Image optimization/compression before upload
- [ ] Product search functionality
- [ ] Customer reviews/comments
- [ ] Analytics integration (Google Analytics, Plausible, etc.)

## Monitoring

- **Uptime**: Use Cloudflare Analytics or UptimeRobot
- **Forms**: Check Formspree dashboard for submissions
- **Payments**: Monitor Stripe dashboard for transactions
- **Errors**: Browser console (F12) for JavaScript issues

## Troubleshooting

### Products not showing:
- Check browser console for errors
- Verify `data/products.json` is valid JSON (use JSONLint.com)
- Ensure file paths are correct

### Images not loading:
- Verify image files exist in `images/products/`
- Check exact filenames (case-sensitive!)
- Try opening image URL directly in browser

### Stripe links not working:
- Verify links are in live mode (not test mode)
- Check that products are active in Stripe
- Ensure payment links haven't expired

### Form submissions not arriving:
- Check Formspree spam folder
- Verify form ID is correct in `index.html`
- Test with different email addresses

## Support Resources

- **Stripe**: https://stripe.com/docs/payment-links
- **Formspree**: https://help.formspree.io/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **GitHub Pages**: https://docs.github.com/en/pages

---

**Questions?** Open an issue in the GitHub repo or reach out directly.
