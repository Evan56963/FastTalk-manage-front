<script setup lang="ts">
import { ref } from 'vue'
import CreateUserForm from '@/components/CreateUserForm.vue'
import UserList from '@/components/UserList.vue'

const showModal = ref(false)
</script>

<template>
  <div class="container">
    <div class="table">
      <UserList>
        <template #actions>
          <button class="add-btn" @click="showModal = true">
             <span class="plus-icon">+</span> Add User
          </button>
        </template>
        
        <template #options="{ user }">
          <div class="action-menu-container">
            <button class="action-btn">⋮</button>
            <div class="dropdown-menu">
              <button class="dropdown-item">Edit</button>
              <button class="dropdown-item delete">Delete</button>
            </div>
          </div>
        </template>
      </UserList>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-wrapper">
        <button class="close-btn" @click="showModal = false">&times;</button>
        <CreateUserForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.add-btn {
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-btn:hover {
  background-color: #000;
}

.plus-icon {
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-wrapper {
  position: relative;
  width: fit-content;
  max-width: 90%;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #999;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  color: #333;
  background-color: rgba(0,0,0,0.05);
}

.action-menu-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.action-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.dropdown-menu {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 120px;
  padding: 4px 0;
}

.action-menu-container:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

.dropdown-item.delete {
  color: #ef4444;
}

.dropdown-item.delete:hover {
  background-color: #fef2f2;
}
</style>