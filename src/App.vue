<template>
  <div class="app-container" :class="{ 'no-padding': isTestRoute }" :key="currentLocale">
    <PageLoader />
    <MainHeader v-if="!isTestRoute" />
    <router-view />
    <MainFooter v-if="!isTestRoute" />
    <RegistrationModal />

    <!-- Cursor circle — test sahifalarida yashiriladi -->
    <div
      v-show="!isTestRoute"
      class="mouse-circle"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>
  </div>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import RegistrationModal from './components/RegistrationModal.vue'
import PageLoader from './components/PageLoader.vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { currentLocale } from './utils/localeStore.js'
import { loadingStore } from './utils/loadingStore.js'
import { useRoute } from 'vue-router'

const route = useRoute()

// If the user navigates directly to a page other than Home, stop loading automatically
watch(
  () => route.path,
  (newPath) => {
    if (newPath !== '/') {
      loadingStore.stopLoading()
    }
  },
  { immediate: true }
)

// Test sahifalarida cursor shadow ko'rinmaydi
const isTestRoute = computed(() =>
  route.path.startsWith('/test')
)

const mouseX = ref(0)
const mouseY = ref(0)

const targetX = ref(0)
const targetY = ref(0)

function updateMouse(e) {
  targetX.value = e.clientX
  targetY.value = e.clientY
}

// smooth animation (pro feel)
function animate() {
  mouseX.value += (targetX.value - mouseX.value) * 0.12
  mouseY.value += (targetY.value - mouseY.value) * 0.12
  requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', updateMouse)
  animate()

  // hover interaction
  const circle = document.querySelector('.mouse-circle')
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => circle?.classList.add('active'))
    el.addEventListener('mouseleave', () => circle?.classList.remove('active'))
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse)
})
</script>

<style>
.app-container {
  padding-top: 90px;
}
.app-container.no-padding {
  padding-top: 0 !important;
}

/* ===== CURSOR ===== */

</style>