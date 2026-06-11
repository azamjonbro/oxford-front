<template>
  <div class="home-page">
    <section class="home-section"><HeroCarousel /></section>
    <section class="home-section"><AboutSection /></section>
    <section class="home-section"><BenefitsSection /></section>
    <section class="home-section"><TeachersSection /></section>
    <section class="home-section"><ResultsSection /></section>
    <section class="home-section"><FaqSection /></section>
    <section class="home-section"><EventsSection /></section>
    <section class="home-section"><ContactSection /></section>
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

.home-section {
  margin-bottom: 2rem;
}
</style>
