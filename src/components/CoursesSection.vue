<template>
  <section class="courses-section">
    <div class="container">
      <div class="section-header">
        <div class="header-content">
          <span class="modern-badge">POPULYAR KURSLAR</span>
          <h2 class="title">{{ t('courses.title') }}</h2>
        </div>
        <router-link to="/courses" class="btn-all">
          {{ t('courses.view_all') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </router-link>
      </div>

      <div class="courses-grid">
        <div v-for="course in courses.slice(0,3)" :key="course._id" class="course-card-modern">
          <div class="course-image">
            <img :src="course.image || 'https://images.unsplash.com/photo-1546410531-bb4caa1b424d?q=80&w=2071&auto=format&fit=crop'" :alt="course.name?.[locale]" />
            <div class="course-tag">{{ course.duration }}</div>
          </div>
          <div class="course-info">
            <div class="course-category">INGLIZ TILI</div>
            <h3>{{ course.name?.[locale] || course.name?.uz }}</h3>
            <p>{{ course.description?.[locale] || course.description?.uz }}</p>
            <div class="course-hashtags">
              <span v-for="tag in course.hashtags" :key="tag" class="hashtag">#{{ tag }}</span>
            </div>
            <div class="course-footer">
              <span class="price-tag">{{ course.price }}</span>
              <button class="btn-enroll">{{ t('courses.enroll') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const store = useStore()
const courses = computed(() => store.state.courses || [])
onMounted(() => {
  store.dispatch('fetch', 'courses').then(() => {
    // SEO: Update Meta Keywords
    const allTags = courses.value.flatMap(c => c.hashtags || [])
    if (allTags.length) {
      let meta = document.querySelector('meta[name="keywords"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = "keywords"
        document.head.appendChild(meta)
      }
      // Combine with existing keywords if any
      const existing = meta.content ? meta.content.split(', ') : []
      const uniqueTags = [...new Set([...existing, ...allTags])]
      meta.content = uniqueTags.join(', ')
    }
  })
})
</script>

<style scoped>
.courses-section {
  padding: 10rem 0;
  background: #f8fafc;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5rem;
}

.modern-badge {
  display: inline-block;
  background: #eff6ff;
  color: #2563eb;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 3rem;
  font-weight: 900;
  color: #0f172a;
}

.btn-all {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.75rem;
  background: white;
  color: #2563eb;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  transition: all 0.3s;
}

.btn-all:hover {
  background: #2563eb;
  color: white;
  transform: translateX(5px);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.course-card-modern {
  background: white;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f1f5f9;
}

.course-card-modern:hover {
  transform: translateY(-15px);
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1);
  border-color: #dbeafe;
}

.course-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s;
}

.course-card-modern:hover .course-image img {
  transform: scale(1.1);
}

.course-tag {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
}

.course-info {
  padding: 2.5rem;
}

.course-category {
  font-size: 0.75rem;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
}

.course-info h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.course-info p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.price-tag {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-enroll {
  padding: 0.75rem 1.5rem;
  background: #f1f5f9;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s;
}

.course-card-modern:hover .btn-enroll {
  background: #2563eb;
  color: white;
}

.course-hashtags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.hashtag {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

@media (max-width: 1024px) {
  .courses-grid { grid-template-columns: 1fr; }
  .title { font-size: 2.25rem; }
  .section-header { flex-direction: column; align-items: flex-start; gap: 2rem; }
  .btn-all { width: 100%; justify-content: center; }
}
</style>
