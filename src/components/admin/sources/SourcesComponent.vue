<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-people"></i> مصادر</h1>

        <!-- Action Button -->
        <div class="action-buttons mb-4 d-flex justify-content-between align-items-center">
            <div>
                <router-link :to="{ name: 'admin.sources.create' }" class="btn btn-lg btn-main me-3">
                    إضافة مورد جديد
                </router-link>
            </div>
        </div>

        <!-- Resources Table -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>#</th>
                        <th>رقم المورد</th>
                        <th>اسم المورد</th>
                        <th>رقم المشروع</th>
                        <th>اسم المشروع</th>
                        <th>الدور</th>
                        <th>قيمة التوريد</th>
                        <th>النسبة من المشروع</th>
                        <th>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(resource, index) in resources" :key="resource.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ resource.supplier_id }}</td>
                        <td>{{ resource.supplier_name }}</td>
                        <td>{{ resource.project_id }}</td>
                        <td>{{ resource.project_name }}</td>
                        <td>{{ resource.role }}</td>
                        <td>{{ resource.supply_value }}</td>
                        <td>{{ resource.percentage }}%</td>
                        <td>
                            <i class="bi bi-eye action-icon me-2 text-info" @click="viewResource(resource)"
                                title="عرض"></i>
                            <i class="bi bi-pencil action-icon me-2 text-warning"
                                @click="openEditResourceModal(resource)" title="تعديل"></i>
                            <i class="bi bi-trash action-icon text-danger" @click="confirmDeleteResource(resource)"
                                title="حذف"></i>
                        </td>
                    </tr>
                    <tr v-if="resources.length === 0">
                        <td class="text-center" colspan="9">لا توجد بيانات لعرضها</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add / Edit Resource Modal -->
        <div class="modal fade" id="resourceModal" tabindex="-1" aria-hidden="true" ref="resourceModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div :class="['modal-header', 'bg-warning text-dark']">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveResource">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>رقم المورد</label>
                                    <input type="text" class="form-control" v-model="modalResource.supplier_id"
                                        required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>اسم المورد</label>
                                    <input type="text" class="form-control" v-model="modalResource.supplier_name"
                                        required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>رقم المشروع</label>
                                    <input type="text" class="form-control" v-model="modalResource.project_id"
                                        required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>اسم المشروع</label>
                                    <input type="text" class="form-control" v-model="modalResource.project_name"
                                        required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>الدور</label>
                                    <input type="text" class="form-control" v-model="modalResource.role" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>قيمة التوريد</label>
                                    <input type="number" class="form-control"
                                        v-model.number="modalResource.supply_value" min="0" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>النسبة من المشروع (%)</label>
                                    <input type="number" class="form-control" v-model.number="modalResource.percentage"
                                        min="0" max="100" required />
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
                        <button type="button" :class="['btn', 'btn-warning']" @click="saveResource">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * ResourcesComponent.vue
 * يمكنك تبديل useApi بين true/false لتجربة العمل مع API أو مع بيانات وهمية محليّة.
 *
 * ملاحظات:
 * - إذا جعلت useApi = true: استبدل مسارات axios (GET/POST/PUT/DELETE) بالـ endpoints الحقيقية من ملف Postman collection.
 * - يُفضّل استيراد bootstrap JS في main.js لمرة واحدة:
 *     import 'bootstrap/dist/css/bootstrap.min.css'
 *     import 'bootstrap/dist/js/bootstrap.bundle.min.js'
 */
import Swal from 'sweetalert2';
import axios from 'axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

export default {
    name: 'ResourcesComponent',
    data() {
        return {
            useApi: false, // إذا true يستخدم API، إذا false يعرض بيانات وهمية

            // بيانات العرض
            resources: [],

            // نموذج الـ Modal
            modalResource: {},
            modalType: '',
            modalTitle: '',
            bsModal: null,

            // بيانات وهمية للاختبار (تُستخدم عندما useApi === false)
            mockResources: [
                {
                    id: 1,
                    supplier_id: 'S-100',
                    supplier_name: 'مورد السلام',
                    project_id: 'P-001',
                    project_name: 'مشروع البحر',
                    role: 'مزوّد خام',
                    supply_value: 1500,
                    percentage: 5,
                    notes: 'تسليم شهري'
                },
                {
                    id: 2,
                    supplier_id: 'S-101',
                    supplier_name: 'شركة النور',
                    project_id: 'P-002',
                    project_name: 'مشروع البرج',
                    role: 'مقاول فرعي',
                    supply_value: 5000,
                    percentage: 12,
                    notes: ''
                },
                {
                    id: 3,
                    supplier_id: 'S-102',
                    supplier_name: 'مؤسسة الريادة',
                    project_id: 'P-001',
                    project_name: 'مشروع البحر',
                    role: 'مورد معدات',
                    supply_value: 3000,
                    percentage: 8,
                    notes: 'دفع بعد الاستلام'
                }
            ],

            // لتوليد id محلي عند useApi = false
            nextMockId: 4
        };
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.resourceModal, {});
        if (this.useApi) {
            this.fetchResources(); // جلب من API
        } else {
            this.resources = [  // بيانات وهمية
                { id: 1, supplier_id: '101', supplier_name: 'مورد أ', project_id: '1001', project_name: 'مشروع أ', role: 'مقاول', supply_value: 5000, percentage: 10, notes: 'ملاحظات تجريبية' },
                { id: 2, supplier_id: '102', supplier_name: 'مورد ب', project_id: '1002', project_name: 'مشروع ب', role: 'مزود', supply_value: 3000, percentage: 5, notes: '' }
            ];
        }
    },
    watch: {
        // عندما يغير المستخدم المفتاح يمكن إعادة تحميل البيانات
        useApi() {
            this.fetchResources();
        }
    },
    methods: {
        // =================== Fetch ===================
        async fetchResources() {
            if (!this.useApi) return; // إذا false لا يفعل شيء
            try {
                const response = await axios.get('/api/resources');
                this.resources = response.data;
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: 'error', title: 'فشل', text: 'فشل في جلب بيانات المصادر!' });
            }
        },

        // =================== Modal open/close ===================
        openEditResourceModal(resource) {
            // clone لمنع التعديل المباشر قبل الحفظ
            this.modalResource = { ...resource };
            this.modalType = 'edit';
            this.modalTitle = 'تعديل المورد';
            this.bsModal.show();
        },
        closeResourceModal() {
            this.bsModal.hide();
        },

        // =================== Save (add / edit) ===================
        async saveResource() {
            // تحقق سريع من الحقول المطلوبة
            if (!this.modalResource.supplier_id || !this.modalResource.supplier_name || !this.modalResource.project_id || this.modalResource.percentage === null || this.modalResource.percentage === undefined) {
                Swal.fire({ icon: 'error', title: 'فشل', text: 'الرجاء تعبئة جميع الحقول المطلوبة!' });
                return;
            }

            if (!this.useApi) {
                // تعامل محلي (mock)
                if (this.modalType === 'add') {
                    const newItem = { ...this.modalResource, id: this.nextMockId++ };
                    this.mockResources.unshift(newItem);
                    this.resources.unshift(newItem);
                    Swal.fire({ icon: 'success', title: 'تمت الإضافة', text: 'تمت إضافة المورد محليًا.' });
                } else {
                    const idxMock = this.mockResources.findIndex(r => r.id === this.modalResource.id);
                    if (idxMock !== -1) this.mockResources.splice(idxMock, 1, { ...this.modalResource });
                    const idx = this.resources.findIndex(r => r.id === this.modalResource.id);
                    if (idx !== -1) this.resources.splice(idx, 1, { ...this.modalResource });
                    Swal.fire({ icon: 'success', title: 'تم التعديل', text: 'تم تعديل المورد محليًا.' });
                }
                this.closeResourceModal();
                return;
            }

            // useApi === true -> استدعاءات الشبكة
            try {
                if (this.modalType === 'add') {
                    const res = await axios.post('/api/resources', this.modalResource); // <-- استبدل بالـ endpoint الصحيح
                    // افترض أن res.data هو العنصر المضاف
                    const created = res.data;
                    this.resources.unshift(created);
                    Swal.fire({ icon: 'success', title: 'تمت الإضافة', text: 'تمت إضافة المورد بنجاح.' });
                } else {
                    const res = await axios.put(`/api/resources/${this.modalResource.id}`, this.modalResource); // <-- استبدل بالـ endpoint الصحيح
                    const updated = res.data;
                    const idx = this.resources.findIndex(r => r.id === updated.id || r.id === this.modalResource.id);
                    if (idx !== -1) this.resources.splice(idx, 1, updated);
                    Swal.fire({ icon: 'success', title: 'تم التعديل', text: 'تم تعديل المورد بنجاح.' });
                }
                this.closeResourceModal();
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: 'error', title: 'فشل', text: 'حدث خطأ أثناء حفظ البيانات على السيرفر.' });
            }
        },

        // =================== Delete ===================
        async confirmDeleteResource(resource) {
            const result = await Swal.fire({
                title: 'هل أنت متأكد من حذف المورد؟',
                text: `سيتم حذف المورد: ${resource.supplier_name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'نعم، احذف!',
                cancelButtonText: 'إلغاء'
            });

            if (!result.isConfirmed) return;

            if (!this.useApi) {
                // حذف محلي
                this.mockResources = this.mockResources.filter(r => r.id !== resource.id);
                this.resources = this.resources.filter(r => r.id !== resource.id);
                Swal.fire({ icon: 'success', title: 'تم الحذف', text: 'تم حذف المورد محليًا.' });
                return;
            }

            // delete عبر API
            try {
                await axios.delete(`/api/resources/${resource.id}`); // <-- استبدل بالـ endpoint الحقيقي
                this.resources = this.resources.filter(r => r.id !== resource.id);
                Swal.fire({ icon: 'success', title: 'تم الحذف', text: 'تم حذف المورد بنجاح.' });
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: 'error', title: 'فشل', text: 'فشل في حذف المورد من السيرفر.' });
            }
        },

        // =================== View ===================
        viewResource(resource) {
            Swal.fire({
                title: `تفاصيل المورد: ${resource.supplier_name}`,
                html: `
          <p><strong>رقم المورد:</strong> ${resource.supplier_id}</p>
          <p><strong>اسم المورد:</strong> ${resource.supplier_name}</p>
          <p><strong>رقم المشروع:</strong> ${resource.project_id}</p>
          <p><strong>اسم المشروع:</strong> ${resource.project_name}</p>
          <p><strong>الدور:</strong> ${resource.role}</p>
          <p><strong>قيمة التوريد:</strong> ${resource.supply_value ?? '-'}</p>
          <p><strong>النسبة من المشروع:</strong> ${resource.percentage ?? '-'}%</p>
          <p><strong>الملاحظات:</strong> ${resource.notes || '-'}</p>
        `,
                icon: 'info',
                confirmButtonText: 'إغلاق'
            });
        }
    }
};
</script>

<style scoped>
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

.text-warning {
    color: #ffc107;
}

.text-danger {
    color: #dc3545;
}

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
