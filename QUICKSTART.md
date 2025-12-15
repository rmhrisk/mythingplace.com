# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Extract the Files
1. Download `mythingplace.zip`
2. Extract it to your computer
3. You'll see a `mythingplace` folder with all the files

### Step 2: Check It Works Locally
1. Open the `mythingplace` folder
2. Double-click `index.html` to open it in your browser
3. You should see the site with placeholder products!

### Step 3: Push to GitHub
```bash
cd mythingplace
git init
git add .
git commit -m "Initial commit: My Thing Place shop"
git remote add origin https://github.com/rmhrisk/mythingplace.com.git
git push -u origin main
```

## ✅ First Tasks

### 1. Set Up Stripe Payment Links
- Log into Stripe
- Create payment links for each product
- Copy the links into `data/products.json`
- See DEPLOYMENT.md for detailed instructions

### 2. Add Product Photos
- Take photos of your items
- Save them in `images/products/`
- Name them to match the image paths in `products.json`
- Example: `dragon-keychain.jpg`, `sparkle-earrings.jpg`

### 3. Update Product Info
- Open `data/products.json`
- Update names, prices, and descriptions
- Change categories if needed
- Mark items as sold out by setting `"soldOut": true`

### 4. Optional: Add a Hero Image
- Put a photo in `images/` folder named `hero.jpg`
- It will automatically appear at the top of the page!

## 📋 Before Going Live Checklist

- [ ] All product photos uploaded
- [ ] All Stripe payment links configured (test mode first!)
- [ ] Product descriptions are accurate
- [ ] Prices are correct
- [ ] Email signup form tested
- [ ] Site tested on mobile and desktop
- [ ] Domain configured in Cloudflare
- [ ] Switch Stripe to live mode
- [ ] Final test purchase

## 🆘 Need Help?

1. Read the README.md for detailed product management
2. Check DEPLOYMENT.md for technical setup
3. Test everything locally first before pushing to GitHub
4. Use Stripe test mode until you're ready to go live

## 📞 Support

Having trouble? Check:
- Browser console (F12) for JavaScript errors
- Verify all file paths are correct
- Make sure JSON is valid (use jsonlint.com)
- Try opening the site in a private/incognito window

---

**You're all set!** 🎉

Remember: Nicole only needs to work with `data/products.json` and the `images/products/` folder for day-to-day updates. Everything else is set up and ready to go!
