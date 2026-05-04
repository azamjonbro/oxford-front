<template>
  <div class="events-page">
    <!-- Clean Hero -->
    <header class="events-hero">
      <div class="container">
        <span class="badge">{{ $t('sections.events') }}</span>
        <h1 class="title">{{ $t('sections.events_title') }}</h1>
        <p class="subtitle">{{ $t('about.page.hero_subtitle') }}</p>
      </div>
    </header>

    <!-- Events List -->
    <section class="events-list-section">
      <div class="container">
        <div class="events-filter">
          <button v-for="cat in categories" :key="cat.id" 
            :class="['filter-chip', { active: activeCategory === cat.id }]"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="events-grid">
          <div v-for="event in filteredEvents" :key="event._id" class="event-card-wide">
            <div class="event-date-box">
              <span class="day">{{ formatDate(event.date, 'D') }}</span>
              <span class="month">{{ formatDate(event.date, 'MMM') }}</span>
            </div>
            <div class="event-image">
              <img :src="event.image ? 'http://localhost:5010' + event.image : 'https://picsum.photos/600/400?random=' + event._id" alt="Event">
            </div>
            <div class="event-content">
              <div class="event-tags">
                <span class="type-tag">{{ event.type }}</span>
              </div>
              <h3>{{ getLoc(event.title) }}</h3>
              <p>{{ getLoc(event.description) }}</p>
              <div class="event-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>{{ event.time }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{{ getLoc(event.location) }}</span>
                </div>
              </div>
            </div>
            <div class="event-action">
              <button class="btn-register" @click="modalStore.openModal(getLoc(event.title))">{{ $t('buttons.enroll') }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { modalStore } from '../utils/modalStore'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const activeCategory = ref('all')
const events = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5010/api/events')
    events.value = res.data
  } catch (error) {
    console.error('Failed to load events', error)
  }
})

const categories = computed(() => {
  const cats = [
    { id: 'all', label: locale.value === 'uz' ? 'Barchasi' : (locale.value === 'en' ? 'All' : 'Все') },
    { id: 'Master-klass', label: locale.value === 'uz' ? 'Master-klass' : (locale.value === 'en' ? 'Master-class' : 'Мастер-класс') },
    { id: 'Speaking Club', label: 'Speaking Club' },
    { id: 'Imtihon', label: locale.value === 'uz' ? 'Imtihon' : (locale.value === 'en' ? 'Exam' : 'Экзамен') },
    { id: 'Sayohat', label: locale.value === 'uz' ? 'Sayohat' : (locale.value === 'en' ? 'Travel' : 'Путешествие') }
  ]
  return cats
})

const filteredEvents = computed(() => {
  if (activeCategory.value === 'all') return events.value
  return events.value.filter(e => e.type === activeCategory.value)
})

const getLoc = (obj) => {
  if (!obj) return ''
  return obj[locale.value] || obj['uz'] || ''
}

const formatDate = (dateStr, format) => {
  const date = new Date(dateStr)
  if (format === 'D') return date.getDate()
  if (format === 'MMM') return date.toLocaleString(locale.value, { month: 'short' })
  return date.toLocaleDateString()
}
</script>

<style scoped>
.events-page {
  padding-top: 100px;
  background: white;
}

.events-hero {
  padding: 80px 0;
  background: var(--color-bg-2);
  text-align: center;
}

.events-hero .title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 20px 0;
  letter-spacing: -2px;
}

.events-list-section {
  padding: 80px 0;
}

.events-filter {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.filter-chip {
  padding: 10px 24px;
  border-radius: 50px;
  background: white;
  border: 1px solid var(--color-border);
  font-weight: 700;
  font-size: 0.9rem;
  transition: var(--transition);
}

.filter-chip.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.events-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.event-card-wide {
  display: grid;
  grid-template-columns: 120px 250px 1fr 180px;
  align-items: center;
  gap: 30px;
  background: white;
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: 24px;
  transition: var(--transition);
}

.event-card-wide:hover {
  border-color: var(--color-primary);
  box-shadow: 0 20px 40px rgba(0, 82, 255, 0.05);
}

.event-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: 1px solid var(--color-border);
}

.event-date-box .day {
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1;
  color: var(--color-primary);
}

.event-date-box .month {
  font-weight: 800;
  color: #888;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-top: 5px;
}

.event-image {
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.type-tag {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 800;
}

.event-content h3 {
  font-size: 1.4rem;
  font-weight: 900;
  margin: 10px 0;
}

.event-content p {
  font-size: 0.95rem;
  color: var(--color-text-2);
  line-height: 1.5;
  margin-bottom: 15px;
}

.event-meta {
  display: flex;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
}

.btn-register {
  width: 100%;
  background: var(--color-bg-2);
  color: var(--color-text-1);
  padding: 14px;
  border-radius: 12px;
  font-weight: 800;
  transition: var(--transition);
}

.event-card-wide:hover .btn-register {
  background: var(--color-primary);
  color: white;
}

@media (max-width: 992px) {
  .event-card-wide { grid-template-columns: 100px 1fr; }
  .event-image, .event-action { display: none; }
  .event-date-box { border: none; }
}
</style>
