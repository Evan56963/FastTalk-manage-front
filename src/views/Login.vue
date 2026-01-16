<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <main class="login-view">
    <div class="login-layout">
      <div class="branding-side">
        <div class="brand-content">
          <h1 class="brand-name">FastTalk</h1>
          <p class="brand-slogan">Seamless communication for everyone.</p>
        </div>
      </div>
      <div class="form-side">
        <div class="form-container">
          <LoginForm />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.login-view {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.login-layout {
  display: flex;
  width: 100%;
  height: 100%;
}

.branding-side {
  flex: 1;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 40px;
}

.branding-side::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.03) 0%, transparent 25%);
  top: 0;
  left: 0;
}

.brand-content {
  position: relative;
  z-index: 10;
  text-align: center;
}

.brand-name {
  font-size: 5rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  margin: 0;
  color: #ffffff;
  line-height: 1;
}

.brand-slogan {
  margin-top: 1.5rem;
  font-size: 1.125rem;
  color: #9ca3af;
  font-weight: 300;
  letter-spacing: 0.02em;
}

/* Right Side - Form */
.form-side {
  flex: 1;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-container {
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 850px) {
  .login-layout {
    flex-direction: column;
  }

  .branding-side {
    flex: 0 0 35%;
    align-items: flex-end;
    padding-bottom: 20px;
  }

  .brand-name {
    font-size: 3rem;
  }

  .form-side {
    flex: 1;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    margin-top: -24px; /* Slight overlap */
    position: relative;
    z-index: 20;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
  }
}
</style>