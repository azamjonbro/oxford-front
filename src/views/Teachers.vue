<template>
  <div class="teachers-page">
    <!-- Hero Section -->
    <header class="teachers-hero">
      <div class="container">
        <span class="badge">{{ $t('nav.teachers') }}</span>
        <h1 class="title">{{ $t('sections.teachers_title') }}</h1>
        <p class="subtitle">{{ $t('teamSubtitle') }}</p>
      </div>
    </header>

    <!-- Sections by Category -->
    <section class="team-section" v-for="group in groupedTeachers" :key="group.category">
      <div class="container" v-if="group.members.length > 0">
        <div class="section-header">
          <h2 class="cat-title">{{ $t(`team_cats.${group.category}`) }}</h2>
          <div class="divider"></div>
        </div>

        <div class="teachers-grid">
          <div v-for="(teacher, index) in group.members" :key="teacher._id" 
               :class="['teacher-card', { 'head-card': index === 0 && group.category === 'teacher' && group.members.length > 1 }]">
            
            <!-- Head Card Style (First teacher in 'teacher' category) -->
            <template v-if="index === 0 && group.category === 'teacher' && group.members.length > 1">
              <div class="card-inner">
                <div class="teacher-image">
                  <img :src="teacher.photo ? 'http://localhost:5010' + teacher.photo : 'https://picsum.photos/800/800?random=' + index" :alt="getName(teacher)">
                </div>
                <div class="teacher-details">
                  <div class="badge-row">
                    <span class="badge-primary">{{ teacher.category }}</span>
                    <span v-if="teacher.ieltsScore" class="badge-outline">★ IELTS {{ teacher.ieltsScore }}</span>
                  </div>
                  <h3 class="name">{{ getName(teacher) }}</h3>
                  <p class="bio">{{ getPosition(teacher) }}</p>
                  <div class="tag-row">
                    <span v-for="tag in teacher.hashtags" :key="tag" class="hashtag">#{{ tag }}</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Standard Card Style -->
            <template v-else>
              <div class="image-box">
                <img :src="teacher.photo ? 'http://localhost:5010' + teacher.photo : 'https://picsum.photos/600/500?random=' + index" :alt="getName(teacher)">
                <span v-if="teacher.ieltsScore" class="ielts-badge">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                  IELTS {{ teacher.ieltsScore }}
                </span>
              </div>
              <div class="details">
                <h3 class="name">{{ getName(teacher) }}</h3>
                <p class="role">{{ getPosition(teacher) }}</p>
                <div class="tag-row mini">
                  <span v-for="tag in teacher.hashtags" :key="tag" class="hashtag">#{{ tag }}</span>
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const teachers = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5010/api/teachers')
    teachers.value = res.data
  } catch (error) {
    console.error('Failed to load teachers:', error)
  }
})

const getLocalized = (obj) => {
  if (!obj) return ''
  return obj[locale.value] || obj['uz'] || ''
}

const getName = (member) => getLocalized(member.name)
const getPosition = (member) => getLocalized(member.position)

const groupedTeachers = computed(() => {
  const groups = [
    { category: 'creator', members: [] },
    { category: 'manager', members: [] },
    { category: 'head_of_edu', members: [] },
    { category: 'branch_head', members: [] },
    { category: 'teacher', members: [] }
  ]

  teachers.value.forEach(t => {
    const group = groups.find(g => g.category === (t.category || 'teacher'))
    if (group) group.members.push(t)
  })

  return groups.filter(g => g.members.length > 0)
})
</script>

<style scoped>
.teachers-page {
  padding-top: 80px;
  background: white;
}

.teachers-hero {
  padding: 100px 0;
  text-align: center;
  background: #f8faff;
}

.badge {
  background: rgba(0, 86, 255, 0.1);
  color: #0056ff;
  padding: 8px 18px;
  border-radius: 50px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 25px;
  display: inline-block;
}

.title {
  font-size: 4rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -2px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
}

.team-section {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.cat-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 15px;
}

.divider {
  width: 60px;
  height: 4px;
  background: #0056ff;
  margin: 0 auto;
  border-radius: 10px;
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* Head Card (Full page version) */
.head-card {
  grid-column: span 2;
  border: 2px solid #0056ff;
  border-radius: 24px;
  overflow: hidden;
}

.head-card .card-inner { display: flex; height: 100%; }
.head-card .teacher-image { width: 45%; }
.head-card .teacher-image img { width: 100%; height: 100%; object-fit: cover; }
.head-card .teacher-details { padding: 40px; flex: 1; display: flex; flex-direction: column; justify-content: center; }

.badge-row { display: flex; gap: 12px; margin-bottom: 20px; }
.badge-primary { background: #0056ff; color: white; padding: 6px 14px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; }
.badge-outline { border: 1px dashed #0056ff; color: #0056ff; padding: 6px 14px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; }

.teacher-card .name { font-size: 1.8rem; font-weight: 900; color: #0f172a; margin-bottom: 12px; }
.teacher-card .bio { color: #64748b; font-size: 1.1rem; margin-bottom: 25px; }

/* Standard Cards */
.teacher-card { background: white; border-radius: 24px; overflow: hidden; border: 1px solid #f1f5f9; transition: all 0.3s; }
.teacher-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.08); }

.image-box { position: relative; height: 320px; }
.image-box img { width: 100%; height: 100%; object-fit: cover; }

.ielts-badge {
  position: absolute; top: 20px; right: 20px; background: white; padding: 6px 12px; border-radius: 6px;
  font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.details { padding: 30px; }
.details .role { color: #0056ff; font-weight: 700; font-size: 0.95rem; margin-bottom: 15px; }

.tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
.hashtag { background: rgba(0, 86, 255, 0.08); color: #0056ff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
.tag-row.mini { margin-top: 15px; }

@media (max-width: 1024px) {
  .teachers-grid { grid-template-columns: repeat(2, 1fr); }
  .head-card { grid-column: span 2; }
}

@media (max-width: 768px) {
  .title { font-size: 2.5rem; }
  .cat-title { font-size: 2rem; }
  .teachers-grid { grid-template-columns: 1fr; }
  .head-card { grid-column: span 1; }
  .head-card .card-inner { flex-direction: column; }
  .head-card .teacher-image { width: 100%; height: 350px; }
}
</style>
