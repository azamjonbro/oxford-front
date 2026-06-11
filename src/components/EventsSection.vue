<template>
  <section class="events-section">
    <div class="container">
      <div class="section-header">
        <span class="badge">{{ $t('nav.events') }}</span>
        <h2 class="title">{{ $t('sections.events') }}</h2>
        <br>
      </div>

      <div class="events-list">
        <div v-for="event in events" :key="event._id" class="event-row" @click="modalStore.openModal(getLoc(event.title))">
          <div class="event-date">
            <span class="day">{{ formatDate(event.date, 'D') }}</span>
            <span class="month">{{ formatDate(event.date, 'MMM') }}</span>
          </div>
          <div class="event-info">
            <h3>{{ getLoc(event.title) }}</h3>
            <div class="meta">
              <div class="item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{{ getLoc(event.location) }}</span>
              </div>
              <div class="item" v-if="event.time">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>{{ event.time }}</span>
              </div>
            </div>
          </div>
          <div class="btn-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BACKEND_URL } from '../services/api'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { modalStore } from '../utils/modalStore'

const { locale } = useI18n()
const events = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/events`)
    events.value = res.data.slice(0, 3)
  } catch (error) {
    console.error('Failed to load events', error)
  }
})

const getLoc = (obj) => {
  if (!obj) return ''
  return obj[locale.value] || obj['uz'] || ''
}

const formatDate = (dateStr, format) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  if (format === 'D') return date.getDate()
  if (format === 'MMM') {
    const monthNames = {
      uz: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    }
    const currentLoc = locale.value || 'uz'
    return monthNames[currentLoc][date.getMonth()]
  }
  return date.toLocaleDateString()
}
</script>

<style scoped>
.events-section {
  padding: 100px 0;
  background: #fff;
}

.section-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
}

.badge {
  color: var(--color-primary);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.85rem;
  margin-bottom: 10px;
  display: block;
}

.title {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -1px;
}

.view-all {
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 5px;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.event-row {
  display: flex;
  align-items: center;
  padding: 30px;
  background: var(--color-bg-2);
  border-radius: 24px;
  gap: 40px;
  transition: var(--transition);
  cursor: pointer;
}

.event-row:hover {
  transform: scale(1.01);
  background: var(--color-primary-alpha);
}

.event-date {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: var(--transition);
}

.event-row:hover .event-date {
  background: var(--color-primary);
  color: white;
}

.event-date .day {
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
}

.event-date .month {
  font-size: 0.75rem;
  font-weight: 800;
  opacity: 0.7;
}

.event-info {
  flex: 1;
}

.event-info h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.3;
}

.meta {
  display: flex;
  gap: 25px;
}

.meta .item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-2);
}

.meta .item svg {
  color: var(--color-primary);
}

.btn-icon {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: var(--transition);
}

.event-row:hover .btn-icon {
  background: var(--color-primary);
  color: white;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .event-row { flex-direction: column; align-items: flex-start; text-align: left; gap: 20px; }
  .event-date { width: 60px; height: 60px; }
  .meta { flex-direction: column; gap: 10px; }
}
</style>
