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
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث وضبط الأعمدة -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_item')" v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
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

        <!-- جدول الأصناف -->
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
                            <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No items found</td>
                    </tr>
                    <tr v-else v-for="item in paginatedItems" :key="item.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ item[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewItem(item)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editItem(item)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteItem(item)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- أزرار الصفحات -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
            }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>

        <!-- View Item Modal -->
        <div class="modal fade" id="viewItemModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ selectedItem?.name || 'تفاصيل الصنف' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{{ selectedItem?.id }}</td>
                                    <th>اسم الصنف:</th>
                                    <td>{{ selectedItem?.name }}</td>
                                </tr>
                                <tr>
                                    <th>الكمية:</th>
                                    <td>{{ selectedItem?.quantity }}</td>
                                    <th>الوحدة:</th>
                                    <td>{{ selectedItem?.unit_name }}</td>
                                </tr>
                                <tr>
                                    <th>الفئة:</th>
                                    <td>{{ selectedItem?.category_name }}</td>
                                    <th>تتبع المخزون:</th>
                                    <td>{{ selectedItem?.stock_tracking ? 'نعم' : 'لا' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">{{ $t('buttons.close')
                        }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Item Modal -->
        <div v-if="editModal.show" class="modal-overlay" @click="closeEditModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header bg-warning text-white">
                    <h5 class="modal-title">{{ editModal.item?.name || 'تعديل الصنف' }}</h5>
                    <button type="button" class="btn-close btn-close-white" @click="closeEditModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="saveItemEdit">
                        <div class="mb-3">
                            <label class="form-label">اسم الصنف</label>
                            <input type="text" class="form-control" v-model="editModal.item.name" required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">الكمية</label>
                            <input type="number" class="form-control" v-model="editModal.item.quantity" required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">الوحدة</label>
                            <input type="text" class="form-control" v-model="editModal.item.unit_name" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">الفئة</label>
                            <input type="text" class="form-control" v-model="editModal.item.category_name" />
                        </div>
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" v-model="editModal.item.stock_tracking"
                                id="stockTracking" />
                            <label class="form-check-label" for="stockTracking">تتبع المخزون</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeEditModal">إلغاء</button>
                    <button type="button" class="btn btn-warning" @click="saveItemEdit">حفظ</button>
                </div>
            </div>
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
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
    name: 'ItemsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            useApi: true, // ضع false لاستخدام بيانات وهمية
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            selectedItem: null,
            editModal: { show: false, item: null },
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
            if (!this.searchQuery) return this.items;
            const q = this.searchQuery.toLowerCase();
            return this.items.filter(i => (i.name || '').toLowerCase().includes(q));
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

            if (this.useApi) {
                try {
                    const res = await axios.get('/items/inventory-all', {
                        params: { type: 'product', per_page: 100 }
                    });
                    this.items = res.data.data || res.data;
                } catch (err) {
                    console.error(err);
                    Swal.fire('خطأ', 'تعذر جلب الأصناف من الـ API، سيتم استخدام بيانات وهمية', 'warning');
                    this.loadDummyItems();
                } finally {
                    this.isLoading = false;
                }
            } else {
                this.loadDummyItems();
            }
        },
        loadDummyItems() {
            this.items = Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                name: `Item ${i + 1}`,
                quantity: Math.floor(Math.random() * 100),
                unit_name: ["pcs", "kg", "ltr"][i % 3],
                category_name: ["Electronics", "Food", "Clothing"][i % 3],
                stock_tracking: i % 2 === 0
            }));
            this.isLoading = false;
        },
        viewItem(item) {
            this.$router.push({
                name: 'admin.warehouses.items.details',
                query: { id: item.id }
            });
        },
        closeModal() {
            const modalEl = document.getElementById('viewItemModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedItem = null;
        },
        editItem(item) {
            this.editModal.item = { ...item };
            this.editModal.show = true;
        },
        closeEditModal() {
            this.editModal.show = false;
            this.editModal.item = null;
        },
        async saveItemEdit() {
            try {
                if (this.useApi) {
                    const item = this.editModal.item;
                    const res = await axios.put(`{{baseUrl}}/api/v1/items/modify-item/${item.id}`, item);
                    const index = this.items.findIndex(i => i.id === res.data.id);
                    if (index !== -1) this.items[index] = res.data;
                    Swal.fire('تم التعديل', 'تم تعديل الصنف بنجاح', 'success');
                } else {
                    const index = this.items.findIndex(i => i.id === this.editModal.item.id);
                    if (index !== -1) this.items[index] = { ...this.editModal.item };
                    Swal.fire('تم التعديل', 'تم تعديل الصنف بنجاح (وهمي)', 'success');
                }
                this.closeEditModal();
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'تعذر تعديل الصنف', 'error');
            }
        },
        async deleteItem(item) {
            const result = await Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            });
            if (result.isConfirmed) {
                if (this.useApi) {
                    try {
                        await axios.delete(`{{baseUrl}}/api/v1/items/discard-item/${item.id}`);
                        this.items = this.items.filter(i => i.id !== item.id);
                        Swal.fire('تم الحذف', 'تم حذف الصنف بنجاح', 'success');
                    } catch (err) {
                        console.error(err);
                        Swal.fire('خطأ', 'تعذر حذف الصنف', 'error');
                    }
                } else {
                    this.items = this.items.filter(i => i.id !== item.id);
                    Swal.fire('تم الحذف', 'تم حذف الصنف بنجاح (وهمي)', 'success');
                }
            }
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
                    try {
                        const res = await axios.post(`{{baseUrl}}/api/v1/items/register-item`, item);
                        this.items.push(res.data);
                    } catch (err) { console.error(err); }
                }
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Items');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Items.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.items.map(item => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = item[f.key]; });
                return row;
            });
            autoTable(doc, {
                head: [columns.map(c => c.header)],
                body: rows.map(r => columns.map(c => r[c.dataKey]))
            });
            doc.save('Items.pdf');
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
        this.fetchItems();
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-content {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 600px;
    width: 100%;
}

.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
