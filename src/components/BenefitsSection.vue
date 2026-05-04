<template>
  <section class="benefits-section">
    <div class="container">
      <div class="section-header">
        <span class="badge">{{ $t('sections.benefits') }}</span>
        <h2 class="title">{{ $t('sections.benefits_title') }}</h2>
      </div>

      <div class="benefits-grid">
        <!-- 1. Student App (Main Hero Card) -->
        <div class="benefit-card app-card main-feature">
          <div class="card-content">
            <span class="card-tag">{{ $t('benefits.app.tag') }}</span>
            <h3>{{ $t('benefits.app.title') }}</h3>
            <p>{{ $t('benefits.app.desc') }}</p>
            <button class="btn-action">{{ $t('buttons.view_platform') }}</button>
          </div>
          <div class="app-visual">
            <div class="phone-frame">
              <img src="https://picsum.photos/400/800?random=app_v4" alt="App">
            </div>
          </div>
        </div>

        <!-- 2. BYD Prize -->
        <div class="benefit-card prize-card">
          <div class="prize-header">
            <span class="prize-tag">{{ $t('benefits.prize.tag') }}</span>
            <h3>{{ $t('benefits.prize.title') }}</h3>
          </div>
          <p>{{ $t('benefits.prize.desc') }}</p>
          <div class="car-visual">
            <img src="https://picsum.photos/500/300?random=car_v4" alt="BYD Car">
          </div>
        </div>

        <!-- 3. Expert Faculty -->
        <div class="benefit-card fac-card">
          <div class="icon-box">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3>{{ $t('benefits.experts.title') }}</h3>
          <p>{{ $t('benefits.experts.desc') }}</p>
        </div>

        <!-- 4. Academic Support -->
        <div class="benefit-card fac-card">
          <div class="icon-box">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h3>{{ $t('benefits.support.title') }}</h3>
          <p>{{ $t('benefits.support.desc') }}</p>
        </div>

        <!-- 5. IELTS X (Brand Blue Card) -->
        <div class="benefit-card ieltsx-card brand-bg">
          <span class="exclusive-tag">{{ $t('benefits.ieltsx.tag') }}</span>
          <h3>{{ $t('benefits.ieltsx.title') }}</h3>
          <p>{{ $t('benefits.ieltsx.desc') }}</p>
          <div class="bottom-tags">
            <span>Writing 8.5+</span>
            <span>Speaking 9.0</span>
          </div>
        </div>

        <!-- 6. Special Event Action (Small Card for Empty Slot) -->
        <div class="benefit-card register-card">
          <div class="icon-header">
            <div class="icon-circle">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </div>
          <h3>{{ $t('benefits.register.title') }}</h3>
          <p>{{ $t('benefits.register.desc') }}</p>
          <div class="arrow-action">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits-section {
  padding: 20px 0;
  background: #fff;
}

.section-header {
  margin-bottom: 70px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  gap: 30px;
}

.benefit-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 40px;
  border: 1px solid var(--color-border);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.benefit-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary);
  box-shadow: 0 30px 60px rgba(0, 82, 255, 0.1);
}

.benefit-card h3 {
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 15px;
  color: var(--color-text-1);
}

.benefit-card p {
  font-size: 1rem;
  color: var(--color-text-2);
  line-height: 1.6;
}

/* 1. App Card - PURE BRAND BLUE */
.app-card.brand-bg, .app-card {
  grid-column: span 2;
  grid-row: span 2;
  background: var(--color-primary);
  color: white;
  border: none;
  flex-direction: row;
  align-items: center;
  gap: 40px;
}

.app-card h3 { color: white; font-size: 2.5rem; }
.app-card p { color: rgba(255,255,255,0.8); }

.card-tag {
  background: rgba(255,255,255,0.2);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 25px;
  display: inline-block;
}

.btn-action {
  background: white;
  color: var(--color-primary);
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 800;
  margin-top: 35px;
  transition: var(--transition);
}

.btn-action:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.phone-frame {
  width: 220px;
  border-radius: 35px;
  padding: 8px;
  background: #0037a8;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

.phone-frame img { width: 100%; border-radius: 30px; }

/* 2. Prize Card */
.prize-tag {
  color: var(--color-primary);
  font-weight: 900;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-bottom: 10px;
  display: block;
}

.car-visual { margin-top: auto; }
.car-visual img { width: 100%; }

/* 3. Icon Cards */
.icon-box {
  width: 60px;
  height: 60px;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

/* 5. IELTS X - BRAND BLUE */
.ieltsx-card.brand-bg {
  background: #0046db; /* Slightly darker variant of brand blue for depth */
  color: white;
  border: none;
}

.ieltsx-card h3 { color: white; }
.ieltsx-card p { color: rgba(255,255,255,0.8); }

.exclusive-tag {
  font-weight: 900;
  font-size: 0.7rem;
  opacity: 0.6;
  margin-bottom: 20px;
}

.bottom-tags {
  margin-top: auto;
  display: flex;
  gap: 8px;
}

.bottom-tags span {
  background: rgba(255,255,255,0.1);
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}

/* 6. Register Card */
.register-card {
  cursor: pointer;
  border: 1px dashed var(--color-primary);
  background: var(--color-primary-alpha);
}

.register-card h3 {
  color: var(--color-primary);
  font-size: 1.4rem;
}

.arrow-action {
  margin-top: auto;
  color: var(--color-primary);
  display: flex;
  justify-content: flex-end;
  transition: var(--transition);
}

.register-card:hover .arrow-action {
  transform: translateX(10px);
}

@media (max-width: 992px) {
  .benefits-grid { grid-template-columns: 1fr 1fr; }
  .app-card { grid-column: span 2; }
}

@media (max-width: 768px) {
  .benefits-grid { grid-template-columns: 1fr; }
  .app-card { grid-column: span 1; flex-direction: column; text-align: center; }
  .app-card h3 { font-size: 1.8rem; }
}
</style>
