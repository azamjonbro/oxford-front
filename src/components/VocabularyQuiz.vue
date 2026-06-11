<template>
  <div class="vocab-quiz">
    <h2 class="step-title">{{ $t('test.vocab_title') }}</h2>
    <form @submit.prevent="checkAnswers" class="vocab-form">
      <div v-for="(item, idx) in words" :key="idx" class="vocab-item">
        <label :for="'answer-' + idx" class="word-label">{{ item.en }}</label>
        <input
          :id="'answer-' + idx"
          v-model="answers[idx]"
          :placeholder="$t('test.vocab_placeholder')"
          class="word-input"
        />
        <span v-if="submitted && !isCorrect(idx)" class="error-msg">{{ $t('test.vocab_error') }}</span>
      </div>
      <button type="submit" class="btn-next">{{ $t('test.vocab_submit') }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['step-completed'])

// Hard‑coded word list; can be fetched from API later.
const words = ref([
  { en: 'hello', uz: 'salom' },
  { en: 'book', uz: 'kitob' },
  { en: 'school', uz: 'maktab' },
  { en: 'teacher', uz: 'ustoz' },
  { en: 'exam', uz: 'imtihon' }
])

const answers = ref(Array(words.value.length).fill(''))
const submitted = ref(false)

const isCorrect = idx => {
  const expected = words.value[idx].uz.trim().toLowerCase()
  const actual = answers.value[idx].trim().toLowerCase()
  return expected === actual
}

const checkAnswers = () => {
  submitted.value = true
  const allCorrect = words.value.every((_, idx) => isCorrect(idx))
  if (allCorrect) {
    emit('step-completed')
  }
}
</script>

<style scoped>
.vocab-quiz { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.step-title { font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700; }
.vocab-item { margin-bottom: 1rem; }
.word-label { display: block; margin-bottom: 0.3rem; font-weight: 600; }
.word-input { width: 100%; padding: 0.6rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; }
.error-msg { color: #ef4444; font-size: 0.85rem; margin-left: 0.5rem; }
.btn-next { margin-top: 1rem; background: #6366f1; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer; }
.btn-next:hover { background: #4f46e5; }
</style>
