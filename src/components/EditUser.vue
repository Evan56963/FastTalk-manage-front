<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue';
import { updateUser } from '@/http/user'
import type { UserUpdate, UserPublic } from '@/types';
import Success from './Success.vue';

const editUser = defineProps<{
    id: string
    email: string
    is_active: boolean
    is_superuser: boolean
    full_name?: string | null
}>()

const editingUser = ref<UserUpdate>({
    email: editUser.email,
    full_name: editUser.full_name,
    is_active: editUser.is_active,
    is_superuser: editUser.is_superuser
})

const isEdit = reactive({
    email: false,
    full_name: false
})

const editedUser = ref<UserPublic | null>(null)

const toggleEdit = (field: keyof typeof isEdit) => {
    isEdit[field] = !isEdit[field]
}

const save = async () => {
    const user = await updateUser(editUser.id, Object.fromEntries(
      Object.entries(editingUser.value).filter(
        ([key, value]) => value !== editUser[key as keyof typeof editUser]
      )
    ))
    if ('email' in user){
        editedUser.value = user
        isEdit.email = false
        isEdit.full_name = false
    }
    else{
        alert(user.detail)
    }
}
</script>

<template>
    <Success 
        v-if="editedUser" 
        title="User Updated Successfully!"
        action-text="Back to Edit"
        :user="editedUser"
        @action="editedUser = null"
    />
    <div v-else class="edit-container">
        <h2>Edit User</h2>
        
        <div class="field-item">
            <span class="label">Name:</span>
            <div class="field-content">
                <input v-if="isEdit.full_name" v-model="editingUser.full_name" type="text" class="input" />
                <span v-else>{{ editingUser.full_name || 'N/A' }}</span>
            </div>
            <button class="icon-btn" @click="toggleEdit('full_name')">
                {{ isEdit.full_name ? '✕' : '✎' }}
            </button>
        </div>

        <div class="field-item">
            <span class="label">Email:</span>
            <div class="field-content">
                <input v-if="isEdit.email" v-model="editingUser.email" type="email" class="input" />
                <span v-else>{{ editingUser.email }}</span>
            </div>
            <button class="icon-btn" @click="toggleEdit('email')">
                {{ isEdit.email ? '✕' : '✎' }}
            </button>
        </div>

        <div class="field-item">
            <span class="label">Status:</span>
            <div class="field-content">
                <label class="switch">
                    <input v-model="editingUser.is_active" type="checkbox">
                    <span class="slider round active-color"></span>
                </label>
                <span class="switch-label">{{ editingUser.is_active ? 'Active' : 'Inactive' }}</span>
            </div>
        </div>

        <div class="field-item">
            <span class="label">Role:</span>
            <div class="field-content">
                <label class="switch">
                    <input v-model="editingUser.is_superuser" type="checkbox">
                    <span class="slider round admin-color"></span>
                </label>
                <span class="switch-label">{{ editingUser.is_superuser ? 'Admin' : 'User' }}</span>
            </div>
        </div>

        <button class="save-btn" @click="save">Save Changes</button>
    </div>
</template>

<style scoped>
.edit-container {
    background: white;
    padding: 32px;
    border-radius: 8px;
    width: 400px;
    max-width: 90vw;
}

h2 {
    margin-top: 0;
    margin-bottom: 24px;
    font-size: 1.5rem;
    color: #111827;
}

.field-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    min-height: 36px;
}

.label {
    width: 80px;
    font-weight: 500;
    color: #6b7280;
    flex-shrink: 0;
}

.field-content {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 8px;
}

.input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.875rem;
}

.icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    color: #9ca3af;
    padding: 4px;
    line-height: 1;
    border-radius: 4px;
}

.icon-btn:hover {
    background-color: #f3f4f6;
    color: #374151;
}

.save-btn {
    margin-top: 24px;
    width: 100%;
    background-color: #111827;
    color: white;
    padding: 10px;
    border-radius: 6px;
    border: none;
    font-weight: 500;
    cursor: pointer;
}

.save-btn:hover {
    background-color: #000;
}

.switch-label {
    margin-left: 10px;
    font-size: 0.9rem;
    color: #374151;
    min-width: 60px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
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
  height: 16px;
  width: 16px;
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
  transform: translateX(18px);
}

.slider.round {
  border-radius: 22px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Custom Colors */
input:checked + .slider.active-color {
  background-color: #10b981; 
}

input:checked + .slider.admin-color {
  background-color: #6366f1; 
}
</style>