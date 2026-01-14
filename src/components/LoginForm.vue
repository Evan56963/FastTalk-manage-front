<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleSubmit = (e: Event) => {
  e.preventDefault()
  console.log('Login attempt:', { username: username.value, password: password.value })
}
</script>

<template>
  <form class="login-form" @submit="handleSubmit">
    <div class="form-header">
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to continue</p>
    </div>
    
    <div class="form-group">
      <label for="username">Username</label>
      <input 
        type="text" 
        id="username" 
        v-model="username"
        placeholder="Enter your username"
        required
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        v-model="password"
        placeholder="Enter your password"
        required
      />
    </div>
    
    <button type="submit" class="submit-btn">Sign In</button>
    
    <div class="form-footer">
      <a href="#" class="link">Forgot password?</a>
    </div>
  </form>
</template>

<style scoped>  
.login-form {
  max-width: 360px;
  width: 100%;
  padding: 2rem 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-form:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.form-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin: 0 0 0.375rem 0;
  letter-spacing: -0.3px;
}

.subtitle {
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.form-group input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  color: #000000;
  background: #f8f8f8;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #999999;
}

.form-group input:focus {
  outline: none;
  background: #ffffff;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #ffffff;
  background: #000000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: 0.25rem;
}

.submit-btn:hover {
  background: #333333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.submit-btn:active {
  transform: translateY(0);
}

.form-footer {
  text-align: center;
  margin-top: 1rem;
}

.link {
  font-size: 0.875rem;
  color: #666666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #000000;
  text-decoration: underline;
}
</style>