import { ref } from 'vue'
import { i18n } from '../i18n.js'

// Global reactive locale shared across ALL components
export const currentLocale = ref(localStorage.getItem('user-locale') || 'uz')

export const setLocale = (lang) => {
  currentLocale.value = lang
  i18n.global.locale.value = lang
  localStorage.setItem('user-locale', lang)
}

// Reactive getLoc helper — import and use in any component
export const getLoc = (obj) => {
  const lang = currentLocale.value
  if (!obj) return ''
  return obj[lang] || obj['uz'] || ''
}
