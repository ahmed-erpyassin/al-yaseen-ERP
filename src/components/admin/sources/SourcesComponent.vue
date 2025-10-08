<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-people-fill me-2"></i> مصادر / الموردون</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button class="btn btn-lg btn-main me-3" @click="openAddResourceModal">
                <i class="bi bi-plus-lg me-2"></i>إضافة مورد جديد
            </button>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    استيراد / تصدير
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            استيراد Excel
                            <input type="file" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item">تصدير Excel</button></li>
                    <li><button class="dropdown-item">تصدير PDF</button></li>
                    <li><button class="dropdown-item">طباعة</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث والإعدادات -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" placeholder="ابحث عن مورد أو مشروع..." v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu rounded-0 p-2" style="width: 250px;">
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
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedResources.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">لا توجد بيانات لعرضها</td>
                    </tr>
                    <tr v-for="(resource) in paginatedResources" :key="resource.id">
                        <td v-for="field in visibleFields" :key="field.key">{{ resource[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2 text-primary" @click="viewResource(resource)"
                                title="عرض"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning"
                                @click="openEditResourceModal(resource)" title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="confirmDeleteResource(resource)"
                                title="حذف"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">السابق</button>
            <span>صفحة {{ currentPage }} من {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">التالي</button>
        </div>

        <!-- المودال -->
        <div class="modal fade" id="resourceModal" tabindex="-1" aria-hidden="true" ref="resourceModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveResource">
                            <div class="row">
                                <div class="col-md-6 mb-3" v-for="field in modalFields" :key="field.key">
                                    <label>{{ field.label }}</label>
                                    <input :type="field.type" class="form-control" v-model="modalResource[field.key]"
                                        :required="field.required" :min="field.min" :max="field.max" />
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label>الملاحظات</label>
                                    <textarea class="form-control" v-model="modalResource.notes"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-success" @click="saveResource">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
// import axios from 'axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

export default {
    name: 'ResourcesComponent',
    data() {
        return {
            useApi: false,
            searchQuery: '',
            resources: [],
            modalResource: {},
            modalTitle: '',
            bsModal: null,
            modalType: '',
            currentPage: 1,
            perPage: 8,

            table: {
                fields: [
                    { name: '#', key: 'id', status: true },
                    { name: 'رقم المورد', key: 'supplier_id', status: true },
                    { name: 'اسم المورد', key: 'supplier_name', status: true },
                    { name: 'رقم المشروع', key: 'project_id', status: true },
                    { name: 'اسم المشروع', key: 'project_name', status: true },
                    { name: 'الدور', key: 'role', status: true },
                    { name: 'قيمة التوريد', key: 'supply_value', status: true },
                    { name: 'النسبة (%)', key: 'percentage', status: true }
                ]
            },
            modalFields: [
                { label: 'رقم المورد', key: 'supplier_id', type: 'text', required: true },
                { label: 'اسم المورد', key: 'supplier_name', type: 'text', required: true },
                { label: 'رقم المشروع', key: 'project_id', type: 'text', required: true },
                { label: 'اسم المشروع', key: 'project_name', type: 'text', required: true },
                { label: 'الدور', key: 'role', type: 'text', required: true },
                { label: 'قيمة التوريد', key: 'supply_value', type: 'number', required: true, min: 0 },
                { label: 'النسبة من المشروع (%)', key: 'percentage', type: 'number', required: true, min: 0, max: 100 }
            ],

            mockResources: [
                { id: 1, supplier_id: 'S-100', supplier_name: 'مورد السلام', project_id: 'P-001', project_name: 'مشروع البحر', role: 'مورد خام', supply_value: 1500, percentage: 5, notes: 'تسليم شهري' },
                { id: 2, supplier_id: 'S-101', supplier_name: 'شركة النور', project_id: 'P-002', project_name: 'مشروع البرج', role: 'مقاول فرعي', supply_value: 5000, percentage: 12, notes: '' },
                { id: 3, supplier_id: 'S-102', supplier_name: 'مؤسسة الريادة', project_id: 'P-001', project_name: 'مشروع البحر', role: 'مورد معدات', supply_value: 3000, percentage: 8, notes: 'دفع بعد الاستلام' }
            ]
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredResources() {
            if (!this.searchQuery) return this.resources;
            const query = this.searchQuery.toLowerCase();
            return this.resources.filter(r =>
                Object.values(r).some(val => val?.toString().toLowerCase().includes(query))
            );
        },
        paginatedResources() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredResources.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredResources.length / this.perPage) || 1;
        }
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.resourceModal, {});
        this.resources = this.mockResources;
    },
    methods: {
        openAddResourceModal() {
            this.modalResource = {};
            this.modalTitle = 'إضافة مورد جديد';
            this.modalType = 'add';
            this.bsModal.show();
        },
        openEditResourceModal(resource) {
            this.modalResource = { ...resource };
            this.modalType = 'edit';
            this.modalTitle = 'تعديل المورد';
            this.bsModal.show();
        },
        async saveResource() {
            if (!this.modalResource.supplier_name || !this.modalResource.project_name) {
                Swal.fire({ icon: 'error', title: 'خطأ', text: 'يرجى تعبئة جميع الحقول المطلوبة!' });
                return;
            }

            if (this.modalType === 'add') {
                const newId = this.resources.length + 1;
                this.resources.unshift({ id: newId, ...this.modalResource });
                Swal.fire({ icon: 'success', title: 'تمت الإضافة', text: 'تمت إضافة المورد بنجاح.' });
            } else {
                const idx = this.resources.findIndex(r => r.id === this.modalResource.id);
                if (idx !== -1) this.resources.splice(idx, 1, { ...this.modalResource });
                Swal.fire({ icon: 'success', title: 'تم التعديل', text: 'تم تعديل المورد بنجاح.' });
            }
            this.bsModal.hide();
        },
        async confirmDeleteResource(resource) {
            const result = await Swal.fire({
                title: 'هل أنت متأكد؟',
                text: `سيتم حذف المورد: ${resource.supplier_name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، احذف',
                cancelButtonText: 'إلغاء',
                confirmButtonColor: '#dc3545'
            });
            if (result.isConfirmed) {
                this.resources = this.resources.filter(r => r.id !== resource.id);
                Swal.fire({ icon: 'success', title: 'تم الحذف', text: 'تم حذف المورد بنجاح.' });
            }
        },
        viewResource(resource) {
            Swal.fire({
                title: `تفاصيل المورد: ${resource.supplier_name}`,
                html: `
                    <p><strong>رقم المورد:</strong> ${resource.supplier_id}</p>
                    <p><strong>اسم المورد:</strong> ${resource.supplier_name}</p>
                    <p><strong>اسم المشروع:</strong> ${resource.project_name}</p>
                    <p><strong>قيمة التوريد:</strong> ${resource.supply_value}</p>
                    <p><strong>النسبة:</strong> ${resource.percentage}%</p>
                    <p><strong>الملاحظات:</strong> ${resource.notes || '-'}</p>
                `,
                icon: 'info',
                confirmButtonText: 'إغلاق'
            });
        },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
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
    transition: transform 0.2s, opacity 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}
</style>
