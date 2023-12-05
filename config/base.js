export const modules = [
  '@nuxtjs/tailwindcss',
  '@nuxtjs/strapi',
  '@nuxt/image',
  'nuxt-simple-sitemap',
  'nuxt-simple-robots',
]

export const app = {
  pageTransition: { name: 'page', mode: 'out-in' },
  layoutTransition: { name: 'layout', mode: 'out-in' },
  head: {
    meta: [
      {
        name: 'google-site-verification',
        content: 'ZnoLQA9ujFM6-FRqomSUBlGV0qDMaLc443Z5qLCF-I0',
      },
    ],
  },
}

export const plugins = [
  '@/plugins/markdown.ts',
  '@/plugins/animation'
]