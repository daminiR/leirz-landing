import { defineConfig } from "umi";

export default defineConfig({
  title: "Layers",
  base: '/leirz-landing/',
  publicPath: '/leirz-landing/',
  links: [
    { rel: 'icon', href: '/leirz-landing/favicon.svg' },
    // Preload critical hero images for faster perceived loading
    { rel: 'preload', href: '/leirz-landing/categories-map.jpg', as: 'image', type: 'image/jpeg' },
    { rel: 'preload', href: '/leirz-landing/hero-phone.jpg', as: 'image', type: 'image/jpeg' },
    { rel: 'preload', href: '/leirz-landing/ai-detail.jpg', as: 'image', type: 'image/jpeg' },
  ],
  routes: [
    { path: "/", component: "index" },
    { path: "/terms", component: "terms" },
    { path: "/privacy", component: "privacy" },
  ],
  theme: {
    "@primary-color": "#6366f1",
  },
  npmClient: 'yarn',
});
