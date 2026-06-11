<template>
  <transition name="fade-loader">
    <div v-if="loadingStore.isLoading" class="loader-overlay">
      <div class="loader-content">
        <!-- Spinner Ring -->
        <div class="spinner-box">
          <div class="glowing-ring"></div>
          <div class="glowing-ring inner"></div>
          <div class="loader-logo">O</div>
        </div>

        <!-- Text brand -->
        <div class="loader-text">
          <span class="letter">O</span>
          <span class="letter">X</span>
          <span class="letter">F</span>
          <span class="letter">O</span>
          <span class="letter">R</span>
          <span class="letter">D</span>
        </div>
        
        <!-- Subtle tag line -->
        <p class="loader-tag">Education Center</p>

        <!-- Progress line -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'
import { loadingStore } from '../utils/loadingStore'

// Watch the loading state to apply a body scroll lock
watch(
  () => loadingStore.isLoading,
  (loading) => {
    if (loading) {
      document.body.classList.add('loading-lock')
    } else {
      document.body.classList.remove('loading-lock')
    }
  },
  { immediate: true }
)

// Ensure body lock is removed if component is unmounted
onUnmounted(() => {
  document.body.classList.remove('loading-lock')
})
</script>

<style>
/* Body scroll lock utility - global style to override default body overflow */
body.loading-lock {
  overflow: hidden !important;
  height: 100vh !important;
}
</style>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999; /* Highest priority */
  pointer-events: all;
  user-select: none;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
}

/* Spinner Box Styling */
.spinner-box {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.glowing-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #0056ff;
  border-bottom-color: rgba(0, 86, 255, 0.1);
  border-radius: 50%;
  animation: spin 1.8s cubic-bezier(0.53, 0.21, 0.29, 0.87) infinite;
  box-shadow: 0 0 15px rgba(0, 86, 255, 0.15);
}

.glowing-ring.inner {
  width: 80%;
  height: 80%;
  border-top-color: transparent;
  border-left-color: #0056ff;
  border-right-color: rgba(0, 86, 255, 0.1);
  animation: spin-reverse 1.2s cubic-bezier(0.53, 0.21, 0.29, 0.87) infinite;
}

.loader-logo {
  font-size: 2.2rem;
  font-weight: 900;
  color: #0056ff;
  animation: pulse 1.5s ease-in-out infinite;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 0 10px rgba(0, 86, 255, 0.2);
}

/* Text animation */
.loader-text {
  display: flex;
  gap: 4px;
}

.letter {
  font-size: 2.4rem;
  font-weight: 900;
  color: #0a1128;
  font-family: 'Inter', sans-serif;
  letter-spacing: 2px;
  animation: letterPulse 1.4s ease-in-out infinite;
}

.letter:nth-child(1) { animation-delay: 0s; }
.letter:nth-child(2) { animation-delay: 0.1s; }
.letter:nth-child(3) { animation-delay: 0.2s; }
.letter:nth-child(4) { animation-delay: 0.3s; }
.letter:nth-child(5) { animation-delay: 0.4s; }
.letter:nth-child(6) { animation-delay: 0.5s; }

.loader-tag {
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-top: -0.5rem;
  opacity: 0.8;
}

/* Progress bar */
.progress-bar-container {
  width: 160px;
  height: 4px;
  background: rgba(0, 86, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
}

.progress-bar-fill {
  height: 100%;
  width: 50%;
  background: linear-gradient(90deg, #0056ff, #3b82f6);
  border-radius: 10px;
  position: absolute;
  left: -50%;
  animation: loadingProgress 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 8px rgba(0, 86, 255, 0.5);
}

/* Keyframe Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
}

@keyframes letterPulse {
  0%, 100% {
    color: #0a1128;
    transform: translateY(0);
  }
  50% {
    color: #0056ff;
    transform: translateY(-8px);
    text-shadow: 0 10px 15px rgba(0, 86, 255, 0.2);
  }
}

@keyframes loadingProgress {
  0% { left: -100%; width: 30%; }
  50% { width: 50%; }
  100% { left: 100%; width: 30%; }
}

/* Transitions */
.fade-loader-enter-active,
.fade-loader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-loader-enter-from,
.fade-loader-leave-to {
  opacity: 0;
}
</style>
