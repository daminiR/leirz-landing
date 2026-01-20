import { defineConfig } from "umi";

export default defineConfig({
  title: "Leirz",
  links: [
    { rel: 'icon', href: '/favicon.svg' },
    // Preload critical hero images for faster perceived loading
    { rel: 'preload', href: '/categories-map.jpg', as: 'image', type: 'image/jpeg' },
    { rel: 'preload', href: '/hero-phone.jpg', as: 'image', type: 'image/jpeg' },
    { rel: 'preload', href: '/ai-detail.jpg', as: 'image', type: 'image/jpeg' },
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
