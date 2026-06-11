<template>
  <section class="about-stats-section">
    <div class="container">
      <div class="section-top">
        <h2 class="title">{{ $t('about.title') }}</h2>
        <p class="subtitle">{{ $t('about.subtitle') }}</p>
      </div>

      <div class="about-grid">
        <!-- Video/Image Left -->
        <div class="about-video-box">
          <img src="https://picsum.photos/1000/700?random=about_v3" alt="About Oxford" class="main-img">
          <div class="play-button">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>

        <!-- Content Right -->
        <div class="about-content">
          <div class="about-text-box">
            <p class="main-description">
              {{ $t('about.description') }}
            </p>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid">
            <div v-for="(stat, index) in stats" :key="index" class="stat-card">
              <div class="card-header">
                <div class="icon-box">
                  <component :is="stat.icon" />
                </div>
                <p class="label">{{ $t(stat.labelKey) }}</p>
              </div>
              <div class="card-body">
                <h3 class="value">{{ stat.value }}</h3>
                <p v-if="stat.subKey" class="sub">{{ $t(stat.subKey) }}</p>
              </div>
              <div class="brand-decor"></div>
            </div>

            <!-- New "Batafsil" Card -->
            <router-link to="/about" class="stat-card more-card">
              <div class="more-content">
                <h3>{{ $t('about.stats.more') }}</h3>
                <div class="arrow-circle">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
              <p class="more-desc">{{ $t('about.stats.more_desc') }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, ref, onMounted } from 'vue'
import { BACKEND_URL } from '../services/api'
import axios from 'axios'

const stats = ref([
  { labelKey: 'about.stats.branches', value: '13', icon: IconFilial, key: 'stats_branches' },
  { labelKey: 'about.stats.staff', value: '600+', icon: IconStaff, key: 'stats_staff' },
  { labelKey: 'about.stats.experience', value: '13 yil', subKey: 'about.stats.since', icon: IconTime, key: 'stats_experience' },
  { labelKey: "about.stats.students", value: '21,000+', icon: IconStudents, key: 'stats_students' },
  { labelKey: 'about.stats.graduates', value: '200,000+', icon: IconGrad, key: 'stats_graduates' }
])

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/settings`)
    const settingsMap = {}
    res.data.forEach(s => settingsMap[s.key] = s.value)
    
    stats.value.forEach(stat => {
      if (settingsMap[stat.key]) {
        stat.value = settingsMap[stat.key]
      }
    })
  } catch (err) {
    console.error('Failed to load settings', err)
  }
})

function IconFilial() { return h('svg', { viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M3 21h18' }),
  h('path', { d: 'M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7' }),
  h('path', { d: 'M9 8h6' }),
  h('path', { d: 'M5 21V7' }),
  h('path', { d: 'M19 21V7' }),
  h('path', { d: 'M9 21v-4a2 2 0 0 1 4 0v4' })
]) }

function IconStaff() { return h('svg', { viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
]) }

function IconTime() { return h('svg', { viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('path', { d: 'M12 6v6l4 2' })
]) }

function IconStudents() { return h('svg', { viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5' }, [
  h('path', { d: 'M22 10v6M2 10l10-5 10 5-10 5z' }),
  h('path', { d: 'M6 12v5c3 3 9 3 12 0v-5' })
]) }

function IconGrad() { return h('svg', { viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5' }, [
  h('path', { d: 'M22 10v6M2 10l10-5 10 5-10 5z' }),
  h('path', { d: 'M6 12v5c0 3 12 3 12 0v-5' }),
  h('path', { d: 'M12 22v-6' })
]) }
</script>

<style scoped>
.about-stats-section {
  padding: 120px 0;
  background: var(--color-bg-2);
}

.section-top {
  text-align: center;
  margin-bottom: 80px;
}

.section-top .title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-text-1);
  letter-spacing: -2px;
  margin-bottom: 15px;
}

.subtitle {
  color: var(--color-text-2);
  font-size: 1.2rem;
  font-weight: 500;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: flex-start;
}

.about-video-box {
  height: 650px;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.1);
  position: sticky;
  top: 120px;
}

.about-video-box .main-img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-video-box:hover .main-img {
  transform: scale(1.1);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 0 rgba(0, 82, 255, 0.4);
  animation: pulse-blue 2s infinite;
  cursor: pointer;
  z-index: 2;
}

@keyframes pulse-blue {
  0% { box-shadow: 0 0 0 0 rgba(0, 82, 255, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(0, 82, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 82, 255, 0); }
}

.about-text-box {
  margin-bottom: 40px;
}

.main-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--color-text-2);
  font-weight: 500;
  border-left: 4px solid var(--color-primary);
  padding-left: 30px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 24px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary);
  box-shadow: 0 30px 60px rgba(0, 82, 255, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.icon-box {
  width: 45px;
  height: 45px;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.stat-card:hover .icon-box {
  background: var(--color-primary);
  color: white;
  transform: rotateY(180deg);
}

.stat-card .label {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text-2);
}

.stat-card .value {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-text-1);
}

.stat-card .sub {
  font-size: 0.85rem;
  color: var(--color-text-3);
  margin-top: 5px;
  font-weight: 600;
}

.stat-card.more-card {
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.more-card .more-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.more-card h3 {
  font-size: 1.6rem;
  font-weight: 900;
  color: white;
}

.arrow-circle {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.more-card:hover .arrow-circle {
  background: white;
  color: var(--color-primary);
  transform: translateX(5px);
}

.more-desc {
  font-size: 0.85rem;
  opacity: 0.8;
  font-weight: 500;
}

.brand-decor {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  background: var(--color-primary-alpha);
  border-radius: 50%;
  opacity: 0.5;
  transition: var(--transition);
}

.stat-card:hover .brand-decor {
  transform: scale(1.5);
  background: var(--color-primary);
  opacity: 0.1;
}

@media (max-width: 1200px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-video-box { 
    position: relative;
    top: auto;
    max-width: 600px; 
    margin: 0 auto 40px; 
  }
  .about-video-box .main-img { aspect-ratio: 16/9; }
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .section-top .title { font-size: 2.5rem; }
  .main-description { font-size: 1.1rem; padding-left: 20px; }
}
</style>
