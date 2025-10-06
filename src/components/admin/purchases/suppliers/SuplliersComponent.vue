<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- أزرار إضافة وحذف -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.new-supplier' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
        </div>

        <!-- بحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_supplier')"
                    v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول الموردين -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedSuppliers.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No suppliers found</td>
                    </tr>
                    <tr v-else v-for="supplier in paginatedSuppliers" :key="supplier.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ supplier[field.key] }}</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewSupplier(supplier)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editSupplier(supplier)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteSupplier(supplier)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ $t('buttons.previous') }}
            </button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t('buttons.next') }}
            </button>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name: 'SuppliersComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            useApi: true, // ضع false لتجربة بيانات وهمية
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            suppliers: [],
            table: {
                fields: [
                    { name: 'Number', key: 'number', status: true },
                    { name: 'Supplier Name', key: 'supplier_name', status: true },
                    { name: 'Balance', key: 'balance', status: true },
                    { name: 'Currency', key: 'currency', status: true },
                    { name: 'Branch', key: 'branch', status: true },
                    { name: 'Last Transaction', key: 'last_transaction', status: true },
                    { name: 'Mobile', key: 'mobile', status: true },
                    { name: 'Sales Rep', key: 'sales_representative', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredSuppliers() {
            if (!this.searchQuery) return this.suppliers;
            const q = this.searchQuery.toLowerCase();
            return this.suppliers.filter(s =>
                Object.values(s).some(v => v && v.toString().toLowerCase().includes(q))
            );
        },
        paginatedSuppliers() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredSuppliers.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredSuppliers.length / this.perPage);
        }
    },
    methods: {
        async fetchSuppliers() {
            this.isLoading = true;

            if (this.useApi) {
                try {
                    const token = localStorage.getItem('authToken'); // تأكد أن التوكن محفوظ في localStorage
                    // console.log('authToken:', token);
                    // const baseUrl = process.env.VUE_APP_API_BASE_URL; // قاعدة API من .env

                    // طلب API كامل
                    const res = await axios.get('/suppliers/list', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    });


                    // تعيين البيانات
                    this.suppliers = res.data.data || res.data;
                } catch (err) {
                    console.error('Fetch suppliers error:', err);

                    if (err.response && err.response.status === 401) {
                        Swal.fire('Unauthorized', 'تأكد من تسجيل الدخول أو صلاحية التوكن', 'error');
                    } else {
                        Swal.fire('Error', 'فشل في جلب بيانات الموردين', 'error');
                    }
                } finally {
                    this.isLoading = false;
                }
            } else {
                // بيانات وهمية
                this.suppliers = Array.from({ length: 20 }, (_, i) => ({
                    id: i + 1,
                    number: `SUP-${1000 + i}`,
                    supplier_name: `Supplier ${i + 1}`,
                    balance: (Math.random() * 10000).toFixed(2),
                    currency: ["USD", "ILS", "EUR"][i % 3],
                    branch: ["Main Branch", "Gaza Branch", "Ramallah Branch"][i % 3],
                    last_transaction: new Date(2025, i % 12, (i + 1) * 2).toISOString().split('T')[0],
                    mobile: `059${1000000 + i}`,
                    sales_representative: `Sales Rep ${i + 1}`
                }));
                this.isLoading = false;
            }
        },
        viewSupplier(supplier) {
            this.$router.push({
                name: 'admin.purchase.suppliers.details',
                query: { id: supplier.id }
            });
        },
        editSupplier(supplier) {
            // يمكن إضافة نافذة تعديل هنا
            Swal.fire('Edit', `Edit supplier: ${supplier.supplier_name}`, 'info');
        },
        deleteSupplier(supplier) {
            Swal.fire({ title: 'Confirm Delete?', icon: 'warning', showCancelButton: true })
                .then(res => {
                    if (res.isConfirmed) {
                        if (this.useApi) {
                            axios.delete(`https://alyaseenerp.com/api/v1/suppliers/${supplier.id}`)
                                .then(() => this.fetchSuppliers())
                                .catch(() => Swal.fire('Error', 'Failed to delete', 'error'));
                        } else {
                            const idx = this.suppliers.findIndex(s => s.id === supplier.id);
                            if (idx !== -1) this.suppliers.splice(idx, 1);
                        }
                    }
                });
        },
        deleteSelected() {
            Swal.fire('Info', 'Implement delete selected functionality', 'info');
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
    },
    mounted() {
        this.fetchSuppliers();
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
