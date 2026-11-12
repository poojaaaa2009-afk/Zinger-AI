# Zinger AI

A premium dark-mode AI smart-reply generator built with Next.js, React, Tailwind CSS and Lucide icons.

## Run locally

1. Install Node.js 18.17+.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Run `npm run dev` and open http://localhost:3000.

## Enable real AI generation

Add `OPENAI_API_KEY` to `.env.local`. The key is read only by the server route at `app/api/generate/route.ts`; never put it in a `NEXT_PUBLIC_` variable or commit it.

Without a key, the app uses built-in demo replies so the interface can be previewed.

## Enable Lemon Squeezy checkout

1. Create products and variants in your Lemon Squeezy store.
2. Set `NEXT_PUBLIC_LEMON_CHECKOUT_URL` to the checkout URL for the desired product.
3. Set `LEMONSQUEEZY_WEBHOOK_SECRET` in `.env.local` and configure the webhook URL as `https://YOUR_DOMAIN/api/webhook`.
4. Complete webhook event handling and persist paid entitlements in a database before granting tokens or Pro access.

The current checkout action opens the configured checkout URL. The webhook route verifies the signature but intentionally does not grant entitlements yet.

## Production work still required

- Add authentication (e.g. Auth.js, Clerk, or Supabase Auth).
- Add a database (e.g. Postgres/Supabase) for accounts, balances, subscriptions and idempotent webhook events.
- Enforce free and paid token balances on the server; browser localStorage is only a preview counter and is not secure.
- Configure a real country/currency decision using trusted billing country or GeoIP at the server, not `navigator.language`.
- Complete Lemon Squeezy product/variant selection and webhook event handling.
- Add rate limiting, abuse prevention, privacy policy, terms, and monitoring.
- Add service worker/offline caching if full offline PWA behavior is needed. The manifest and install metadata are included.

## Deploy

Import the project into Vercel or Netlify, set the environment variables, and deploy. Use Node.js 18.17+.
