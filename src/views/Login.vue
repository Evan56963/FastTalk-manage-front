<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <main class="login-view">
    <LoginForm />
  </main>
</template>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5; /* 淺色素色背景 */
}
</style>