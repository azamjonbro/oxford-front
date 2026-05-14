import { createI18n } from 'vue-i18n'
import messages from './lang/lang.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('user-locale') || 'uz',
  fallbackLocale: 'uz',
  messages
})
