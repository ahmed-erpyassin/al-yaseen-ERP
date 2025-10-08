<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-flag-fill me-2"></i> {{ $t('label.project_stages') }}</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button class="btn btn-lg btn-main" @click="openAddStageModal">
                <i class="bi bi-plus-lg me-2"></i>{{ $t('buttons.add_new_stage') }}
            </button>

            <div class="dropdown ms-3">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ $t('buttons.import_excel') }}
                            <input type="file" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item">{{ $t('buttons.export_excel') }}</button></li>
                    <li><button class="dropdown-item">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- شريط البحث -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" placeholder="ابحث عن مرحلة أو مشروع..." v-model="searchQuery" />
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

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredStages.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">{{ $t('label.no_data') }}</td>
                    </tr>
                    <tr v-for="(stage) in paginatedStages" :key="stage.id">
                        <td v-for="field in visibleFields" :key="field.key">
                            <template v-if="field.key === 'progress'">
                                <div class="progress" style="height: 20px;">
                                    <div class="progress-bar" :style="{ width: stage.progress + '%' }">
                                        {{ stage.progress }}%
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="field.key === 'status_label'">
                                <span :class="['badge', getStatusClass(stage.status)]">{{ stage.status_label }}</span>
                            </template>
                            <template v-else>
                                {{ stage[field.key] }}
                            </template>
                        </td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2 text-primary" @click="viewStage(stage)"
                                title="عرض"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" @click="openEditStageModal(stage)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="confirmDeleteStage(stage)"
                                title="حذف"></i>
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

        <!-- المودال -->
        <div class="modal fade" id="stageModal" tabindex="-1" aria-hidden="true" ref="stageModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div
                        :class="['modal-header', modalType === 'add' ? 'bg-success text-white' : 'bg-warning text-dark']">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveStage">
                            <div class="row">
                                <div class="col-md-6 mb-3" v-for="field in modalFields" :key="field.key">
                                    <label>{{ field.label }}</label>
                                    <input
                                        v-if="field.type === 'text' || field.type === 'number' || field.type === 'date'"
                                        :type="field.type" class="form-control" v-model="modalStage[field.key]"
                                        required />
                                    <select v-else-if="field.type === 'select'" class="form-control"
                                        v-model="modalStage[field.key]" required>
                                        <option value="not_started">لم تبدأ</option>
                                        <option value="in_progress">قيد التنفيذ</option>
                                        <option value="completed">مكتملة</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" :class="['btn', modalType === 'add' ? 'btn-success' : 'btn-warning']"
                            @click="saveStage">
                            حفظ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

export default {
    name: 'ProjectStages',
    data() {
        return {
            searchQuery: '',
            stages: [],
            currentPage: 1,
            perPage: 5,
            modalStage: {},
            modalType: '',
            modalTitle: '',
            bsModal: null,
            table: {
                fields: [
                    { name: '#', key: 'index', status: true },
                    { name: 'الموظف', key: 'employee', status: true },
                    { name: 'رقم المشروع', key: 'project_id', status: true },
                    { name: 'اسم المشروع', key: 'project_name', status: true },
                    { name: 'اسم المرحلة', key: 'stage_name', status: true },
                    { name: 'تاريخ البداية', key: 'start_date', status: true },
                    { name: 'تاريخ النهاية', key: 'end_date', status: true },
                    { name: 'الحالة', key: 'status_label', status: true },
                    { name: 'التقدم', key: 'progress', status: true }
                ]
            },
            modalFields: [
                { label: 'الموظف', key: 'employee', type: 'text' },
                { label: 'رقم المشروع', key: 'project_id', type: 'text' },
                { label: 'اسم المشروع', key: 'project_name', type: 'text' },
                { label: 'اسم المرحلة', key: 'stage_name', type: 'text' },
                { label: 'تاريخ البداية', key: 'start_date', type: 'date' },
                { label: 'تاريخ النهاية', key: 'end_date', type: 'date' },
                { label: 'الحالة', key: 'status', type: 'select' },
                { label: 'التقدم (%)', key: 'progress', type: 'number' }
            ]
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredStages() {
            if (!this.searchQuery) return this.stages;
            const query = this.searchQuery.toLowerCase();
            return this.stages.filter(s =>
                Object.values(s).some(val => val?.toString().toLowerCase().includes(query))
            );
        },
        paginatedStages() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredStages.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredStages.length / this.perPage) || 1;
        }
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.stageModal, {});
        this.fetchStages();
    },
    methods: {
        async fetchStages() {
            try {
                const response = await axios.get('/api/stages');
                this.stages = response.data.map(stage => ({
                    ...stage,
                    status_label: this.getStatusLabel(stage.status)
                }));
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'خطأ', text: 'فشل في جلب البيانات من السيرفر' });
            }
        },
        openAddStageModal() {
            this.modalStage = { employee: '', project_id: '', project_name: '', stage_name: '', start_date: '', end_date: '', status: 'not_started', progress: 0 };
            this.modalType = 'add';
            this.modalTitle = 'إضافة مرحلة جديدة';
            this.bsModal.show();
        },
        openEditStageModal(stage) {
            this.modalStage = { ...stage };
            this.modalType = 'edit';
            this.modalTitle = 'تعديل المرحلة';
            this.bsModal.show();
        },
        async saveStage() {
            if (!this.modalStage.employee || !this.modalStage.project_id) {
                Swal.fire({ icon: 'error', title: 'خطأ', text: 'يرجى تعبئة جميع الحقول المطلوبة' });
                return;
            }
            try {
                if (this.modalType === 'add') {
                    const response = await axios.post('/api/stages', this.modalStage);
                    this.stages.unshift({ ...response.data, status_label: this.getStatusLabel(response.data.status) });
                    Swal.fire({ icon: 'success', title: 'تمت الإضافة', text: `تمت إضافة المرحلة: ${this.modalStage.stage_name}` });
                } else {
                    const response = await axios.put(`/api/stages/${this.modalStage.id}`, this.modalStage);
                    const index = this.stages.findIndex(s => s.id === this.modalStage.id);
                    if (index !== -1) this.stages.splice(index, 1, { ...response.data, status_label: this.getStatusLabel(response.data.status) });
                    Swal.fire({ icon: 'success', title: 'تم التعديل', text: `تم تعديل المرحلة: ${this.modalStage.stage_name}` });
                }
                this.bsModal.hide();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'فشل', text: 'حدث خطأ أثناء الحفظ' });
            }
        },
        async confirmDeleteStage(stage) {
            const result = await Swal.fire({
                title: 'هل أنت متأكد؟',
                text: `سيتم حذف المرحلة: ${stage.stage_name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، احذفها',
                cancelButtonText: 'إلغاء',
                confirmButtonColor: '#dc3545'
            });
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/stages/${stage.id}`);
                    this.stages = this.stages.filter(s => s.id !== stage.id);
                    Swal.fire({ icon: 'success', title: 'تم الحذف', text: 'تم حذف المرحلة بنجاح' });
                } catch {
                    Swal.fire({ icon: 'error', title: 'فشل', text: 'فشل في حذف البيانات' });
                }
            }
        },
        getStatusLabel(status) {
            return { not_started: 'لم تبدأ', in_progress: 'قيد التنفيذ', completed: 'مكتملة' }[status];
        },
        getStatusClass(status) {
            return { not_started: 'bg-secondary', in_progress: 'bg-warning', completed: 'bg-success' }[status];
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

.progress {
    background-color: #e9ecef;
    border-radius: 6px;
}

.progress-bar {
    background-color: #28a745;
    color: white;
    font-weight: 500;
}

.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}
</style>
