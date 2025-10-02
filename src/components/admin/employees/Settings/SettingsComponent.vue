<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-gear-fill"></i> {{ $t('label.settings') }}</h1>

        <!-- تبويبات الإعدادات -->
        <ul class="nav nav-tabs mb-3" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">
                    {{ $t('label.users_management') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" :class="{ active: activeTab === 'roles' }" @click="activeTab = 'roles'">
                    {{ $t('label.roles_permissions') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">
                    {{ $t('label.general_settings') }}
                </button>
            </li>
        </ul>

        <!-- تبويب المستخدمين -->
        <div v-if="activeTab === 'users'">
            <button class="btn btn-main mb-3" @click="openUserModal">{{ $t('buttons.add') }}</button>
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{{ $t('label.name') }}</th>
                        <th>{{ $t('label.email') }}</th>
                        <th>{{ $t('label.role') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon me-2" @click="editUser(user)"></i>
                            <i class="bi bi-trash action-icon" @click="deleteUser(user)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- تبويب الأدوار -->
        <div v-if="activeTab === 'roles'">
            <button class="btn btn-main mb-3" @click="openRoleModal">{{ $t('buttons.add_role') }}</button>
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{{ $t('label.role_name') }}</th>
                        <th>{{ $t('label.permissions') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="role in roles" :key="role.id">
                        <td>{{ role.id }}</td>
                        <td>{{ role.name }}</td>
                        <td>{{ role.permissions.join(', ') }}</td>
                        <td>
                            <i class="bi bi-pencil action-icon me-2" @click="editRole(role)"></i>
                            <i class="bi bi-trash action-icon" @click="deleteRole(role)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- تبويب الإعدادات العامة -->
        <div v-if="activeTab === 'general'">
            <form>
                <div class="mb-3">
                    <label>{{ $t('label.currency') }}</label>
                    <input v-model="generalSettings.currency" type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label>{{ $t('label.financial_year') }}</label>
                    <input v-model="generalSettings.financial_year" type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label>{{ $t('label.branches') }}</label>
                    <input v-model="generalSettings.branches" type="text" class="form-control"
                        placeholder="Branch1, Branch2" />
                </div>
                <div class="mb-3 form-check">
                    <input v-model="generalSettings.notifications" type="checkbox" class="form-check-input"
                        id="notificationsCheck">
                    <label class="form-check-label" for="notificationsCheck">{{ $t('label.enable_notifications')
                        }}</label>
                </div>
                <button type="button" class="btn btn-main" @click="saveGeneralSettings">{{ $t('buttons.save')
                    }}</button>
            </form>
        </div>

    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
    name: 'SettingsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false,
            useApi: false,
            activeTab: 'users',
            users: [],
            roles: [],
            generalSettings: {
                currency: 'USD',
                financial_year: '2025',
                branches: 'Main',
                notifications: true,
            },
            editUserData: {},
            editRoleData: {},
        };
    },
    methods: {
        // ================== Users ==================
        fetchUsers() {
            this.isLoading = true;
            if (this.useApi) {
                axios.get('/api/v1/users')
                    .then(res => this.users = res.data.data)
                    .catch(() => Swal.fire('Error', 'Failed to fetch users', 'error'))
                    .finally(() => this.isLoading = false);
            } else {
                this.users = [
                    { id: 1, name: 'Ali', email: 'ali@test.com', role: 'HR' },
                    { id: 2, name: 'Sara', email: 'sara@test.com', role: 'Employee' },
                ];
                this.isLoading = false;
            }
        },
        openUserModal() {
            this.editUserData = { name: '', email: '', role: '' };
            new bootstrap.Modal(document.getElementById('userModal'))?.show();
        },
        editUser(user) {
            this.editUserData = { ...user };
            new bootstrap.Modal(document.getElementById('userModal'))?.show();
        },
        deleteUser(user) {
            Swal.fire({ title: 'Confirm Delete?', icon: 'warning', showCancelButton: true })
                .then(res => { if (res.isConfirmed) this.users = this.users.filter(u => u.id !== user.id); });
        },

        // ================== Roles ==================
        fetchRoles() {
            this.isLoading = true;
            if (this.useApi) {
                axios.get('/api/v1/roles')
                    .then(res => this.roles = res.data.data)
                    .catch(() => Swal.fire('Error', 'Failed to fetch roles', 'error'))
                    .finally(() => this.isLoading = false);
            } else {
                this.roles = [
                    { id: 1, name: 'HR', permissions: ['Read', 'Write'] },
                    { id: 2, name: 'Employee', permissions: ['Read'] },
                ];
                this.isLoading = false;
            }
        },
        openRoleModal() {
            this.editRoleData = { name: '', permissions: [] };
            new bootstrap.Modal(document.getElementById('roleModal'))?.show();
        },
        editRole(role) {
            this.editRoleData = { ...role };
            new bootstrap.Modal(document.getElementById('roleModal'))?.show();
        },
        deleteRole(role) {
            Swal.fire({ title: 'Confirm Delete?', icon: 'warning', showCancelButton: true })
                .then(res => { if (res.isConfirmed) this.roles = this.roles.filter(r => r.id !== role.id); });
        },

        // ================== General Settings ==================
        saveGeneralSettings() {
            Swal.fire('Success', 'Settings saved', 'success');
        }
    },
    mounted() {
        this.fetchUsers();
        this.fetchRoles();
    }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
