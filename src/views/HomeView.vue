<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">FastTalk</h1>
        <p class="hero-subtitle">Connect, communicate, collaborate in real-time</p>
        <div class="features">
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <span>Lightning Fast</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔒</span>
            <span>Secure</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🌐</span>
            <span>Global</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="login-section">
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
  position: relative;
  overflow: hidden;
}

.home-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 480px;
  color: #ffffff;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1.5px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #cccccc;
  margin: 0 0 2rem 0;
  font-weight: 300;
  letter-spacing: 0.3px;
}

.features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.feature-icon {
  font-size: 1.125rem;
}

.login-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .home-view {
    flex-direction: column;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 0.9375rem;
  }
  
  .features {
    gap: 0.75rem;
  }
}
</style>
