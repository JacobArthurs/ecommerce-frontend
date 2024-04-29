export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    options: {
      ripple: true,
    },
  },
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/styles/global.scss'
  ]
})
