<template>
    <div class="container pe-5 ps-5">
        <LoadingComponent :isLoading="isLoading" />

        <h1><i class="bi bi-gear"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- أزرار إنشاء واستيراد/تصدير -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.new-service' }" class="btn btn-lg btn-main me-3">
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

        <!-- شريط البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery" />
            </div>

            <!-- Toggle للأعمدة -->
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

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No items found</td>
                    </tr>
                    <tr v-else v-for="service in paginatedItems" :key="service.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ service[field.key] || '-' }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"
                                @click="viewItem(service)"></i>
                            <i class="bi bi-pencil action-icon" :title="$t('buttons.edit')"
                                @click="editItem(service)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(service)"></i>
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
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

export default {
    name: 'ServicesComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            items: [],
            table: {
                fields: [
                    { name: this.$t('label.invoice_no'), key: 'invoice_no', status: true },
                    { name: this.$t('label.customer_name'), key: 'customer_name', status: true },
                    { name: this.$t('label.licensed_operator'), key: 'licensed_operator', status: true },
                    { name: this.$t('label.amount'), key: 'amount', status: true },
                    { name: this.$t('label.currency'), key: 'currency', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.registration_number'), key: 'registration_number', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(item =>
                Object.values(item).some(val => val?.toString().toLowerCase().includes(query))
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
        fetchItems() {
            this.isLoading = true;
            setTimeout(() => {
                this.items = Array.from({ length: 20 }, (_, i) => ({
                    id: i + 1,
                    invoice_no: `INV-${1000 + i}`,
                    customer_name: `العميل ${i + 1}`,
                    licensed_operator: `Operator ${i % 5}`,
                    amount: (Math.random() * 1000).toFixed(2),
                    currency: ['USD', 'EUR', 'ILS'][i % 3],
                    date: new Date(2025, i % 12, (i + 1) * 2).toISOString().split('T')[0],
                    registration_number: `REG-${2000 + i}`
                }));
                this.isLoading = false;
            }, 500);
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        viewItem(item) { this.$router.push({ name: 'admin.view-service', params: { id: item.id } }); },
        editItem(item) {
            if (!item || !item.id) return;
            const routeExists = this.$router.hasRoute('admin.services.edit');
            if (routeExists) {
                this.$router.push({ name: 'admin.services.edit', params: { id: item.id } });
            } else {
                Swal.fire('تنبيه', 'صفحة التعديل غير معرفة', 'info');
            }
        },

        deleteItem(item) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(result => {
                if (result.isConfirmed) {
                    // حذف العنصر محليًا من المصفوفة
                    this.items = this.items.filter(i => i.id !== item.id);
                    Swal.fire('تم الحذف', 'تم حذف الشحنة بنجاح', 'success');
                }
            });
        },
        importExcel(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                jsonData.forEach(item => {
                    this.items.push({
                        id: this.items.length + 1,
                        invoice_no: item.invoice_no || `INV-${this.items.length + 1}`,
                        customer_name: item.customer_name || '-',
                        licensed_operator: item.licensed_operator || '-',
                        amount: item.amount || 0,
                        currency: item.currency || 'USD',
                        date: item.date || '-',
                        registration_number: item.registration_number || '-'
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Services');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Services.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.items.map(item => this.visibleFields.reduce((acc, field) => { acc[field.key] = item[field.key]; return acc; }, {}));
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save('Services.pdf');
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
    mounted() { this.fetchItems(); }
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
    transition: all 0.2s ease;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-1px);
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s, color 0.3s, opacity 0.3s;
}

.action-icon.bi-eye {
    color: #0d6efd;
}

.action-icon.bi-pencil {
    color: #ffc107;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}
</style>
