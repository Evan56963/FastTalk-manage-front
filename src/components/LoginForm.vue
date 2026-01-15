<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { login } from '@/api/auth'

const username = ref('')
const password = ref('')
const auth = useAuthStore()

const handleSubmit = async () => {
    try{
        const response =  await login(username.value, password.value)
        auth.setToken(response.access_token)
        // 這裡可以加入跳轉到其他頁面的邏輯，例如使用 Vue Router
    } catch (error) {
        console.error('Login failed:', error)
        alert('Login failed. Please check your credentials and try again.')
    }
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h2>login</h2>
      
      <div class="form-group">
        <label for="username">Email</label>
        <input 
          id="username"
          v-model="username" 
          type="text" 
          placeholder="user@example.com" 
          required 
          autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="Password" 
          required 
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="submit-btn">login</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login-form {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); /* 極淡的陰影 */
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

label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fafafa;
}

input:focus {
  outline: none;
  border-color: #888; /* 素色風格，聚焦時變深灰 */
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.submit-btn {
  padding: 0.85rem;
  background-color: #333; /* 深色按鈕 */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
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