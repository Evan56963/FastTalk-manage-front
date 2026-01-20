<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { useAuthStore } from '@/stores/auth';
const counterStore = useCounterStore();
const authStore = useAuthStore();
const increment = () => {
    counterStore.increment();
    const counter = useCounterStore();
    console.log(counter.count);
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Counter: {{ counterStore.count }}</p>
    <button @click="increment">Increment</button>
    <button @click="authStore.logout()">Logout</button>
  </div>
</template>

<style scoped>
</style>
