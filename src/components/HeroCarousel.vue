<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <!-- Text Side -->
        <div class="hero-text">
          <h1 class="title">
            {{ t('hero.slide1.title') }}
          </h1>
          <p class="subtitle">
            {{ t('hero.slide1.desc') }} Sizning kelajagingiz bizning ustuvor vazifamizdir.
          </p>
          <button class="btn-enroll" @click="$emit('openRegister')">
            {{ t('buttons.enroll').toUpperCase() }}
          </button>
        </div>

        <!-- Image Side -->
        <div class="hero-image">
          <div class="img-box">
            <img src="https://picsum.photos/id/400/400/400" alt="Oxford" />
          </div>
        </div>
      </div>

      <!-- Indicators (Bottom Left) -->
      <div class="indicators">
        <div class="line-indicator"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.hero {
  width: 100%;
  padding: 6rem 0;
  background: white;
  min-height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
}

.title {
  font-size: 5.5rem;
  font-weight: 900;
  color: #000;
  line-height: 1;
  margin-bottom: 2.5rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: -2px;
}

.subtitle {
  font-size: 1.2rem;
  color: #475569;
  line-height: 1.6;
  max-width: 520px;
  margin-bottom: 3.5rem;
}

.btn-enroll {
  background: #0056ff;
  color: white;
  padding: 1.25rem 3.5rem;
  border-radius: 50px;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(0, 86, 255, 0.35);
  transition: all 0.3s;
  letter-spacing: 1px;
}

.btn-enroll:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px rgba(0, 86, 255, 0.45);
}

.img-box {
  width: 100%;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0,0,0,0.08);
}

.img-box img {
  width: 100%;
  display: block;
}

.indicators {
  margin-top: 6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.line-indicator {
  width: 45px;
  height: 6px;
  background: #0056ff;
  border-radius: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 50%;
}

@media (max-width: 1024px) {
  .hero-content { grid-template-columns: 1fr; text-align: center; }
  .title { font-size: 3.5rem; }
  .subtitle { margin: 0 auto 3.5rem; }
  .hero-image { display: none; }
  .indicators { justify-content: center; }
}
</style>
