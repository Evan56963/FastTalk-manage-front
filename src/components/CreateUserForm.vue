<script setup lang="ts">
import { ref } from 'vue'
import { createUser } from '@/http/user'
import type { UserCreate, UserPublic } from '@/types';

const newUser = ref<UserCreate>({
    email: '',
    password: '',
    full_name: null,
    is_active: true,
    is_superuser: false
})

const createdUser = ref<UserPublic | null>(null)

const handleSubmit = async () => {
    const user= await createUser(newUser.value)
    if ('email' in user){
        createdUser.value = user
    }
    else{
        alert(user.detail)
    }

}

const resetForm = () => {
    createdUser.value = null
    newUser.value = {
        email: '',
        password: '',
        full_name: null,
        is_active: true,
        is_superuser: false
    }
}
</script>

<template>
    <div class="create-user-container">
        <div v-if="createdUser" class="success-card">
            <div class="success-icon-wrapper">
                <span class="success-icon">✓</span>
            </div>
            <h3>User Created Successfully!</h3>
            
            <div class="user-details">
                <div class="detail-item">
                    <span class="label">Email</span>
                    <span class="value" :title="createdUser.email">{{ createdUser.email }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Full Name</span>
                    <span class="value" :title="createdUser.full_name || ''">{{ createdUser.full_name || 'N/A' }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Status</span>
                    <span :class="['status-badge', createdUser.is_active ? 'active' : 'inactive']">
                        {{ createdUser.is_active ? 'Active' : 'Inactive' }}
                    </span>
                </div>
                <div class="detail-item">
                    <span class="label">Role</span>
                    <span :class="['role-badge', createdUser.is_superuser ? 'admin' : 'user']">
                        {{ createdUser.is_superuser ? 'Admin' : 'User' }}
                    </span>
                </div>
            </div>

            <button @click="resetForm" class="submit-btn">Create Another</button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="create-user-form">
        <h2>Create New User</h2>
        
        <div class="form-group">
            <label for="email">Email</label>
            <input 
            id="email"
            v-model="newUser.email" 
            type="email" 
            placeholder="Enter email"
            required
            />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input 
            id="password"
            v-model="newUser.password" 
            type="password" 
            placeholder="Enter password"
            required
            />
        </div>

        <div class="form-group">
            <label for="full_name">Full Name</label>
            <input 
            id="full_name"
            v-model="newUser.full_name" 
            type="text" 
            placeholder="Enter full name"
            />
        </div>

        <div class="form-group checkbox-group">
            <div class="label-wrapper">
                <label for="is_active">Active</label>
                <span class="helper-text">User account status</span>
            </div>
            <label class="switch">
                <input 
                    id="is_active"
                    v-model="newUser.is_active" 
                    type="checkbox"
                />
                <span class="slider round active-color"></span>
            </label>
        </div>

        <div class="form-group checkbox-group">
            <div class="label-wrapper">
                <label for="is_superuser">Admin</label>
                <span class="helper-text">Grant admin privileges</span>
            </div>
            <label class="switch">
                <input 
                    id="is_superuser"
                    v-model="newUser.is_superuser" 
                    type="checkbox"
                />
                <span class="slider round admin-color"></span>
            </label>
        </div>

        <button type="submit" class="submit-btn">Create</button>
        </form>
    </div>
</template>

<style scoped>
.create-user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.create-user-form {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid #e5e7eb;
}

h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: 600;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.checkbox-group {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0;
}

label {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
}

.helper-text {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 2px;
}

/* Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

input:checked + .slider {
  background-color: #333;
}

input:focus + .slider {
  box-shadow: 0 0 1px #333;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Custom Colors */
input:checked + .slider.active-color {
  background-color: #10b981; /* Green */
}

input:checked + .slider.admin-color {
  background-color: #6366f1; /* Indigo */
}

input:not([type="checkbox"]) {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #f9fafb;
  color: #111827;
}

input:not([type="checkbox"]):focus {
  outline: none;
  border-color: #6b7280;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}


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
}

.submit-btn:hover {
  background-color: #000;
}

.submit-btn:active {
  transform: translateY(1px);
}

.success-card {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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
  min-width: 0; /* Important for flex child truncation */
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
.role-badge.admin { background-color: #047b47; color: #ffffff; } /* Indigo-ish */
.role-badge.user { background-color: #efecec; color: #000000; }
</style>