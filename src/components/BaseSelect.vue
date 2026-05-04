<template>
  <div class="custom-select" v-click-outside="closeDropdown">
    <div 
      class="select-trigger" 
      :class="{ 'open': isOpen }" 
      @click="toggleDropdown"
    >
      <span class="selected-label">{{ selectedLabel }}</span>
      <div class="arrow">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <transition name="dropdown">
      <div v-if="isOpen" class="select-options">
        <div 
          v-for="option in options" 
          :key="option.value" 
          class="option-item"
          :class="{ 'active': modelValue === option.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
          <div v-if="modelValue === option.value" class="check">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option ? option.label : ''
})

const toggleDropdown = () => isOpen.value = !isOpen.value
const closeDropdown = () => isOpen.value = false

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

// Click outside directive logic
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 90px;
  user-select: none;
}

.select-trigger {
  width: 100%;
  background: var(--color-primary-alpha);
  border: 1px solid transparent;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: var(--transition);
  color: var(--color-primary);
  font-weight: 800;
  font-size: 0.85rem;
}

.select-trigger:hover {
  background: hsla(var(--p-h), var(--p-s), var(--p-l), 0.15);
}

.select-trigger.open {
  background: white;
  border-color: var(--color-primary);
  box-shadow: 0 5px 15px var(--color-primary-alpha);
}

.arrow {
  transition: var(--transition);
  display: flex;
  align-items: center;
}

.select-trigger.open .arrow {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background: white;
  border-radius: var(--radius-sm);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  border: 1px solid var(--color-border);
  z-index: 100;
  overflow: hidden;
  padding: 6px;
  transform-origin: top center;
}

.option-item {
  padding: 12px 14px;
  cursor: pointer;
  transition: var(--transition);
  border-radius: 8px;
  color: var(--color-text-2);
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option-item:hover {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  padding-left: 18px;
}

.option-item.active {
  background: var(--color-primary);
  color: white;
}

.check {
  display: flex;
  align-items: center;
}

/* Animations */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.9);
}
</style>
