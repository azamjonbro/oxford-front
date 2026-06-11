<template>
  <div class="test-landing container">
    <!-- Hero Banner -->
    <div class="hero-card">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="badge-premium">Official English Assessment</span>
        <h1 class="landing-title">Oxford English Placement Test</h1>
        <p class="landing-desc">
          Take our assessment test and discover your English level in just 45 minutes.
        </p>
        <div class="test-stats">
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Instant Level Recommendation</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Grammar & Vocabulary Assessment</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span>Reading & Listening Evaluation</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            <span>Writing Skills Check</span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <span>Professional Teacher Review</span>
          </div>
        </div>
        <div class="cta-actions">
          <button @click="scrollToForm" class="btn-start">Start Placement Test</button>
          <button @click="showResumeModal = true" class="btn-resume-trigger">Resume Unfinished Test</button>
        </div>
      </div>
    </div>

    <!-- Explanation & Features Grid -->
    <div class="features-grid">
      <div class="feature-card">
        <div class="icon-wrap color-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <h3>Adaptive Questions</h3>
        <p>Our curriculum spans from Beginner level directly up to IELTS exam-grade questions.</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrap color-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
        </div>
        <h3>Autosave Protection</h3>
        <p>Every answer you select is immediately saved. If your connection drops, you won't lose your progress.</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrap color-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <h3>Real-time Alerts</h3>
        <p>Instant certificate grade and study recommendations. The academic team receives your results instantly.</p>
      </div>
    </div>

    <!-- Registration Section -->
    <div id="registration-section" class="registration-card">
      <div class="reg-info">
        <h2>Candidate Information Form</h2>
        <p>Before launching the exam, please provide your contact details so we can save your progress and reach out with your study recommendations.</p>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Students taking test" class="reg-illustration" />
      </div>
      <div class="reg-form-wrap">
        <!-- Locked State -->
        <template v-if="!isUnlocked">
          <div class="lock-container">
            <div class="lock-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3>Placement Test Locked</h3>
            <p>An administrator must verify the candidate's initial background and unlock the exam with their configuration PIN.</p>
            <button type="button" @click="openUnlockModal" class="btn-unlock">Unlock & Assign Level</button>
          </div>
        </template>
        <template v-else>
          <form @submit.prevent="handleRegister" class="registration-form">
            <div class="assigned-level-banner">
              <div class="level-info">
                <span class="pulse-indicator"></span>
                <span>Assigned Level: <strong>{{ selectedLevel }}</strong> (Admin Verified)</span>
              </div>
              <button type="button" @click="openUnlockModal" class="btn-change-level">Change</button>
            </div>

            <div class="form-group">
              <label for="name">Full Name <span class="required">*</span></label>
              <input type="text" id="name" v-model="form.name" required placeholder="John Doe" />
            </div>
            <div class="form-group">
              <label for="phone">Phone Number <span class="required">*</span></label>
              <input type="tel" id="phone" v-model="form.phone" required placeholder="+998 (90) 123-45-67" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="age">Age <span class="required">*</span></label>
                <input type="number" id="age" v-model.number="form.age" required min="5" max="100" placeholder="18" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address <span class="optional">(Optional)</span></label>
              <input type="email" id="email" v-model="form.email" placeholder="john@example.com" />
            </div>

            <div class="form-group">
              <label>Candidate Type <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" value="insider" v-model="form.candidateType" />
                  <span>Insider Student</span>
                </label>
                <label class="radio-label">
                  <input type="radio" value="outsider" v-model="form.candidateType" />
                  <span>Outsider Candidate</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Preferred Study Time <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" value="morning" v-model="form.preferredStudyTime" />
                  <span>Morning</span>
                </label>
                <label class="radio-label">
                  <input type="radio" value="afternoon" v-model="form.preferredStudyTime" />
                  <span>Afternoon</span>
                </label>
                <label class="radio-label">
                  <input type="radio" value="evening" v-model="form.preferredStudyTime" />
                  <span>Evening</span>
                </label>
              </div>
            </div>

            <button type="submit" class="btn-register-submit" :disabled="loading">
              <span v-if="!loading">Start Placement Test</span>
              <span v-else>Registering and generating test...</span>
            </button>
          </form>
        </template>
      </div>
    </div>
    <!-- Resume Modal -->
    <div v-if="showResumeModal" class="modal-overlay" @click.self="showResumeModal = false">
      <div class="modal-card">
        <h3>Resume Unfinished Test</h3>
        <p>Enter the phone number you registered with to continue your test session.</p>
        <form @submit.prevent="handleResume" class="resume-form">
          <input type="tel" v-model="resumePhone" required placeholder="+998901234567" class="modal-input" />
          <div class="modal-actions">
            <button type="button" @click="showResumeModal = false" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-resume" :disabled="loadingResume">
              <span v-if="!loadingResume">Resume Session</span>
              <span v-else>Searching...</span>
            </button>
          </div>

        </form>
        
    </div>
    </div>

    <!-- Admin Unlock Modal -->
    <div v-if="showUnlockModal" class="modal-overlay" @click.self="closeUnlockModal">
      <div class="modal-card unlock-modal-card">
        <!-- Step 1: PIN Entry -->
        <div v-if="unlockStep === 1" class="modal-step-content text-center">
          <h3 class="font-extrabold text-slate-800 text-xl mb-2">Administrator Verification</h3>
          <p class="text-slate-500 text-sm mb-4">Please enter the 4-digit security PIN to configure this candidate's placement test level.</p>
          <div class="pin-input-container">
            <input 
              type="password" 
              v-model="pinCode" 
              maxlength="4" 
              placeholder="••••" 
              class="pin-input"
              @keyup.enter="verifyPin"
              autofocus
            />
          </div>
          <p v-if="pinError" class="error-text">❌ Incorrect PIN. Please try again.</p>
          <div class="modal-actions">
            <button type="button" @click="closeUnlockModal" class="btn-cancel">Cancel</button>
            <button type="button" @click="verifyPin" class="btn-resume">Verify PIN</button>
          </div>
        </div>

        <!-- Step 2: Level Selection -->
        <div v-else-if="unlockStep === 2" class="modal-step-content">
          <h3 class="font-extrabold text-slate-800 text-xl mb-2">Assign Assessment Level</h3>
          <p class="text-slate-500 text-sm mb-4">Choose the candidate's starting level based on the initial interview consultation.</p>
          <div class="level-selector-grid">
            <button 
              v-for="lvl in levelOptions" 
              :key="lvl" 
              type="button" 
              class="level-card-btn"
              @click="assignLevel(lvl)"
            >
              <span class="level-name">{{ lvl }}</span>
              <span class="level-badge">{{ getLevelShortCode(lvl) }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
// State
const loading = ref(false)
const loadingResume = ref(false)
const showResumeModal = ref(false)
const resumePhone = ref('')

// Admin PIN & Level Configuration State
const isUnlocked = ref(false)
const selectedLevel = ref('')
const showUnlockModal = ref(false)
const unlockStep = ref(1) // 1 = PIN, 2 = Level Selector
const pinCode = ref('')
const pinError = ref(false)

onMounted(() => {
  sessionStorage.removeItem('exam_unlocked')
  sessionStorage.removeItem('exam_unlocked_level')
  localStorage.removeItem('placement_pin')
  localStorage.removeItem('placement_level')
  isUnlocked.value = false
  selectedLevel.value = ''
  if (form.value) {
    form.value.testLevel = ''
  }
})

const levelOptions = [
  'Beginner',
  'Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'IELTS Foundation'
]

const form = ref({
  name: '',
  phone: '',
  age: null,

  email: '',
  candidateType: 'outsider',
  preferredStudyTime: 'morning',
  testLevel: sessionStorage.getItem('exam_unlocked_level') || ''
});

const getLevelShortCode = (lvl) => {
  const mapping = {
    'Beginner': 'A1',
    'Elementary': 'A2',
    'Pre-Intermediate': 'B1',
    'Intermediate': 'B2',
    'Upper-Intermediate': 'C1',
    'IELTS Foundation': 'IELTS'
  }
  return mapping[lvl] || ''
}

const openUnlockModal = () => {
  pinCode.value = ''
  pinError.value = false
  unlockStep.value = isUnlocked.value ? 2 : 1
  showUnlockModal.value = true
}

const closeUnlockModal = () => {
  showUnlockModal.value = false
}

const verifyPin = () => {
  if (pinCode.value === '2023') {
    pinError.value = false
    unlockStep.value = 2
  } else {
    pinError.value = true
    pinCode.value = ''
  }
}

const assignLevel = (lvl) => {
  selectedLevel.value = lvl
  form.value.testLevel = lvl
  isUnlocked.value = true
  sessionStorage.setItem('exam_unlocked', 'yes')
  sessionStorage.setItem('exam_unlocked_level', lvl)
  showUnlockModal.value = false
}

const scrollToForm = () => {
  const el = document.getElementById('registration-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleRegister = async () => {
  loading.value = true
  try {
    const res = await api.post('placement/register', form.value)
    
    // Reset unlock states immediately so next student is locked
    sessionStorage.removeItem('exam_unlocked')
    sessionStorage.removeItem('exam_unlocked_level')
    isUnlocked.value = false
    selectedLevel.value = ''
    form.value.testLevel = ''

    // Save test session in localStorage
    localStorage.setItem('placement_session', JSON.stringify({
      leadId: res.data.leadId,
      testResultId: res.data.testResultId,
      questions: res.data.questions,
      timeSpent: res.data.timeSpent,
      warnings: res.data.warnings,
      answers: res.data.answers
    }))
    // Redirect to exam screen
    router.push('/test/exam')
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to start the test. Please check fields and try again.')
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleResume = async () => {
  if (!resumePhone.value) return
  loadingResume.value = true
  try {
    const res = await api.get(`placement/resume/${encodeURIComponent(resumePhone.value)}`)
    
    localStorage.setItem('placement_session', JSON.stringify({
      leadId: res.data.leadId,
      testResultId: res.data.testResultId,
      questions: res.data.questions,
      timeSpent: res.data.timeSpent,
      warnings: res.data.warnings,
      answers: res.data.answers
    }))

    showResumeModal.value = false
    router.push('/test/exam')
  } catch (err) {
    alert(err.response?.data?.message || 'No active placement test found for this phone number.')
    console.error(err)
  } finally {
    loadingResume.value = false
  }
}
</script>

<style scoped>
.test-landing {
  padding-top: 2rem;
  padding-bottom: 5rem;
}

.hero-card {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  border-radius: 24px;
  padding: 4rem 3rem;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 750px;
}

.badge-premium {
  display: inline-block;
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  padding: 0.4rem 1rem;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.landing-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.landing-desc {
  font-size: 1.15rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.test-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #cbd5e1;
}

.stat-item svg {
  color: #6366f1;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-start {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  transition: transform 0.2s, background-color 0.2s;
}

.btn-start:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

.btn-resume-trigger {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-resume-trigger:hover {
  background: rgba(255, 255, 255, 0.15);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon-wrap {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.icon-wrap.color-1 { background: #e0e7ff; color: #4f46e5; }
.icon-wrap.color-2 { background: #d1fae5; color: #059669; }
.icon-wrap.color-3 { background: #fef3c7; color: #d97706; }

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.registration-card {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.reg-info {
  background: #f8fafc;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #f1f5f9;
}

.reg-info h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.reg-info p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.reg-illustration {
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.reg-form-wrap {
  padding: 3rem;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
}

.required {
  color: #ef4444;
}

input, select {
  padding: 0.85rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

input:focus, select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-register-submit {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
  transition: background-color 0.2s;
}

.btn-register-submit:hover:not(:disabled) {
  background: #4f46e5;
}

.btn-register-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 450px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.modal-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.modal-input {
  width: 100%;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-cancel {
  background: #f1f5f9;
  color: #475569;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.btn-resume {
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .registration-card {
    grid-template-columns: 1fr;
  }
  .reg-info {
    padding: 2rem;
    border-right: none;
    border-bottom: 1px solid #f1f5f9;
  }
  .reg-illustration {
    display: none;
  }
  .reg-form-wrap {
    padding: 2rem;
  }
  .landing-title {
    font-size: 2.5rem;
  }
  .hero-card {
    padding: 2rem 1.5rem;
  }
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
  flex-wrap: wrap;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  cursor: pointer;
  font-weight: 550;
  color: #334155;
  font-size: 0.95rem;
}
.radio-label input[type="radio"] {
  scale: 1.25;
  accent-color: #0f172a;
}
.optional {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: normal;
}

/* Admin Lock Styles */
.lock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3.5rem 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #cbd5e1;
}

.lock-icon {
  background: #fee2e2;
  color: #ef4444;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.lock-container h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.lock-container p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  max-width: 400px;
}

.btn-unlock {
  background: #0f172a;
  color: white;
  border: none;
  padding: 0.9rem 2.25rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.btn-unlock:hover {
  background: #1e293b;
  transform: translateY(-1px);
}

/* Level Banner styling */
.assigned-level-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #166534;
  font-size: 0.95rem;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  animation: pulse-green 1.8s infinite;
}

@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.btn-change-level {
  background: transparent;
  color: #166534;
  border: 1px solid #86efac;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-change-level:hover {
  background: #dcfce7;
  border-color: #22c55e;
}

/* Modal and selector grid updates */
.unlock-modal-card {
  max-width: 480px !important;
}

.pin-input-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.pin-input {
  width: 170px;
  letter-spacing: 0.8rem;
  text-align: center;
  font-size: 1.85rem;
  padding: 0.5rem 0.5rem 0.5rem 1.35rem;
  font-weight: 800;
  border-radius: 12px;
  border: 2px solid #cbd5e1;
}

.error-text {
  color: #ef4444;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
}

.level-selector-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.level-card-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  padding: 1.1rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.level-card-btn:hover {
  border-color: #6366f1;
  background: #f5f3ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);
}

.level-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.9rem;
}

.level-badge {
  font-size: 0.7rem;
  font-weight: 850;
  color: #6366f1;
  background: #e0e7ff;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
}
</style>
