export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@bootstrap-vue-next/nuxt', '@pinia/nuxt'],
  css: [
    'bootstrap-icons/font/bootstrap-icons.css',
    '@/assets/styles/global.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/styles/_variables.scss";`,
        },
      },
    },
  },
  app: {
    head: {
      title: 'Gerenciador de Projetos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Expanded:wght@400;500;700&display=swap'
        },
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  }
})