<template>
    <div class="container pe-5 ps-5">
        <!-- ✅ العنوان -->
        <h1><i class="bi bi-building"></i> {{ $t('label.warehouses') || 'المستودعات' }}</h1>

        <!-- ✅ الأزرار -->
        <div class="d-flex justify-content-end mb-4 align-items-center gap-2">
            <router-link :to="{ name: 'admin.warehouses.create' }" class="btn btn-success btn-lg">
                <i class="bi bi-plus-lg"></i> {{ $t('buttons.add') || 'إضافة مستودع' }}
            </router-link>

            <!-- زر الاستيراد والتصدير -->
            <div class="dropdown">
                <button class="btn btn-outline-success btn-lg dropdown-toggle d-flex align-items-center gap-2"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-arrow-down-up"></i>
                    {{ $t('buttons.import_export') || 'استيراد / تصدير' }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow rounded-3 p-2">
                    <li>
                        <label class="dropdown-item text-success fw-medium" style="cursor: pointer;">
                            <i class="bi bi-upload me-2"></i> {{ $t('buttons.import_excel') || 'استيراد Excel' }}
                            <input type="file" @change="importExcel" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li>
                        <button class="dropdown-item text-primary fw-medium" @click="exportExcel">
                            <i class="bi bi-file-earmark-excel me-2"></i> {{ $t('buttons.export_excel') || 'تصدير Excel'
                            }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item text-danger fw-medium" @click="exportPDF">
                            <i class="bi bi-filetype-pdf me-2"></i> {{ $t('buttons.export_pdf') || 'تصدير PDF' }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item text-secondary fw-medium" @click="printTable">
                            <i class="bi bi-printer me-2"></i> {{ $t('buttons.print') || 'طباعة' }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- ✅ البحث والفلترة -->
        <div class="d-flex justify-content-between mb-3 align-items-center">
            <div class="search-bar d-flex align-items-center w-50">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery"
                    @input="filterWarehouses" />
            </div>

            <!-- ⚙️ فلترة الأعمدة -->
            <div class="dropdown filter-toggle">
                <button
                    class="btn btn-light border rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    type="button" data-bs-toggle="dropdown" title="تخصيص الأعمدة" style="width: 45px; height: 45px;">
                    <i class="bi bi-gear-fill text-success fs-4"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow p-3" style="min-width: 260px;">
                    <h6 class="dropdown-header text-center text-success mb-2">
                        <i class="bi bi-sliders me-1"></i> تخصيص الأعمدة
                    </h6>
                    <hr class="mt-0 mb-2" />
                    <li v-for="(field, index) in table.fields" :key="field.key" class="mb-1">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
                        </div>
                    </li>
                    <hr class="mt-2 mb-2" />
                    <li class="text-center">
                        <button class="btn btn-sm btn-outline-success" @click="resetColumns">
                            <i class="bi bi-arrow-clockwise me-1"></i> إعادة التعيين
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- ✅ تحميل -->
        <div v-if="loading" class="loading-container text-center py-5">
            <i class="bi bi-arrow-repeat spin fs-1 text-success"></i>
            <p class="mt-3 fs-5 text-muted">{{ $t('messages.loading') || 'جارٍ تحميل البيانات...' }}</p>
        </div>

        <!-- ✅ الجدول -->
        <div v-else class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                        <th>{{ $t('label.actions') || 'الإجراءات' }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="warehouse in paginatedWarehouses" :key="warehouse.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ warehouse[field.key] || '—' }}</td>
                        <td>
                            <i class="bi bi-eye action-icon text-primary me-2" @click="viewWarehouse(warehouse)"></i>
                            <i class="bi bi-pencil action-icon text-warning me-2" @click="editWarehouse(warehouse)"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteWarehouse(warehouse)"></i>
                        </td>
                    </tr>
                    <tr v-if="paginatedWarehouses.length === 0">
                        <td :colspan="visibleFields.length + 1">{{ $t('label.no_data') || 'لا توجد بيانات' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- ✅ الترقيم -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ $t('buttons.previous') || 'السابق' }}
            </button>
            <span>{{ $t('label.page') || 'صفحة' }} {{ currentPage }} {{ $t('label.of') || 'من' }} {{ totalPages
                }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t('buttons.next') || 'التالي' }}
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

const API_BASE = "https://alyaseenerp.com";

export default {
    name: "WarehousesListComponent",
    data() {
        return {
            warehouses: [],
            filtered: [],
            loading: false,
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            table: {
                fields: [
                    { name: this.$t("label.warehouse_number") || "رقم المخزن", key: "warehouse_number", status: true },
                    { name: this.$t("label.warehouse_name") || "اسم المخزن", key: "warehouse_name", status: true },
                    { name: this.$t("label.warehouse_keeper") || "أمين المخزن", key: "warehouse_keeper", status: true },
                    { name: this.$t("label.phone_number") || "رقم الهاتف", key: "phone_number", status: true },
                    { name: this.$t("label.fax_number") || "رقم الفاكس", key: "fax_number", status: true },
                    { name: this.$t("label.address") || "العنوان", key: "address", status: true }
                ]
            },
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        paginatedWarehouses() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filtered.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filtered.length / this.perPage) || 1;
        },
    },
    methods: {
        resetColumns() {
            this.table.fields.forEach(f => (f.status = true));
        },

        // ✅ جلب البيانات
        async fetchWarehouses() {
            this.loading = true;
            try {
                const res = await axios.get(`${API_BASE}/api/v1/warehouses/scan-all`);
                const data = res.data?.data?.data || [];
                this.warehouses = data.map((wh, i) => ({
                    id: wh.id,
                    warehouse_number: wh.warehouse_number || `WH${String(i + 1).padStart(3, "0")}`,
                    warehouse_name: wh.name || "—",
                    warehouse_keeper: wh.warehouse_keeper_employee_name || "—",
                    phone_number: wh.phone_number || "—",
                    fax_number: wh.fax_number || "—",
                    address: wh.address || "—",
                }));
                this.filtered = [...this.warehouses];
            } catch (err) {
                Swal.fire("خطأ", "فشل في تحميل بيانات المستودعات.", "error");
            } finally {
                this.loading = false;
            }
        },

        // ✅ البحث
        filterWarehouses() {
            const query = this.searchQuery.toLowerCase();
            this.filtered = this.warehouses.filter(w =>
                Object.values(w).some(v => String(v).toLowerCase().includes(query))
            );
            this.currentPage = 1;
        },

        // ✅ الاستيراد
        async importExcel(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async ev => {
                const data = new Uint8Array(ev.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                try {
                    await axios.post(`${API_BASE}/api/v1/warehouses/import`, { warehouses: jsonData });
                    Swal.fire("تم", "تم استيراد البيانات بنجاح.", "success");
                    this.fetchWarehouses();
                } catch {
                    Swal.fire("خطأ", "فشل في استيراد الملف.", "error");
                }
            };
            reader.readAsArrayBuffer(file);
        },

        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.filtered);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Warehouses");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Warehouses.xlsx");
        },

        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.filtered.map(w =>
                this.visibleFields.reduce((acc, f) => {
                    acc[f.key] = w[f.key];
                    return acc;
                }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 } });
            doc.save("Warehouses.pdf");
        },

        printTable() {
            const content = this.$el.querySelector(".table-responsive").innerHTML;
            const win = window.open("", "", "width=900,height=650");
            win.document.write("<html><head><title>Print</title></head><body>");
            win.document.write(content);
            win.document.write("</body></html>");
            win.document.close();
            win.print();
        },

        viewWarehouse(w) {
            this.$router.push(`/admin/warehouses/${w.id}`);
        },
        editWarehouse(w) {
            this.$router.push(`/admin/warehouses/edit/${w.id}`);
        },
        async deleteWarehouse(w) {
            const confirm = await Swal.fire({
                title: "تأكيد الحذف",
                text: "هل أنت متأكد من حذف هذا المستودع؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "نعم، احذف",
                cancelButtonText: "إلغاء",
            });
            if (!confirm.isConfirmed) return;
            try {
                await axios.delete(`${API_BASE}/api/v1/warehouses/demolish-facility/${w.id}`);
                Swal.fire("تم", "تم حذف المستودع بنجاح.", "success");
                this.fetchWarehouses();
            } catch {
                Swal.fire("خطأ", "فشل في حذف المستودع.", "error");
            }
        },

        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
    },
    mounted() {
        this.fetchWarehouses();
    },
};
</script>

<style scoped>
.header th {
    background-color: #f4fff0 !important;
}

.action-icon {
    cursor: pointer;
    font-size: 1.3rem;
    transition: 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.filter-toggle button:hover {
    background-color: #f4fff0;
    transform: scale(1.05);
    transition: all 0.2s;
}

.loading-container {
    min-height: 250px;
}
</style>
