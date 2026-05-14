<template>
  <section class="hero">
    <!-- Navigation Buttons -->
    <button class="nav-btn prev" @click="prevSlide" v-if="displayBanners.length > 1">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
    </button>

    <button class="nav-btn next" @click="nextSlide" v-if="displayBanners.length > 1">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>
    </button>

    <div class="container">
      <transition name="fade" mode="out-in">
        <div class="hero-content" :key="currentIndex" v-if="currentBanner">
          <!-- Text Side -->
          <div class="hero-text">
            <h1 class="title">
              {{ getLocalized(currentBanner.title) }}
            </h1>
            <p class="subtitle">
              {{ getLocalized(currentBanner.subtitle) }}
            </p>
            <div class="hero-actions">
              <button class="btn-enroll" @click="modalStore.openModal(getLocalized(currentBanner.title))">
                {{ t('buttons.enroll').toUpperCase() }}
              </button>
              <a v-if="currentBanner.link" :href="currentBanner.link" class="btn-link" target="_blank">
                {{ t('buttons.more').toUpperCase() }}
              </a>
              <router-link to="/courses" class="btn-link" v-else>
                {{ t('buttons.more').toUpperCase() }}
              </router-link>
            </div>
          </div>

          <!-- Image Side -->
          <div class="hero-image">
            <div class="img-box">
              <img :src="getImageUrl(currentBanner.image)" :alt="getLocalized(currentBanner.title)" />
            </div>
          </div>
        </div>
      </transition>

      <!-- Indicators -->
      <div class="indicators" v-if="displayBanners.length > 0">
        <div 
          v-for="(banner, index) in displayBanners" 
          :key="banner._id || index"
          :class="['indicator-item', { active: index === currentIndex }]"
          @click="goToSlide(index)"
        >
          <div v-if="index === currentIndex" class="line-indicator"></div>
          <div v-else class="dot"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { modalStore } from '../utils/modalStore'

const { t, locale } = useI18n()
const banners = ref([])
const currentIndex = ref(0)
const autoPlayInterval = ref(null)
const API_BASE = 'http://localhost:5010'

const defaultBanners = [
  {
    _id: 'default1',
    title: { uz: 'Eng zo\'r dars reja.', en: 'The Best Lesson Plan.', ru: 'Лучший план уроков.' },
    subtitle: { uz: 'Bizning o\'quv markazimizda eng zamonaviy va samarali dars rejalaridan foydalaniladi.', en: 'Our learning center uses the most modern and effective lesson plans.', ru: 'В нашем учебном центре используются самые современные и эффективные планы уроков.' },
    image: 'https://picsum.photos/id/1/800/800'
  },
  {
    _id: 'default2',
    title: { uz: 'Professional Ustozlar', en: 'Professional Teachers', ru: 'Профессиональные учителя' },
    subtitle: { uz: 'Har bir talaba bilan individual ishlaydigan tajribali mutaxassislar.', en: 'Experienced specialists who work individually with each student.', ru: 'Опытные специалисты, работающие индивидуально с каждым студентом.' },
    image: 'https://picsum.photos/id/2/800/800'
  },
  {
    _id: 'default3',
    title: { uz: 'IELTS 9.0 Natijalar', en: 'IELTS 9.0 Results', ru: 'Результаты IELTS 9.0' },
    subtitle: { uz: 'O\'quvchilarimiz eng yuqori ballarni qo\'lga kiritishmoqda.', en: 'Our students are achieving the highest scores.', ru: 'Наши студенты получают самые высокие баллы.' },
    image: 'https://picsum.photos/id/3/800/800'
  }
]

const displayBanners = computed(() => {
  return banners.value.length > 0 ? banners.value : defaultBanners
})

const currentBanner = computed(() => {
  return displayBanners.value[currentIndex.value] || null
})

const getLocalized = (field) => {
  if (!field) return ''
  return field[locale.value] || field['uz'] || ''
}

const getImageUrl = (path) => {
  if (!path) return 'https://picsum.photos/id/400/400/400'
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}

const fetchBanners = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/banners`)
    if (Array.isArray(response.data) && response.data.length > 0) {
      banners.value = response.data
    }
  } catch (err) {
    console.error('Error fetching banners:', err)
  }
}

const nextSlide = () => {
  if (displayBanners.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % displayBanners.value.length
  resetAutoPlay()
}

const prevSlide = () => {
  if (displayBanners.value.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + displayBanners.value.length) % displayBanners.value.length
  resetAutoPlay()
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

const startAutoPlay = () => {
  stopAutoPlay()
  if (displayBanners.value.length > 1) {
    autoPlayInterval.value = setInterval(nextSlide, 5000)
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const resetAutoPlay = () => {
  startAutoPlay()
}

// Reset index when banners change
watch(displayBanners, () => {
  currentIndex.value = 0
  startAutoPlay()
}, { immediate: true })

onMounted(() => {
  fetchBanners()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero {
  width: 100%;
  padding: 6rem 0;
  background: white;
  min-height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: #64748b;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.nav-btn:hover {
  background: #0056ff;
  color: white;
  border-color: #0056ff;
  box-shadow: 0 8px 20px rgba(0, 86, 255, 0.2);
}

.nav-btn.prev { left: 2rem; }
.nav-btn.next { right: 2rem; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
}

.title {
  font-size: 5.5rem;
  font-weight: 900;
  color: #000;
  line-height: 1;
  margin-bottom: 2.5rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: -2px;
}

.subtitle {
  font-size: 1.2rem;
  color: #475569;
  line-height: 1.6;
  max-width: 520px;
  margin-bottom: 3.5rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.btn-enroll {
  background: #0056ff;
  color: white;
  padding: 1.25rem 3.5rem;
  border-radius: 50px;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(0, 86, 255, 0.35);
  transition: all 0.3s;
  letter-spacing: 1px;
}

.btn-enroll:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px rgba(0, 86, 255, 0.45);
}

.btn-link {
  color: #0056ff;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  letter-spacing: 1px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.btn-link:hover {
  border-bottom-color: #0056ff;
}

.img-box {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0,0,0,0.08);
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.indicators {
  margin-top: 6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.indicator-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.line-indicator {
  width: 45px;
  height: 6px;
  background: #0056ff;
  border-radius: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 50%;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 1024px) {
  .hero-content { grid-template-columns: 1fr; text-align: center; }
  .title { font-size: 3.5rem; }
  .subtitle { margin: 0 auto 3.5rem; }
  .hero-image { display: none; }
  .indicators { justify-content: center; }
  .nav-btn { display: none; }
  .hero-actions { justify-content: center; flex-direction: column; gap: 1rem; }
}
</style>
