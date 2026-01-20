<script setup lang="ts">
import { ref } from 'vue'
import type { UserPublic } from '@/types'
import Sidebar from '@/components/SideBar.vue'
import CreateUserForm from '@/components/CreateUserForm.vue'
import UserList from '@/components/UserList.vue'
import EditUser from '@/components/EditUser.vue'

const showCreateModal = ref(false)
const showEditModal = ref(false)
const editUser = ref<UserPublic | null>(null)

const openEdit = (user: UserPublic) => {
  editUser.value = user
  showEditModal.value = true
}

</script>

<template>
  <div class="layout-container">
    <Sidebar />
    <div class="main-content">
      <div class="container">
        <div class="header">
            <div>
              <h2>Users</h2>
              <p class="subtitle">Manage user access and permissions.</p>
            </div>
            <div class="add-btn-wrapper">
                <button class="add-btn" @click="showCreateModal = true">
                    <span class="plus-icon">+</span> Add User
                </button>
            </div>
        </div>

        <div class="table">
          <UserList ref="userListRef">
            <template #options="{ user }">
              <div class="action-menu-container">
                <button class="action-btn">⋮</button>
                <div class="dropdown-menu">
                  <button class="dropdown-item" @click="openEdit(user)">Edit</button>
                  <button class="dropdown-item delete">Delete</button>
                </div>
              </div>
            </template>
          </UserList>
        </div>

        <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
          <div class="modal-wrapper">
            <button class="close-btn" @click="showCreateModal = false">&times;</button>
            <CreateUserForm />
          </div>
        </div>
        
        <div v-if="showEditModal && editUser" class="modal-overlay" @click.self="showEditModal = false">
          <div class="modal-wrapper">
            <button class="close-btn" @click="showEditModal = false">&times;</button>
            <EditUser 
                :id="editUser.id"
                :email="editUser.email"
                :full_name="editUser.full_name"
                :is_active="editUser.is_active"
                :is_superuser="editUser.is_superuser"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #f4f5f8; /* Optional: adds a light background for content area */
  height: 100vh;
  overflow-y: auto; /* Allows scrolling in content area */
}

.container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 0.95rem;
  color: #6b7280;
}

.count-badge {
  background-color: #f3f4f6;
  color: #374151;
  font-size: 0.85rem;
  padding: 2px 10px;
  border-radius: 9999px;
  font-weight: 600;
}

.add-btn {
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.add-btn:hover {
  background-color: #222;
  transform: translateY(-1px);
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