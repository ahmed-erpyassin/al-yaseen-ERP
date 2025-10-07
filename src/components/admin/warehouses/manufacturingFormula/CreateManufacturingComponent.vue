<template>
    <div class="container pe-5 ps-5">
        <h2 class="mb-4"><i class="bi bi-building"></i> {{ $t('label.manufacturing_calculation') }}</h2>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <!-- Form Inputs -->
        <div class="row mb-4">
            <div class="col-md-6 mb-3">
                <label class="form-label">{{ $t('label.manufacturing_number') }}</label>
                <input type="text" class="form-control rounded-1" v-model="formulaNumber" />
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">{{ $t('label.item_name') }}</label>
                <input type="text" class="form-control rounded-1" v-model="itemName" />
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">{{ $t('label.quantity') }}</label>
                <input type="number" class="form-control rounded-1" v-model="quantity" />
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">{{ $t('label.Manufacturing_duration') }}</label>
                <input type="number" class="form-control rounded-1" v-model="loss" />
            </div>
        </div>

        <!-- Warehouses -->
        <div class="row mb-4">
            <div class="col-md-6 mb-3">
                <label class="form-label">{{ $t('label.raw_materials_warehouse') }}</label>
                <select class="form-control rounded-1" v-model="rawWarehouse">
                    <option value="">{{ $t('label.select_raw_warehouse') }}</option>
                    <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">{{ $t('label.final_product_warehouse') }}</label>
                <select class="form-control rounded-1" v-model="finalWarehouse">
                    <option value="">{{ $t('label.select_final_warehouse') }}</option>
                    <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</option>
                </select>
            </div>
        </div>

        <!-- Raw Materials Table -->
        <h4 class="mb-3">{{ $t('label.raw_materials') }}</h4>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>{{ $t('label.material') }}</th>
                    <th>{{ $t('label.available_quantity') }}</th>
                    <th>{{ $t('label.allocated_quantity') }}</th>
                    <th>{{ $t('label.total') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(material, index) in materials" :key="index">
                    <td>{{ material.name }}</td>
                    <td>{{ material.available }}</td>
                    <td><input type="number" class="form-control" v-model="material.allocated" /></td>
                    <td>{{ material.total }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Total Cost -->
        <div class="mt-3 p-3 border rounded bg-light">
            <strong>{{ $t('label.total_cost') }}:</strong>
            <span v-if="totalCost">{{ totalCost }}</span>
            <span v-else class="text-warning">{{ $t('label.insufficient_materials') }}</span>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: "ManufacturingCalculation",
    data() {
        return {
            formulaNumber: "",
            itemName: "",
            quantity: 0,
            loss: 0,
            rawWarehouse: "",
            finalWarehouse: "",
            warehouses: [
                { id: 1, name: "مخزن المواد الخام 1" },
                { id: 2, name: "مخزن المواد الخام 2" },
            ],
            materials: [
                { name: "المادة 1", available: 50, allocated: 0, total: 0 },
                { name: "المادة 2", available: 30, allocated: 0, total: 0 },
            ],
            totalCost: null,
        };
    },
    methods: {
        calculate() {
            let sufficient = true;
            let cost = 0;
            this.materials.forEach((mat) => {
                if (mat.allocated > mat.available) sufficient = false;
                mat.total = mat.allocated;
                cost += mat.allocated * 10;
            });
            this.totalCost = sufficient ? cost : null;
            return sufficient;
        },
        saveForm() {
            if (!this.calculate()) {
                Swal.fire({
                    icon: "warning",
                    title: "خطأ بالكميات",
                    text: "الكميات المخصصة تتجاوز المتاحة!",
                });
                return;
            }

            const newItem = {
                id: Date.now(),
                formulaNumber: this.formulaNumber,
                itemName: this.itemName,
                quantity: this.quantity,
                loss: this.loss,
                rawWarehouse: this.rawWarehouse,
                finalWarehouse: this.finalWarehouse,
                materials: this.materials.map((m) => ({ ...m })),
                totalCost: this.totalCost,
            };

            const storedItems = JSON.parse(localStorage.getItem("manufacturingItems") || "[]");
            storedItems.push(newItem);
            localStorage.setItem("manufacturingItems", JSON.stringify(storedItems));

            Swal.fire({
                title: "تم الحفظ بنجاح",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "اذهب للقائمة",
                cancelButtonText: "ابق هنا",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push("/admin/warehouses/manufacturing-formula");
                } else {
                    this.resetForm(); // تنظيف الفورم إذا اختار البقاء
                }
            });
        },
        cancelForm() {
            Swal.fire({
                title: "تأكيد الإلغاء",
                text: "هل أنت متأكد أنك تريد إلغاء العملية؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "نعم، إلغاء",
                cancelButtonText: "لا"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push("/admin/warehouses/manufacturing-formula/manufacturing");
                }
            });
        },
        resetForm() {
            this.formulaNumber = "";
            this.itemName = "";
            this.quantity = 0;
            this.loss = 0;
            this.rawWarehouse = "";
            this.finalWarehouse = "";
            this.materials.forEach((mat) => (mat.allocated = 0));
            this.totalCost = null;
        },
    },
};
</script>


<style scoped>
.table input {
    max-width: 100px;
}
</style>
