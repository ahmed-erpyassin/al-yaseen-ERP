<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-file-earmark-text"></i> {{ $t('label.contracts') }}</h1>

        <!-- زر إنشاء -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.employees.contracts.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <!-- تصدير -->
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

        <!-- بحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')"
                    v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول العقود -->
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
                    <tr v-else-if="paginatedContracts.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No contracts found</td>
                    </tr>
                    <tr v-else v-for="contract in paginatedContracts" :key="contract.id"
                        :class="{ 'table-warning': isNearExpiry(contract.end_date) }">
                        <td v-for="field in visibleFields" :key="field.key">{{ contract[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewContract(contract)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editContract(contract)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteContract(contract)"></i>
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
        <div class="modal fade" id="viewContractModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title">{{ selectedContract?.employee_name || 'Contract Details' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{{ selectedContract?.id }}</td>
                                    <th>Employee:</th>
                                    <td>{{ selectedContract?.employee_name }}</td>
                                </tr>
                                <tr>
                                    <th>Contract No:</th>
                                    <td>{{ selectedContract?.contract_number }}</td>
                                    <th>Status:</th>
                                    <td>{{ selectedContract?.status }}</td>
                                </tr>
                                <tr>
                                    <th>Start Date:</th>
                                    <td>{{ selectedContract?.start_date }}</td>
                                    <th>End Date:</th>
                                    <td :class="{ 'text-danger': isNearExpiry(selectedContract?.end_date) }">
                                        {{ selectedContract?.end_date }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">
                            {{ $t('buttons.close') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as bootstrap from 'bootstrap';

export default {
    name: 'ContractsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            selectedContract: null,
            contracts: [],
            table: {
                fields: [
                    { name: 'ID', key: 'id', status: true },
                    { name: 'Employee', key: 'employee_name', status: true },
                    { name: 'Contract No', key: 'contract_number', status: true },
                    { name: 'Start Date', key: 'start_date', status: true },
                    { name: 'End Date', key: 'end_date', status: true },
                    { name: 'Status', key: 'status', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredContracts() {
            if (!this.searchQuery) return this.contracts;
            const q = this.searchQuery.toLowerCase();
            return this.contracts.filter(c =>
                (c.employee_name || '').toLowerCase().includes(q) ||
                (c.contract_number || '').toLowerCase().includes(q)
            );
        },
        paginatedContracts() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredContracts.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredContracts.length / this.perPage);
        }
    },
    methods: {
        async fetchContracts() {
            this.isLoading = true;
            try {
                const res = await axios.get('{{baseUrl}}/api/v1/contracts');
                this.contracts = res.data.data || res.data;
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to fetch contracts', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        isNearExpiry(endDate) {
            if (!endDate) return false;
            const today = new Date();
            const expiry = new Date(endDate);
            const diff = (expiry - today) / (1000 * 60 * 60 * 24);
            return diff <= 30; // أقل من 30 يوم
        },
        viewContract(contract) {
            this.selectedContract = contract;
            const modalEl = document.getElementById('viewContractModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },
        closeModal() {
            const modalEl = document.getElementById('viewContractModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedContract = null;
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.contracts);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Contracts');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Contracts.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.contracts.map(c => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = c[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Contracts.pdf');
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
        this.fetchContracts();
    }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

.table-warning {
    background-color: #fff3cd !important;
}
</style>
