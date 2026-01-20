<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const isCollapsed = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="brand">
        <div class="logo-circle">F</div>
        <h1 class="logo-text" v-show="!isCollapsed">FastTalk</h1>
      </div>
      
      <!-- <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
      </button> -->
    </div>

    <nav class="nav-menu">
      <RouterLink to="/dashboard" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span v-show="!isCollapsed">Dashboard</span>
      </RouterLink>
      
      <RouterLink to="/admin" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
        <span v-show="!isCollapsed">Admin</span>
      </RouterLink>
    </nav>

    <div class="footer">
      <button class="logout-btn" @click="handleLogout" :title="isCollapsed ? 'Log out' : ''">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span v-show="!isCollapsed">Log out</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  border-right: 1px solid #333;
  transition: width 0.3s ease;
  position: relative;
}

.sidebar.collapsed {
  width: 80px;
  padding: 24px 12px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
  padding: 0 12px;
  position: relative;
  transition: all 0.3s ease;
}

.sidebar.collapsed .sidebar-header {
  flex-direction: column;
  gap: 20px;
  padding: 0;
  margin-bottom: 48px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
}

.toggle-btn {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: #666;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.toggle-btn:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.logo-circle {
  width: 32px;
  height: 32px;
  min-width: 32px;
  background-color: white;
  color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
}

.logo-text {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0;
  white-space: nowrap;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #888;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 12px;
}

.nav-item:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-active {
  background-color: #dbd8d8;
  color: #000;
  font-weight: 600;
}

.footer {
  margin-top: auto;
  border-top: 1px solid #333;
  padding-top: 16px;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid #333;
  color: #888;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar.collapsed .logout-btn {
  justify-content: center;
  padding: 12px;
}

.logout-btn:hover {
  border-color: #666;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
