<template>
  <div class="app-container">
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
</script>

<style>
/* Global styles moved to src/assets/style/main.css */
</style>