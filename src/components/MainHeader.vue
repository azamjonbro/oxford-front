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
        <div class="lang-box">
          <button class="lang-btn">
            {{ $i18n.locale.toUpperCase() }}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll Progress Line -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isScrolled = ref(false)
const scrollProgress = ref(0)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

/* Active Link Styling */
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
