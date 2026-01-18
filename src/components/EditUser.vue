<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue';
import { updateUser } from '@/http/user'
import type { UserUpdate, UserPublic } from '@/types';

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
    full_name: false,
    status: false,
    role: false
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
        isEdit.status = false
        isEdit.role = false
    }
    else{
        alert(user.detail)
    }
}
</script>

<template>
    <div class="edit-container">
        <h2>Edit User</h2>
        
        <div class="field-item">
            <span class="label">Full Name:</span>
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
                <div v-if="isEdit.status" class="checkbox-wrap">
                    <input v-model="editingUser.is_active" type="checkbox" id="active-chk" />
                    <label for="active-chk">Active</label>
                </div>
                <span v-else :class="editingUser.is_active ? 'green-text' : 'red-text'">
                    {{ editingUser.is_active ? 'Active' : 'Inactive' }}
                </span>
            </div>
            <button class="icon-btn" @click="toggleEdit('status')">
                {{ isEdit.status ? '✕' : '✎' }}
            </button>
        </div>

        <div class="field-item">
            <span class="label">Role:</span>
            <div class="field-content">
                 <div v-if="isEdit.role" class="checkbox-wrap">
                    <input v-model="editingUser.is_superuser" type="checkbox" id="admin-chk" />
                    <label for="admin-chk">Admin</label>
                </div>
                <span v-else>{{ editingUser.is_superuser ? 'Admin' : 'User' }}</span>
            </div>
            <button class="icon-btn" @click="toggleEdit('role')">
                {{ isEdit.role ? '✕' : '✎' }}
            </button>
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

.checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
}

.green-text { color: #059669; font-weight: 500; }
.red-text { color: #dc2626; font-weight: 500; }
</style>