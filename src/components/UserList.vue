<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { readUsers } from '@/http/user'
import type { UsersPublic } from '@/types'

const users = ref<UsersPublic | null>(null)
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
  <div>
    <div v-if="users">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style="width: 48px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users.data" :key="user.id">
              <td>
                <span :class="['user-full-name', { 'text-placeholder': !user.full_name }]">
                  {{ user.full_name || 'N/A' }}
                </span>
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
              <td>
                 <slot name="options" :user="user"></slot>
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
  </div>
</template>

<style scoped>
/* .header {
  padding: 14px 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

/* h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
} */

/* .description {
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  color: #6b7280;
} */

/* .count-badge {
  background-color: #f3f4f6;
  color: #374151;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 500;
} */

.table-wrapper {
  overflow: visible;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: #eff1f3;
  padding: 12px 24px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 10px 24px;
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

.user-full-name.text-placeholder {
  color: #9ca3af;
  font-weight: 400;
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

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
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
</style>
