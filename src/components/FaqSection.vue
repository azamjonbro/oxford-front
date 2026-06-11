<template>
  <section class="faq-section">
    <div class="container">
      <div class="section-header">
        <span class="badge">{{ $t('sections.faq') }}</span>
        <h2 class="title">{{ $t('sections.faq') }}</h2>
      </div>

      <div class="faq-accordion">
        <div 
          v-for="(faq, index) in faqs" 
          :key="faq._id" 
          class="faq-item"
          :class="{ 'active': activeIndex === index }"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ getLoc(faq.question) }}</h3>
            <div class="faq-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
          <div 
            class="faq-answer" 
            :style="{ maxHeight: activeIndex === index ? '500px' : '0px' }"
          >
            <div class="answer-inner">
              <p>{{ getLoc(faq.answer) }}</p>
            </div>
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

const { locale } = useI18n()
const faqs = ref([])
const activeIndex = ref(-1)

onMounted(async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/faqs`)
    faqs.value = res.data
  } catch (error) {
    console.error('Failed to load FAQs', error)
  }
})

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}

const getLoc = (obj) => {
  if (!obj) return ''
  return obj[locale.value] || obj['uz'] || ''
}
</script>

<style scoped>
.faq-section {
  padding: 100px 0;
  background: var(--color-bg-2);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header .title {
  font-size: 2.8rem;
  font-weight: 900;
  margin: 15px 0;
  color: var(--color-text-1);
}

.subtitle {
  color: var(--color-text-2);
  font-size: 1.1rem;
}

.faq-accordion {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: white;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: var(--transition);
}

.faq-item:hover {
  border-color: var(--color-primary);
}

.faq-item.active {
  border-color: var(--color-primary);
  box-shadow: 0 20px 40px rgba(0, 82, 255, 0.05);
}

.faq-question {
  padding: 25px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.faq-question h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text-1);
  transition: var(--transition);
}

.faq-item.active .faq-question h3 {
  color: var(--color-primary);
}

.faq-icon {
  color: var(--color-text-2);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
  color: var(--color-primary);
}

.faq-answer {
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.answer-inner {
  padding: 0 35px 30px 35px;
}

.answer-inner p {
  color: var(--color-text-2);
  line-height: 1.7;
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .section-header .title { font-size: 2rem; }
  .faq-question { padding: 20px; }
  .faq-question h3 { font-size: 1.1rem; }
}
</style>
