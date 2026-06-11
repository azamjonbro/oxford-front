<template>
  <div class="not-found-section">
    <div class="container not-found-wrapper">
      <!-- Left side: Interactive Animation -->
      <div 
        class="illustration-column" 
        @mousemove="handleParallax" 
        @mouseleave="resetTilt"
      >
        <!-- Background Glowing Radar Circle -->
        <div class="glow-bg"></div>
        <div class="glow-404">404</div>

        <!-- Interactive Parallax Container -->
        <div 
          class="parallax-scene"
          :style="{ transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)` }"
        >
          <!-- Stack of Books SVG -->
          <div class="books-stack">
            <!-- Book 3 (Top Book - Open) -->
            <svg class="svg-book top-book" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <!-- Pages -->
              <path d="M20 90 C 60 70, 95 85, 100 90 C 105 85, 140 70, 180 90 L 180 30 C 140 10, 105 25, 100 30 C 95 25, 60 10, 20 30 Z" fill="#f8faff" stroke="#0056ff" stroke-width="2"/>
              <path d="M100 30 L 100 90" stroke="#0056ff" stroke-width="2" stroke-dasharray="2 2"/>
              <!-- Book Cover Base -->
              <path d="M18 92 C 58 72, 95 87, 100 92 C 105 92, 142 72, 182 92 L 180 95 C 140 75, 105 90, 100 95 C 95 90, 60 75, 20 95 Z" fill="#ffd700"/>
              <!-- Bookmark ribbon -->
              <path d="M100 30 L 100 105 L 108 100 L 116 105 L 116 30" fill="#ffd700" opacity="0.8"/>
            </svg>

            <!-- Book 2 (Middle Book - Closed) -->
            <svg class="svg-book middle-book" viewBox="0 0 220 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="10" width="180" height="30" rx="6" fill="#0056ff" />
              <!-- Pages side -->
              <rect x="35" y="14" width="160" height="22" rx="3" fill="#ffffff" />
              <!-- Stripes on spine -->
              <rect x="23" y="16" width="6" height="18" fill="#ffd700" />
            </svg>

            <!-- Book 1 (Bottom Book - Large Closed) -->
            <svg class="svg-book bottom-book" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="220" height="40" rx="8" fill="#0a1128" />
              <!-- Pages side -->
              <rect x="25" y="15" width="200" height="30" rx="4" fill="#f8faff" />
              <!-- Gold details on spine -->
              <path d="M15 15 L 15 45 M 20 15 L 20 45" stroke="#ffd700" stroke-width="2"/>
            </svg>

            <!-- Graduation Cap floating on top -->
            <div class="grad-cap-wrapper">
              <svg class="svg-grad-cap" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                <!-- Cap Stand/Base -->
                <path d="M35 55 L 35 68 C 35 75, 85 75, 85 68 L 85 55" fill="#0a1128" stroke="#0056ff" stroke-width="1.5"/>
                <!-- Tassel Ribbon & Ring -->
                <path d="M60 38 L 88 56 L 86 68" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
                <!-- Tassel Fringe -->
                <polygon points="82 68 90 68 93 82 79 82" fill="#ffd700"/>
                <!-- Top Diamond -->
                <polygon points="60 25 105 38 60 51 15 38" fill="#0c1938" stroke="#0056ff" stroke-width="2"/>
                <polygon points="60 28 98 38 60 48 22 38" fill="#0056ff" opacity="0.6"/>
                <!-- Center Button -->
                <ellipse cx="60" cy="38" rx="4" ry="2.5" fill="#ffd700"/>
              </svg>
            </div>
          </div>

          <!-- Academic Particles floating up -->
          <div class="floating-particles">
            <span 
              v-for="(p, index) in particleList" 
              :key="index" 
              class="particle"
              :style="{ 
                left: p.x + '%', 
                animationDelay: p.delay, 
                fontSize: p.size,
                transform: `rotate(${p.rotate}deg)`
              }"
            >
              {{ p.text }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right side: Text details -->
      <div class="text-column">
        <div class="badge-container">
          <span class="error-badge">404</span>
          <span class="error-badge-text">Page Not Found</span>
        </div>
        <h1 class="error-title">{{ $t('not_found.title') }}</h1>
        <p class="error-desc">{{ $t('not_found.desc') }}</p>
        
        <router-link to="/" class="back-home-btn">
          <span class="btn-text">{{ $t('not_found.button') }}</span>
          <span class="btn-icon-wrapper">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tiltX = ref(0)
const tiltY = ref(0)

function handleParallax(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  // Calculate cursor offset from the center of the illustration column
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  // Max tilt angle (degrees)
  const maxTilt = 15
  tiltX.value = (x / (rect.width / 2)) * maxTilt
  tiltY.value = -(y / (rect.height / 2)) * maxTilt
}

function resetTilt() {
  // Smoothly return to center
  tiltX.value = 0
  tiltY.value = 0
}

// Custom academic particles that will float up from the open book
const particleList = ref([
  { text: 'A+', x: 20, delay: '0s', size: '1.2rem', rotate: -15 },
  { text: 'IELTS 9.0', x: 55, delay: '1.5s', size: '0.95rem', rotate: 10 },
  { text: '100%', x: 35, delay: '0.8s', size: '1rem', rotate: 5 },
  { text: '?', x: 75, delay: '2.2s', size: '1.4rem', rotate: 25 },
  { text: '🎓', x: 45, delay: '3.1s', size: '1.3rem', rotate: -5 },
  { text: 'ABC', x: 15, delay: '2.5s', size: '1.05rem', rotate: -20 },
  { text: 'IELTS 8.5', x: 65, delay: '3.8s', size: '0.9rem', rotate: 15 },
  { text: 'Excellent!', x: 28, delay: '1.9s', size: '0.85rem', rotate: -10 },
  { text: 'B', x: 80, delay: '0.4s', size: '1.1rem', rotate: 30 }
])
</script>

<style scoped>
.not-found-section {
  min-height: calc(100vh - 90px - 300px); /* 100vh minus header and footer space */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 80px 24px;
  overflow: hidden;
  position: relative;
}

.not-found-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  width: 100%;
}

/* ==========================================================================
   Left Column: Illustration & Parallax
   ========================================================================== */

.illustration-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 400px;
  cursor: pointer;
  user-select: none;
}

.glow-bg {
  position: absolute;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(0, 86, 255, 0.15) 0%, rgba(0, 86, 255, 0) 70%);
  border-radius: 50%;
  z-index: 1;
  animation: pulseGlow 6s infinite alternate ease-in-out;
}

.glow-404 {
  position: absolute;
  font-size: 11rem;
  font-weight: 950;
  color: var(--color-primary-alpha);
  letter-spacing: -5px;
  line-height: 1;
  z-index: 0;
  text-shadow: 0 0 40px rgba(0, 86, 255, 0.03);
  user-select: none;
  pointer-events: none;
}

.parallax-scene {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  transform-style: preserve-3d;
}

.books-stack {
  position: relative;
  width: 280px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transform-style: preserve-3d;
}

.svg-book {
  filter: drop-shadow(0 8px 16px rgba(10, 17, 40, 0.12));
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.bottom-book {
  width: 240px;
  z-index: 3;
  transform: translateZ(10px);
}

.middle-book {
  width: 220px;
  z-index: 4;
  margin-bottom: -15px; /* overlay */
  transform: translateZ(20px) rotate(-2deg);
}

.top-book {
  width: 190px;
  z-index: 5;
  margin-bottom: -10px; /* overlay */
  transform: translateZ(30px) rotate(1deg);
}

/* Hover interaction on books stack */
.illustration-column:hover .top-book {
  transform: translateZ(35px) rotate(4deg) translateY(-8px);
}

.illustration-column:hover .middle-book {
  transform: translateZ(22px) rotate(-4deg) translateY(-3px);
}

.illustration-column:hover .bottom-book {
  transform: translateZ(12px) translateY(1px);
}

/* Graduation cap floating */
.grad-cap-wrapper {
  position: absolute;
  top: -30px;
  width: 110px;
  z-index: 6;
  transform: translateZ(50px);
  animation: bobbing 4s infinite ease-in-out;
  pointer-events: none;
}

.svg-grad-cap {
  filter: drop-shadow(0 12px 24px rgba(10, 17, 40, 0.18));
}

.illustration-column:hover .grad-cap-wrapper {
  animation-play-state: paused;
  transform: translateZ(60px) rotate(8deg) translateY(-18px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ==========================================================================
   Academic Floating Particles
   ========================================================================== */

.floating-particles {
  position: absolute;
  bottom: 80px;
  width: 180px;
  height: 200px;
  z-index: 5;
  pointer-events: none;
}

.particle {
  position: absolute;
  bottom: 0;
  color: var(--color-primary);
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  opacity: 0;
  animation: floatUp 4s infinite ease-in-out;
  text-shadow: 0 4px 10px rgba(0, 86, 255, 0.15);
  background: rgba(255, 255, 255, 0.85);
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid rgba(0, 86, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 86, 255, 0.05);
  backdrop-filter: blur(4px);
  white-space: nowrap;
}

/* ==========================================================================
   Right Column: Text Content
   ========================================================================== */

.text-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}

.badge-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.error-badge {
  background: var(--color-primary);
  color: white;
  font-size: 0.9rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 1px;
  box-shadow: 0 10px 20px rgba(0, 86, 255, 0.2);
}

.error-badge-text {
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.error-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-text-1);
  line-height: 1.15;
  margin-bottom: 20px;
  letter-spacing: -2px;
}

.error-desc {
  font-size: 1.25rem;
  color: var(--color-text-2);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 480px;
}

/* CTA Return Button */
.back-home-btn {
  display: inline-flex;
  align-items: center;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 5px 6px 5px 24px;
  border-radius: 50px;
  box-shadow: 0 15px 30px rgba(0, 86, 255, 0.15);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color-primary);
  text-decoration: none;
}

.btn-text {
  margin-right: 20px;
}

.btn-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Button Hover Effects */
.back-home-btn:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(0, 86, 255, 0.25);
}

.back-home-btn:hover .btn-icon-wrapper {
  background: white;
  color: var(--color-primary-dark);
}

.back-home-btn:hover .btn-icon {
  transform: translateX(3px);
}

.back-home-btn:active {
  transform: translateY(-1px);
}

/* ==========================================================================
   Animations & Media Queries
   ========================================================================== */

@keyframes bobbing {
  0% {
    transform: translateZ(50px) translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateZ(50px) translateY(-10px) rotate(-1.5deg);
  }
  100% {
    transform: translateZ(50px) translateY(0px) rotate(0deg);
  }
}

@keyframes floatUp {
  0% {
    transform: translateY(20px) scale(0.7) rotate(-5deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-160px) scale(1.05) rotate(10deg);
    opacity: 0;
  }
}

@keyframes pulseGlow {
  0% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.95;
  }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .not-found-wrapper {
    gap: 40px;
  }
  
  .error-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .not-found-section {
    padding: 60px 20px;
  }

  .not-found-wrapper {
    flex-direction: column-reverse;
    text-align: center;
    gap: 50px;
  }

  .text-column {
    align-items: center;
  }

  .badge-container {
    justify-content: center;
  }

  .error-desc {
    max-width: 100%;
  }

  .illustration-column {
    min-height: 350px;
    width: 100%;
  }

  .books-stack {
    width: 250px;
  }
}
</style>
