<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- أزرار إنشاء واستيراد/تصدير -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.accounting.accounts.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
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
        </div>

        <!-- جدول الحسابات -->
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
                    <tr v-else-if="paginatedAccounts.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد حسابات</td>
                    </tr>
                    <tr v-else v-for="account in paginatedAccounts" :key="account.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ account[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="عرض" @click="viewAccount(account)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="تعديل" @click="editAccount(account)"></i>
                            <i class="bi bi-trash action-icon" title="حذف" @click="deleteAccount(account)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- أزرار الصفحات -->
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
                    { name: 'Account Number', key: 'number', status: true },
                    { name: 'Account Name', key: 'name', status: true },
                    { name: 'Balance', key: 'balance', status: true },
                    { name: 'Currency', key: 'currency', status: true },
                    { name: 'Level', key: 'level', status: true },
                    { name: 'Type', key: 'type', status: true },
                    { name: 'Classification', key: 'classification', status: true },
                    { name: 'Report Type', key: 'report_type', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredAccounts() {
            if (!this.searchQuery) return this.accounts;
            const q = this.searchQuery.toLowerCase();
            return this.accounts.filter(a => (a.name || '').toLowerCase().includes(q));
        },
        paginatedAccounts() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredAccounts.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredAccounts.length / this.perPage); },
        isAuthenticated() { return !!localStorage.getItem('authToken'); }
    },
    methods: {
        loadDummyAccounts(count = 20) {
            this.accounts = Array.from({ length: count }, (_, i) => ({
                id: i + 1,
                number: `100${i + 1}`,
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
            if (!acc || !acc.id) return;
            this.$router.push({ name: 'admin.accounting.accounts.show', params: { id: acc.id } });
        },
        editAccount(acc) {
            this.$router.push({ name: 'admin.accounting.accounts.edit', params: { id: acc.id } });
        },
        deleteAccount(acc) {
            Swal.fire({
                title: 'تأكيد الحذف',
                text: 'هل أنت متأكد من حذف هذا الحساب؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            }).then(result => {
                if (result.isConfirmed) {
                    this.accounts = this.accounts.filter(a => a.id !== acc.id);
                    Swal.fire('تم الحذف', 'تم حذف الحساب بنجاح', 'success');
                }
            });
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
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

.header th {
    background-color: #eee !important;
}
</style>
