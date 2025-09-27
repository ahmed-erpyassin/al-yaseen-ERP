<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Actions: Add Item & Import/Export -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <!-- Add Button -->
            <router-link :to="{ name: 'admin.warehouses.items.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.add') }}
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

        <!-- Items Table Title -->
        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ $t('label.items') }}</h3>
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
                            <template v-if="field.key === 'image'">
                                <img :src="item.image" alt="Item Image" class="table-image" />
                            </template>
                            <template v-else>
                                {{ item[field.key] }}
                            </template>
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
    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const baseUrl = "http://localhost:3000";

export default {
    name: "AccountsListComponent",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            items: [],
            table: {
                fields: [
                    { name: this.$t("label.item_number"), key: "item_number", status: true },
                    { name: this.$t("label.item_name"), key: "item_name", status: true },
                    { name: this.$t("label.item_description"), key: "description", status: true },
                    { name: this.$t("label.model"), key: "model", status: false },
                    { name: this.$t("label.unit"), key: "unit", status: false },
                    { name: this.$t("label.balance"), key: "balance", status: true },
                    { name: this.$t("label.min_limit"), key: "min_limit", status: false },
                    { name: this.$t("label.max_limit"), key: "max_limit", status: false },
                    { name: this.$t("label.reorder_limit"), key: "reorder_limit", status: false },
                    { name: this.$t("label.exceed_reorder_limit"), key: "exceed_reorder_limit", status: false },
                    { name: this.$t("label.first_sale_price"), key: "first_sale_price", status: false },
                    { name: this.$t("label.first_purchase_price"), key: "first_purchase_price", status: false },
                    { name: this.$t("label.color"), key: "color", status: false },
                    { name: this.$t("label.image"), key: "image", status: true }
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
                item.item_number.toString().includes(query) ||
                item.item_name.toLowerCase().includes(query)
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.perPage) || 1;
        }
    },
    methods: {
        async fetchItems() {
            try {
                const response = await axios.get(`${baseUrl}/items`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                        // إذا كان هناك توكن: "Authorization": `Bearer ${token}`
                    }
                });

                this.items = response.data.map((item, index) => ({
                    id: index + 1,
                    item_number: item.item_number || index + 1,
                    item_name: item.item_name || "No Name",
                    description: item.description || "",
                    model: item.model || "",
                    unit: item.unit || "",
                    balance: item.balance ?? 0,
                    min_limit: item.min_limit ?? 0,
                    max_limit: item.max_limit ?? 0,
                    reorder_limit: item.reorder_limit ?? 0,
                    exceed_reorder_limit: item.exceed_reorder_limit ?? false,
                    first_sale_price: item.first_sale_price ?? 0,
                    first_purchase_price: item.first_purchase_price ?? 0,
                    color: item.color || "N/A",
                    image: item.image || `https://api.dicebear.com/9.x/icons/svg?seed=product-${index + 1}`
                }));
            } catch (error) {
                console.error("Failed to fetch items:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to load items from API",
                    icon: "error"
                });
            }
        },
        // async fetchItems() {
        //     this.items = [
        //         { id: 1, item_number: '001', item_name: 'صنف A', description: 'وصف A', balance: 10, image: '' },
        //         { id: 2, item_number: '002', item_name: 'صنف B', description: 'وصف B', balance: 5, image: '' }
        //     ];
        // },

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
            }).then(result => {
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

                jsonData.forEach((item) => {
                    this.items.push({
                        id: this.items.length + 1,
                        item_number: item.item_number || this.items.length + 1,
                        item_name: item.item_name || "No Name",
                        description: item.description || "",
                        model: item.model || "",
                        unit: item.unit || "",
                        balance: item.balance || 0,
                        min_limit: item.min_limit || 0,
                        max_limit: item.max_limit || 0,
                        reorder_limit: item.reorder_limit || 0,
                        exceed_reorder_limit: item.exceed_reorder_limit || false,
                        first_sale_price: item.first_sale_price || 0,
                        first_purchase_price: item.first_purchase_price || 0,
                        color: item.color || "N/A",
                        image: item.image || `https://api.dicebear.com/9.x/icons/svg?seed=product-${this.items.length + 1}`
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Items");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "items.xlsx");
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

            autoTable(doc, {
                columns,
                body: rows,
                startY: 20,
                styles: { fontSize: 8 },
                headStyles: { fillColor: [29, 115, 66] }
            });

            doc.save("items.pdf");
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
    },
    mounted() {
        this.fetchItems();
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

.btn-secondary.dropdown-toggle {
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
}

.btn-secondary.dropdown-toggle:active,
.btn-secondary.dropdown-toggle:focus,
.btn-secondary.dropdown-toggle:focus-visible {
    background-color: #fff !important;
    color: #1d7342 !important;
    box-shadow: none !important;
}

.btn-secondary.dropdown-toggle:hover {
    background-color: #1d7342;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-bar {
    flex: 1;
}

.table th,
.table td {
    min-width: 120px;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
}

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
