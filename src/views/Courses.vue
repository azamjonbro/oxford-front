<template>
  <div class="courses-page">
    <!-- Hero Section -->
    <header class="courses-hero">
      <div class="container">
        <span class="badge">{{ $t('filters.all') }}</span>
        <h1 class="title">{{ $t('sections.courses') }}</h1>
        <p class="subtitle">{{ $t('teamSubtitle') }}</p>
      </div>
    </header>

    <!-- Filters -->
    <section class="filters-section">
      <div class="container">
        <div class="filter-tabs">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            :class="['filter-btn', { active: activeCategory === cat.id }]"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Courses Grid -->
    <section class="courses-grid-section">
      <div class="container">
        <div class="courses-grid">
          <TransitionGroup name="fade-grid">
            <div 
              v-for="course in filteredCourses" 
              :key="course._id" 
              class="course-card"
            >
              <div class="course-icon" v-if="course.image">
                <img :src="BACKEND_URL + course.image" alt="course" style="width:100%;height:100%;object-fit:cover;border-radius:12px;"/>
              </div>
              <div class="course-icon" v-else>
                <component :is="IconMath" />
              </div>
              <div class="course-content">
                <span class="category-tag">{{ course.category }}</span>
                <h3>{{ getLoc(course.title) }}</h3>
                <p>{{ getLoc(course.description) }}</p>
                
                <div class="course-meta">
                  <div class="meta-item">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <span>{{ getLoc(course.duration) }}</span>
                  </div>
                  <div class="meta-item" v-if="course.time">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <span>{{ course.time }}</span>
                  </div>
                  <div class="meta-item" v-if="course.seats">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>{{ course.seats }} ta joy</span>
                  </div>
                </div>

                <button class="btn-enroll" @click="modalStore.openModal(getLoc(course.title))">{{ $t('buttons.enroll') }}</button>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import { modalStore } from '../utils/modalStore'
import axios from 'axios'
import { BACKEND_URL } from '../services/api'
import { useI18n } from 'vue-i18n'
import { currentLocale, getLoc as getLocHelper } from '../utils/localeStore'

const { t, locale } = useI18n({ useScope: 'global' })
const activeCategory = ref('all')
const courses = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/courses`)
    courses.value = res.data
  } catch (error) {
    console.error('Failed to load courses', error)
  }
})

const categories = computed(() => [
  { id: 'all', label: t('filters.all') },
  { id: 'exact', label: t('filters.exact') },
  { id: 'natural', label: t('filters.natural') },
  { id: 'langs', label: t('filters.langs') },
  { id: 'humanities', label: t('filters.humanities') },
  { id: 'new_groups', label: t('filters.new_groups') }
])

// Icons
const IconMath = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M9 18l6-6-6-6' }),
  h('path', { d: 'M5 12h14' })
])

const getLoc = (obj) => getLocHelper(obj, currentLocale)

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') return courses.value
  return courses.value.filter(c => c.category === activeCategory.value)
})
</script>

<style scoped>
.courses-page {
  padding-top: 100px; /* Header space */
  min-height: 100vh;
}

.courses-hero {
  background: var(--color-bg-2);
  padding: 80px 0;
  text-align: center;
}

.courses-hero .title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 20px 0;
  letter-spacing: -2px;
}

.filters-section {
  padding: 40px 0;
  position: sticky;
  top: 80px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  z-index: 100;
  border-bottom: 1px solid var(--color-border);
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 24px;
  border-radius: 50px;
  background: white;
  border: 1px solid var(--color-border);
  font-weight: 700;
  transition: var(--transition);
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.courses-grid-section {
  padding: 80px 0;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.course-card {
  background: white;
  border-radius: 24px;
  padding: 35px;
  border: 1px solid var(--color-border);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary);
  box-shadow: 0 30px 60px rgba(0, 82, 255, 0.08);
}

.course-icon {
  width: 60px;
  height: 60px;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

.course-icon svg { width: 30px; height: 30px; }

.category-tag {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  display: block;
}

.course-card h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 15px;
}

.course-card p {
  color: var(--color-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  flex-grow: 1;
}

.course-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.btn-enroll {
  background: var(--color-bg-2);
  color: var(--color-text-1);
  padding: 14px;
  border-radius: 12px;
  font-weight: 800;
  transition: var(--transition);
}

.course-card:hover .btn-enroll {
  background: var(--color-primary);
  color: white;
}

/* Transitions */
.fade-grid-enter-active,
.fade-grid-leave-active {
  transition: all 0.5s ease;
}
.fade-grid-enter-from,
.fade-grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 1100px) {
  .courses-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .courses-grid { grid-template-columns: 1fr; }
  .courses-hero .title { font-size: 2.5rem; }
}
</style>
