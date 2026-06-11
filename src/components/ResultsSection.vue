<template>
  <section class="results-section">
    <div class="container-fluid">
      <div class="section-header">
        <div class="header-text container">
          <span class="badge">{{ $t('sections.results') }}</span>
          <h2 class="title">{{ $t('results.desc') }}</h2>
        </div>
      </div>

      <!-- Infinite Scrolling Ticker -->
      <div class="carousel-wrapper" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
        <div class="results-track" :class="{ 'paused': isPaused }">
          <!-- Render twice for seamless loop -->
          <div v-for="n in 2" :key="n" class="track-group">
            <div v-for="(result, index) in results" :key="index" class="result-card">
              <div 
                class="cert-image" 
                @mousemove="handleMagnify($event, `${n}-${index}`)"
                @mouseleave="resetMagnify(`${n}-${index}`)"
              >
                <img :src="getImageUrl(result.image)" alt="IELTS Certificate">
                
                <!-- Magnifying Glass -->
                <div 
                  class="magnifier" 
                  v-show="magnifiers[`${n}-${index}`]?.active"
                  :style="{
                    left: magnifiers[`${n}-${index}`]?.x + 'px',
                    top: magnifiers[`${n}-${index}`]?.y + 'px',
                    backgroundImage: `url(${getImageUrl(result.image)})`,
                    backgroundPosition: magnifiers[`${n}-${index}`]?.bgPos
                  }"
                ></div>

                <div class="overlay">
                  <span class="score">{{ result.score }}</span>
                </div>
              </div>
              <div class="student-info">
                <h4>{{ result.name }}</h4>
                <p>{{ result.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { BACKEND_URL } from '../services/api'
import axios from 'axios'

const isPaused = ref(false)
const results = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/results`)
    results.value = res.data
  } catch (error) {
    console.error('Failed to load results', error)
  }
})

const getImageUrl = (img) => {
  if (!img) return 'https://picsum.photos/400/550?random=res'
  if (img.startsWith('http')) return img
  return BACKEND_URL + img
}

// Magnifier logic with dynamic keys for duplicated items
const magnifiers = reactive({})

const handleMagnify = (e, key) => {
  if (!magnifiers[key]) {
    magnifiers[key] = { active: false, x: 0, y: 0, bgPos: '0% 0%' }
  }
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  magnifiers[key].active = true
  magnifiers[key].x = x - 60
  magnifiers[key].y = y - 60
  magnifiers[key].bgPos = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`
}

const resetMagnify = (key) => {
  if (magnifiers[key]) magnifiers[key].active = false
}
</script>

<style scoped>
.results-section {
  padding: 100px 0;
  background: #fff;
  overflow: hidden;
}

.section-header {
  margin-bottom: 60px;
}

.carousel-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.results-track {
  display: flex;
  width: max-content;
  animation: scroll 40s linear infinite;
}

.results-track.paused {
  animation-play-state: paused;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.track-group {
  display: flex;
  gap: 30px;
  padding-right: 30px; /* Match gap */
}

.result-card {
  width: 300px;
  flex-shrink: 0;
}

.cert-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4.2;
  margin-bottom: 15px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.06);
  cursor: crosshair;
}

.cert-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.magnifier {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: 750px 1050px;
  z-index: 10;
  background-color: white;
}

.overlay {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--color-primary);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(0, 82, 255, 0.3);
  z-index: 2;
}

.student-info h4 {
  font-size: 1.1rem;
  font-weight: 850;
  margin-bottom: 4px;
}

.student-info p {
  color: #888;
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .result-card { width: 240px; }
  .magnifier { display: none !important; }
}
</style>
