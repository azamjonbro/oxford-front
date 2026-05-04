<template>
  <footer class="main-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-brand">
          <div class="logo">OXFORD</div>
          <p class="brand-desc">
            {{ $t('footer.desc') }}
          </p>
          <div class="social-links">
            <a href="#" class="social-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="social-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="social-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-nav">
          <h4>{{ $t('footer.pages') }}</h4>
          <ul>
            <li><router-link to="/courses">{{ $t('nav.courses') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
            <li><router-link to="/teachers">{{ $t('nav.teachers') }}</router-link></li>
            <li><router-link to="/contact">{{ $t('nav.contact') }}</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-contact">
          <h4>{{ $t('footer.contact') }}</h4>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{{ $t('footer.address') }}</span>
          </div>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+998 90 123 45 67</span>
          </div>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2-2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>info@oxford.uz</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 OXFORD Learning Center. {{ $t('footer.rights') }}</p>
        <div class="bottom-links">
          <a href="#">{{ $t('footer.privacy') }}</a>
          <a href="#">{{ $t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background: var(--color-text-1);
  color: white;
  padding: 100px 0 40px;
  position: relative;
  overflow: hidden;
}

.main-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), transparent);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 80px;
  margin-bottom: 80px;
}

.footer-brand .logo {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin-bottom: 25px;
  color: white;
}

.brand-desc {
  opacity: 0.6;
  line-height: 1.8;
  margin-bottom: 30px;
  max-width: 400px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: rgba(255,255,255,0.8);
}

.social-icon:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-5px);
}

.footer-nav h4, .footer-contact h4 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 30px;
  position: relative;
}

.footer-nav h4::after, .footer-contact h4::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 30px;
  height: 2px;
  background: var(--color-primary);
}

.footer-nav ul {
  display: grid;
  gap: 15px;
}

.footer-nav a {
  opacity: 0.6;
  transition: var(--transition);
}

.footer-nav a:hover {
  opacity: 1;
  color: var(--color-primary);
  padding-left: 5px;
}

.footer-contact {
  display: grid;
  gap: 20px;
}

.contact-item {
  display: flex;
  gap: 15px;
  opacity: 0.6;
}

.contact-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.4;
}

.bottom-links {
  display: flex;
  gap: 30px;
}

.bottom-links a:hover {
  text-decoration: underline;
}

@media (max-width: 992px) {
  .footer-grid { grid-template-columns: 1.5fr 1fr; gap: 50px; }
  .footer-brand { grid-column: span 2; }
}

@media (max-width: 768px) {
  .main-footer { padding: 60px 0 30px; }
  .footer-grid { grid-template-columns: 1fr; gap: 40px; }
  .footer-brand { grid-column: span 1; }
  .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
  .bottom-links { justify-content: center; width: 100%; }
}
</style>
