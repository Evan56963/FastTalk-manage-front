<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <div class="layout-container">
    <SideBar />
    <main class="main-content">
      <div class="container">
        <header class="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p class="subtitle">Overview of your FastTalk application.</p>
          </div>
        </header>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.main-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  height: 100vh;
  box-sizing: border-box;
}

.container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 0.95rem;
  color: #6b7280;
}

</style>
