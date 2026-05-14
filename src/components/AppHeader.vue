<template>
  <header class="main-header">
    <div class="container navbar-inner">
      <!-- Left: Logo -->
      <router-link to="/" class="logo">OXFORD</router-link>

      <!-- Center: Menu -->
      <nav class="nav">
        <router-link to="/" class="nav-link">
          {{ $t('nav.home') }}
          <div v-if="$route.path === '/'" class="active-line"></div>
        </router-link>
        <router-link to="/courses" class="nav-link">{{ $t('nav.courses') }}</router-link>
        <router-link to="/about" class="nav-link">{{ $t('nav.about') }}</router-link>
        <router-link to="/contact" class="nav-link">{{ $t('nav.contact') }}</router-link>
      </nav>

      <!-- Right: Lang -->
      <div class="nav-right">
        <div class="lang-box" @click="toggleLangMenu">
          <button class="lang-btn">
            {{ currentLocale.toUpperCase() }}
            <svg :class="{'rotated': isLangOpen}" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <div class="lang-dropdown" v-if="isLangOpen">
            <div class="lang-item" @click.stop="changeLang('uz')">UZ</div>
            <div class="lang-item" @click.stop="changeLang('en')">EN</div>
            <div class="lang-item" @click.stop="changeLang('ru')">RU</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { currentLocale, setLocale } from '../utils/localeStore'

const isLangOpen = ref(false)

const toggleLangMenu = () => {
  isLangOpen.value = !isLangOpen.value
}

const changeLang = (lang) => {
  setLocale(lang)
  isLangOpen.value = false
}

const closeDropdown = (e) => {
  if (!e.target.closest('.lang-box')) {
    isLangOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.main-header {
  width: 100%;
  padding: 1.75rem 0;
  background: white;
  position: relative;
  z-index: 100;
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 900;
  color: #0056ff;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  letter-spacing: -1px;
}

.nav {
  display: flex;
  gap: 3rem;
}

.nav-link {
  text-decoration: none;
  color: #1e293b;
  font-weight: 700;
  font-size: 0.95rem;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #0056ff;
}

.active-line {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0056ff;
}

.lang-box {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.lang-btn {
  background: none;
  border: none;
  color: #0056ff;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
}

.lang-btn svg {
  transition: transform 0.3s ease;
}

.lang-btn svg.rotated {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.lang-item {
  padding: 0.8rem 1.2rem;
  text-align: center;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.lang-item:hover {
  background: #f0f7ff;
  color: #0056ff;
}

@media (max-width: 968px) {
  .nav { display: none; }
}
</style>
