<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Actions: Add Movement & Import/Export -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <!-- Add Button -->
            <router-link :to="{ name: 'admin.warehouses.warehouse_movements.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <!-- Import/Export Dropdown -->
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

        <!-- Actions: Search & Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <!-- Search -->
            <div class="search-bar d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery" />
            </div>

            <!-- Column Toggle -->
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

        <!-- Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id">
                        <td v-for="(field, index) in visibleFields" :key="index">
                            {{ item[field.key] }}
                        </td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"
                                @click="viewItem(item)"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="$t('buttons.edit')"
                                @click="editItem(item)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(item)"></i>
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
    </div>
</template>

<script>
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
    name: "WarehouseMovementsComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            items: Array.from({ length: 50 }, (_, i) => ({
                id: i + 1,
                transaction_type: ["In", "Out"][i % 2],
                date: `2025-09-${(i % 30) + 1}`,
                time: `${(8 + i % 10).toString().padStart(2, "0")}:00`,
                vendor_or_customer: `Vendor ${i + 1}`,
                description: `Description ${i + 1}`,
                in_or_out: ["In", "Out"][i % 2],
                user: `User ${i + 1}`
            })),
            table: {
                fields: [
                    { name: this.$t('label.transaction_type'), key: 'transaction_type', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.time'), key: 'time', status: true },
                    { name: this.$t('label.vendor_or_customer'), key: 'vendor_or_customer', status: true },
                    { name: this.$t('label.description'), key: 'description', status: true },
                    { name: this.$t('label.in_or_out'), key: 'in_or_out', status: true },
                    { name: this.$t('label.user'), key: 'user', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(field => field.status);
        },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(item =>
                item.transaction_type.toLowerCase().includes(query) ||
                item.vendor_or_customer.toLowerCase().includes(query)
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.perPage);
        }
    },
    methods: {
        viewItem(item) { console.log("Viewing item:", item); },
        editItem(item) { console.log("Editing item:", item); },
        deleteItem(item) {
            Swal.fire({
                title: this.$t("messages.confirm_delete"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: this.$t("buttons.delete"),
                cancelButtonText: this.$t("buttons.cancel")
            }).then((result) => {
                if (result.isConfirmed) {
                    this.items = this.items.filter(i => i.id !== item.id);
                    Swal.fire({
                        title: this.$t("messages.item_deleted"),
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
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
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                jsonData.forEach(item => {
                    this.items.push({
                        id: this.items.length + 1,
                        transaction_type: item.transaction_type || "",
                        date: item.date || "",
                        time: item.time || "",
                        vendor_or_customer: item.vendor_or_customer || "",
                        description: item.description || "",
                        in_or_out: item.in_or_out || "",
                        user: item.user || ""
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Movements");

            const date = new Date();
            const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
            const fileName = `WarehouseMovements_${dateStr}.xlsx`;

            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.filteredItems.map(item =>
                this.visibleFields.reduce((acc, field) => {
                    acc[field.key] = item[field.key];
                    return acc;
                }, {})
            );

            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });

            const date = new Date();
            const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
            const fileName = `WarehouseMovements_${dateStr}.pdf`;

            doc.save(fileName);
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
        }
    }
};
</script>

<style>
.header th {
    background-color: #f4fff0 !important;
    text-align: center;
    vertical-align: middle;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s, color 0.3s, opacity 0.3s;
    margin-right: 10px;
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

.btn-secondary.dropdown-toggle:hover {
    background-color: #1d7342;
    color: #fff;
    transform: scale(1.05);
}

.dropdown .show {
    color: #1d7342;
}

.search-bar {
    flex: 1;
}

.form-check-input:checked[type="checkbox"] {
    border-radius: 50%;
    background-color: #1d7342 !important;
}

.table th,
.table td {
    min-width: 120px;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
}
</style>
