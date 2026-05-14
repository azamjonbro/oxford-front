<template>
  <Transition name="fade">
    <div v-if="modalStore.isOpen" class="modal-overlay" @click.self="handleClose">
      <div class="modal-container">
        <button class="close-btn" @click="handleClose">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="modal-content">
          <div class="modal-header">
            <h2 v-if="modalStore.courseName">{{ modalStore.courseName }}</h2>
            <h2 v-else>{{ $t('modal.title') }}</h2>
            <p>{{ $t('modal.subtitle') }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="registration-form">
            <div class="form-group" :class="{ 'error': errors.name }">
              <label>{{ $t('modal.name_label') }}</label>
              <input v-model="form.name" type="text" placeholder="Azizbek Karimov" @input="errors.name = false">
              <span v-if="errors.name" class="error-msg">{{ $t('modal.error_name') }}</span>
            </div>

            <div class="form-group" :class="{ 'error': errors.phone }">
              <label>{{ $t('modal.phone_label') }}</label>
              <input v-model="form.phone" type="tel" placeholder="+998 90 123 45 67" @input="errors.phone = false">
              <span v-if="errors.phone" class="error-msg">{{ $t('modal.error_phone') }}</span>
            </div>

            <div class="form-group" v-if="!modalStore.courseName" :class="{ 'error': errors.course }">
              <label>{{ $t('modal.course_label') }}</label>
              <select v-model="form.course" @change="errors.course = false">
                <option value="" disabled>{{ $t('modal.select_placeholder') }}</option>
                <option v-for="c in courses" :key="c" :value="c">{{ c }}</option>
              </select>
              <span v-if="errors.course" class="error-msg">{{ $t('modal.error_course') }}</span>
            </div>

            <div class="form-group" v-if="!modalStore.courseName">
              <label>{{ $t('modal.time_label') }}</label>
              <div class="time-grid">
                <button 
                  type="button" 
                  v-for="t in times" 
                  :key="t.val"
                  :class="{ active: form.time === t.val }"
                  @click="form.time = t.val"
                >
                  {{ $t(`modal.times.${t.key}`) }}
                </button>
              </div>
            </div>

            <button type="submit" class="btn-submit" :disabled="loading">
              {{ loading ? $t('modal.sending') : $t('buttons.send') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { modalStore } from '../utils/modalStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const useRouterInstance = useRouter()
const loading = ref(false)

const times = [
  { key: 'morning', val: '09:00' },
  { key: 'afternoon', val: '14:00' },
  { key: 'evening', val: '18:30' }
]
const courses = ['IELTS', 'General English', 'Matematika', 'Kimyo', 'Fizika', 'Rus tili']

const form = reactive({
  name: '',
  phone: '',
  course: '',
  time: '09:00'
})

const errors = reactive({
  name: false,
  phone: false,
  course: false
})

const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.course = ''
  form.time = '09:00'
  errors.name = false
  errors.phone = false
  errors.course = false
}

const handleClose = () => {
  resetForm()
  modalStore.closeModal()
  if (route.query.enroll) {
    useRouterInstance.replace({ query: {} })
  }
}

onMounted(() => {
  if (route.query.enroll) {
    modalStore.openModal(route.query.enroll)
  }
})

watch(() => route.query.enroll, (newVal) => {
  if (newVal) {
    modalStore.openModal(newVal)
  }
})

const validate = () => {
  let isValid = true
  if (!form.name.trim()) { errors.name = true; isValid = false; }
  if (form.phone.length < 9) { errors.phone = true; isValid = false; }
  if (!modalStore.courseName && !form.course) { errors.course = true; isValid = false; }
  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  const leadData = {
    ...form,
    course: modalStore.courseName || form.course,
    date: new Date().toLocaleString()
  }
  console.log('Lead Sent:', leadData)
  await new Promise(r => setTimeout(r, 1000))
  alert(t('modal.success'))
  loading.value = false
  handleClose()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  width: 90%;
  max-width: 420px;
  border-radius: 24px;
  position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.2);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #f5f5f5;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
}

.modal-content {
  padding: 35px;
}

.modal-header {
  text-align: center;
  margin-bottom: 25px;
}

.modal-header h2 {
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.modal-header p {
  font-size: 0.9rem;
  color: #666;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 800;
}

input, select {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  font-weight: 600;
  background: #fafafa;
}

.error input, .error select {
  border-color: #ff4d4d;
  background: #fff8f8;
}

.error-msg {
  color: #ff4d4d;
  font-size: 0.75rem;
  font-weight: 700;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.time-grid button {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #eee;
  background: white;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}

.time-grid button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.btn-submit {
  background: var(--color-primary);
  color: white;
  padding: 14px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 1rem;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
