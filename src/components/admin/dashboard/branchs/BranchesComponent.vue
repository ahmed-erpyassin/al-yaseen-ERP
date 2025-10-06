<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-building"></i> {{ t('label.company') }}</h1>

        <!-- Search and Add Branch -->
        <div class="d-flex align-items-center justify-content-between mb-3 mt-4">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="t('label.search_branch')" v-model="searchQuery" />
            </div>
            <router-link :to="{ name: 'admin.branches.create' }" class="btn btn-lg btn-success">
                {{ t('buttons.add_branch') }}
            </router-link>
        </div>

        <!-- Stats Cards -->
        <div class="row mb-4 g-3">
            <div class="col-md-4">
                <div class="card p-3 text-center">
                    <i class="bi bi-house-door-fill mb-2" style="font-size:2rem;"></i>
                    <div>{{ t('label.branches_count') }}</div>
                    <h4>{{ branches.length }}</h4>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3 text-center">
                    <i class="bi bi-people-fill mb-2" style="font-size:2rem;"></i>
                    <div>{{ t('label.users_count') }}</div>
                    <h4>{{ totalUsers }}</h4>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3 text-center">
                    <i class="bi bi-box-seam mb-2" style="font-size:2rem;"></i>
                    <div>{{ t('label.stores_count') }}</div>
                    <h4>{{ totalStores }}</h4>
                </div>
            </div>
        </div>

        <!-- Branches Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>{{ t('label.branch_name') }}</th>
                        <th>{{ t('label.manager') }}</th>
                        <th>{{ t('label.currency') }}</th>
                        <th>{{ t('label.city') }}</th>
                        <th>{{ t('label.country') }}</th>
                        <th>{{ t('label.status') }}</th>
                        <th>{{ t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredBranches.length === 0">
                        <td :colspan="7" class="text-center">No branches found</td>
                    </tr>
                    <tr v-else v-for="branch in filteredBranches" :key="branch.id">
                        <td>{{ branch.name }}</td>
                        <td>{{ branch.manager }}</td>
                        <td>{{ branch.currency }}</td>
                        <td>{{ branch.city }}</td>
                        <td>{{ branch.country }}</td>
                        <td>{{ branch.status }}</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewBranch(branch)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editBranch(branch)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteBranch(branch)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { reactive, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
    setup() {
        const { t } = useI18n();
        const router = useRouter();

        const searchQuery = ref('');

        const branches = reactive([
            { id: 1, name: 'فرع مسقط', manager: 'أحمد ياسين', currency: 'OMR', city: 'مسقط', country: 'عمان', status: 'نشط', users: 6, stores: 2 },
            { id: 2, name: 'فرع دبي', manager: 'محمد علي', currency: 'AED', city: 'دبي', country: 'الإمارات', status: 'نشط', users: 8, stores: 3 }
        ]);

        const totalUsers = computed(() => branches.reduce((sum, b) => sum + b.users, 0));
        const totalStores = computed(() => branches.reduce((sum, b) => sum + b.stores, 0));

        const filteredBranches = computed(() => {
            const q = searchQuery.value?.toLowerCase() || '';
            return branches.filter(
                b =>
                    b.name.toLowerCase().includes(q) ||
                    b.manager.toLowerCase().includes(q) ||
                    b.city.toLowerCase().includes(q) ||
                    b.country.toLowerCase().includes(q)
            );
        });

        const viewBranch = (branch) => {
            Swal.fire({
                title: `Branch: ${branch.name}`,
                html: `
                    <p>Manager: ${branch.manager}</p>
                    <p>Currency: ${branch.currency}</p>
                    <p>City: ${branch.city}</p>
                    <p>Country: ${branch.country}</p>
                    <p>Status: ${branch.status}</p>
                `,
                icon: 'info'
            });
        };

        const editBranch = (branch) => {
            router.push({ name: 'admin.branches.edit', params: { id: branch.id } });
        };

        const deleteBranch = (branch) => {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(result => {
                if (result.isConfirmed) {
                    const index = branches.findIndex(b => b.id === branch.id);
                    if (index !== -1) branches.splice(index, 1);
                    Swal.fire('تم الحذف!', '', 'success');
                }
            });
        };

        return { t, branches, searchQuery, filteredBranches, totalUsers, totalStores, viewBranch, editBranch, deleteBranch };
    }
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    margin: 0 5px;
    transition: transform 0.2s, opacity 0.3s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.action-icon.bi-eye {
    color: #0d6efd;
}

.action-icon.bi-pencil {
    color: #ffc107;
}

.action-icon.bi-trash {
    color: #dc3545;
}

.table-responsive {
    overflow-x: auto;
}

.search-bar input {
    max-width: 300px;
}
</style>
