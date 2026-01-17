<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { readUsers } from '@/http/user'
import type { UsersPublic } from '@/types'
import CreateUserForm from '@/components/CreateUserForm.vue'

const users = ref<UsersPublic | null>(null)
const showModal = ref(false)
const skip = ref(0)
const limit = 10

const totalPages = computed(() => users.value ? Math.ceil(users.value.count / limit) : 0)
const currentPage = computed(() => Math.floor(skip.value / limit) + 1)

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        skip.value += limit
    }
}

const prevPage = () => {
    if (skip.value > 0) {
        skip.value -= limit
    }
}

watch(skip, async () => {
    users.value = await readUsers(skip.value, limit)
}, { immediate: true })

</script>

<template>
  <div class="container">
    <div class="card" v-if="users">
      <div class="header">
        <h2>Users<span class="count-badge">{{ users.count }}</span></h2>
        <button class="add-btn" @click="showModal = true">
             <span class="plus-icon">+</span> Add User
        </button>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users.data" :key="user.email">
              <td>
                <span class="user-full-name">{{ user.full_name || 'N/A' }}</span>
              </td>
              <td>
                <span class="user-email">{{ user.email }}</span>
              </td>
              <td>
                <span :class="['role-badge', user.is_superuser? 'admin' : 'user']">
                {{ user.is_superuser ? 'Admin' : 'User' }}
                </span>
              </td>
              <td>
                <span :class="['status-badge', user.is_active ? 'active' : 'inactive']">
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="page-info">
          Showing {{ skip + 1 }} to {{ Math.min(skip + limit, users.count) }} of {{ users.count }} results
        </span>
        <div class="pagination-controls">
          <button class="page-nav-btn" @click="prevPage" :disabled="currentPage === 1">&lt;</button>
          <span class="page-number">Page {{ currentPage }} of {{ totalPages }}</span>
          <button class="page-nav-btn" @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
        </div>
      </div>
    </div>
    <div v-else class="loading-state">
      Loading...
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-wrapper">
        <button class="close-btn" @click="showModal = false">&times;</button>
        <CreateUserForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
}

.count-badge {
  background-color: #f3f4f6;
  color: #374151;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 500;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: #f9fafb;
  padding: 10px 24px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 12px 24px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f9fafb;
}

.user-full-name {
  font-weight: 500;
  color: #000000;
}

.user-email {
  color: #6b7280;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.role-badge.admin {
  background-color: #047b47;
  color: #ffffff;
}

.role-badge.user {
  background-color: #efecec;
  color: #000000;
}
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: #def7ec;
  color: #03543f;
}

.status-badge.inactive {
  background-color: #fde8e8;
  color: #9b1c1c;
}

.loading-state {
  text-align: center;
  color: #6b7280;
  padding: 40px;
}

.add-btn {
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-btn:hover {
  background-color: #000;
}

.plus-icon {
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
}

.page-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-nav-btn {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
}

.page-nav-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.page-nav-btn:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
  border-color: #e5e7eb;
}

.page-number {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-wrapper {
  position: relative;
  width: fit-content;
  max-width: 90%;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #999;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  color: #333;
  background-color: rgba(0,0,0,0.05);
}
</style>