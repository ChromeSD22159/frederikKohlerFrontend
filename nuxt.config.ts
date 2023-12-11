// https://nuxt.com/docs/api/configuration/nuxt-config

import axios from 'axios'

import { strapi_url } from './config/strapi';
import { modules, app, plugins } from './config/base';
import { css, scss, tailwindcss } from './config/css';
import { sitemap, prerender } from './config/seo';
import { hooks } from './config/hooks';
import { vite } from './config/vite';
import { runtimeConfig } from './config/runtimeConfig';

export default defineNuxtConfig({
  devtools: { enabled: true },
  vscode: {},
  components: true,
  mode: 'universal',
  ssr: true,
  app: app,
  css: css,
  modules: modules,
  plugins: plugins,
  robots: {
    mergeWithRobotsTxtPath: process.env.NODE_ENV === "production" ? 'assets/robots/robots.txt' : 'assets/robots/robots-stage.txt'
  },
  strapi: strapi_url,
  tailwindcss: tailwindcss,
  vite: vite,
  runtimeConfig: runtimeConfig,
  bridge: {
    nitro: true
  },
  hooks: hooks,
  site:{
    url: process.env.NUXT_PUBLIC_SITE_URL,
    cacheMaxAgeSeconds: 360, // 1 hour
  },
  sitemap: sitemap,
  generate: {
    fallback: true,
  },
  routeRules: {
    '/**': { swr: 86400 },
    '/error/**': { index: false },
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      },
    },
  },
  nitro: {
    prerender: prerender
  },
});

