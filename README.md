# My Thing Place 🎨✨

Welcome to your shop's website! This README will help you keep your site updated with new products and images.

## 📁 Folder Structure

```
mythingplace.com/
├── index.html           # Main website page (you won't need to edit this)
├── css/
│   └── style.css       # All the styling (colors, fonts, layout)
├── js/
│   └── shop.js         # Code that makes the shop work
├── data/
│   └── products.json   # YOUR PRODUCT CATALOG (edit this!)
├── images/
│   ├── hero.jpg        # Big hero image at the top (optional)
│   └── products/       # PUT YOUR PRODUCT PHOTOS HERE!
│       ├── dragon-keychain.jpg
│       ├── sparkle-earrings.jpg
│       ├── name-pencil.jpg
│       └── ... (more photos)
└── README.md           # This file!
```

## 🎯 Quick Start: Adding or Updating Products

### Step 1: Add Your Product Photo

1. Take a photo of your item
2. Name it something simple (like `clay-dragon.jpg` or `blue-bracelet.jpg`)
3. Put it in the `images/products/` folder

**Photo Tips:**
- Use `.jpg` or `.png` files
- Keep names simple with no spaces (use dashes like `my-item.jpg`)
- Square photos work best (they'll be cropped to fit)
- Good lighting makes products look great!

### Step 2: Edit products.json

Open `data/products.json` in any text editor. You'll see a list of items like this:

```json
{
  "id": "dragon-keychain",
  "name": "3D Printed Dragon Keychain",
  "price": 12,
  "description": "Cute little dragon. Pick your favorite color.",
  "image": "images/products/dragon-keychain.jpg",
  "paymentLink": "https://buy.stripe.com/YOUR_LINK_HERE",
  "tag": "3D Print",
  "category": "Art & Stories",
  "soldOut": false
}
```

**What each field means:**

- **id**: A unique code for this item (no spaces, use dashes)
- **name**: What shows up on your site
- **price**: Just the number (no $ sign)
- **description**: Tell people about your item!
- **image**: Path to your photo (e.g., `images/products/dragon.jpg`)
- **paymentLink**: Your Stripe checkout link (see below)
- **tag**: A little label (like "Handmade", "Clay", "3D Print")
- **category**: Must be one of:
  - `Art & Stories`
  - `Jewelry & Wearables`
  - `Clay & Sculpture`
- **soldOut**: `true` if sold out, `false` if available

### Step 3: Get Your Stripe Payment Link

1. Go to your Stripe Dashboard
2. Click "Payment Links" in the sidebar
3. Create a new link for your product
4. Copy the link (it looks like: `https://buy.stripe.com/abc123def456`)
5. Paste it into the `paymentLink` field

### Step 4: Save and Upload to GitHub

1. Save your `products.json` file
2. In your terminal (or GitHub Desktop):
   ```bash
   git add .
   git commit -m "Added new product: [name]"
   git push
   ```
3. Your site will update automatically! ✨

## 📝 Common Tasks

### Adding a New Product

Copy an existing product entry in `products.json`, paste it at the end (before the last `]`), and change all the details. Don't forget the comma between items!

```json
{
  "items": [
    {
      "id": "item-1",
      ...
    },  ← Need a comma here!
    {
      "id": "item-2",
      ...
    }  ← No comma on the last one
  ]
}
```

### Marking Something as Sold Out

Just change `"soldOut": false` to `"soldOut": true` in your product.

### Changing the Hero Image

1. Add your photo to the `images/` folder as `hero.jpg`
2. It will automatically show up at the top!

### Changing Prices

Just edit the number in the `price` field.

## 🎨 Categories

Your products can be in these categories:
- 🎨 **Art & Stories** - Artwork, zines, painted items
- 📿 **Jewelry & Wearables** - Earrings, bracelets, pins
- 🏺 **Clay & Sculpture** - Anything made with clay

The buttons at the bottom let people filter by category!

## 💡 Tips

- **Test locally**: Open `index.html` in your browser to see changes before uploading
- **Keep backups**: Save a copy of `products.json` before making big changes
- **Image sizes**: The site automatically resizes images, but smaller files load faster
- **Stripe setup**: Make sure each product has its own payment link in Stripe

## 🆘 Need Help?

- Check that your `products.json` file doesn't have any typos
- Make sure image filenames match exactly (including `.jpg` or `.png`)
- Verify your Stripe links are correct and active
- If the site looks broken, check the browser console for errors (press F12)

## 🚀 Deployment

Your site is set up to deploy automatically when you push to GitHub! Here's what happens:

1. You make changes to `products.json` or add images
2. You commit and push to GitHub
3. Cloudflare (or GitHub Pages) automatically updates your live site
4. Your changes appear at mythingplace.com in a few seconds!

---

**Made with ✨ by Nicole & Friends**

Need to change colors or fonts? Check out `css/style.css`!
Questions? Ask Dad! 😊
