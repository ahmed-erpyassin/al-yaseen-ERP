<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <!-- العنوان -->
        <h1><i class="bi bi-journal-richtext me-2 text-main"></i> {{ $t('label.accounts_list') }}</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <router-link :to="{ name: 'admin.accounting.accounts.create' }" class="btn btn-lg btn-main me-3">
                <i class="bi bi-plus-lg me-2"></i>{{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown me-3">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><button class="dropdown-item" @click="exportExcel"><i class="bi bi-file-earmark-excel me-2"></i>{{ $t('buttons.export_excel') }}</button></li>
                    <li><button class="dropdown-item" @click="exportPDF"><i class="bi bi-file-earmark-pdf me-2"></i>{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable"><i class="bi bi-printer me-2"></i>{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_account')" v-model="searchQuery" />
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
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedAccounts.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد حسابات</td>
                    </tr>
                    <tr v-else v-for="account in paginatedAccounts" :key="account.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ account[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2 text-primary" title="عرض" @click="viewAccount(account)"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" title="تعديل" @click="editAccount(account)"></i>
                            <i class="bi bi-trash action-icon text-danger" title="حذف" @click="deleteAccount(account)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous') }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{ $t('buttons.next') }}</button>
        </div>
    </div>

    <div v-else class="text-center mt-5">
        <p>يرجى تسجيل الدخول للوصول إلى الحسابات.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name: "AccountsListComponent",
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            accounts: [],
            table: {
                fields: [
                    { name: 'رقم الحساب', key: 'number', status: true },
                    { name: 'اسم الحساب', key: 'name', status: true },
                    { name: 'الرصيد', key: 'balance', status: true },
                    { name: 'العملة', key: 'currency', status: true },
                    { name: 'المستوى', key: 'level', status: true },
                    { name: 'النوع', key: 'type', status: true },
                    { name: 'التصنيف', key: 'classification', status: true },
                    { name: 'نوع التقرير', key: 'report_type', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredAccounts() {
            if (!this.searchQuery) return this.accounts;
            const q = this.searchQuery.toLowerCase();
            return this.accounts.filter(a =>
                Object.values(a).some(val => val?.toString().toLowerCase().includes(q))
            );
        },
        paginatedAccounts() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredAccounts.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredAccounts.length / this.perPage) || 1; },
        isAuthenticated() { return !!localStorage.getItem('authToken'); }
    },
    methods: {
        loadDummyAccounts(count = 15) {
            this.accounts = Array.from({ length: count }, (_, i) => ({
                id: i + 1,
                number: `10${i + 1}`,
                name: `Account ${i + 1}`,
                balance: (Math.random() * 10000).toFixed(2),
                currency: ['USD', 'EUR', 'ILS'][i % 3],
                level: [1, 2, 3][i % 3],
                type: ['Asset', 'Liability', 'Equity'][i % 3],
                classification: ['A', 'B', 'C'][i % 3],
                report_type: ['Trial', 'Ledger', 'Balance'][i % 3]
            }));
            this.isLoading = false;
        },
        viewAccount(acc) {
            this.$router.push({ name: 'admin.accounting.accounts.show', params: { id: acc.id } });
        },
        editAccount(acc) {
            this.$router.push({ name: 'admin.accounting.accounts.edit', params: { id: acc.id } });
        },
        deleteAccount(acc) {
            Swal.fire({
                title: 'تأكيد الحذف',
                text: `هل أنت متأكد من حذف الحساب "${acc.name}"؟`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم',
                cancelButtonText: 'إلغاء'
            }).then(result => {
                if (result.isConfirmed) {
                    this.accounts = this.accounts.filter(a => a.id !== acc.id);
                    Swal.fire('تم الحذف', 'تم حذف الحساب بنجاح', 'success');
                }
            });
        },
        bulkDelete() {
            Swal.fire('تنبيه', 'سيتم تفعيل حذف جماعي لاحقًا', 'info');
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.accounts);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Accounts');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Accounts.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.accounts.map(a => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = a[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Accounts.pdf');
        },
        printTable() {
            const printContent = document.createElement('div');
            const tableClone = document.querySelector('.table-responsive table').cloneNode(true);
            printContent.appendChild(tableClone);
            const newWin = window.open('', '', 'width=900,height=700');
            newWin.document.write('<html><head><title>Print</title>');
            newWin.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
            newWin.document.write('</head><body>');
            newWin.document.write(printContent.innerHTML);
            newWin.document.write('</body></html>');
            newWin.document.close();
            newWin.focus();
            newWin.print();
            newWin.close();
        }
    },
    mounted() {
        this.loadDummyAccounts(15);
    }
};
</script>

<style scoped>
.text-main {
    color: #1D7342;
}
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
    transition: transform 0.2s, opacity 0.2s;
}
.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}
.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}
.table {
    font-size: 1rem;
}
</style>
