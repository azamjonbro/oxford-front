<template>
  <div class="results-page">
    <!-- Hero Header -->
    <header class="results-header">
      <div class="hero-overlay">
        <span class="sub-title">{{ $t('nav.result') }}</span>
        <h1 class="main-title" v-html="$t('results_page.title')"></h1>
        <p class="description">
          {{ $t('results_page.desc') }}
        </p>
      </div>
    </header>

    <!-- Results Grid -->
    <section class="results-grid-section">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ $t('results_page.loading') }}</p>
        </div>

        <div v-else-if="results.length === 0" class="empty-state">
          <p>{{ $t('results_page.empty') }}</p>
        </div>

        <div v-else class="results-grid">
          <div v-for="result in results" :key="result._id" class="result-card glass-card">
            <div class="cert-image-box" @click="openImage(result.image)" @mouseenter="onImageEnter" @mouseleave="onImageLeave">
              <img :src="getImageUrl(result.image)" :alt="result.name" />
              <div class="hover-overlay">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                  <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87-2.3 2.3h6z"/>
                </svg>
              </div>
              <div class="score-badge">{{ result.score }}</div>
            </div>
            <div class="student-info">
              <h3>{{ result.name }}</h3>
              <p class="date">{{ result.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Modal (LightBox) -->
    <div v-if="selectedImage" class="lightbox" @click="selectedImage = null">
      <div class="lightbox-content">
        <img :src="getImageUrl(selectedImage)" alt="Large View" />
        <button class="close-btn">&times;</button>
      </div>
    </div>
  </div>
</template>

<!-- Premium UI Enhancements -->
<style>
:root {
  --primary-color: hsl(220, 90%, 56%);
  --bg-color: #ffffff;
  --card-bg: #ffffff;
  --card-bg-dark: #ffffff;
  --text-primary: #0d1b3e;
  --text-secondary: #64748b;
  --border-color: #eef2f8;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #ffffff;
    --card-bg: #ffffff;
    --text-primary: #0d1b3e;
    --text-secondary: #64748b;
    --border-color: #eef2f8;
  }
}

.results-page {
  background: #ffffff;
  min-height: 100vh;
  padding-top: 80px;
  font-family: 'Inter', sans-serif;
}

.results-header {
  background: #ffffff;
  padding: 100px 0 60px;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.sub-title {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(0, 86, 255, 0.1);
  color: var(--primary-color);
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 24px;
  letter-spacing: -1px;
}

.description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 80px 0;
}

.result-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 86, 255, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.result-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 86, 255, 0.08);
  border-color: rgba(0, 86, 255, 0.15);
}

.result-card {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.cert-image-box {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  cursor: pointer;
}

.cert-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.result-card:hover .cert-image-box img {
  transform: scale(1.05);
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 86, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cert-image-box:hover .hover-overlay {
  opacity: 1;
}

.score-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-color);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: 0 5px 15px rgba(0, 86, 255, 0.3);
}

.student-info {
  padding: 20px;
  text-align: center;
}

.student-info h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.student-info .date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 90vh;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: -40px;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 60px;
  color: var(--text-secondary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .main-title { font-size: 2.5rem; }
  .results-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
  .close-btn { top: -50px; right: 0; }
}


</style>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { BACKEND_URL } from '../services/api'

const results = ref([])
const loading = ref(true)
const selectedImage = ref(null)

function onImageEnter() {
  document.body.classList.add('hide-mouse-circle')
}

function onImageLeave() {
  document.body.classList.remove('hide-mouse-circle')
}

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/results`)
    results.value = res.data
  } catch (error) {
    console.error('Failed to fetch results:', error)
  } finally {
    loading.value = false
  }
})

const getImageUrl = (img) => {
  if (!img) return 'https://picsum.photos/600/800?random=res'
  if (img.startsWith('http')) return img
  return BACKEND_URL + img
}

const openImage = (img) => {
  selectedImage.value = img
}
</script>
