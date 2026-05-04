<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-col brand-col">
          <router-link to="/" class="footer-logo">OXFORD</router-link>
          <p class="footer-about">
            {{ t('footer.about_text') }}
          </p>
          <div class="social-links">
            <a href="#" class="social-btn instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" class="social-btn telegram" aria-label="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
            <a href="#" class="social-btn youtube" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" class="social-btn facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        <!-- Links Column -->
        <div class="footer-col">
          <h4 class="col-title">{{ t('footer.links') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/">{{ t('nav.home') }}</router-link></li>
            <li><router-link to="/courses">{{ t('nav.courses') }}</router-link></li>
            <li><router-link to="/teachers">{{ t('nav.teachers') }}</router-link></li>
            <li><router-link to="/about">{{ t('nav.about') }}</router-link></li>
            <li><router-link to="/contact">{{ t('nav.contact') }}</router-link></li>
          </ul>
        </div>

        <!-- Courses Column -->
        <div class="footer-col">
          <h4 class="col-title">{{ t('nav.courses') }}</h4>
          <ul class="footer-links">
            <li><a href="#">IELTS Rocket</a></li>
            <li><a href="#">General English</a></li>
            <li><a href="#">CEFR Preparation</a></li>
            <li><a href="#">Kids English</a></li>
            <li><a href="#">Business English</a></li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div class="footer-col">
          <h4 class="col-title">{{ t('nav.contact') }}</h4>
          <ul class="contact-info">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{{ t('contact.address_text') }}</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+998 90 000 00 00</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info@oxfort.uz</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} OXFORD Learning Center. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 5rem 0 2.5rem;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: 900;
  color: #2563eb;
  text-decoration: none;
  font-family: 'Outfit', sans-serif;
  display: block;
  margin-bottom: 1.5rem;
}

.footer-about {
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.3s;
}

.social-btn:hover {
  background: #2563eb;
  color: white;
  transform: translateY(-5px);
}

.col-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  font-family: 'Outfit', sans-serif;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: #2563eb;
  padding-left: 5px;
}

.contact-info {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-info li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  font-size: 0.95rem;
  line-height: 1.5;
}

.contact-info svg {
  color: #2563eb;
  flex-shrink: 0;
}

.footer-bottom {
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer { padding: 4rem 0 2rem; }
}
</style>
