# Fresh Microgreens Website

A modern, single-page website for a microgreens startup with product catalog and order management.

## Features

- ✅ Single-page design with smooth scrolling
- ✅ Floating navigation menu
- ✅ Product catalog with 6 microgreens varieties
- ✅ Shopping cart functionality
- ✅ Order form with customer information
- ✅ Responsive design for mobile and desktop
- ✅ Ready for payment integration (Stripe)
- ✅ Ready for order management system integration

## Getting Started

1. Open `index.html` in your browser to view the website
2. No build process required - pure HTML, CSS, and JavaScript

## Payment Integration

To enable Stripe payments:

1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Create a backend server to handle payment intents
4. Uncomment the Stripe code in `script.js` and add your publishable key
5. Implement the `/api/create-payment-intent` endpoint

### Backend Example (Node.js/Express)

```javascript
const stripe = require('stripe')('your_secret_key');

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
  });
  
  res.json({ clientSecret: paymentIntent.client_secret });
});
```

## Order Management Integration

Popular order management systems you can integrate:

- **ShipStation** - Shipping and fulfillment
- **OrderDesk** - Order processing and automation
- **Shopify** - Full e-commerce platform
- **WooCommerce** - WordPress e-commerce

## Customization

### Update Products
Edit the `products` array in `script.js` to add/modify products.

### Change Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2d5016;
    --secondary-color: #6b9e3e;
    --accent-color: #a8d08d;
}
```

### Update Contact Info
Edit the contact section in `index.html`.

## Deployment

Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## License

MIT License - feel free to use for your business!
