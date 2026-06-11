<template>
  <header class="main-header" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-inner">
      <!-- Left: Logo -->
      <router-link to="/" class="logo">OXFORD</router-link>

      <!-- Center: Menu (Desktop) -->
      <nav class="nav">
        <router-link to="/" class="nav-link" active-class="active" exact>
          {{ $t('nav.home') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/courses" class="nav-link" active-class="active">
          {{ $t('nav.courses') }}
          <div class="active-line"></div>
        </router-link>
        <router-link to="/results" class="nav-link" active-class="active">
          {{ $t('nav.result') }}
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

      <!-- Right: Lang & Hamburger -->
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

        <!-- Mobile Menu Hamburger Button -->
        <button 
          class="hamburger-btn" 
          :class="{ 'active': isMobileMenuOpen }" 
          @click="toggleMobileMenu" 
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Mobile Menu Overlay inside container boundary -->
      <transition name="slide-fade">
        <div class="mobile-menu" v-if="isMobileMenuOpen">
          <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.home') }}
          </router-link>
          <router-link to="/courses" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.courses') }}
          </router-link>
          <router-link to="/results" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.result') }}
          </router-link>
          <router-link to="/teachers" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.teachers') }}
          </router-link>
          <router-link to="/events" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.events') }}
          </router-link>
          <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.about') }}
          </router-link>
          <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">
            {{ $t('nav.contact') }}
          </router-link>
        </div>
      </transition>
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
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  const y = window.scrollY
  if (y > 80) {
    isScrolled.value = true
  } else if (y < 40) {
    isScrolled.value = false
  }

  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 97
}

const toggleLangMenu = () => {
  isLangOpen.value = !isLangOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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
  if (!e.target.closest('.hamburger-btn') && !e.target.closest('.mobile-menu')) {
    isMobileMenuOpen.value = false
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
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: var(--container-width);
  height: 85px;
  z-index: 1000;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  
  /* Optimization for smooth animation */
  transition: 
    top 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.5s ease,
    box-shadow 0.5s ease,
    border-color 0.5s ease;
  will-change: top, width, height, background-color, box-shadow;
  backface-visibility: hidden;
}

.main-header.scrolled {
  top: 10px;
  width: 98%;
  height: 75px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-color: rgba(255, 255, 255, 0.5);
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
  bottom: 1px;
  left: 15px;
  height: 3px;
  border-radius: 10px;
  background: #0056ff;
  transition: width 0.1s ease-out;
}

.nav-right {
  display: flex;
  align-items: center;
}

/* ==========================================================================
   Hamburger Button
   ========================================================================== */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
  margin-left: 20px;
}

.hamburger-btn span {
  display: block;
  width: 100%;
  height: 2.5px;
  background-color: #1e293b;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Transform to X when active */
.hamburger-btn.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
  background-color: #0056ff;
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
  background-color: #0056ff;
}

/* ==========================================================================
   Mobile Menu Overlay
   ========================================================================== */
.mobile-menu {
  position: absolute;
  top: calc(100% + 15px);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 86, 255, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 999;
}

.mobile-nav-link {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
  padding: 12px 18px;
  border-radius: 14px;
  transition: var(--transition);
  text-decoration: none;
}

.mobile-nav-link:hover, .mobile-nav-link.router-link-active {
  background: #f0f7ff;
  color: #0056ff;
}

/* Transition Animations */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* ==========================================================================
   Media Queries & Responsiveness
   ========================================================================== */
@media (max-width: 1200px) {
  .nav { gap: 1.8rem; }
  .nav-link { font-size: 0.9rem; }
}

@media (max-width: 1080px) {
  .nav { gap: 1.2rem; }
  .nav-link { font-size: 0.85rem; }
  .logo { font-size: 1.6rem; }
}

@media (max-width: 1020px) {
  .nav { gap: 0.8rem; }
  .nav-link { font-size: 0.8rem; }
  .logo { font-size: 1.4rem; }
  .lang-box { padding: 0.5rem 0.8rem; }
}

@media (max-width: 968px) {
  .nav { display: none; }
  .hamburger-btn { display: flex; }
}
</style>
