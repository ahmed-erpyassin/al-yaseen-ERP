<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-bar-chart-line"></i> {{ $t('label.reports') }}</h1>

        <!-- اختيار نوع التقرير -->
        <div class="mb-3">
            <label>{{ $t('label.select_report') }}</label>
            <select class="form-select" v-model="selectedReport" @change="fetchReport">
                <option value="employees">{{ $t('label.employee_report') }}</option>
                <option value="salaries">{{ $t('label.salary_report') }}</option>
                <option value="attendance">{{ $t('label.attendance_report') }}</option>
                <option value="contracts">{{ $t('label.expired_contracts') }}</option>
            </select>
        </div>

        <!-- جدول النتائج -->
        <div class="table-responsive" v-if="reportData.length > 0">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in reportData" :key="index">
                        <td v-for="col in columns" :key="col">{{ row[col] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-else class="text-center">No data found</p>

        <!-- تصدير وطباعة -->
        <div class="mt-3">
            <button class="btn btn-secondary me-2" @click="exportExcel">Export Excel</button>
            <button class="btn btn-secondary me-2" @click="exportPDF">Export PDF</button>
            <button class="btn btn-secondary" @click="printTable">Print</button>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

export default {
    name: 'ReportsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false,
            useApi: false, // true لتفعيل API
            selectedReport: 'employees',
            reportData: [],
            columns: [],
        };
    },
    methods: {
        fetchReport() {
            this.isLoading = true;
            if (this.useApi) {
                // مثال على API:
                 axios.get(`/api/v1/reports/${this.selectedReport}`)
                  .then(res => { this.reportData = res.data.data; this.setColumns(); })
                  .finally(() => this.isLoading = false);
            } else {
                // بيانات وهمية
                if (this.selectedReport === 'employees') {
                    this.reportData = [
                        { Name: 'Ali', Department: 'IT', Position: 'Developer' },
                        { Name: 'Sara', Department: 'HR', Position: 'Manager' },
                    ];
                } else if (this.selectedReport === 'salaries') {
                    this.reportData = [
                        { Name: 'Ali', Month: 'October', Salary: 1000 },
                        { Name: 'Sara', Month: 'October', Salary: 1200 },
                    ];
                } else if (this.selectedReport === 'attendance') {
                    this.reportData = [
                        { Name: 'Ali', Date: '2025-10-01', Status: 'Present' },
                        { Name: 'Sara', Date: '2025-10-01', Status: 'Absent' },
                    ];
                } else if (this.selectedReport === 'contracts') {
                    this.reportData = [
                        { Name: 'Ali', ContractNo: 'C001', EndDate: '2025-10-15' },
                    ];
                }
                this.setColumns();
                this.isLoading = false;
            }
        },
        setColumns() {
            if (this.reportData.length > 0) {
                this.columns = Object.keys(this.reportData[0]);
            } else {
                this.columns = [];
            }
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.reportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Report');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Report.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const cols = this.columns;
            const rows = this.reportData.map(r => cols.map(c => r[c]));
            autoTable(doc, { head: [cols], body: rows });
            doc.save('Report.pdf');
        },
        printTable() {
            const printContent = document.createElement('div');
            const table = document.createElement('table');
            table.classList.add('table', 'table-bordered');
            let html = '<thead><tr>';
            this.columns.forEach(c => { html += `<th>${c}</th>`; });
            html += '</tr></thead><tbody>';
            this.reportData.forEach(r => {
                html += '<tr>';
                this.columns.forEach(c => { html += `<td>${r[c]}</td>`; });
                html += '</tr>';
            });
            html += '</tbody>';
            table.innerHTML = html;
            printContent.appendChild(table);
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
        this.fetchReport();
    }
};
</script>
