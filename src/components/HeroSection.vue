<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <span class="badge">{{ t('hero.badge') }}</span>
        <h1>{{ t('hero.title') }}</h1>
        <p>{{ t('hero.subtitle') }}</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="$emit('openRegister')">{{ t('hero.cta') }}</button>
          <router-link to="/courses" class="btn-secondary">{{ t('hero.cta2') }}</router-link>
        </div>
      </div>
    </div>
    <div class="hero-bg"></div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
defineEmits(['openRegister'])
const { t } = useI18n()
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
  overflow: hidden;
  padding-top: 80px;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.3) 0%, transparent 60%);
}
.container { max-width:1200px; margin:0 auto; padding:0 1.5rem; position:relative; z-index:1; }
.hero-content { max-width:650px; }
.badge {
  display: inline-block;
  background: rgba(99,102,241,0.2);
  border: 1px solid rgba(99,102,241,0.4);
  color: #a5b4fc;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}
h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  font-family: 'Outfit', sans-serif;
}
p { font-size:1.15rem; color:#94a3b8; line-height:1.7; margin-bottom:2.5rem; }
.hero-actions { display:flex; gap:1rem; flex-wrap:wrap; }
.btn-primary {
  padding: 0.875rem 2rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(99,102,241,0.4);
}
.btn-primary:hover { background:#4f46e5; transform:translateY(-2px); box-shadow:0 8px 25px rgba(99,102,241,0.5); }
.btn-secondary {
  padding: 0.875rem 2rem;
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}
.btn-secondary:hover { background:rgba(255,255,255,0.2); }
</style>
