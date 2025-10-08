<template>
    <div class="container pe-5 ps-5">
        <LoadingComponent :isLoading="isLoading" />

        <h1><i class="bi bi-arrow-left-right"></i> {{ $t('label.credit_notices') }} — {{ $t('label.purchases') }}</h1>

        <!-- أزرار أعلى -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.new-purchase-credit-notice' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ $t('buttons.import_excel') }}
                            <input type="file" @change="importExcel" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- شريط البحث + تبديل الأعمدة -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 260px;">
                    <li class="px-2 mb-2 fw-bold">{{ $t('label.toggle_columns') }}</li>
                    <li v-for="(field, index) in table.fields" :key="field.key">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
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
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 2" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 2" class="text-center">{{ $t('label.no_data') }}</td>
                    </tr>
                    <tr v-else v-for="notice in paginatedItems" :key="notice.id">
                        <td>
                            <input type="checkbox" class="form-check-input" :value="notice.id" v-model="selectedIds">
                        </td>
                        <td v-for="field in visibleFields" :key="field.key">
                            {{ formatCell(notice, field.key) }}
                        </td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"
                                @click="viewItem(notice)"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="$t('buttons.edit')"
                                @click="editItem(notice)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(notice)"></i>
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
            <div class="d-flex align-items-center gap-2">
                <select class="form-select" style="width:auto" v-model.number="perPage">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                </select>
                <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                    {{ $t('buttons.next') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

export default {
    name: 'PurchaseCreditNoticesComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            items: [],
            selectedIds: [],
            table: {
                fields: [
                    { name: this.$t('label.notification_number'), key: 'notification_number', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.hour'), key: 'hour', status: true },
                    { name: this.$t('label.account_no'), key: 'account_no', status: true },
                    { name: this.$t('label.supplier_name'), key: 'supplier_name', status: true },
                    { name: this.$t('label.licensed_operator'), key: 'licensed_operator', status: true },
                    { name: this.$t('label.amount'), key: 'amount', status: true },
                    { name: this.$t('label.currency'), key: 'currency', status: true },
                    { name: this.$t('label.registration_number'), key: 'registration_number', status: true },
                ],
            },
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const q = this.searchQuery.toLowerCase();
            return this.items.filter(item =>
                Object.values(item).some(val => (val ?? '').toString().toLowerCase().includes(q))
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.filteredItems.length / this.perPage));
        },
        allVisibleSelected() {
            const idsOnPage = this.paginatedItems.map(i => i.id);
            return idsOnPage.length > 0 && idsOnPage.every(id => this.selectedIds.includes(id));
        },
    },
    methods: {
        formatCell(row, key) {
            const v = row[key];
            if (v === null || v === undefined || v === '') return '-';
            return v;
        },
        async fetchItems() {
            this.isLoading = true;
            try {
                const { data } = await axios.get('/api/v1/purchase-management/credit-notices/list-all');
                this.items = data?.data || data || [];
            } catch (error) {
                Swal.fire(this.$t('label.error'), this.$t('label.loading_error'), 'error');
            } finally {
                this.isLoading = false;
            }
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        toggleSelectAll(e) {
            const checked = e.target.checked;
            const idsOnPage = this.paginatedItems.map(i => i.id);
            if (checked) this.selectedIds = Array.from(new Set([...this.selectedIds, ...idsOnPage]));
            else this.selectedIds = this.selectedIds.filter(id => !idsOnPage.includes(id));
        },
        viewItem(item) {
            this.$router.push({ name: 'admin.view-purchase-credit-notice', params: { id: item.id } });
        },
        editItem(item) {
            const routeExists = this.$router.hasRoute('admin.edit-purchase-credit-notice');
            if (routeExists)
                this.$router.push({ name: 'admin.edit-purchase-credit-notice', params: { id: item.id } });
            else Swal.fire(this.$t('label.notice'), this.$t('label.edit_page_not_defined'), 'info');
        },
        async deleteItem(item) {
            const res = await Swal.fire({
                title: this.$t('label.confirm_delete'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: this.$t('buttons.delete'),
                cancelButtonText: this.$t('buttons.cancel'),
            });
            if (!res.isConfirmed) return;

            try {
                await axios.delete(`/api/v1/purchase-management/credit-notices/delete/${item.id}`);
                this.items = this.items.filter(i => i.id !== item.id);
                this.selectedIds = this.selectedIds.filter(id => id !== item.id);
                Swal.fire(this.$t('label.deleted'), this.$t('label.delete_success'), 'success');
            } catch {
                Swal.fire(this.$t('label.error'), this.$t('label.delete_failed'), 'error');
            }
        },
        async deleteSelected() {
            const res = await Swal.fire({
                title: this.$t('label.confirm_delete_selected'),
                html: `<div>${this.$t('label.selected_count')}: <b>${this.selectedIds.length}</b></div>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: this.$t('buttons.delete'),
                cancelButtonText: this.$t('buttons.cancel'),
            });
            if (!res.isConfirmed) return;

            try {
                for (const id of this.selectedIds)
                    await axios.delete(`/api/v1/purchase-management/credit-notices/delete/${id}`);
                this.items = this.items.filter(i => !this.selectedIds.includes(i.id));
                this.selectedIds = [];
                Swal.fire(this.$t('label.deleted'), this.$t('label.delete_success'), 'success');
            } catch {
                Swal.fire(this.$t('label.error'), this.$t('label.delete_failed_some'), 'error');
            }
        },
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                jsonData.forEach(item => {
                    this.items.push({
                        id: this.items.length + 1,
                        notification_number: item.notification_number || `PCN-${this.items.length + 1}`,
                        date: item.date || '-',
                        hour: item.hour || '-',
                        account_no: item.account_no || '-',
                        supplier_name: item.supplier_name || '-',
                        licensed_operator: item.licensed_operator || '-',
                        amount: item.amount ?? 0,
                        currency: item.currency || 'USD',
                        registration_number: item.registration_number || '-',
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'PurchaseCreditNotices');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'PurchaseCreditNotices.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.items.map(item =>
                this.visibleFields.reduce((acc, field) => {
                    acc[field.key] = item[field.key];
                    return acc;
                }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save('PurchaseCreditNotices.pdf');
        },
        printTable() {
            const printContent = this.$el.querySelector('.table-responsive').innerHTML;
            const WinPrint = window.open('', '', 'width=900,height=650');
            WinPrint.document.write('<html><head><title>Print</title></head><body>');
            WinPrint.document.write(printContent);
            WinPrint.document.write('</body></html>');
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        },
    },
    mounted() {
        this.fetchItems();
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
    transition: transform 0.2s, color 0.3s, opacity 0.3s;
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

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.search-bar .form-control {
    border-radius: 6px;
}

.table td,
.table th {
    vertical-align: middle;
}
</style>
