<script setup lang="ts">
import { ref } from 'vue'
import { createUser } from '@/http/user'
import type { UserCreate } from '@/types';

const newUser = ref<UserCreate>({
    email: '',
    password: '',
    full_name: null,
    is_active: true,
    is_superuser: false
})

const handleSubmit = async () => {
    const user= await createUser(newUser.value)
    if ('email' in user){
        alert(`User ${user.email} created successfully!`)
    }
    else{
        alert(user.detail)
    }

}
</script>

<template>
    <div class="create-user-container">
        <form @submit.prevent="handleSubmit" class="create-user-form">
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
                <label for="is_superuser">Superuser</label>
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid #eaeaea;
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
</style>