import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index.js'
import { createI18n } from 'vue-i18n'
import messages from './lang/lang.json'
import './assets/style/main.css'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('user-locale') || 'uz',
  fallbackLocale: 'uz',
  messages
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
