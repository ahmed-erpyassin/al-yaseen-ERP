<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.projects.create' }" class="btn btn-lg btn-main me-3">
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

        <div class="row mb-4">
            <div class="col-12">
                <h3>{{ $t('label.projects') }}</h3>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_project')"
                    v-model="searchQuery" />
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
                        <td :colspan="visibleFields.length + 1" class="text-center">No projects found</td>
                    </tr>
                    <tr v-else v-for="project in paginatedItems" :key="project.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ project[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.view')"
                                @click="viewItem(project)"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="$t('buttons.edit')"
                                @click="editItem(project)"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"
                                @click="deleteItem(project)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('buttons.previous')
            }}</button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{
                $t('buttons.next') }}</button>
        </div>

        <!-- View Project Modal -->
        <div class="modal fade" id="viewProjectModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ selectedProject?.project_name || 'تفاصيل المشروع' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>رقم المشروع:</th>
                                    <td>{{ selectedProject?.number }}</td>
                                    <th>اسم العميل:</th>
                                    <td>{{ selectedProject?.customer_name }}</td>
                                </tr>
                                <tr>
                                    <th>التاريخ:</th>
                                    <td>{{ selectedProject?.date }}</td>
                                    <th>الحالة:</th>
                                    <td>{{ selectedProject?.status }}</td>
                                </tr>
                                <tr>
                                    <th>مدير المشروع:</th>
                                    <td>{{ selectedProject?.project_manager_name }}</td>
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
</template>

<script>
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
    name: 'ProjectsComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: true,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            selectedProject: null,
            projects: [],  // سيتم جلبها من API
            table: {
                fields: [
                    { name: 'الرقم', key: 'number', status: true },
                    { name: 'اسم العميل', key: 'customer_name', status: true },
                    { name: 'اسم المشروع', key: 'project_name', status: true },
                    { name: 'التاريخ', key: 'date', status: true },
                    { name: 'الحالة', key: 'status', status: true },
                    { name: 'مدير المشروع', key: 'project_manager_name', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredItems() {
            if (!this.searchQuery) return this.projects;
            const q = this.searchQuery.toLowerCase();
            return this.projects.filter(p =>
                p.number.toLowerCase().includes(q) ||
                p.customer_name.toLowerCase().includes(q) ||
                p.project_name.toLowerCase().includes(q)
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
    methods: {
        async fetchProjects() {
            this.isLoading = true;
            try {
                const response = await axios.get('/api/projects'); // ضع رابط API الصحيح
                this.projects = response.data;
            } catch (err) {
                console.error(err);
                Swal.fire('خطأ', 'تعذر جلب المشاريع من السيرفر', 'error');
            } finally {
                this.isLoading = false;
            }
        },
        viewItem(project) {
            this.selectedProject = project;
            const modalEl = document.getElementById('viewProjectModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },
        closeModal() {
            const modalEl = document.getElementById('viewProjectModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedProject = null;
        },
        editItem(project) {
            // توجيه لصفحة التعديل أو فتح مودال للتعديل
            this.$router.push({ name: 'admin.projects.edit', params: { id: project.id } });
        },
        async deleteItem(project) {
            Swal.fire({
                title: 'هل أنت متأكد من الحذف؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'حذف',
                cancelButtonText: 'إلغاء'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/projects/${project.id}`);
                        this.projects = this.projects.filter(p => p.id !== project.id);
                        Swal.fire('تم الحذف', 'تم حذف المشروع بنجاح', 'success');
                    } catch (err) {
                        console.error(err);
                        Swal.fire('خطأ', 'تعذر حذف المشروع', 'error');
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
                jsonData.forEach(async item => {
                    try {
                        const res = await axios.post('/api/projects', item); // حفظ كل مشروع جديد في السيرفر
                        this.projects.push(res.data);
                    } catch (err) {
                        console.error(err);
                    }
                });
            };
            reader.readAsArrayBuffer(file);
        },
        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.projects);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Projects");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Projects.xlsx");
        },
        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.projects.map(item =>
                this.visibleFields.reduce((acc, field) => { acc[field.key] = item[field.key]; return acc; }, {})
            );
            autoTable(doc, { columns, body: rows, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [29, 115, 66] } });
            doc.save("Projects.pdf");
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
        console.log('Auth state:', this.$store.state.auth);
    console.log('Auth token:', this.$store.state.auth?.authToken);
        this.fetchProjects();
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

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.table {
    font-size: 18px;
}

.btn-secondary {
    font-size: 16px;
    padding: 8px 20px;
}

.search-bar input.form-control {
    min-width: 200px;
}

.dropdown-menu {
    min-width: 200px;
}

.pages p {
    font-size: 25px;
}

.table-responsive {
    max-height: 600px;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .search-bar input.form-control {
        min-width: 100px;
    }

    .btn-main,
    .btn-secondary {
        font-size: 14px;
        padding: 6px 15px;
    }
}
</style>
