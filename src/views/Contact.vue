<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <span class="badge">{{ $t('contact.badge') }}</span>
        <h1 class="title">{{ $t('contact.hero_title') }}</h1>
        <p class="subtitle">{{ $t('contact.hero_subtitle') }}</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Info Column -->
          <div class="contact-info">
            <div class="info-card">
              <div class="icon-box">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h4>{{ $t('contact.info.phone') }}</h4>
                <p>+998 90 123 45 67</p>
              </div>
            </div>

            <div class="info-card">
              <div class="icon-box">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h4>{{ $t('contact.info.email') }}</h4>
                <p>info@youroxford.uz</p>
              </div>
            </div>

            <div class="info-card">
              <div class="icon-box">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h4>{{ $t('contact.info.main_label') }}</h4>
                <p>{{ $t('contact.info.main_val') }}</p>
              </div>
            </div>

            <!-- Socials -->
            <div class="social-links">
              <a href="https://t.me/oxfort_edu" class="social-btn">Telegram</a>
              <a href="https://instagram.com/oxfort_edu" class="social-btn">Instagram</a>
            </div>
          </div>

          <!-- Form Column -->
          <div class="contact-form-box">
            <form @submit.prevent="handleSubmit" class="main-form">
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('contact.form.name') }}</label>
                  <input v-model="form.name" type="text" :placeholder="$t('contact.form.name_placeholder')" required>
                </div>
                <div class="form-group">
                  <label>{{ $t('contact.form.phone') }}</label>
                  <input v-model="form.phone" type="tel" :placeholder="$t('contact.form.phone_placeholder')" required>
                </div>
              </div>
              <div class="form-group">
                <label>{{ $t('contact.form.message') }}</label>
                <textarea v-model="form.message" rows="5" :placeholder="$t('contact.form.message_placeholder')"></textarea>
              </div>
              <button type="submit" class="btn-send">{{ $t('contact.form.send') }}</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section class="branches-display-section">
      <div class="container">
        <h2 class="section-title">{{ $t('contact.branches_title') }}</h2>
        <div class="branches-grid">
          <div v-for="branch in branches" :key="branch._id" class="branch-card">
            <div class="branch-image">
              <img :src="branch.images && branch.images.length ? 'http://localhost:5010' + branch.images[0] : 'https://picsum.photos/600/400?random=' + branch._id" alt="branch">
            </div>
            <div class="branch-info">
              <h3>{{ getLoc(branch.name) }}</h3>
              <p class="address">{{ getLoc(branch.address) }}</p>
              <p class="phone">{{ branch.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m1!2s41.272186!2s69.176461!5e0!3m2!1sen!2suz!4v1640000000000!5m2!1sen!2suz" 
            width="100%" 
            height="100%" 
            style="border:0; border-radius: 30px;" 
            allowfullscreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const branches = ref([])

const form = reactive({
  name: '',
  phone: '',
  message: ''
})

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5010/api/branches')
    branches.value = res.data
  } catch (err) {
    console.error('Failed to load branches', err)
  }
})

const getLoc = (obj) => {
  if (!obj) return ''
  return obj[locale.value] || obj['uz'] || ''
}

const handleSubmit = () => {
  alert(t('contact.form.success'))
  form.name = ''
  form.phone = ''
  form.message = ''
}
</script>

<style scoped>
.contact-page {
  padding-top: 100px;
}

.contact-hero {
  background: var(--color-bg-2);
  padding: 80px 0;
  text-align: center;
}

.contact-hero .title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 20px 0;
  letter-spacing: -2px;
}

.contact-content {
  padding: 100px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 25px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  transition: var(--transition);
}

.info-card:hover {
  border-color: var(--color-primary);
  transform: translateX(10px);
}

.icon-box {
  width: 50px;
  height: 50px;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-card h4 {
  font-size: 0.9rem;
  font-weight: 800;
  color: #888;
  margin-bottom: 5px;
}

.info-card p {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-1);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-btn {
  padding: 12px 20px;
  background: var(--color-bg-2);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  color: var(--color-text-1);
  transition: var(--transition);
}

.social-btn:hover {
  background: var(--color-primary);
  color: white;
}

.contact-form-box {
  background: white;
  padding: 50px;
  border-radius: 30px;
  border: 1px solid var(--color-border);
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
}

.main-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 800;
}

input, textarea {
  padding: 15px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-2);
  font-size: 1rem;
  font-weight: 600;
}

.btn-send {
  background: var(--color-primary);
  color: white;
  padding: 18px;
  border-radius: 15px;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(0, 82, 255, 0.2);
  transition: var(--transition);
}

.btn-send:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 82, 255, 0.3);
}

.branches-display-section {
  padding: 100px 0;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 50px;
  text-align: center;
}

.branches-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.branch-card {
  background: var(--color-bg-2);
  border-radius: 24px;
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--color-border);
}

.branch-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.branch-image {
  height: 200px;
  overflow: hidden;
}

.branch-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.branch-card:hover .branch-image img {
  transform: scale(1.1);
}

.branch-info {
  padding: 25px;
}

.branch-info h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.branch-info p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 5px;
  font-weight: 600;
}

.map-section {
  padding-bottom: 100px;
}

.map-container {
  height: 400px;
  background: var(--color-bg-2);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-weight: 600;
}

@media (max-width: 992px) {
  .contact-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
