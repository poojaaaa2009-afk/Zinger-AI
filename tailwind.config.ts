import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#0B0B0E", cyan: "#00F0FF", violet: "#9D00FF" } } },
  plugins: []
};
export default config;