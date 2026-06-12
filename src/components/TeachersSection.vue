<template>
  <section class="teachers-section">
    <div class="container">
      <div class="section-header">
        <span class="sub-badge">{{ $t('nav.teachers') }}</span>
        <h2 class="section-title">{{ $t('sections.teachers_title') }}</h2>
        <p class="section-desc">
          {{ $t('teamSubtitle') }}
        </p>
      </div>

      <div class="teachers-grid">
        <!-- Main Head Teacher Card (Spans 2 columns) -->
        <div v-if="teachers[0]" class="teacher-card head-card">
          <div class="card-inner">
            <div class="teacher-image">
              <img :src="teachers[0].photo ? BACKEND_URL + teachers[0].photo : 'https://picsum.photos/800/800?random=1'" :alt="getLoc(teachers[0].name)">
            </div>
            <div class="teacher-details">
              <div class="badge-row">
                <span class="badge-primary">{{ teachers[0].category }}</span>
                <span v-if="teachers[0].ieltsScore" class="badge-outline">★ IELTS {{ teachers[0].ieltsScore }}</span>
              </div>
              <h3 class="name">{{ getLoc(teachers[0].name) }}</h3>
              <p class="bio">
                {{ getLoc(teachers[0].position) }}
              </p>
              <div class="tag-row">
                <span v-for="tag in teachers[0].hashtags" :key="tag" class="hashtag">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Standard Teacher Cards -->
        <template v-for="(teacher, index) in teachers.slice(1, 4)" :key="teacher._id">
          <div class="teacher-card standard">
            <div class="image-box">
              <img :src="teacher.photo ? BACKEND_URL + teacher.photo : 'https://picsum.photos/600/500?random=' + index" :alt="getLoc(teacher.name)">
              <span v-if="teacher.ieltsScore" class="ielts-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                IELTS {{ teacher.ieltsScore }}
              </span>
            </div>
            <div class="details">
              <h3 class="name">{{ getLoc(teacher.name) }}</h3>
              <p class="role">{{ getLoc(teacher.position) }}</p>
              <div class="tag-row mini">
                <span v-for="tag in teacher.hashtags" :key="tag" class="hashtag">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Join Team Card -->
        <router-link to="/teachers" class="join-team-card">
          <div class="icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
          </div>
          <h3>{{ $t('about.stats.more') }}</h3>
          <p>{{ $t('about.stats.more_desc') }}</p>
          <button class="btn-apply">
            {{ $t('buttons.more') }}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BACKEND_URL } from '../services/api'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { currentLocale, getLoc as getLocHelper } from '../utils/localeStore'

const { locale } = useI18n({ useScope: 'global' })
const teachers = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/teachers`)
    teachers.value = res.data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    
    // SEO: Update Meta Keywords
    const allTags = teachers.value.flatMap(t => t.hashtags || [])
    if (allTags.length) {
      let meta = document.querySelector('meta[name="keywords"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = "keywords"
        document.head.appendChild(meta)
      }
      meta.content = allTags.join(', ')
    }
  } catch (error) {
    console.error('Failed to load teachers', error)
  }
})

const getLoc = (obj) => getLocHelper(obj, currentLocale)
</script>

<style scoped>
.teachers-section {
  padding: 120px 0;
  background: #fff;
}

.section-header {
  margin-bottom: 80px;
  max-width: 700px;
}

.sub-badge {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 800;
  display: inline-block;
  margin-bottom: 24px;
}

.section-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  color: #0d1b3e;
  margin-bottom: 24px;
  letter-spacing: -2px;
}

.section-desc {
  font-size: 1.15rem;
  color: #666;
  line-height: 1.7;
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.head-card {
  grid-column: span 2;
  border: 2px solid var(--color-primary);
  border-radius: 24px;
  overflow: hidden;
}

.head-card .card-inner {
  display: flex;
  height: 100%;
}

.head-card .teacher-image {
  width: 45%;
}

.head-card .teacher-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.head-card .teacher-details {
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.badge-primary {
  background: var(--color-primary);
  color: white;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
}

.badge-outline {
  border: 1px dashed var(--color-primary);
  color: var(--color-primary);
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
}

.teacher-details .name {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 15px;
  color: #0d1b3e;
}

.teacher-details .bio {
  color: #555;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.teacher-card.standard {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: var(--transition);
}

.teacher-card.standard:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.08);
}

.image-box {
  position: relative;
  height: 280px;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ielts-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  color: #0d1b3e;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.details {
  padding: 30px;
}

.details .name {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: #0d1b3e;
}

.details .role {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 10px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hashtag {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.tag-row.mini {
  margin-top: 15px;
  gap: 6px;
}

.join-team-card {
  background: var(--color-primary);
  color: white;
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  text-decoration: none;
}

.join-team-card .icon {
  margin-bottom: 25px;
}

.join-team-card h3 {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.2;
}

.join-team-card p {
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 35px;
}

.btn-apply {
  background: white;
  color: var(--color-primary);
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 180px;
  transition: var(--transition);
  border: none;
  cursor: pointer;
}

.btn-apply:hover {
  transform: scale(1.05);
}

@media (max-width: 992px) {
  .teachers-grid { grid-template-columns: repeat(2, 1fr); }
  .head-card { grid-column: span 2; }
}

@media (max-width: 768px) {
  .teachers-section { padding: 60px 0; }
  .section-title { font-size: 2.5rem; }
  .teachers-grid { grid-template-columns: 1fr; }
  .head-card { grid-column: span 1; }
  .head-card .card-inner { flex-direction: column; }
  .head-card .teacher-image { width: 100%; height: 350px; }
  .head-card .teacher-details { padding: 30px; }
}
</style>
