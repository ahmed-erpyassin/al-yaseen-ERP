<template>
    <div class="container pe-5 ps-5">
        <LoadingComponent :isLoading="isLoading" />

        <h1><i class="bi bi-image"></i> {{ $t('label.credit_notices') }}</h1>

        <!-- أزرار إنشاء وتصدير -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.new-credit-notice' }" class="btn btn-lg btn-main me-3">
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
                <input type="text" class="form-control" :placeholder="$t('label.search_account')"
                    v-model="searchQuery" />
            </div>

            <!-- تبديل الأعمدة -->
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
                <tbody>
                    <tr v-if="isLoading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">{{ $t('label.no_data') }}</td>
                    </tr>
                    <tr v-else v-for="notice in paginatedItems" :key="notice.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ notice[field.key] || '-' }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"
                                @click="viewItem(notice)"></i>
                            <i class="bi bi-pencil action-icon" :title="$t('buttons.edit')"
                                @click="editItem(notice)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(notice)"></i>
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
import axios from 'axios';
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

export default {
    name: 'CreditNoticesComponent',
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
                    { name: this.$t('label.notification_number'), key: 'notification_number', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.hour'), key: 'hour', status: true },
                    { name: this.$t('label.account_no'), key: 'account_no', status: true },
                    { name: this.$t('label.customer_name'), key: 'customer_name', status: true },
                    { name: this.$t('label.licensed_operator'), key: 'licensed_operator', status: true },
                    { name: this.$t('label.amount'), key: 'amount', status: true },
                    { name: this.$t('label.currency'), key: 'currency', status: true },
                    { name: this.$t('label.registration_number'), key: 'registration_number', status: true },
                ],
            },
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
        },
    },
    methods: {
        async fetchItems() {
            this.isLoading = true;
            try {
                const response = await axios.get('/api/v1/credit-notices/list-all');
                this.items = response.data.data || response.data || [];
            } catch (error) {
                Swal.fire('خطأ', 'حدث خطأ أثناء تحميل البيانات', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
        viewItem(item) {
            this.$router.push({ name: 'admin.view-credit-notice', params: { id: item.id } });
        },
        editItem(item) {
            const routeExists = this.$router.hasRoute('admin.edit-credit-notice');
            if (routeExists) {
                this.$router.push({ name: 'admin.edit-credit-notice', params: { id: item.id } });
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
                cancelButtonText: 'إلغاء',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/v1/credit-notices/delete/${item.id}`);
                        this.items = this.items.filter(i => i.id !== item.id);
                        Swal.fire('تم الحذف', 'تم حذف الإشعار بنجاح', 'success');
                    } catch (error) {
                        Swal.fire('خطأ', 'تعذر حذف الإشعار', 'error');
                    }
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
                        notification_number: item.notification_number || `CN-${this.items.length + 1}`,
                        customer_name: item.customer_name || '-',
                        licensed_operator: item.licensed_operator || '-',
                        amount: item.amount || 0,
                        date: item.date || '-',
                        currency: item.currency || 'USD',
                        registration_number: item.registration_number || '-',
                        account_no: item.account_no || '-',
                        hour: item.hour || '-',
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'CreditNotices');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'CreditNotices.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.items.map(item => this.visibleFields.reduce((acc, field) => { acc[field.key] = item[field.key]; return acc; }, {}));
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save('CreditNotices.pdf');
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
    },
    mounted() {
        this.fetchItems();
    },
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

.action-icon.bi-trash {
    color: #dc3545;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}
</style>
