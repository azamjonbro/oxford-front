<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <span class="badge">{{ $t('about.page.hero_badge') }}</span>
        <h1 class="title">{{ $t('about.page.hero_title') }}</h1>
        <p class="subtitle">{{ $t('about.page.hero_subtitle') }}</p>
      </div>
    </section>

    <!-- Growth Stats (Then vs Now) -->
    <section class="growth-comparison">
      <div class="container">
        <div class="stats-box">
          <div class="stat-side start">
            <span class="year-label">2013</span>
            <div class="stat-content">
              <div class="stat-item">
                <h3>1 ta</h3>
                <p>{{ $t('about.page.stat_branch') }}</p>
              </div>
              <div class="stat-item">
                <h3>5 nafar</h3>
                <p>{{ $t('about.page.stat_staff') }}</p>
              </div>
              <div class="stat-item">
                <h3>0</h3>
                <p>{{ $t('about.page.stat_graduates') }}</p>
              </div>
            </div>
          </div>
          <div class="stats-arrow">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div class="stat-side present">
            <span class="year-label">2024</span>
            <div class="stat-content">
              <div class="stat-item">
                <h3>13 ta</h3>
                <p>{{ $t('about.stats.branches') }}</p>
              </div>
              <div class="stat-item">
                <h3>600+ nafar</h3>
                <p>{{ $t('about.stats.staff') }}</p>
              </div>
              <div class="stat-item">
                <h3>200,000+</h3>
                <p>{{ $t('about.stats.graduates') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section">
      <div class="container">
        <div class="section-header">
          <h2 class="title">{{ $t('about.page.timeline_title') }}</h2>
        </div>

        <div class="timeline-track">
          <div v-for="(milestone, index) in $tm('about.page.milestones')" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="milestone-year">{{ milestone.year }}</div>
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Showcase -->
    <section class="branches-gallery">
      <div class="container">
        <div class="section-header">
          <h2 class="title">{{ $t('about.page.branches_title') }}</h2>
        </div>
        <div class="branches-list">
          <div v-for="branch in branches" :key="branch._id" class="branch-entry">
            <div class="branch-meta">
              <h3>{{ getLoc(branch.name) }}</h3>
              <p>{{ getLoc(branch.address) }}</p>
              <div class="phone-chip">{{ branch.phone }}</div>
            </div>
            <div class="branch-photos">
              <div v-for="(img, idx) in branch.images" :key="idx" class="photo-item">
                <img :src="'http://localhost:5010' + img" alt="Branch">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Gallery -->
    <section class="video-gallery">
      <div class="container">
        <div class="section-header">
          <h2 class="title">{{ $t('about.page.videos_title') }}</h2>
        </div>
        <div class="videos-grid">
          <div v-for="video in videos" :key="video._id" class="video-card">
            <div class="video-wrapper">
              <iframe 
                :src="video.url" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
            <div class="video-info">
              <h3>{{ getLoc(video.title) }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const branches = ref([])
const videos = ref([])

onMounted(async () => {
  try {
    const [bRes, vRes] = await Promise.all([
      axios.get('http://localhost:5010/api/branches'),
      axios.get('http://localhost:5010/api/videos')
    ])
    branches.value = bRes.data
    videos.value = vRes.data
  } catch (err) {
    console.error('Failed to load about data', err)
  }
})

const getLoc = (obj) => {
  if (!obj) return ''
  return obj[locale.value] || obj['uz'] || ''
}
</script>

<style scoped>
.video-gallery {
  padding: 80px 0 120px;
  background: var(--color-bg-2);
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.video-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
  transition: var(--transition);
}

.video-card:hover {
  transform: translateY(-10px);
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-info {
  padding: 25px;
  text-align: center;
}

.video-info h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-1);
}

@media (max-width: 992px) {
  .videos-grid { grid-template-columns: 1fr; }
}

.about-page {
  padding-top: 100px;
}

.about-hero {
  background: white;
  padding: 100px 0;
  text-align: center;
}

.about-hero .title {
  font-size: 4rem;
  font-weight: 900;
  margin: 20px 0;
  letter-spacing: -2px;
}

.about-hero .subtitle {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.25rem;
  color: var(--color-text-2);
}

/* Growth Comparison */
.growth-comparison {
  padding: 80px 0;
  background: var(--color-bg-2);
}

.stats-box {
  background: white;
  border-radius: 30px;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 40px 80px rgba(0,0,0,0.05);
}

.stat-side {
  flex: 1;
  text-align: center;
}

.year-label {
  display: inline-block;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  padding: 8px 24px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stat-item h3 {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-text-1);
}

.stat-item p {
  color: var(--color-text-2);
  font-weight: 600;
}

.stats-arrow {
  padding: 0 50px;
  color: var(--color-primary);
  opacity: 0.3;
}

/* Timeline */
.timeline-section {
  padding: 120px 0;
}

.timeline-track {
  position: relative;
  max-width: 900px;
  margin: 60px auto 0;
  padding-left: 50px;
}

.timeline-track::before {
  content: '';
  position: absolute;
  left: 14px;
  top: 0;
  width: 2px;
  height: 100%;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  margin-bottom: 80px;
}

.timeline-dot {
  position: absolute;
  left: -44px;
  top: 10px;
  width: 15px;
  height: 15px;
  background: white;
  border: 4px solid var(--color-primary);
  border-radius: 50%;
  z-index: 2;
}

.milestone-year {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-primary-alpha);
  position: absolute;
  right: 0;
  top: -20px;
  z-index: -1;
  user-select: none;
}

.timeline-content h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 10px;
}

.timeline-content p {
  color: var(--color-text-2);
  line-height: 1.7;
}

/* Branches Gallery */
.branches-gallery {
  padding-bottom: 120px;
}

.branches-list {
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-top: 60px;
}

.branch-entry {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 60px;
  align-items: flex-start;
}

.branch-meta h3 {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 15px;
  color: var(--color-text-1);
}

.branch-meta p {
  font-size: 1.1rem;
  color: var(--color-text-2);
  margin-bottom: 25px;
  line-height: 1.6;
}

.phone-chip {
  display: inline-block;
  padding: 10px 20px;
  background: var(--color-bg-2);
  border-radius: 12px;
  font-weight: 800;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.branch-photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.photo-item {
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  transition: var(--transition);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.photo-item:hover {
  transform: translateY(-10px);
}

.photo-item:hover img {
  transform: scale(1.1);
}

@media (max-width: 992px) {
  .branch-entry { grid-template-columns: 1fr; gap: 30px; }
  .stats-box { flex-direction: column; gap: 50px; }
  .stats-arrow { transform: rotate(90deg); }
}

@media (max-width: 768px) {
  .about-hero .title { font-size: 2.5rem; }
  .stat-item h3 { font-size: 1.8rem; }
}
</style>
