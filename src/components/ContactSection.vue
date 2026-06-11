<template>
  <section class="contact-section">
    <div class="container">
      <div class="contact-card">
        <div class="contact-info">
          <span class="badge">Aloqa</span>
          <h2 class="title">Biz bilan bog'laning</h2>
          <p class="desc">Savollaringiz bormi? Bizga yozing yoki qo'ng'iroq qiling.</p>
          
          <div class="info-list">
            <div class="info-item">
              <div class="icon-circle">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span>Namangan shaxar alisher navoiy kochasi 11</span>
            </div>
            <br>
            <div class="info-item">
              <div class="icon-circle">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <span>+998973701818</span>
            </div>
          </div>
        </div>
        
        <form class="contact-form" @submit.prevent>
          <div class="form-group">
            <input type="text" :placeholder="$t('contact.form.name')" required>
          </div>
          <div class="form-group">
            <input type="tel" :placeholder="$t('contact.form.phone')" required>
          </div>
          <button type="submit" class="btn-submit">{{ $t('buttons.send') }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 100px 0;
  background: #fff;
}

.contact-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.05);
}

.contact-info {
  padding: 80px;
  background: var(--color-primary);
  color: white;
}

.contact-info .badge {
  color: rgba(255,255,255,0.8);
}

.contact-info .title {
  color: white;
  margin-bottom: 20px;
}

.contact-info .desc {
  opacity: 0.8;
  margin-bottom: 40px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.contact-form {
  padding: 80px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
}

.form-group input {
  width: 100%;
  padding: 18px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-alpha);
}

.btn-submit {
  padding: 18px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-weight: 800;
  font-size: 1.1rem;
  box-shadow: 0 15px 30px var(--color-primary-alpha);
  transition: var(--transition);
}

.btn-submit:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px var(--color-primary-alpha);
}

@media (max-width: 992px) {
  .contact-card { grid-template-columns: 1fr; }
  .contact-info, .contact-form { padding: 40px; }
}
</style>
