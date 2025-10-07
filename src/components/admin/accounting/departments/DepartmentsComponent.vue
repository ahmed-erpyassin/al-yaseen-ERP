<template>
    <div class="container py-4">
        <!-- الأقسام -->
        <div class="card mb-5 shadow-sm border-0 rounded-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">الأقسام</h4>
                    <button class="btn btn-success btn-sm px-4" @click="openAddDepartmentModal">
                        <i class="bi bi-plus-circle"></i> إضافة قسم
                    </button>
                </div>

                <!-- المخطط التنظيمي -->
                <div class="mb-4 text-center">
                    <vue3-org-chart :data="orgChartData" :collapsable="true" :zoom="true" node-size="150x60" />
                </div>

                <!-- جدول الأقسام -->
                <div class="table-responsive">
                    <table class="table text-center align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>الاسم</th>
                                <th>المشرف</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="departments.length === 0">
                                <td colspan="3" class="text-muted">لا توجد أقسام بعد</td>
                            </tr>
                            <tr v-for="(dep, index) in departments" :key="index">
                                <td>{{ dep.name }}</td>
                                <td>{{ dep.supervisor }}</td>
                                <td>
                                    <button class="btn btn-outline-primary btn-sm me-2" @click="editDepartment(dep)">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-outline-danger btn-sm" @click="deleteDepartment(dep)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- المسميات الوظيفية -->
        <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">المسميات الوظيفية</h4>
                    <button class="btn btn-success btn-sm px-4" @click="openAddTitleModal">
                        <i class="bi bi-plus-circle"></i> إضافة مسمى
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table text-center align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>المسمى</th>
                                <th>القسم</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="jobTitles.length === 0">
                                <td colspan="2" class="text-muted">لا توجد مسميات وظيفية</td>
                            </tr>
                            <tr v-for="(title, index) in jobTitles" :key="index">
                                <td>{{ title.title }}</td>
                                <td>{{ title.department }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- نافذة إضافة قسم -->
        <div v-if="showAddDepartment" class="modal-backdrop">
            <div class="modal-dialog bg-white p-4 rounded-4 shadow-lg">
                <h5 class="mb-3">إضافة قسم جديد</h5>
                <div class="mb-3">
                    <label class="form-label">اسم القسم</label>
                    <input type="text" class="form-control" v-model="newDepartment.name" />
                </div>
                <div class="mb-3">
                    <label class="form-label">اسم المشرف</label>
                    <input type="text" class="form-control" v-model="newDepartment.supervisor" />
                </div>
                <div class="text-end">
                    <button class="btn btn-secondary me-2" @click="showAddDepartment = false">إلغاء</button>
                    <button class="btn btn-success" @click="addDepartment">حفظ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue3OrgChart from "vue3-org-chart";
import "vue3-org-chart/dist/style.css";

export default {
    name: "DepartmentsAndJobs",
    components: { Vue3OrgChart },
    data() {
        return {
            showAddDepartment: false,
            newDepartment: { name: "", supervisor: "" },
            departments: [
                { name: "إدارة المعدات", supervisor: "محمد" },
                { name: "إدارة الإنتاج", supervisor: "محمد" },
                { name: "إدارة التسويق", supervisor: "محمد" },
                { name: "إدارة المبيعات", supervisor: "محمد" },
            ],
            jobTitles: [
                { title: "مهندس إنتاج", department: "إدارة الإنتاج" },
                { title: "مدير منتجات", department: "إدارة التسويق" },
                { title: "مصمم جرافيك", department: "إدارة المبيعات" },
                { title: "محاسب", department: "المحاسبة" },
            ],
        };
    },
    computed: {
        orgChartData() {
            return {
                name: "الشركة",
                children: this.departments.map((dep) => ({
                    name: dep.name,
                    title: dep.supervisor,
                })),
            };
        },
    },
    methods: {
        openAddDepartmentModal() {
            this.newDepartment = { name: "", supervisor: "" };
            this.showAddDepartment = true;
        },
        addDepartment() {
            if (!this.newDepartment.name || !this.newDepartment.supervisor) return alert("يرجى إدخال جميع البيانات");
            this.departments.push({ ...this.newDepartment });
            this.showAddDepartment = false;
        },
        openAddTitleModal() {
            alert("سيتم فتح نافذة إضافة مسمى وظيفي قريباً");
        },
        editDepartment(dep) {
            alert(`تعديل القسم: ${dep.name}`);
        },
        deleteDepartment(dep) {
            if (confirm(`هل أنت متأكد من حذف القسم "${dep.name}"؟`)) {
                this.departments = this.departments.filter((d) => d !== dep);
            }
        },
    },
};
</script>

<style scoped>
.card {
    background-color: #ffffff;
}

.table th {
    background-color: #f8f9fa;
    font-weight: bold;
}

.btn-success {
    background-color: #1d7342;
    border-color: #1d7342;
}

.btn-success:hover {
    background-color: #166233;
}

/* نافذة الإضافة */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}

.modal-dialog {
    width: 400px;
    max-width: 90%;
}
</style>
