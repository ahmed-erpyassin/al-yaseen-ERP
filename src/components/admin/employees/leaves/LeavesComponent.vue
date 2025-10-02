<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-people"></i> {{ $t('label.leaves') }}</h1>

        <!-- Toolbar -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.employees.payroll_report.create' }" class="btn btn-lg btn-main me-3">
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

        <!-- Search Bar -->
        <div class="mb-3 d-flex align-items-center">
            <i class="bi bi-search me-2"></i>
            <input type="text" class="form-control w-auto" v-model="searchQuery"
                :placeholder="$t('label.search_employee')" />
        </div>

        <!-- Table -->
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
                    <tr v-else-if="paginatedLeaves.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            {{ $t('label.no_records_found') }}
                        </td>
                    </tr>
                    <tr v-else v-for="leave in paginatedLeaves" :key="leave.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ leave[field.key] }}</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2" title="عرض" @click="viewLeave(leave)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="تعديل" @click="editLeave(leave)"></i>
                            <i class="bi bi-trash action-icon" title="حذف" @click="deleteLeave(leave)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
                }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>

        <!-- View Modal -->
        <div class="modal fade" id="viewLeaveModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content" v-if="selectedLeave">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ selectedLeave?.name || 'تفاصيل الإجازة' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr v-for="field in visibleFields" :key="field.key">
                                    <th>{{ field.name }}:</th>
                                    <td>{{ selectedLeave[field.key] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">{{ $t('buttons.close')
                            }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div v-else class="text-center mt-5">
        <p>{{ $t('label.login_required') }}</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">{{ $t('buttons.login') }}</router-link>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    name: "LeavesComponent",
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            isLoading: true,
            currentPage: 1,
            perPage: 10,
            searchQuery: '',
            leaves: [],
            selectedLeave: null,
            table: {
                fields: [
                    { name: this.$t('label.employee_number'), key: 'employee_number', status: true },
                    { name: this.$t('label.name'), key: 'name', status: true },
                    { name: this.$t('label.department'), key: 'department', status: true },
                    { name: this.$t('label.job_title'), key: 'job_title', status: true },
                    { name: this.$t('label.leave_type'), key: 'leave_type', status: true },
                    { name: this.$t('label.start_date'), key: 'start_date', status: true },
                    { name: this.$t('label.end_date'), key: 'end_date', status: true },
                    { name: this.$t('label.leave_days'), key: 'leave_days', status: true },
                    { name: this.$t('label.status'), key: 'status', status: true },
                    { name: this.$t('label.previous_balance'), key: 'previous_balance', status: false },
                    { name: this.$t('label.deducted'), key: 'deducted', status: false },
                    { name: this.$t('label.remaining_balance'), key: 'remaining_balance', status: false },
                    { name: this.$t('label.notes'), key: 'notes', status: false }
                ]
            }
        };
    },
    computed: {
        isAuthenticated() { return !!localStorage.getItem('authToken'); },
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredLeaves() {
            if (!this.searchQuery) return this.leaves;
            const q = this.searchQuery.toLowerCase();
            return this.leaves.filter(l =>
                this.visibleFields.some(f => String(l[f.key]).toLowerCase().includes(q))
            );
        },
        paginatedLeaves() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredLeaves.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredLeaves.length / this.perPage); }
    },
    methods: {
        async fetchLeaves() {
            if (!this.isAuthenticated) return;
            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get(`/employees/leaves`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { per_page: this.perPage, sort_field: 'start_date', sort_direction: 'desc' }
                });
                this.leaves = res.data.data || res.data;
            } catch {
                Swal.fire('خطأ', 'تعذر تحميل الإجازات', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        viewLeave(leave) {
            this.selectedLeave = leave;
            const modal = new bootstrap.Modal(document.getElementById('viewLeaveModal'));
            modal.show();
        },
        editLeave(leave) {
            this.$router.push({ name: 'admin.employees.leaves.edit', params: { id: leave.id } });
        },
        deleteLeave(leave) {
            Swal.fire({
                title: 'تأكيد الحذف',
                text: 'هل أنت متأكد من حذف هذه الإجازة؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const token = localStorage.getItem('authToken');
                        await axios.delete(`${this.baseUrl}/leaves/${leave.id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        this.leaves = this.leaves.filter(l => l.id !== leave.id);
                        Swal.fire('تم الحذف', 'تم حذف الإجازة بنجاح', 'success');
                    } catch {
                        Swal.fire('خطأ', 'تعذر حذف الإجازة', 'error');
                    }
                }
            });
        },
        closeModal() {
            const modalEl = document.getElementById('viewLeaveModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedLeave = null;
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.leaves);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Leaves');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Leaves.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.leaves.map(l => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = l[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Leaves.pdf');
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
    mounted() { this.fetchLeaves(); }
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
