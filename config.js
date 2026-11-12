// Convenience reference only. Put real secrets in .env.local, not this file.
// Never commit API keys or expose them to browser code.
module.exports = {
  aiProvider: "openai", // "openai" or "gemini"
  freeTokens: 10,
  lemonSqueezy: {
    checkoutUrl: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL || ""
  }
};