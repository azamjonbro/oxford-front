<template>
  <div class="home-page">
    <HeroCarousel />
    <AboutSection />
    <BenefitsSection />
    <TeachersSection />
    <ResultsSection />
    <FaqSection />
    <EventsSection />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroCarousel from '../components/HeroCarousel.vue'
import AboutSection from '../components/AboutSection.vue'
import BenefitsSection from '../components/BenefitsSection.vue'
import TeachersSection from '../components/TeachersSection.vue'
import ResultsSection from '../components/ResultsSection.vue'
import FaqSection from '../components/FaqSection.vue'
import EventsSection from '../components/EventsSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>
