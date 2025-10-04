<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-3">
            <!-- Add Button -->
            <router-link :to="{ name: 'admin.customers.create' }" class="btn btn-lg btn-main me-3">
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
                    <li><button class="dropdown-item" @click="exportExcel">{{ $t('buttons.export_excel') }}</button>
                    </li>
                    <li><button class="dropdown-item" @click="exportPDF">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item" @click="printTable">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ $t('label.customers') }}</h3>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mb-3">
            <!-- Search Bar (col-9) -->
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search')" v-model="searchQuery" />
            </div>

            <!-- Column Toggle Dropdown (col-3) -->
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

        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-if="loading">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No items found</td>
                    </tr>
                    <tr v-else v-for="item in paginatedItems" :key="item.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ item[field.key] }}</td>
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

        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ $t('buttons.previous') }}
            </button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t('buttons.next') }}
            </button>
        </div>

        <!-- View Customer Modal -->
        <!-- <div class="modal fade" id="viewItemModal" tabindex="-1" aria-labelledby="viewItemModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="viewItemModalLabel">
                            {{ selectedItem?.customer_name || 'تفاصيل الزبون' }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>رقم العميل:</th>
                                    <td>{{ selectedItem?.customer_number }}</td>
                                    <th>الرصيد:</th>
                                    <td>{{ selectedItem?.balance }} {{ selectedItem?.currency }}</td>
                                </tr>
                                <tr>
                                    <th>الفرع:</th>
                                    <td>{{ selectedItem?.branch }}</td>
                                    <th>تاريخ آخر حركة:</th>
                                    <td>{{ selectedItem?.date_of_last_movement }}</td>
                                </tr>
                                <tr>
                                    <th>الجوال:</th>
                                    <td>{{ selectedItem?.mobile }}</td>
                                    <th>مندوب المبيعات:</th>
                                    <td>{{ selectedItem?.sales_representative }}</td>
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
        </div> -->


    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import * as bootstrap from 'bootstrap';
import axios from "axios";

export default {
    name: 'ItemsComponent',
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            useApi: true, // true = استخدام API، false = بيانات وهمية
            isLoading: false,
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            loading: false,
            selectedItem: null,
            items: [], // سيتم ملؤها حسب useApi
            table: {
                fields: [
                    { name: 'رقم العميل', key: 'customer_number', status: true },
                    { name: 'اسم الزبون', key: 'customer_name', status: true },
                    { name: 'الرصيد', key: 'balance', status: true },
                    { name: 'العملة', key: 'currency', status: true },
                    { name: 'الفرع', key: 'branch', status: true },
                    { name: 'تاريخ آخر حركة', key: 'date_of_last_movement', status: true },
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
                (item.customer_number?.toLowerCase().includes(query)) ||
                (item.customer_name?.toLowerCase().includes(query)) ||
                (item.mobile?.includes(query))
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
            this.isLoading = true;
            if (this.useApi) {
                try {
                    const token = localStorage.getItem('authToken');
                    const res = await axios.get(`/customers/`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                        params: { per_page: this.perPage }
                    });
                    this.items = (res.data.data || res.data).map((item, index) => ({
                        id: parseInt(item.id || index + 1),
                        customer_number: item.customer_number,
                        customer_name: item.customer_name,
                        balance: item.balance,
                        currency: item.currency,
                        branch: item.branch,
                        date_of_last_movement: item.date_of_last_movement,
                        mobile: item.mobile,
                        sales_representative: item.sales_representative
                    }));
                } catch (err) {
                    console.error(err);
                    Swal.fire('خطأ', 'فشل في جلب بيانات الزبائن من السيرفر', 'error');
                }
            } else {
                // بيانات وهمية
                this.items = Array.from({ length: 20 }, (_, i) => ({
                    id: i + 1,
                    customer_number: `CUST-${1000 + i}`,
                    customer_name: `الزبون ${i + 1}`,
                    balance: (Math.random() * 1000).toFixed(2),
                    currency: ["USD", "ILS", "EUR"][i % 3],
                    branch: ["الرئيسي", "فرع غزة", "فرع رام الله"][i % 3],
                    date_of_last_movement: new Date(2025, i % 12, (i + 1) * 2).toISOString().split('T')[0],
                    mobile: `059${1000000 + i}`,
                    sales_representative: `مندوب ${i + 1}`
                }));
            }
            this.isLoading = false;
        },

        viewItem(item) {
            this.$router.push({
                name: 'admin.customers.show',
                params: { id: item.id }
            });
            // this.selectedItem = item;
            // const modalEl = document.getElementById('viewItemModal');
            // const modal = new bootstrap.Modal(modalEl);
            // modal.show();
        },

        // closeModal() {
        //     const modalEl = document.getElementById('viewItemModal');
        //     const modal = bootstrap.Modal.getInstance(modalEl);
        //     if (modal) modal.hide();
        //     this.selectedItem = null;
        // },

        editItem(item) {
            this.$router.push({
                name: 'admin.customers.edit',
                params: { id: item.id }
            });
        },

        deleteItem(item) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(async result => {
                if (result.isConfirmed) {
                    if (this.useApi) {
                        try {
                            const token = localStorage.getItem('authToken');
                            await axios.delete(`${this.baseUrl}/customers/${item.id}`, {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            this.items = this.items.filter(i => i.id !== item.id);
                            Swal.fire('تم الحذف', 'تم حذف الزبون بنجاح', 'success');
                        } catch (err) {
                            Swal.fire('خطأ', 'فشل في حذف الزبون', 'error');
                        }
                    } else {
                        this.items = this.items.filter(i => i.id !== item.id);
                        Swal.fire('تم الحذف', 'تم حذف الزبون محليًا', 'success');
                    }
                }
            });
        },

        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        importExcel(event) {
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
                        customer_number: item.customer_number || `CUST-${this.items.length + 1}`,
                        customer_name: item.customer_name || "No Name",
                        balance: item.balance || 0,
                        currency: item.currency || "USD",
                        branch: item.branch || "Main",
                        date_of_last_movement: item.date_of_last_movement || null,
                        mobile: item.mobile || "-",
                        sales_representative: item.sales_representative || "-"
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        },

        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.items);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Customers");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Customers.xlsx");
        },

        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.items.map(item =>
                this.visibleFields.reduce((acc, field) => { acc[field.key] = item[field.key]; return acc; }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save("customers.pdf");
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

.modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    margin-top: 10%;
}
</style>
