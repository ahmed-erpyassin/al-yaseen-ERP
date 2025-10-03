<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-calendar-check"></i> {{ $t('label.attendance_sheet') }}</h1>

        <!-- أزرار تصدير وطباعة -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.export_print') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button></li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث -->
        <div class="d-flex align-items-center mb-3">
            <i class="bi bi-search me-2"></i>
            <input type="text" class="form-control w-50" v-model="searchQuery" :placeholder="$t('label.search_employee')" />
        </div>

        <!-- جدول الحضور -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length" class="text-center">
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedAttendance.length === 0">
                        <td :colspan="visibleFields.length" class="text-center">لا توجد سجلات</td>
                    </tr>
                    <tr v-else v-for="record in paginatedAttendance" :key="record.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ record[field.key] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- الصفحات -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous') }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{ $t('buttons.next') }}</button>
        </div>
    </div>

    <div v-else class="text-center mt-5">
        <p>يرجى تسجيل الدخول للوصول إلى سجل الحضور.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import * as bootstrap from 'bootstrap';

export default {
    name: "AttendanceComponent",
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            isLoading: true,
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            attendanceRecords: [],
            table: {
                fields: [
                    { name: this.$t('label.employee_number'), key: "employee_number", status: true },
                    { name: this.$t('label.name'), key: "name", status: true },
                    { name: this.$t('label.department'), key: "department", status: true },
                    { name: this.$t('label.date'), key: "date", status: true },
                    { name: this.$t('label.check_in_time'), key: "check_in_time", status: true },
                    { name: this.$t('label.check_out_time'), key: "check_out_time", status: true },
                    { name: this.$t('label.working_hours'), key: "working_hours", status: true },
                    { name: this.$t('label.overtime_hours'), key: "overtime_hours", status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredAttendance() {
            if (!this.searchQuery) return this.attendanceRecords;
            const q = this.searchQuery.toLowerCase();
            return this.attendanceRecords.filter(e => (e.name || '').toLowerCase().includes(q));
        },
        paginatedAttendance() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredAttendance.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredAttendance.length / this.perPage); },
        isAuthenticated() { return !!localStorage.getItem('authToken'); }
    },
    methods: {
        async fetchAttendance() {
            if (!this.isAuthenticated) return;
            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get(`/attendance`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { per_page: this.perPage }
                });
                this.attendanceRecords = res.data.data || res.data;
            } catch (err) {
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.attendanceRecords);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Attendance.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.attendanceRecords.map(r => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = r[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Attendance.pdf');
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
        this.fetchAttendance();
    }
};
</script>

<style scoped>
.header th { background-color: #eee !important; }
</style>
