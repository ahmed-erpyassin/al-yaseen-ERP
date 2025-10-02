<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-people"></i> {{ $t('label.payroll_report') }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.employees.payroll_report.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li>
                        <button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button>
                    </li>
                    <li>
                        <button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button>
                    </li>
                </ul>
            </div>
        </div>


        <!-- جدول الرواتب -->
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
                    <tr v-else-if="paginatedReports.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            لا يوجد تقارير
                        </td>
                    </tr>
                    <tr v-else v-for="report in paginatedReports" :key="report.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ report[field.key] }}</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2" title="عرض" @click="viewReport(report)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="تعديل" @click="editReport(report)"></i>
                            <i class="bi bi-trash action-icon" title="حذف" @click="deleteReport(report)"></i>
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

        <!-- View Modal -->
        <div class="modal fade" id="viewReportModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content" v-if="selectedReport">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ selectedReport?.report || 'تفاصيل التقرير' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr v-for="field in visibleFields" :key="field.key">
                                    <th>{{ field.name }}:</th>
                                    <td>{{ selectedReport[field.key] }}</td>
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
        <p>يرجى تسجيل الدخول للوصول إلى التقارير.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';

export default {
    name: "PayrollReportComponent",
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            isLoading: true,
            currentPage: 1,
            perPage: 10,
            reports: [],
            selectedReport: null,
            table: {
                fields: [
                    { name: this.$t('label.report'), key: 'report', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.account'), key: 'account', status: true },
                    { name: this.$t('label.salary_for_period'), key: 'salary_for_period', status: true },
                    { name: this.$t('label.total_salaries'), key: 'total_salaries', status: true },
                    { name: this.$t('label.deductions'), key: 'deductions', status: true },
                    { name: this.$t('label.currency'), key: 'currency', status: true },
                    { name: this.$t('label.user'), key: 'user', status: true },
                    { name: this.$t('label.entry'), key: 'entry', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        paginatedReports() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.reports.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.reports.length / this.perPage); },
        isAuthenticated() { return !!localStorage.getItem('authToken'); }
    },
    methods: {
        async fetchReports() {
            if (!this.isAuthenticated) return;
            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get(`/employees/payroll-reports`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Accept-Language': 'ar'
                    },
                    params: { per_page: this.perPage, sort_field: 'date', sort_direction: 'desc' }
                });
                this.reports = res.data.data || res.data;
            } catch (err) {
                Swal.fire('خطأ', 'تعذر تحميل التقارير', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        viewReport(report) {
            this.selectedReport = report;
            const modalEl = document.getElementById('viewReportModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },
        editReport(report) {
            this.$router.push({ name: 'admin.employees.payroll_report.edit', params: { id: report.id } });
        },
        deleteReport(report) {
            Swal.fire({
                title: 'تأكيد الحذف',
                text: 'هل أنت متأكد من حذف هذا التقرير؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const token = localStorage.getItem('authToken');
                        await axios.delete(`${this.baseUrl}/payroll-reports/${report.id}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        this.reports = this.reports.filter(r => r.id !== report.id);
                        Swal.fire('تم الحذف', 'تم حذف التقرير بنجاح', 'success');
                    } catch {
                        Swal.fire('خطأ', 'تعذر حذف التقرير', 'error');
                    }
                }
            });
        },
        closeModal() {
            const modalEl = document.getElementById('viewReportModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedReport = null;
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.reports);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'PayrollReports');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'PayrollReports.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.reports.map(r => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = r[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('PayrollReports.pdf');
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
        },

    },
    mounted() { this.fetchReports(); }
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
