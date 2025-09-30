<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-image"></i> {{ translate('label.company_undefined') }}</h1>

        <!-- Actions: Add Item & Import/Export -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <!-- Add Button -->
            <router-link :to="{ name: 'admin.warehouses.items.create' }" class="btn btn-lg btn-main me-3">
                {{ translate('buttons.add') }}
            </router-link>

            <!-- Import/Export Dropdown -->
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ translate('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <!-- Import Excel -->
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ translate('buttons.import_excel') }}
                            <input type="file" @change="importExcel" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <!-- Export Excel -->
                    <li>
                        <button class="dropdown-item" @click="exportExcel">{{ translate('buttons.export_excel')
                        }}</button>
                    </li>
                    <!-- Export PDF -->
                    <li>
                        <button class="dropdown-item" @click="exportPDF">{{ translate('buttons.export_pdf') }}</button>
                    </li>
                    <!-- Print Table -->
                    <li>
                        <button class="dropdown-item" @click="printTable">{{ translate('buttons.print') }}</button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Items Table Title -->
        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ translate('label.items') }}</h3>
            </div>
        </div>

        <!-- Actions: Search & Column Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <!-- Search Field -->
            <div class="search-bar d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="translate('label.search')"
                    v-model="searchQuery" />
            </div>

            <!-- Column Visibility Toggle -->
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
                        <th>{{ translate('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id">
                        <td v-for="(field, index) in visibleFields" :key="index">
                            <template v-if="field.key === 'image'">
                                <img v-if="item.image" :src="item.image" alt="Item Image" class="table-image" />
                                <span v-else>—</span>
                            </template>
                            <template v-else>
                                {{ safeGet(item, field.key) }}
                            </template>
                        </td>

                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="translate('buttons.check')"
                                @click="viewItem(item)"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="translate('buttons.edit')"
                                @click="editItem(item)"></i>
                            <i class="bi bi-trash action-icon" :title="translate('buttons.delete')"
                                @click="deleteItem(item)"></i>
                        </td>
                    </tr>
                    <tr v-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1">{{ translate('label.no_data') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ translate('buttons.previous') }}
            </button>
            <span>{{ translate('label.page') }} {{ currentPage }} {{ translate('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ translate('buttons.next') }}
            </button>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Base API URL configuration
const baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
    name: "AccountsListComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            items: [],
            apiEnabled: true, // Set to false to use dummy data without API
            table: {
                fields: [
                    { name: this.translate("label.item_number"), key: "item_number", status: true },
                    { name: this.translate("label.item_name"), key: "item_name", status: true },
                    { name: this.translate("label.item_description"), key: "description", status: true },
                    { name: this.translate("label.model"), key: "model", status: false },
                    { name: this.translate("label.unit"), key: "unit", status: false },
                    { name: this.translate("label.balance"), key: "balance", status: true },
                    { name: this.translate("label.min_limit"), key: "min_limit", status: false },
                    { name: this.translate("label.max_limit"), key: "max_limit", status: false },
                    { name: this.translate("label.reorder_limit"), key: "reorder_limit", status: false },
                    { name: this.translate("label.exceed_reorder_limit"), key: "exceed_reorder_limit", status: false },
                    { name: this.translate("label.first_sale_price"), key: "first_sale_price", status: false },
                    { name: this.translate("label.first_purchase_price"), key: "first_purchase_price", status: false },
                    { name: this.translate("label.color"), key: "color", status: false },
                    { name: this.translate("label.image"), key: "image", status: true }
                ]
            }
        };
    },
    computed: {
        // Get only visible columns
        visibleFields() {
            return this.table.fields.filter(field => field.status);
        },
        // Filter items based on search query
        filteredItems() {
            const q = (this.searchQuery || "").trim().toLowerCase();
            if (!q) return this.items;
            return this.items.filter(item => {
                const num = (item.item_number ?? "").toLowerCase();
                const name = (item.item_name ?? "").toLowerCase();
                const desc = (item.description ?? "").toLowerCase();
                const model = (item.model ?? "").toLowerCase();
                return num.includes(q) || name.includes(q) || desc.includes(q) || model.includes(q);
            });
        },
        // Pagination logic
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.filteredItems.length / this.perPage));
        }
    },
    methods: {
        translate(key) {
            // Translation function (fallback to key if not available)
            if (this.$t) {
                try { return this.$t(key); } catch (e) { return key; }
            }
            return key;
        },
        safeGet(obj, key) {
            // Safely get value from object
            const val = obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : "";
            return val === null || val === undefined ? "" : val;
        },

        async fetchItems() {
            if (!this.apiEnabled) {
                // Dummy data for testing UI without API
                this.items = [
                    { id: 1, item_number: '001', item_name: 'Item A', description: 'Description A', model: 'M1', unit: 'pcs', balance: 10, min_limit: 2, max_limit: 20, reorder_limit: 5, exceed_reorder_limit: false, first_sale_price: 100, first_purchase_price: 80, color: 'Red', image: '' },
                    { id: 2, item_number: '002', item_name: 'Item B', description: 'Description B', model: 'M2', unit: 'pcs', balance: 5, min_limit: 1, max_limit: 15, reorder_limit: 3, exceed_reorder_limit: false, first_sale_price: 150, first_purchase_price: 120, color: 'Blue', image: '' },
                    { id: 3, item_number: '003', item_name: 'Item C', description: 'Description C', model: 'M3', unit: 'pcs', balance: 8, min_limit: 2, max_limit: 18, reorder_limit: 4, exceed_reorder_limit: false, first_sale_price: 200, first_purchase_price: 170, color: 'Green', image: '' },
                    { id: 4, item_number: '004', item_name: 'Item D', description: 'Description D', model: 'M4', unit: 'pcs', balance: 12, min_limit: 3, max_limit: 25, reorder_limit: 6, exceed_reorder_limit: false, first_sale_price: 90, first_purchase_price: 70, color: 'Yellow', image: '' },
                    { id: 5, item_number: '005', item_name: 'Item E', description: 'Description E', model: 'M5', unit: 'pcs', balance: 7, min_limit: 2, max_limit: 22, reorder_limit: 5, exceed_reorder_limit: false, first_sale_price: 120, first_purchase_price: 100, color: 'Black', image: '' },
                    { id: 6, item_number: '006', item_name: 'Item F', description: 'Description F', model: 'M6', unit: 'pcs', balance: 15, min_limit: 4, max_limit: 30, reorder_limit: 7, exceed_reorder_limit: false, first_sale_price: 110, first_purchase_price: 90, color: 'White', image: '' },
                    { id: 7, item_number: '007', item_name: 'Item G', description: 'Description G', model: 'M7', unit: 'pcs', balance: 3, min_limit: 1, max_limit: 10, reorder_limit: 2, exceed_reorder_limit: false, first_sale_price: 130, first_purchase_price: 100, color: 'Purple', image: '' },
                    { id: 8, item_number: '008', item_name: 'Item H', description: 'Description H', model: 'M8', unit: 'pcs', balance: 9, min_limit: 2, max_limit: 20, reorder_limit: 5, exceed_reorder_limit: false, first_sale_price: 140, first_purchase_price: 110, color: 'Orange', image: '' },
                    { id: 9, item_number: '009', item_name: 'Item I', description: 'Description I', model: 'M9', unit: 'pcs', balance: 6, min_limit: 2, max_limit: 18, reorder_limit: 4, exceed_reorder_limit: false, first_sale_price: 160, first_purchase_price: 130, color: 'Pink', image: '' },
                    { id: 10, item_number: '010', item_name: 'Item J', description: 'Description J', model: 'M10', unit: 'pcs', balance: 11, min_limit: 3, max_limit: 25, reorder_limit: 6, exceed_reorder_limit: false, first_sale_price: 180, first_purchase_price: 150, color: 'Brown', image: '' }
                ];
                return;
            }

            try {
                const response = await axios.get(`${baseUrl}/items`, {
                    headers: { "Content-Type": "application/json", "Accept": "application/json" }
                });

                const data = Array.isArray(response.data) ? response.data : (response.data?.items ?? []);
                // Map data to internal format
                this.items = data.map((item, index) => {
                    const assignedId = item.id ?? (index + 1);
                    return {
                        id: assignedId,
                        item_number: item.item_number ?? assignedId,
                        item_name: item.item_name ?? "No Name",
                        description: item.description ?? "",
                        model: item.model ?? "",
                        unit: item.unit ?? "",
                        balance: item.balance ?? 0,
                        min_limit: item.min_limit ?? 0,
                        max_limit: item.max_limit ?? 0,
                        reorder_limit: item.reorder_limit ?? 0,
                        exceed_reorder_limit: item.exceed_reorder_limit ?? false,
                        first_sale_price: item.first_sale_price ?? 0,
                        first_purchase_price: item.first_purchase_price ?? 0,
                        color: item.color ?? "N/A",
                        image: item.image || `https://api.dicebear.com/9.x/icons/svg?seed=product-${assignedId}`
                    };
                });
            } catch (error) {
                console.error("Failed to fetch items:", error);
                Swal.fire({ title: "Error", text: "Failed to load items from API", icon: "error" });
            }
        },

        viewItem(item) {
            Swal.fire({
                title: item.item_name || this.translate("label.no_name"),
                html: `
            <div style="display:flex; gap:20px; text-align:left;">
                <!-- Item Image -->
                <div style="flex-shrink:0;">
                    <img src="${item.image || 'https://api.dicebear.com/9.x/icons/svg?seed=product-${item.id}'}"
                        alt="${item.item_name || 'Item Image'}"
                        style="width:150px; height:150px; object-fit:cover; border-radius:8px; border:1px solid #ddd;"/>
                </div>
                
                <!-- Item Details -->
                <div style="flex:1; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    <div><strong>${this.translate("label.item_number")}:</strong><br/>${item.item_number}</div>
                    <div><strong>${this.translate("label.model")}:</strong><br/>${item.model || '-'}</div>
                    <div><strong>${this.translate("label.item_description")}:</strong><br/>${item.description || '-'}</div>
                    <div><strong>${this.translate("label.unit")}:</strong><br/>${item.unit || '-'}</div>
                    <div><strong>${this.translate("label.balance")}:</strong><br/>${item.balance}</div>
                    <div><strong>${this.translate("label.min_limit")}:</strong><br/>${item.min_limit}</div>
                    <div><strong>${this.translate("label.max_limit")}:</strong><br/>${item.max_limit}</div>
                    <div><strong>${this.translate("label.reorder_limit")}:</strong><br/>${item.reorder_limit}</div>
                    <div><strong>${this.translate("label.exceed_reorder_limit")}:</strong><br/>${item.exceed_reorder_limit ? this.translate("label.yes") : this.translate("label.no")}</div>
                    <div><strong>${this.translate("label.first_sale_price")}:</strong><br/>${item.first_sale_price}</div>
                    <div><strong>${this.translate("label.first_purchase_price")}:</strong><br/>${item.first_purchase_price}</div>
                    <div><strong>${this.translate("label.color")}:</strong><br/>${item.color}</div>
                </div>
            </div>
        `,
                width: 700,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: this.translate("buttons.close") || "Close"
            });
        },

        editItem(item) {
            // Navigate to edit page or fallback alert
            if (this.$router) {
                try {
                    this.$router.push({ name: 'admin.warehouses.items.edit', params: { id: item.id } });
                    return;
                } catch (e) { /* fallback below */ }
            }
            Swal.fire('No edit route configured');
        },

        async deleteItem(item) {
            // Confirm deletion
            const confirm = await Swal.fire({
                title: "Confirm delete",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel"
            });

            if (!confirm.isConfirmed) return;

            if (this.apiEnabled) {
                try {
                    await axios.delete(`${baseUrl}/items/${item.id}`);
                    this.items = this.items.filter(i => i.id !== item.id);
                    Swal.fire({ title: "Item deleted", icon: "success", timer: 1500, showConfirmButton: false });
                } catch (error) {
                    console.error("Failed to delete item:", error);
                    Swal.fire({ title: "Error", text: "Failed to delete item from API", icon: "error" });
                }
            } else {
                // Delete locally
                this.items = this.items.filter(i => i.id !== item.id);
                Swal.fire({ title: "Item deleted", icon: "success", timer: 1200, showConfirmButton: false });
            }
        },

        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        // --- Import Excel ---
        importExcel(event) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                    let nextId = this.items.reduce((m, it) => Math.max(m, it.id || 0), 0) + 1;

                    jsonData.forEach(row => {
                        const newItem = {
                            id: nextId++,
                            item_number: row.item_number ?? `ITEM-${nextId}`,
                            item_name: row.item_name ?? "No Name",
                            description: row.description ?? "",
                            model: row.model ?? "",
                            unit: row.unit ?? "",
                            balance: Number(row.balance) || 0,
                            min_limit: Number(row.min_limit) || 0,
                            max_limit: Number(row.max_limit) || 0,
                            reorder_limit: Number(row.reorder_limit) || 0,
                            exceed_reorder_limit: !!row.exceed_reorder_limit,
                            first_sale_price: Number(row.first_sale_price) || 0,
                            first_purchase_price: Number(row.first_purchase_price) || 0,
                            color: row.color || "N/A",
                            image: row.image || `https://api.dicebear.com/9.x/icons/svg?seed=product-${nextId}`
                        };
                        this.items.push(newItem);
                    });

                    Swal.fire({ title: "Imported successfully", icon: "success", timer: 1400, showConfirmButton: false });
                } catch (err) {
                    console.error("Import error:", err);
                    Swal.fire({ title: "Error", text: "Failed to import file", icon: "error" });
                }
            };
            reader.readAsArrayBuffer(file);
            event.target.value = ""; // Reset input to allow re-upload
        },

        // --- Export Excel ---
        exportExcel() {
            try {
                const ws = XLSX.utils.json_to_sheet(this.items);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Items");
                const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                saveAs(new Blob([wbout], { type: "application/octet-stream" }), "items.xlsx");
            } catch (err) {
                console.error("Export Excel error:", err);
                Swal.fire({ title: "Error", text: "Failed to export Excel", icon: "error" });
            }
        },

        // --- Export PDF ---
        exportPDF() {
            try {
                const doc = new jsPDF();
                const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
                const rows = this.filteredItems.map(item =>
                    this.visibleFields.reduce((acc, field) => {
                        let v = item[field.key];
                        if (field.key === 'image') v = item.image || '';
                        acc[field.key] = v;
                        return acc;
                    }, {})
                );

                autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
                doc.save("items.pdf");
            } catch (err) {
                console.error("Export PDF error:", err);
                Swal.fire({ title: "Error", text: "Failed to export PDF", icon: "error" });
            }
        },

        // --- Print Table ---
        printTable() {
            try {
                const printContent = this.$el.querySelector('.table-responsive').innerHTML;
                const WinPrint = window.open('', '', 'width=900,height=650');
                WinPrint.document.write('<html><head><title>Print</title></head><body>');
                // You can add custom print styles here if needed
                WinPrint.document.write(printContent);
                WinPrint.document.write('</body></html>');
                WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();
                WinPrint.close();
            } catch (err) {
                console.error("Print error:", err);
                Swal.fire({ title: "Error", text: "Failed to print", icon: "error" });
            }
        }
    },

    mounted() {
        this.fetchItems(); // Fetch items on component mount
    }
};
</script>

<style>
/* Table header style */
.header th {
    background-color: #f4fff0 !important;
    text-align: center;
    vertical-align: middle;
}

/* Action icons style */
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

/* Dropdown button hover effect */
.btn-secondary.dropdown-toggle {
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
}

.btn-secondary.dropdown-toggle:hover {
    background-color: #1d7342;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Search bar flex */
.search-bar {
    flex: 1;
}

/* Table cells */
.table th,
.table td {
    min-width: 120px;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
}

/* Table images */
.table-image {
    max-width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    transition: transform 0.2s;
}

.table-image:hover {
    transform: scale(1.1);
}
</style>
