<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-people"></i> إضافة مورد جديد</h1>

        <div class="card mb-4 p-4 shadow-sm">
            <form @submit.prevent="saveResource">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label>رقم المورد</label>
                        <input type="text" class="form-control" v-model="newResource.supplier_id" required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>اسم المورد</label>
                        <input type="text" class="form-control" v-model="newResource.supplier_name" required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>رقم المشروع</label>
                        <input type="text" class="form-control" v-model="newResource.project_id" required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>اسم المشروع</label>
                        <input type="text" class="form-control" v-model="newResource.project_name" required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>الدور</label>
                        <input type="text" class="form-control" v-model="newResource.role" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>قيمة التوريد</label>
                        <input type="number" class="form-control" v-model.number="newResource.supply_value" min="0" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label>النسبة من المشروع (%)</label>
                        <input type="number" class="form-control" v-model.number="newResource.percentage" min="0"
                            max="100" required />
                    </div>
                    <div class="col-md-12 mb-3">
                        <label>الملاحظات</label>
                        <textarea class="form-control" v-model="newResource.notes"></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-success">إضافة المورد</button>
            </form>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
    name: "CreateSourcesComponent",
    data() {
        return {
            useApi: true, // true = استخدام API
            newResource: {
                supplier_id: "",
                supplier_name: "",
                project_id: "",
                project_name: "",
                role: "",
                supply_value: 0,
                percentage: 0,
                notes: "",
            },
        };
    },
    methods: {
        async saveResource() {
            if (!this.newResource.supplier_id || !this.newResource.supplier_name || !this.newResource.project_id || this.newResource.percentage === null) {
                Swal.fire({ icon: "error", title: "فشل", text: "الرجاء تعبئة جميع الحقول المطلوبة!" });
                return;
            }

            try {
                if (this.useApi) {
                    await axios.post("/api/resources", this.newResource);
                }
                Swal.fire({ icon: "success", title: "تمت الإضافة", text: "تمت إضافة المورد بنجاح!" });

                // إعادة تعيين النموذج
                this.newResource = { supplier_id: "", supplier_name: "", project_id: "", project_name: "", role: "", supply_value: 0, percentage: 0, notes: "" };
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: "error", title: "فشل", text: "فشل في حفظ البيانات!" });
            }
        },
    },
};
</script>

<style scoped>
.card {
    border-radius: 8px;
    background-color: #fff;
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
</style>
