<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-people"></i> {{ $t('label.employees') }}</h1>

        <!-- أزرار إنشاء واستيراد/تصدير -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.employees.create' }" class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>
            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
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
                <input type="text" class="form-control" :placeholder="$t('label.search_employee')"
                    v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول الموظفين -->
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
                            <div class="spinner-border" role="status"></div>
                        </td>
                    </tr>
                    <tr v-else-if="paginatedEmployees.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا يوجد موظفين</td>
                    </tr>
                    <tr v-else v-for="employee in paginatedEmployees" :key="employee.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ employee[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="عرض" @click="viewEmployee(employee)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="تعديل" @click="editEmployee(employee)"></i>
                            <i class="bi bi-trash action-icon" title="حذف" @click="deleteEmployee(employee)"></i>
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

        <!-- View Employee Modal -->
        <div class="modal fade" id="viewEmployeeModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ selectedEmployee?.name || 'تفاصيل الموظف' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{{ selectedEmployee?.id }}</td>
                                    <th>{{ $t('label.name') }}:</th>
                                    <td>{{ selectedEmployee?.name }}</td>
                                </tr>
                                <tr>
                                    <th>{{ $t('label.department') }}:</th>
                                    <td>{{ selectedEmployee?.department }}</td>
                                    <th>{{ $t('label.branch') }}:</th>
                                    <td>{{ selectedEmployee?.branch }}</td>
                                </tr>
                                <tr>
                                    <th>{{ $t('label.phone') }}:</th>
                                    <td>{{ selectedEmployee?.phone }}</td>
                                    <th>{{ $t('label.balance') }}:</th>
                                    <td>{{ selectedEmployee?.balance }}</td>
                                </tr>
                                <tr>
                                    <th>{{ $t('label.currency') }}:</th>
                                    <td>{{ selectedEmployee?.currency }}</td>
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
    </div>

    <div v-else class="text-center mt-5">
        <p>يرجى تسجيل الدخول للوصول إلى الموظفين.</p>
        <router-link :to="{ name: 'auth.login' }" class="btn btn-primary mt-3">تسجيل الدخول</router-link>
    </div>
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as bootstrap from 'bootstrap';

export default {
    name: "EmployeesComponent",
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            isLoading: true,
            useApi: false, // true لاستخدام API، false لاستخدام بيانات وهمية
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            selectedEmployee: null,
            employees: [],
            table: {
                // أسماء مؤقتة لتجنب مشاكل this.$t داخل data()
                fields: [
                    { name: "ID", key: "id", status: true },
                    { name: "Name", key: "name", status: true },
                    { name: "Department", key: "department", status: true },
                    { name: "Branch", key: "branch", status: true },
                    { name: "Phone", key: "phone", status: true },
                    { name: "Balance", key: "balance", status: true },
                    { name: "Currency", key: "currency", status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredEmployees() {
            if (!this.searchQuery) return this.employees;
            const q = this.searchQuery.toLowerCase();
            return this.employees.filter(e => (e.name || '').toLowerCase().includes(q));
        },
        paginatedEmployees() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredEmployees.slice(start, start + this.perPage);
        },
        totalPages() { return Math.ceil(this.filteredEmployees.length / this.perPage); },
        isAuthenticated() { return !!localStorage.getItem('authToken'); }
    },
    methods: {
        async fetchEmployees() {
            if (!this.isAuthenticated) return;
            if (!this.useApi) return;

            this.isLoading = true;
            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get(`${this.baseUrl}/employees/browse-all/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Accept-Language': 'ar'
                    },
                    params: {
                        per_page: this.perPage,
                        sort_field: 'created_at',
                        sort_direction: 'desc',
                    }
                });
                this.employees = res.data.data || res.data;
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'تعذر تحميل الموظفين من API', 'error');
            } finally {
                this.isLoading = false;
            }
        },

        loadDummyEmployees(count = 20) {
            this.employees = Array.from({ length: count }, (_, i) => ({
                id: i + 1,
                name: `Employee ${i + 1}`,
                department: ["HR", "Sales", "IT"][i % 3],
                branch: ["Main Branch", "Gaza Branch", "Ramallah Branch"][i % 3],
                phone: `059${1000000 + i}`,
                balance: (Math.random() * 10000).toFixed(2),
                currency: ["USD", "ILS", "EUR"][i % 3]
            }));
            this.isLoading = false; // توقف اللودنج عند استخدام البيانات الوهمية
        },

        viewEmployee(emp) {
            if (!emp || !emp.id) return;
            this.$router.push({ name: 'admin.employees.show', params: { id: emp.id } });
        },
        editEmployee(emp) {
            this.$router.push({ name: 'admin.employees.edit', params: { id: emp.id } });
        },
        deleteEmployee(emp) {
            Swal.fire({
                title: 'تأكيد الحذف',
                text: 'هل أنت متأكد من حذف هذا الموظف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        if (this.useApi) {
                            const token = localStorage.getItem('authToken');
                            await axios.delete(`${this.baseUrl}/employees/${emp.id}`, {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                        }
                        this.employees = this.employees.filter(e => e.id !== emp.id);
                        Swal.fire('تم الحذف', 'تم حذف الموظف بنجاح', 'success');
                    } catch {
                        Swal.fire('خطأ', 'تعذر حذف الموظف', 'error');
                    }
                }
            });
        },
        closeModal() {
            const modalEl = document.getElementById('viewEmployeeModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedEmployee = null;
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.employees);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Employees');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Employees.xlsx');
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.employees.map(e => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = e[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Employees.pdf');
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
        // بعد المونت، نقوم بترجمة أسماء الأعمدة
        this.table.fields.forEach(f => {
            switch (f.key) {
                case 'id': f.name = this.$t('label.number'); break;
                case 'name': f.name = this.$t('label.name'); break;
                case 'department': f.name = this.$t('label.department'); break;
                case 'branch': f.name = this.$t('label.branch'); break;
                case 'phone': f.name = this.$t('label.phone'); break;
                case 'balance': f.name = this.$t('label.balance'); break;
                case 'currency': f.name = this.$t('label.currency'); break;
            }
        });

        if (this.useApi) {
            this.fetchEmployees();
        } else {
            this.loadDummyEmployees(15);
        }
    }
};
</script>

<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

.header th {
    background-color: #eee !important;
}
</style>
