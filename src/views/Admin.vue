<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userDisplay, type UsersPublic } from '@/api/user'

const users = ref<UsersPublic | null>(null)

onMounted(async () => {
    users.value= await userDisplay(0, 100)
})

</script>

<template>
  <div class="container">
    <div class="card" v-if="users">
      <div class="header">
        <h2>Users<span class="count-badge">{{ users.count }}</span></h2>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
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
                <span :class="['status-badge', user.is_active ? 'active' : 'inactive']">
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <span :class="['role-badge', user.is_superuser? 'admin' : 'user']">
                {{ user.is_superuser ? 'Admin' : 'User' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="loading-state">
      Loading...
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 40px;
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
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
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
  padding: 12px 24px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 16px 24px;
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
</style>