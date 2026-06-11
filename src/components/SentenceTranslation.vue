<template>
  <div class="sentence-quiz">
    <h2 class="quiz-title">{{ $t('test.sentence_title') }}</h2>
    <form @submit.prevent="checkTranslations" class="quiz-form">
      <div v-for="(item, idx) in sentences" :key="idx" class="quiz-item">
        <p class="sentence-en">{{ item.en }}</p>
        <input v-model="answers[idx]" type="text" placeholder="{{ $t('test.sentence_placeholder') }}" required />
      </div>
      <button type="submit" class="btn-next" :disabled="!allAnswered">
        {{ $t('test.submit') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sentences = ref([
  { en: 'I am going to the school.', uz: 'Men maktabga borayapman.' },
  { en: 'She reads a book.', uz: 'U kitob o‘qiydi.' },
  { en: 'We like to learn English.', uz: 'Biz ingliz tilini o‘rganishni yoqtiramiz.' }
])

const answers = ref(Array(sentences.value.length).fill(''))

const allAnswered = computed(() => answers.value.every(a => a.trim() !== ''))

const emit = defineEmits(['completed'])

const checkTranslations = () => {
  const correct = sentences.value.every((item, i) => {
    return answers.value[i].trim().toLowerCase() === item.uz.toLowerCase()
  })
  const score = answers.value.reduce((acc, ans, i) => {
    return acc + (ans.trim().toLowerCase() === sentences.value[i].uz.toLowerCase() ? 1 : 0)
  }, 0)
  emit('completed', { score, total: sentences.value.length })
}
</script>

<style scoped>
.sentence-quiz { background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
.quiz-title { font-size: 1.5rem; margin-bottom: 1rem; }
.quiz-item { margin-bottom: 1rem; }
.sentence-en { margin-bottom: 0.3rem; font-weight: 600; }
.btn-next { background: #6366f1; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px; cursor: pointer; }
.btn-next:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
