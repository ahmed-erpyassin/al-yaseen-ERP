<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Actions: Add Movement & Import/Export -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.warehouses.warehouse_movements.create' }" class="btn btn-lg btn-main me-3">
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

        <!-- Table Title -->
        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ $t('label.warehouse_movements') }}</h3>
            </div>
        </div>

        <!-- Search & Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery" />
            </div>
            <div class="dropdown ms-5">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(th, index) in table.fields" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="th.status" :id="'col' + index" />
                            <label class="form-check-label" :for="'col' + index">{{ th.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="text-center py-5">{{ $t('label.loading') }}...</div>

        <!-- Table -->
        <div class="table-responsive" v-else>
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id">
                        <td v-for="(field, index) in visibleFields" :key="index">{{ item[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"
                                @click="openViewModal(item)"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="$t('buttons.edit')"
                                @click="openEditModal(item)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(item)"></i>
                        </td>
                    </tr>
                    <tr v-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1">{{ $t('label.no_data') }}</td>
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
        <div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true"
            ref="viewModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('label.view_movement') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div v-for="(value, key) in selectedItem" :key="key">
                            <strong>{{ key }}:</strong> {{ value }}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('buttons.close')
                        }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true"
            ref="editModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('label.edit_movement') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveEdit">
                            <div v-for="field in table.fields" :key="field.key" class="mb-2">
                                <label class="form-label">{{ field.name }}</label>
                                <input type="text" class="form-control" v-model="selectedItem[field.key]" />
                            </div>
                            <div class="text-end">
                                <button type="submit" class="btn btn-success">{{ $t('buttons.save') }}</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{
                                    $t('buttons.cancel') }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import * as bootstrap from 'bootstrap';


const API_BASE = "https://yourdomain.com/api";

export default {
    name: "WarehouseMovementsComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            items: [],
            loading: false,
            selectedItem: {}, // currently selected item for view/edit
            table: {
                fields: [
                    { name: 'Transaction Type', key: 'transaction_type', status: true },
                    { name: 'Date', key: 'date', status: true },
                    { name: 'Time', key: 'time', status: true },
                    { name: 'Vendor/Customer', key: 'vendor_or_customer', status: true },
                    { name: 'Description', key: 'description', status: true },
                    { name: 'In/Out', key: 'in_or_out', status: true },
                    { name: 'User', key: 'user', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const q = this.searchQuery.toLowerCase();
            return this.items.filter(item => item.transaction_type.toLowerCase().includes(q) || item.vendor_or_customer.toLowerCase().includes(q));
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredItems.length / this.perPage) || 1; }
    },
    methods: {
        openViewModal(item) {
            this.selectedItem = { ...item };
            new bootstrap.Modal(this.$refs.viewModal).show();
        },
        openEditModal(item) {
            this.selectedItem = { ...item };
            new bootstrap.Modal(this.$refs.editModal).show();
        },
        saveEdit() {
            const index = this.items.findIndex(i => i.id === this.selectedItem.id);
            if (index !== -1) this.items.splice(index, 1, { ...this.selectedItem });
            Swal.fire({ title: "Saved", icon: "success", timer: 1500, showConfirmButton: false });
            bootstrap.Modal.getInstance(this.$refs.editModal).hide();
        },
        deleteItem(item) {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel"
            }).then(result => {
                if (result.isConfirmed) {
                    this.items = this.items.filter(i => i.id !== item.id);
                    Swal.fire({ title: "Deleted", icon: "success", timer: 1500, showConfirmButton: false });
                }
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        // --- Import/Export/Print ---
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                const data = new Uint8Array(e.target.result);
                const wb = XLSX.read(data, { type: "array" });
                const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                ws.forEach(item => this.items.push({ id: this.items.length + 1, ...item }));
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Movements");
            const date = new Date();
            const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
            saveAs(new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })], { type: "application/octet-stream" }), `WarehouseMovements_${dateStr}.xlsx`);
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.filteredItems.map(item => this.visibleFields.reduce((acc, f) => { acc[f.key] = item[f.key]; return acc; }, {}));
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            const date = new Date();
            const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
            doc.save(`WarehouseMovements_${dateStr}.pdf`);
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
        async fetchItems() {
            this.loading = true;
            try {
                const res = await axios.get(`${API_BASE}/warehouse-movements`);
                this.items = res.data.map((item, i) => ({ id: i + 1, ...item }));
            } catch (e) {
                console.error(e);
                Swal.fire({
                    title: this.$t('messages.error_fetch'), // يمكن إضافة ترجمة مناسبة
                    text: "Failed to fetch warehouse movements",
                    icon: 'error'
                });
            } finally {
                this.loading = false;
            }
        }

    },
    mounted() { this.fetchItems(); }
};
</script>
