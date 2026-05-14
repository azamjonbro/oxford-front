import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index.js'
import { i18n } from './i18n.js'
import './assets/style/main.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
