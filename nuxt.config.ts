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
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/styles/global.scss'
  ]
})
