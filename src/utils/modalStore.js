import { reactive } from 'vue'

export const modalStore = reactive({
  isOpen: false,
  courseName: '',
  
  openModal(course = '') {
    this.courseName = course
    this.isOpen = true
  },
  
  closeModal() {
    this.isOpen = false
    this.courseName = ''
  }
})
