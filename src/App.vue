<template>
  <div class="app-container" :key="currentLocale">
    <MainHeader />
    <router-view />
    <MainFooter />
    <RegistrationModal />
  </div>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import RegistrationModal from './components/RegistrationModal.vue'
import { currentLocale } from './utils/localeStore'
</script>

<style>
/* Global styles moved to src/assets/style/main.css */
</style>