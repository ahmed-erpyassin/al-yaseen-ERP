<template>
    <div class="container pe-5 ps-5">
        <LoadingComponent :isLoading="isLoading" />

        <h1>
            <i class="bi bi-cash-stack"></i> {{ $t('label.debit_notices') }}
        </h1>

        <!-- أزرار أعلى الصفحة -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.new-debit-notice' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.options') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <button class="dropdown-item text-danger" @click="confirmDelete">
                            <i class="bi bi-trash me-2"></i>{{ $t('buttons.delete') }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item" @click="exportExcel">
                            <i class="bi bi-file-earmark-excel me-2"></i>{{ $t('buttons.export_excel') }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_account')"
                    v-model="searchQuery" />
            </div>

            <!-- إعدادات الأعمدة -->
            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu rounded-0 p-2" style="width: 250px;">
                    <li v-for="(field, index) in table.fields" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{
                                field.name
                                }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">
                            {{ field.name }}
                        </th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="filteredItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            {{ $t('label.no_data') }}
                        </td>
                    </tr>
                    <tr v-else v-for="item in filteredItems" :key="item.id">
                        <td v-for="field in visibleFields" :key="field.key">
                            {{ item[field.key] || '-' }}
                        </td>
                        <td>
                            <i class="bi bi-eye action-icon me-2 text-primary" @click="viewItem(item)"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" @click="editItem(item)"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteItem(item)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name: 'DebitNoticesComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false,
            searchQuery: '',
            items: [],
            table: {
                fields: [
                    { name: this.$t('label.notification_number'), key: 'notification_no', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.hour'), key: 'hour', status: true },
                    { name: this.$t('label.account_no'), key: 'account_no', status: true },
                    { name: this.$t('label.customer_name'), key: 'customer_name', status: true },
                    { name: this.$t('label.amount'), key: 'amount', status: true },
                    { name: this.$t('label.registration_number'), key: 'registration_number', status: true },
                ],
            },
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter((f) => f.status);
        },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const q = this.searchQuery.toLowerCase();
            return this.items.filter((i) =>
                Object.values(i).some((v) => v?.toString().toLowerCase().includes(q))
            );
        },
    },
    methods: {
        async fetchData() {
            this.isLoading = true;
            try {
                const res = await axios.get('/finance/debit-notices/list-all');
                this.items = res.data.data || [];
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'فشل في تحميل البيانات', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'DebitNotices');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'DebitNotices.xlsx');
        },
        confirmDelete() {
            Swal.fire('تنبيه', 'حدد العناصر التي تريد حذفها من الجدول', 'info');
        },
        deleteItem(item) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، حذف',
                cancelButtonText: 'إلغاء',
            }).then(async (r) => {
                if (r.isConfirmed) {
                    try {
                        await axios.delete(`/finance/debit-notices/delete/${item.id}`);
                        this.items = this.items.filter((i) => i.id !== item.id);
                        Swal.fire('تم', 'تم الحذف بنجاح', 'success');
                    } catch (err) {
                        Swal.fire('خطأ', 'تعذر الحذف', 'error');
                    }
                }
            });
        },
        viewItem(item) {
            this.$router.push({ name: 'admin.view-debit-notice', params: { id: item.id } });
        },
        editItem(item) {
            this.$router.push({ name: 'admin.edit-debit-notice', params: { id: item.id } });
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-1px);
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: 0.3s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}
</style>
