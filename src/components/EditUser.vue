<script setup lang="ts">
import { reactive } from 'vue'
import { updateUser } from '@/http/user'
import type { UserUpdate } from '@/types';

// 接收使用者原始資料
const user = defineProps<{
    id: string
    email: string
    is_active: boolean
    is_superuser: boolean
    full_name?: string | null
}>()

// 本地表單資料，用於編輯
const formData = reactive({
    email: user.email,
    full_name: user.full_name || '',
    is_active: user.is_active,
    is_superuser: user.is_superuser
})

// 追蹤每個欄位是否處於編輯模式
const editing = reactive({
    email: false,
    full_name: false,
    is_active: false,
    is_superuser: false
})

// 切換編輯狀態：如果是取消編輯 (false)，則將資料還原為原始 props
const toggleEdit = (field: keyof typeof editing) => {
    if (editing[field]) {
        // 取消編輯，還原資料
        if (field === 'email') formData.email = user.email
        if (field === 'full_name') formData.full_name = user.full_name || ''
        if (field === 'is_active') formData.is_active = user.is_active
        if (field === 'is_superuser') formData.is_superuser = user.is_superuser
    }
    editing[field] = !editing[field]
}

const save = async () => {
    const payload: Record<string, any> = {}
    
    // 只加入有變更的欄位
    if (formData.email !== user.email) payload.email = formData.email
    if (formData.full_name !== (user.full_name || '')) payload.full_name = formData.full_name
    if (formData.is_active !== user.is_active) payload.is_active = formData.is_active
    if (formData.is_superuser !== user.is_superuser) payload.is_superuser = formData.is_superuser
    
    // 如果有資料變更則送出請求
    if (Object.keys(payload).length > 0) {
        try {
            await updateUser(user.id, payload)
            // 更新成功後，關閉所有編輯狀態 (變回展示模式)
            Object.keys(editing).forEach(k => editing[k as keyof typeof editing] = false)
        } catch (e) {
            console.error('Update failed', e)
            alert('Failed to update user')
        }
    } else {
        // 如果沒變更，直接關閉所有編輯狀態
        Object.keys(editing).forEach(k => editing[k as keyof typeof editing] = false)
    }
}
</script>

<template>
    <div class="edit-container">
        <h2>Edit User</h2>
        
        <div class="field-item">
            <span class="label">Full Name:</span>
            <div class="field-content">
                <input v-if="editing.full_name" v-model="formData.full_name" type="text" class="input" />
                <span v-else>{{ formData.full_name || 'N/A' }}</span>
            </div>
            <button class="icon-btn" @click="toggleEdit('full_name')">
                {{ editing.full_name ? '✕' : '✎' }}
            </button>
        </div>

        <div class="field-item">
            <span class="label">Email:</span>
            <div class="field-content">
                <input v-if="editing.email" v-model="formData.email" type="email" class="input" />
                <span v-else>{{ formData.email }}</span>
            </div>
            <button class="icon-btn" @click="toggleEdit('email')">
                {{ editing.email ? '✕' : '✎' }}
            </button>
        </div>

        <div class="field-item">
            <span class="label">Status:</span>
            <div class="field-content">
                <div v-if="editing.is_active" class="checkbox-wrap">
                    <input v-model="formData.is_active" type="checkbox" id="active-chk" />
                    <label for="active-chk">Active</label>
                </div>
                <span v-else :class="formData.is_active ? 'green-text' : 'red-text'">
                    {{ formData.is_active ? 'Active' : 'Inactive' }}
                </span>
            </div>
            <button class="icon-btn" @click="toggleEdit('is_active')">
                {{ editing.is_active ? '✕' : '✎' }}
            </button>
        </div>

        <div class="field-item">
            <span class="label">Role:</span>
            <div class="field-content">
                 <div v-if="editing.is_superuser" class="checkbox-wrap">
                    <input v-model="formData.is_superuser" type="checkbox" id="admin-chk" />
                    <label for="admin-chk">Admin</label>
                </div>
                <span v-else>{{ formData.is_superuser ? 'Admin' : 'User' }}</span>
            </div>
            <button class="icon-btn" @click="toggleEdit('is_superuser')">
                {{ editing.is_superuser ? '✕' : '✎' }}
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