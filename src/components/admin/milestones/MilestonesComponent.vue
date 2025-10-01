<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-flag"></i> {{ $t('label.project_stages') }}</h1>

        <!-- Action Buttons -->
        <div class="action-buttons mb-4">
            <button type="button" class="btn btn-success" @click="openAddStageModal">
                <i class="bi bi-plus me-2"></i>{{ $t('buttons.add_new_stage') }}
            </button>
        </div>

        <!-- Stages Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>#</th>
                        <th>الموظف</th>
                        <th>رقم المشروع</th>
                        <th>اسم المشروع</th>
                        <th>اسم المرحلة</th>
                        <th>تاريخ البداية</th>
                        <th>تاريخ النهاية</th>
                        <th>الحالة</th>
                        <th>التقدم</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stage, index) in stages" :key="stage.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ stage.employee }}</td>
                        <td>{{ stage.project_id }}</td>
                        <td>{{ stage.project_name }}</td>
                        <td>{{ stage.stage_name }}</td>
                        <td>{{ stage.start_date }}</td>
                        <td>{{ stage.end_date }}</td>
                        <td>
                            <span :class="['badge', getStatusClass(stage.status)]">{{ stage.status_label }}</span>
                        </td>
                        <td>
                            <div class="progress" style="height: 20px;">
                                <div class="progress-bar" :style="{ width: stage.progress + '%' }">
                                    {{ stage.progress }}%
                                </div>
                            </div>
                        </td>
                        <td>
                            <i class="bi bi-eye action-icon me-2 text-info" @click="viewStage(stage)" title="عرض"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning" @click="openEditStageModal(stage)"
                                title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="confirmDeleteStage(stage)"
                                title="حذف"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add / Edit Stage Modal -->
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
                                <div class="col-md-6 mb-3">
                                    <label>الموظف</label>
                                    <input type="text" class="form-control" v-model="modalStage.employee" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>رقم المشروع</label>
                                    <input type="text" class="form-control" v-model="modalStage.project_id" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>اسم المشروع</label>
                                    <input type="text" class="form-control" v-model="modalStage.project_name"
                                        required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>اسم المرحلة</label>
                                    <input type="text" class="form-control" v-model="modalStage.stage_name" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>تاريخ البداية</label>
                                    <input type="date" class="form-control" v-model="modalStage.start_date" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>تاريخ النهاية</label>
                                    <input type="date" class="form-control" v-model="modalStage.end_date" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>الحالة</label>
                                    <select class="form-control" v-model="modalStage.status" required>
                                        <option value="not_started">لم تبدأ</option>
                                        <option value="in_progress">قيد التنفيذ</option>
                                        <option value="completed">مكتملة</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>التقدم (%)</label>
                                    <input type="number" class="form-control" min="0" max="100"
                                        v-model="modalStage.progress" required />
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
            stages: [],
            modalStage: {},
            modalType: '',
            modalTitle: '',
            bsModal: null
        };
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.stageModal, {});
        this.fetchStages();
    },
    methods: {
        // ================= API Calls =================
        async fetchStages() {
            try {
                const response = await axios.get('/api/stages'); // ضع هنا الـ endpoint الصحيح
                this.stages = response.data.map(stage => ({
                    ...stage,
                    status_label: this.getStatusLabel(stage.status)
                }));
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: 'error', title: 'فشل', text: 'فشل في جلب البيانات من السيرفر!' });
            }
        },
        async saveStage() {
            if (!this.modalStage.employee || !this.modalStage.project_id || !this.modalStage.stage_name) {
                Swal.fire({ icon: 'error', title: 'فشل', text: 'الرجاء تعبئة جميع الحقول المطلوبة!' });
                return;
            }
            this.modalStage.status_label = this.getStatusLabel(this.modalStage.status);

            try {
                if (this.modalType === 'add') {
                    const response = await axios.post('/api/stages', this.modalStage); // ضع هنا endpoint POST
                    this.stages.unshift({ ...response.data, status_label: this.getStatusLabel(response.data.status) });
                    Swal.fire({ icon: 'success', title: 'تمت الإضافة', text: `تمت إضافة المرحلة: ${this.modalStage.stage_name}` });
                } else {
                    const response = await axios.put(`/api/stages/${this.modalStage.id}`, this.modalStage); // endpoint PUT
                    const index = this.stages.findIndex(s => s.id === this.modalStage.id);
                    if (index !== -1) this.stages.splice(index, 1, { ...response.data, status_label: this.getStatusLabel(response.data.status) });
                    Swal.fire({ icon: 'success', title: 'تم التعديل', text: `تم تعديل المرحلة: ${this.modalStage.stage_name}` });
                }
                this.closeStageModal();
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: 'error', title: 'فشل', text: 'فشل في حفظ البيانات على السيرفر!' });
            }
        },
        async confirmDeleteStage(stage) {
            const result = await Swal.fire({
                title: 'هل أنت متأكد من حذف المرحلة؟',
                text: `سيتم حذف المرحلة: ${stage.stage_name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'نعم، احذف!',
                cancelButtonText: 'إلغاء'
            });
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/stages/${stage.id}`); // endpoint DELETE
                    this.stages = this.stages.filter(s => s.id !== stage.id);
                    Swal.fire({ icon: 'success', title: 'تم الحذف', text: `تم حذف المرحلة: ${stage.stage_name}` });
                } catch (error) {
                    console.error(error);
                    Swal.fire({ icon: 'error', title: 'فشل', text: 'فشل في حذف البيانات من السيرفر!' });
                }
            }
        },
        // ================= Modal =================
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
        closeStageModal() {
            this.bsModal.hide();
        },
        viewStage(stage) {
            Swal.fire({
                title: `تفاصيل المرحلة: ${stage.stage_name}`,
                html: `
          <p><strong>الموظف:</strong> ${stage.employee}</p>
          <p><strong>رقم المشروع:</strong> ${stage.project_id}</p>
          <p><strong>اسم المشروع:</strong> ${stage.project_name}</p>
          <p><strong>تاريخ البداية:</strong> ${stage.start_date}</p>
          <p><strong>تاريخ النهاية:</strong> ${stage.end_date}</p>
          <p><strong>الحالة:</strong> ${stage.status_label}</p>
          <p><strong>التقدم:</strong> ${stage.progress}%</p>
        `,
                icon: 'info',
                confirmButtonText: 'إغلاق'
            });
        },
        // ================= Helpers =================
        getStatusLabel(status) {
            return { 'not_started': 'لم تبدأ', 'in_progress': 'قيد التنفيذ', 'completed': 'مكتملة' }[status] || 'لم تبدأ';
        },
        getStatusClass(status) {
            return { 'not_started': 'bg-secondary', 'in_progress': 'bg-warning', 'completed': 'bg-success' }[status] || 'bg-secondary';
        }
    }
};
</script>

<style scoped>
.progress {
    background-color: #e9ecef;
    border-radius: 6px;
}

.progress-bar {
    background-color: #28a745;
    color: white;
    font-weight: 500;
}

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.action-icon:hover {
    transform: scale(1.2);
}

.text-info {
    color: #0dcaf0;
}

/* أيقونة العين */
.text-warning {
    color: #ffc107;
}

/* أيقونة التعديل */
.text-danger {
    color: #dc3545;
}

/* أيقونة الحذف */
.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #212529;
}

.btn-warning:hover {
    background-color: #e0a800;
    border-color: #d39e00;
}
</style>
