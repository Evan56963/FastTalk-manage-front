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
            <label for="is_active">Active</label>
            <input 
            id="is_active"
            v-model="newUser.is_active" 
            type="checkbox" 
            />
        </div>

        <div class="form-group checkbox-group">
            <label for="is_superuser">Superuser</label>
            <input 
            id="is_superuser"
            v-model="newUser.is_superuser" 
            type="checkbox" 
            />
        </div>

        <button type="submit" class="submit-btn">Create User</button>
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
}

label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

input:not([type="checkbox"]) {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fafafa;
}

input:not([type="checkbox"]):focus {
  outline: none;
  border-color: #888;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

input[type="checkbox"] {
  accent-color: #333;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
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