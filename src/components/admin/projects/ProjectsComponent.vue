<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="container pe-5 ps-5" v-if="isAuthenticated">
        <h1><i class="bi bi-kanban"></i> {{ $t('label.projects') }}</h1>

        <!-- أزرار إنشاء واستيراد/تصدير -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.projects.create' }" class="btn btn-lg btn-main me-3">
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
                <input type="text" class="form-control" :placeholder="$t('label.search_project')"
                    v-model="searchQuery" />
            </div>
        </div>

        <!-- جدول المشاريع -->
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
                    <tr v-else-if="paginatedProjects.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">No projects found</td>
                    </tr>
                    <tr v-else v-for="project in paginatedProjects" :key="project.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ project[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" title="View" @click="viewProject(project)"></i>
                            <i class="bi bi-pencil action-icon me-2" title="Edit" @click="editProject(project)"></i>
                            <i class="bi bi-trash action-icon" title="Delete" @click="deleteProject(project)"></i>
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

        <!-- View Project Modal -->
        <div class="modal fade" id="viewProjectModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ selectedProject?.project_name || 'Project Details' }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{{ selectedProject?.id }}</td>
                                    <th>Project Name:</th>
                                    <td>{{ selectedProject?.project_name }}</td>
                                </tr>
                                <tr>
                                    <th>Customer:</th>
                                    <td>{{ selectedProject?.customer_name }}</td>
                                    <th>Status:</th>
                                    <td>{{ selectedProject?.project_status }}</td>
                                </tr>
                                <tr>
                                    <th>Manager:</th>
                                    <td>{{ selectedProject?.project_manager_name }}</td>
                                    <th>Value:</th>
                                    <td>{{ selectedProject?.project_value }}</td>
                                </tr>
                                <tr>
                                    <th>Start Date:</th>
                                    <td>{{ selectedProject?.project_start_date }}</td>
                                    <th>End Date:</th>
                                    <td>{{ selectedProject?.project_end_date }}</td>
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
        <p>يرجى تسجيل الدخول للوصول إلى المشاريع.</p>
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
    name: 'ProjectsComponent',
    components: { LoadingComponent },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API_BASE_URL,
            isLoading: true,
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            selectedProject: null,
            projects: [],
            useApi: true, // true = استخدام API, false = بيانات وهمية
            table: {
                fields: [
                    { name: 'ID', key: 'id', status: true },
                    { name: 'Project Name', key: 'project_name', status: true },
                    { name: 'Customer', key: 'customer_name', status: true },
                    { name: 'Manager', key: 'project_manager_name', status: true },
                    { name: 'Value', key: 'project_value', status: true },
                    { name: 'Status', key: 'project_status', status: true },
                ]
            }
        };
    },
    computed: {
        visibleFields() { return this.table.fields.filter(f => f.status); },
        filteredProjects() {
            if (!this.searchQuery) return this.projects;
            const q = this.searchQuery.toLowerCase();
            return this.projects.filter(p =>
                (p.project_name || '').toLowerCase().includes(q) ||
                (p.project_manager_name || '').toLowerCase().includes(q)
            );
        },
        paginatedProjects() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredProjects.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredProjects.length / this.perPage) || 1;
        },
        isAuthenticated() {
            return localStorage.getItem('authToken') ? true : false;
        }
    },
    methods: {
        async fetchProjects() {
            if (!this.isAuthenticated) return;
            this.isLoading = true;

            if (this.useApi) {
                // جلب البيانات من API
                try {
                    const token = localStorage.getItem('authToken');
                    const res = await axios.get('/projects/browse-all/', {
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
                    this.projects = (res.data.data || res.data).map(p => ({
                        ...p,
                        id: parseInt(p.id)
                    }));
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error', 'فشل في جلب البيانات من السيرفر', 'error');
                } finally {
                    this.isLoading = false;
                }
            } else {
                // بيانات وهمية
                this.projects = [
                    { id: 1, project_name: 'Project A', customer_name: 'Customer 1', project_manager_name: 'Ahmed', project_value: 10000, project_status: 'Active', project_start_date: '2025-01-01', project_end_date: '2025-06-01' },
                    { id: 2, project_name: 'Project B', customer_name: 'Customer 2', project_manager_name: 'Sara', project_value: 15000, project_status: 'Completed', project_start_date: '2024-03-01', project_end_date: '2024-12-01' },
                    { id: 3, project_name: 'Project C', customer_name: 'Customer 3', project_manager_name: 'Mohammed', project_value: 20000, project_status: 'Pending', project_start_date: '2025-05-01', project_end_date: '2025-11-01' },
                ];
                this.isLoading = false;
            }
        },

        viewProject(project) {
            this.selectedProject = { ...project, id: parseInt(project.id) };
            const modalEl = document.getElementById('viewProjectModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },

        editProject(project) {
            const projectId = parseInt(project.id);
            this.$router.push({ name: 'admin.projects.edit', params: { id: projectId } });
        },

        deleteProject(project) {
            const projectId = parseInt(project.id);
            Swal.fire({
                title: 'تأكيد الحذف',
                text: 'هل أنت متأكد من حذف هذا المشروع؟',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (this.useApi) {
                        try {
                            const token = localStorage.getItem('authToken');
                            await axios.delete(`${this.baseUrl}/projects/${projectId}`, {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            this.projects = this.projects.filter(p => p.id !== projectId);
                            Swal.fire('تم الحذف', 'تم حذف المشروع بنجاح', 'success');
                        } catch (err) {
                            Swal.fire('خطأ', 'حدث خطأ أثناء الحذف', 'error');
                        }
                    } else {
                        // حذف محلي
                        this.projects = this.projects.filter(p => p.id !== projectId);
                        Swal.fire('تم الحذف', 'تم حذف المشروع محليًا', 'success');
                    }
                }
            });
        },

        closeModal() {
            const modalEl = document.getElementById('viewProjectModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            this.selectedProject = null;
        },

        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        exportExcel() {
            const ws = XLSX.utils.json_to_sheet(this.projects);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Projects');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Projects.xlsx');
        },

        exportPDF() {
            const doc = new jsPDF();
            const columns = this.visibleFields.map(f => ({ header: f.name, dataKey: f.key }));
            const rows = this.projects.map(p => {
                const row = {};
                this.visibleFields.forEach(f => { row[f.key] = p[f.key]; });
                return row;
            });
            autoTable(doc, { head: [columns.map(c => c.header)], body: rows.map(r => columns.map(c => r[c.dataKey])) });
            doc.save('Projects.pdf');
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
        this.fetchProjects();
    }
};
</script>



<style scoped>
.action-icon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>
