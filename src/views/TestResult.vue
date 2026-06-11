<template>
  <div class="result-container container">
    <div class="result-card" v-if="result">
      <!-- Checked Mark Illustration -->
      <div class="success-icon-wrap">
        <div class="success-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>

      <h1 class="result-title">Exam Completed!</h1>
      <p class="result-subtitle">Great job! Here are the official results of your Oxford Placement Test.</p>

      <!-- Results Grid -->
      <div class="results-grid">
        <!-- Radial Score Circle -->
        <div class="score-radial-card">
          <div class="radial-progress-wrapper">
            <svg class="radial-svg" viewBox="0 0 100 100">
              <circle class="radial-bg" cx="50" cy="50" r="40" />
              <circle 
                class="radial-fill" 
                cx="50" 
                cy="50" 
                r="40" 
                :style="{ strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset }"
              />
            </svg>
            <div class="radial-text">
              <span class="percentage">{{ result.score }}%</span>
              <span class="label">Overall Score</span>
            </div>
          </div>
          <div class="score-ratio">
            Achieved: <strong>{{ result.score }}</strong> / 100 points
          </div>
        </div>

        <!-- Level Badge Card -->
        <div class="level-badge-card">
          <span class="estimated-label">Recommended Level</span>
          <h2 class="level-title">{{ result.level }}</h2>
          <div class="cefr-badge" :class="getLevelClass(result.level)">
            {{ getCEFR(result.level) }} Standard
          </div>
          <hr class="card-divider" />
          <p class="recommendation-text">
            {{ result.recommendation }}
          </p>
        </div>
      </div>

      <!-- Section Scores Breakdown Card -->
      <div class="breakdown-card">
        <h3>Placement Section Scores</h3>
        <div class="breakdown-grid">
          <div class="breakdown-col">
            <div class="breakdown-row">
              <span class="sec-lbl">Grammar & Structure</span>
              <span class="sec-val"><strong>{{ result.grammarScore }}</strong> / 20</span>
            </div>
            <div class="breakdown-row">
              <span class="sec-lbl">Vocabulary & Lexicon</span>
              <span class="sec-val"><strong>{{ result.vocabularyScore }}</strong> / 20</span>
            </div>
            <div class="breakdown-row">
              <span class="sec-lbl">Correct the Mistake</span>
              <span class="sec-val"><strong>{{ result.mistakeScore }}</strong> / 10</span>
            </div>
            <div class="breakdown-row">
              <span class="sec-lbl">Make a Sentence</span>
              <span class="sec-val"><strong>{{ result.sentenceScore }}</strong> / 10</span>
            </div>
          </div>
          <div class="breakdown-col">
            <div class="breakdown-row">
              <span class="sec-lbl">Reading Comprehension</span>
              <span class="sec-val"><strong>{{ result.readingScore }}</strong> / 10</span>
            </div>
            <div class="breakdown-row">
              <span class="sec-lbl">Listening Comprehension</span>
              <span class="sec-val"><strong>{{ result.listeningScore }}</strong> / 10</span>
            </div>
            <div class="breakdown-row">
              <span class="sec-lbl">Writing Tasks</span>
              <span class="sec-val"><strong>{{ result.writingScore }}</strong> / 10</span>
            </div>
            <div class="breakdown-row">
              <span class="sec-lbl">Essay Tasks</span>
              <span class="sec-val"><strong>{{ result.essayScore }}</strong> / 10</span>
            </div>
          </div>
        </div>
        <div class="breakdown-footer">
          <span>* Written submissions are graded by an automated word-count heuristic initially. Our academic team will review them and finalize your recommendation shortly.</span>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="action-footer">
        <h3>What's Next?</h3>
        <p>Ready to start your journey? Secure your seat in our next cohort matching your level.</p>
        <div class="footer-buttons">
          <router-link to="/contact" class="btn-enroll-action">Book a Free Consultation</router-link>
          <a href="#" @click.prevent="alert('Enrolled successfully! Our coordinators will contact you soon.')" class="btn-enroll-now">Enroll Now</a>
        </div>
      </div>
    </div>

    <!-- Fallback if result cache is missing -->
    <div class="error-fallback-card" v-else>
      <h3>No Result Found</h3>
      <p>Please register and complete the placement test first.</p>
      <router-link to="/test" class="btn-enroll-action">Go to Registration</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const result = ref(null)

onMounted(() => {
  const cached = localStorage.getItem('placement_result_cache')
  if (cached) {
    result.value = JSON.parse(cached)
  }
})

// Radial progress calculation: circumference = 2 * PI * r = 2 * 3.1415 * 40 = 251.3
const strokeDasharray = '251.3'
const strokeDashoffset = computed(() => {
  if (!result.value) return '251.3'
  const pct = result.value.score / 100
  return (251.3 * (1 - pct)).toString()
})

const getCEFR = (level) => {
  const mapping = {
    'Beginner': 'CEFR A1',
    'Elementary': 'CEFR A2',
    'Pre-Intermediate': 'CEFR B1',
    'Intermediate': 'CEFR B2',
    'Upper-Intermediate': 'CEFR C1',
    'IELTS Foundation': 'IELTS Foundation'
  }
  return mapping[level] || 'CEFR Standard'
}

const getLevelClass = (level) => {
  return (level || '').toLowerCase().replace(' ', '-')
}
</script>

<style scoped>
.result-container {
  padding-top: 3rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
}

.result-card {
  background: white;
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  padding: 4rem 3rem;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.success-icon-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.success-circle {
  width: 90px;
  height: 90px;
  background: #d1fae5;
  color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.15);
  animation: scale-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes scale-up {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.result-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.result-subtitle {
  color: #64748b;
  font-size: 1.05rem;
  margin-bottom: 3rem;
}

/* Grid layout */
.results-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2.5rem;
  margin-bottom: 3.5rem;
}

/* Score radial circle card */
.score-radial-card {
  background: #f8fafc;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.radial-progress-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 1.5rem;
}

.radial-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.radial-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 8;
}

.radial-fill {
  fill: none;
  stroke: #6366f1;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-out;
}

.radial-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.radial-text .percentage {
  font-size: 2.2rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}

.radial-text .label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.score-ratio {
  font-size: 0.95rem;
  color: #475569;
}

/* Level badge card info */
.level-badge-card {
  background: white;
  border: 1.5px solid #cbd5e1;
  border-radius: 20px;
  padding: 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.estimated-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 1px;
}

.level-title {
  font-size: 2rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.cefr-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  background: #f1f5f9;
  color: #334155;
  margin-bottom: 1.5rem;
}

/* Color codes for badges */
.cefr-badge.beginner { background: #fee2e2; color: #ef4444; }
.cefr-badge.elementary { background: #ffedd5; color: #f97316; }
.cefr-badge.pre-intermediate { background: #fef9c3; color: #ca8a04; }
.cefr-badge.intermediate { background: #e0f2fe; color: #0284c7; }
.cefr-badge.upper-intermediate { background: #e0e7ff; color: #4f46e5; }
.cefr-badge.ielts-ready { background: #d1fae5; color: #059669; }

.card-divider {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin-bottom: 1.25rem;
}

.recommendation-text {
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
}

/* Call to action footer options */
.action-footer {
  border-top: 1.5px solid #cbd5e1;
  padding-top: 3rem;
  margin-top: 1rem;
}

.action-footer h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.action-footer p {
  color: #64748b;
  margin-bottom: 1.75rem;
}

.footer-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-enroll-action {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
  transition: background-color 0.2s;
}

.btn-enroll-action:hover {
  background: #4f46e5;
}

.btn-courses-browse {
  border: 1.5px solid #cbd5e1;
  color: #475569;
  padding: 0.85rem 2rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn-courses-browse:hover {
  background: #f8fafc;
}

.error-fallback-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  border: 1.5px solid #cbd5e1;
  text-align: center;
  max-width: 450px;
}

.error-fallback-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.error-fallback-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
  .result-card {
    padding: 2.5rem 1.5rem;
  }
}

.breakdown-card {
  background: white;
  border: 1.5px solid #cbd5e1;
  border-radius: 20px;
  padding: 2.5rem;
  margin-top: 2.5rem;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}
.breakdown-card h3 {
  font-size: 1.35rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.75rem;
}
.breakdown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}
.breakdown-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  border-bottom: 1px dashed #e2e8f0;
  padding-bottom: 0.5rem;
}
.sec-lbl {
  color: #475569;
  font-weight: 600;
}
.sec-val {
  color: #0f172a;
}
.breakdown-footer {
  margin-top: 2rem;
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.6;
}
.btn-enroll-now {
  background: #0f172a;
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
  transition: background-color 0.2s;
  text-decoration: none;
  display: inline-block;
}
.btn-enroll-now:hover {
  background: #1e293b;
}

@media (max-width: 600px) {
  .breakdown-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
