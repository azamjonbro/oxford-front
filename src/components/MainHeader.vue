<template>
  <header class="main-header" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-inner">
      <!-- Left: Logo -->
      <router-link to="/" class="logo">OXFORD</router-link>

      <!-- Center: Menu -->
      <nav class="nav">
        <router-link to="/" class="nav-link" active-class="active" exact>
          {{ $t('nav.home') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/courses" class="nav-link" active-class="active">
          {{ $t('nav.courses') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/teachers" class="nav-link" active-class="active">
          {{ $t('nav.teachers') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/events" class="nav-link" active-class="active">
          {{ $t('nav.events') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/about" class="nav-link" active-class="active">
          {{ $t('nav.about') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/contact" class="nav-link" active-class="active">
          {{ $t('nav.contact') }}
          <div class="active-line"></div>
        </router-link>
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

    <!-- Scroll Progress Line -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { currentLocale, setLocale } from '../utils/localeStore'

const isScrolled = ref(false)
const scrollProgress = ref(0)
const isLangOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

const toggleLangMenu = () => {
  isLangOpen.value = !isLangOpen.value
}

// setLocale updates both currentLocale and i18n global locale
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
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid var(--border, #f1f5f9);
}

.main-header.scrolled {
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  padding: 10px 0;
}

.nav-link:hover {
  color: #0056ff;
}

.active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0056ff;
  border-radius: 10px;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.nav-link.active {
  color: #0056ff;
}

.nav-link.active .active-line {
  opacity: 1;
  transform: scaleX(1);
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

.scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #0056ff;
  transition: width 0.1s ease-out;
}

@media (max-width: 968px) {
  .nav { display: none; }
}
</style>
