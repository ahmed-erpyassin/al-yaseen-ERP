<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-box-seam"></i> {{ $t('label.items') }}</h1>

        <!-- أزرار إنشاء واستيراد/تصدير -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.warehouses.items.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

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
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_item')" v-model="searchQuery"
                    @input="fetchItems" />
            </div>
        </div>

        <!-- جدول الأصناف -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
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
                        <td :colspan="visibleFields.length + 1" class="text-center">No items found</td>
                    </tr>
                    <tr v-else v-for="item in paginatedItems" :key="item.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ item[field.key] || '' }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewItem(item)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editItem(item)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteItem(item)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
            }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

export default {
    name: 'ItemsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            items: [],
            table: {
                fields: [
                    { name: 'ID', key: 'id', status: true },
                    { name: 'اسم الصنف', key: 'name', status: true },
                    { name: 'الكمية', key: 'quantity', status: true },
                    { name: 'الوحدة', key: 'unit_name', status: true },
                    { name: 'الفئة', key: 'category_name', status: true },
                    { name: 'تتبع المخزون', key: 'stock_tracking', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredItems() {
            const itemsArray = Array.isArray(this.items) ? this.items : [];
            const q = this.searchQuery.toLowerCase();
            return itemsArray.filter(i => (i.name || '').toLowerCase().includes(q));
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
        async fetchItems() {
            this.isLoading = true;
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const companyId = user?.company?.id || 1;

                const res = await axios.get('/items/inventory-all', {
                    params: {
                        type: 'product',
                        company_id: companyId,
                        branch_id: 1,
                        unit_id: 1,
                        parent_id: 0,
                        stock_tracking: 1,
                        search: this.searchQuery || '',
                        per_page: 100
                    }
                });

                if (res.data?.success && Array.isArray(res.data.data)) {
                    this.items = res.data.data;
                } else {
                    this.items = [];
                }
            } catch (err) {
                console.error(err);
                this.items = [];
            } finally {
                this.isLoading = false;
            }
        },
        viewItem(item) { this.$router.push({ name: 'admin.warehouses.items.details', query: { id: item.id } }); },
        editItem() { Swal.fire('تعديل', 'يمكنك فتح نافذة التعديل هنا', 'info'); },
        deleteItem(item) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/items/discard-item/${item.id}`);
                        this.items = this.items.filter(i => i.id !== item.id);
                        Swal.fire('تم الحذف', 'تم حذف الصنف بنجاح', 'success');
                    } catch (err) { Swal.fire('خطأ', 'تعذر حذف الصنف', 'error'); }
                }
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                for (const item of jsonData) {
                    try { const res = await axios.post(`/items/register-item`, item); this.items.push(res.data); }
                    catch (err) { console.error(err); }
                }
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() { const ws = XLSX.utils.json_to_sheet(this.items); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Items'); const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Items.xlsx'); },
        exportPDF() { const doc = new jsPDF(); const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key })); const rows = this.items.map(item => { const row = {}; this.visibleFields.forEach(f => { row[f.key] = item[f.key]; }); return row; }); autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) }); doc.save('Items.pdf'); },
        printTable() { const printContent = document.createElement('div'); const tableClone = document.querySelector('.table-responsive table').cloneNode(true); printContent.appendChild(tableClone); const newWin = window.open('', '', 'width=900,height=700'); newWin.document.write('<html><head><title>Print</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></head><body>'); newWin.document.write(printContent.innerHTML); newWin.document.write('</body></html>'); newWin.document.close(); newWin.focus(); newWin.print(); newWin.close(); }
    },
    mounted() { this.fetchItems(); }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
