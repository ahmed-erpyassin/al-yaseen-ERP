<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h2 class="mb-4"><i class="bi bi-building"></i> {{ $t('label.manufacturing') }}</h2>
        <!-- Top Actions -->
        <div class="d-flex align-items-center justify-content-end mb-4 gap-2">
            <!-- Add New Item (Calculation) -->
            <router-link :to="{ name: 'admin.warehouses.manufacturing-formula.manufacturing.create' }"
                class="btn btn-lg btn-success">
                {{ $t('buttons.Calculation') }}
            </router-link>

            <!-- Import/Export & Print -->
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ $t('buttons.import_excel') }}
                            <input type="file" @change="importExcel" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button></li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>



        <!-- Search -->
        <div class="d-flex justify-content-between mb-3 align-items-center">
            <div class="search-bar d-flex align-items-center">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" placeholder="بحث عن عنصر..." v-model="searchQuery" />
            </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>#</th>
                        <th>{{ $t('label.manufacturing_number') }}</th>
                        <th>{{ $t('label.item_number') }}</th>
                        <th>{{ $t('label.item_name') }}</th>
                        <th>{{ $t('label.unit') }}</th>
                        <th>{{ $t('label.balance') }}</th>
                        <th>{{ $t('label.min_limit') }}</th>
                        <th>{{ $t('label.max_limit') }}</th>
                        <th>{{ $t('label.reorder_limit') }}</th>
                        <th>{{ $t('label.purchase_price') }}</th>
                        <th>{{ $t('label.sale_price') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedItems.length === 0">
                        <td :colspan="12">{{ $t('label.no_data') }}</td>
                    </tr>
                    <tr v-for="(item, idx) in paginatedItems" :key="item.id">
                        <td>{{ (currentPage - 1) * perPage + idx + 1 }}</td>
                        <td>{{ item.manufacturing_number }}</td>
                        <td>{{ item.item_number }}</td>
                        <td>{{ item.item_name }}</td>
                        <td>{{ item.unit }}</td>
                        <td>{{ item.balance }}</td>
                        <td>{{ item.min_limit }}</td>
                        <td>{{ item.max_limit }}</td>
                        <td>{{ item.reorder_limit }}</td>
                        <td>{{ item.purchase_price }}</td>
                        <td>{{ item.sale_price }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" @click="viewItem(item)"
                                :title="$t('buttons.check')"></i>
                            <i class="bi bi-pencil action-icon me-2" @click="editItem(item)"
                                :title="$t('buttons.edit')"></i>
                            <i class="bi bi-trash action-icon" @click="deleteItem(item)"
                                :title="$t('buttons.delete')"></i>
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
import axios from "axios";

export default {
    name: "ManufacturingItems",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            items: [],
        };
    },
    computed: {
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(
                i =>
                    i.item_number.toString().includes(query) ||
                    i.item_name.toLowerCase().includes(query)
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
    mounted() {
        this.fetchItems();
    },
    methods: {
        async fetchItems() {
            try {
                const res = await axios.get("/api/manufacturing-formulas");
                this.items = res.data;
            } catch (err) {
                Swal.fire({
                    title: "خطأ",
                    text: "تعذر جلب البيانات",
                    icon: "error"
                });
            }
        },
        viewItem(item) { console.log("View:", item); },
        editItem(item) { console.log("Edit:", item); },
        async deleteItem(item) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "سيتم حذف هذا العنصر نهائيًا!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "حذف",
                cancelButtonText: "إلغاء"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/manufacturing-formulas/${item.id}`);
                        this.items = this.items.filter(i => i.id !== item.id);
                        Swal.fire({ title: "تم الحذف", icon: "success", timer: 1500, showConfirmButton: false });
                    } catch {
                        Swal.fire({ title: "خطأ", text: "تعذر حذف العنصر", icon: "error" });
                    }
                }
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }, importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                jsonData.forEach(item => {
                    this.items.push({
                        id: this.items.length + 1,
                        item_number: item.item_number || this.items.length + 1,
                        item_name: item.item_name || "No Name",
                        balance: item.balance || 0
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },

        exportExcel() {
            // نأخذ الأعمدة الظاهرة فقط
            const columns = this.visibleFields.map(f => f.key);

            // تجهيز البيانات لتصدير Excel
            const dataToExport = this.filteredItems.map(item => {
                const row = {};
                columns.forEach(col => {
                    row[col] = item[col] !== undefined ? item[col] : '';
                });
                return row;
            });

            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Items");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "items.xlsx");
        },
        exportPDF() {
            const doc = new jsPDF();

            // الأعمدة بناءً على الحقول المرئية فقط
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));

            // الصفوف مع كل القيم الخاصة بالحقول المرئية
            const rows = this.filteredItems.map(item =>
                this.visibleFields.reduce((acc, field) => {
                    acc[field.key] = item[field.key] !== undefined ? item[field.key] : '';
                    return acc;
                }, {})
            );

            autoTable(doc, {
                columns: columns,
                body: rows,
                startY: 20,
                styles: { fontSize: 8 },
                headStyles: { fillColor: [29, 115, 66] } // اللون الأخضر للعنوان
            });

            doc.save("items.pdf");
        },
    }
};
</script>

<style scoped>
.header th {
    background-color: #f4fff0;
    text-align: center;
    vertical-align: middle;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    margin-right: 10px;
    transition: transform 0.2s, color 0.3s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.table th,
.table td {
    min-width: 120px;
    text-align: center;
    vertical-align: middle;
}

.search-bar {
    flex: 1;
}
</style>
