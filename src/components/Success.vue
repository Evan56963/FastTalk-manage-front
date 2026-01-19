<script setup lang="ts">
import type { UserPublic } from '@/types';

defineProps<{
    title: string
    actionText?: string
    user: UserPublic
}>()

defineEmits<{
    (e: 'action'): void
}>()
</script>

<template>
    <div class="success-card">
        <div class="success-icon-wrapper">
            <span class="success-icon">✓</span>
        </div>
        <h3>{{ title }}</h3>
        
        <div class="user-details">
            <div class="detail-item">
                <span class="label">Email</span>
                <span class="value" :title="user.email">{{ user.email }}</span>
            </div>
            <div class="detail-item">
                <span class="label">Full Name</span>
                <span class="value" :title="user.full_name || ''">{{ user.full_name || 'N/A' }}</span>
            </div>
            <div class="detail-item">
                <span class="label">Status</span>
                <span :class="['status-badge', user.is_active ? 'active' : 'inactive']">
                    {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
            </div>
            <div class="detail-item">
                <span class="label">Role</span>
                <span :class="['role-badge', user.is_superuser ? 'admin' : 'user']">
                    {{ user.is_superuser ? 'Admin' : 'User' }}
                </span>
            </div>
            <div class="detail-item">
                <span class="label">id</span>
                <span class="value" :title="user.id">{{ user.id }}</span>
            </div>
        </div>
            <button v-if="actionText" @click="$emit('action')" class="submit-btn">{{ actionText }}</button>
    </div>
</template>

<style scoped>
.success-card {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 520px;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.success-icon-wrapper {
  width: 60px;
  height: 60px;
  background-color: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.success-icon {
  color: #10b981;
  font-size: 2rem;
  font-weight: bold;
}

.success-card h3 {
  margin: 0 0 1.5rem;
  color: #111827;
  font-size: 1.25rem;
}

.user-details {
  background-color: #f9fafb;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #f3f4f6;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  min-width: 0;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item .label {
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
  margin-right: 1rem;
  flex-shrink: 0;
}

.detail-item .value {
  color: #111827;
  font-weight: 600;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.status-badge, .role-badge {
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active { background-color: #def7ec; color: #03543f; }
.status-badge.inactive { background-color: #fde8e8; color: #9b1c1c; }
.role-badge.admin { background-color: #047b47; color: #ffffff; }
.role-badge.user { background-color: #efecec; color: #000000; }

.submit-btn {
  padding: 0.85rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #000;
}
</style>
