<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-people"></i> قائمة الزبائن</h1>

        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.customers.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.add') }}
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ $t('buttons.import_excel') }}
                            <input type="file" @change="importExcel" accept=".xlsx,.xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" placeholder="بحث..." v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" data-bs-toggle="dropdown" style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu p-2" style="width: 250px;">
                    <li v-for="(field, index) in table.fields" :key="field.key">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا يوجد بيانات</td>
                    </tr>
                    <tr v-else v-for="item in paginatedItems" :key="item.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ item[field.key] }}</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2 text-primary" @click="viewItem(item)"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" @click="editItem(item)"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="deleteItem(item)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">السابق</button>
            <span>صفحة {{ currentPage }} من {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">التالي</button>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

export default {
    name: 'CustomersList',
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL || 'https://alyaseenerp.com',
            isLoading: false,
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            items: [],
            table: {
                fields: [
                    { name: 'رقم العميل', key: 'customer_number', status: true },
                    { name: 'اسم الزبون', key: 'customer_name', status: true },
                    { name: 'الرصيد', key: 'balance', status: true },
                    { name: 'العملة', key: 'currency', status: true },
                    { name: 'الفرع', key: 'branch', status: true },
                    { name: 'آخر حركة', key: 'date_of_last_movement', status: true },
                    { name: 'الجوال', key: 'mobile', status: true },
                    { name: 'مندوب المبيعات', key: 'sales_representative', status: true }
                ]
            }
        };
    },

    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(item =>
                item.customer_name?.toLowerCase().includes(query) ||
                item.customer_number?.toString().includes(query) ||
                item.mobile?.includes(query)
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredItems.length / this.perPage) || 1; }
    },

    methods: {
        // ✅ جلب الزبائن
        async fetchItems() {
            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                };
                const res = await axios.get('/customers/list', {
                    headers,
                    params: { per_page: this.perPage }
                });
                this.items = res.data.data || res.data;
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'فشل في جلب بيانات الزبائن من السيرفر', 'error');
            } finally {
                this.isLoading = false;
            }
        },

        // ✅ حذف الزبون
        async deleteItem(item) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const token = localStorage.getItem('authToken');
                        const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' };
                        await axios.delete(`${this.baseUrl}/api/v1/customers/delete/${item.id}`, { headers });
                        this.items = this.items.filter(i => i.id !== item.id);
                        Swal.fire('تم الحذف', 'تم حذف الزبون بنجاح', 'success');
                    } catch (err) {
                        console.error(err);
                        Swal.fire('خطأ', 'فشل في حذف الزبون', 'error');
                    }
                }
            });
        },

        // ✅ عرض تفاصيل الزبون
        viewItem(item) {
            this.$router.push({ name: 'admin.customers.show', params: { id: item.id } });
        },

        // ✅ تعديل الزبون
        editItem(item) {
            this.$router.push({ name: 'admin.customers.edit', params: { id: item.id } });
        },

        // ✅ التنقل بين الصفحات
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        // ✅ استيراد من Excel
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                this.items.push(...jsonData);
            };
            reader.readAsArrayBuffer(file);
        },

        // ✅ تصدير إلى Excel
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Customers");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Customers.xlsx");
        },

        // ✅ تصدير إلى PDF
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.items.map(item =>
                this.visibleFields.reduce((acc, field) => {
                    acc[field.key] = item[field.key];
                    return acc;
                }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20 });
            doc.save("customers.pdf");
        },

        // ✅ طباعة الجدول
        printTable() {
            const printContent = this.$el.querySelector('.table-responsive').innerHTML;
            const WinPrint = window.open('', '', 'width=900,height=650');
            WinPrint.document.write('<html><head><title>Print</title></head><body>');
            WinPrint.document.write(printContent);
            WinPrint.document.write('</body></html>');
            WinPrint.document.close();
            WinPrint.print();
        }
    },

    mounted() {
        this.fetchItems();
    }
};
</script>


<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
}
</style>
