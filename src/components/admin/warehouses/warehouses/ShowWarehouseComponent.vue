<template>
    <div class="container py-4 px-4">
        <!-- عنوان الصفحة -->
        <h1 class="mb-4 fw-bold text-dark">
            <i class="bi bi-eye"></i> {{ $t('label.warehouse_details') }}
        </h1>

        <!-- تحميل -->
        <div v-if="loading" class="text-center py-5">
            <i class="bi bi-arrow-repeat spin fs-1 text-primary"></i>
            <p class="mt-3 fs-5">{{ $t('messages.loading') || 'جارٍ تحميل البيانات...' }}</p>
        </div>

        <!-- خطأ -->
        <div v-else-if="!warehouse">
            <div class="alert alert-danger text-center">
                {{ $t('messages.not_found') || 'لم يتم العثور على بيانات المستودع.' }}
            </div>
        </div>

        <!-- تفاصيل المستودع -->
        <div v-else class="warehouse-info mt-3">
            <h2 class="fw-bold mb-4">{{ warehouse.name }}</h2>

            <!-- البيانات -->
            <div class="row gy-3">
                <div class="col-md-4" v-for="(field, index) in fields" :key="index">
                    <label class="fw-semibold text-secondary small d-block mb-1">{{ field.label }}</label>
                    <div class="fw-medium text-dark">{{ field.value || '—' }}</div>
                </div>
            </div>

            <!-- طريقة تقييم المخزون -->
            <div class="mt-4">
                <label class="fw-semibold text-secondary small d-block mb-1">
                    {{ $t('label.how_to_evaluate_stock') }}
                </label>
                <span class="badge bg-info text-dark">
                    {{ translateEvaluationMethod(warehouse.inventory_valuation_method) }}
                </span>
            </div>

            <!-- الأزرار -->
            <div class="mt-5 d-flex justify-content-end gap-2">
                <button class="btn btn-outline-secondary" @click="goBack">
                    <i class="bi bi-arrow-left"></i> {{ $t('buttons.back') || 'رجوع' }}
                </button>
                <button class="btn btn-success" @click="goToEdit">
                    <i class="bi bi-pencil-square"></i> {{ $t('buttons.edit') || 'تعديل' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const loading = computed(() => store.getters["warehouse/loading"]);
const warehouse = computed(() => store.getters["warehouse/warehouse"]);

onMounted(async () => {
    const id = route.params.id;
    await store.dispatch("warehouse/fetchWarehouse", id);
});

// ✅ دالة تنسيق الحساب
const formatAccount = (account) => {
    if (!account) return "—";
    if (typeof account === "object") {
        return account.name || account.code || `#${account.id}`;
    }
    return `#${account}`; // لو كان فقط ID
};

// ✅ الحقول المعروضة
const fields = computed(() => {
    const w = warehouse.value || {};
    return [
        { label: t("label.warehouse_number"), value: w.code },
        { label: t("label.address"), value: w.location },
        { label: t("label.status"), value: w.status === "active" ? t("label.active") : t("label.inactive") },
        { label: t("label.warehousekeeper_employee_number"), value: w.warehouse_keeper_employee_number },
        { label: t("label.warehousekeeper_employee_name"), value: w.warehouse_keeper_name },
        { label: t("label.mobile_number"), value: w.mobile },
        { label: t("label.fax_number"), value: w.fax_number },
        { label: t("label.phone_number"), value: w.phone_number },
        { label: t("label.sale_account"), value: formatAccount(w.sale_account) },
        { label: t("label.buy_account"), value: formatAccount(w.purchase_account) },
    ];
});

const goBack = () => router.push("/admin/warehouses");
const goToEdit = () => router.push(`/admin/warehouse/edit/${route.params.id}`);

const translateEvaluationMethod = (method) => {
    switch (method) {
        case "first_purchase_price":
            return t("label.evaluation_method.first_purchase_price");
        case "second_purchase_price":
            return t("label.evaluation_method.second_purchase_price");
        case "third_purchase_price":
            return t("label.evaluation_method.third_purchase_price");
        default:
            return t("label.evaluation_method.natural");
    }
};
</script>

<style scoped>
.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.container {
    max-width: 1100px;
}

.warehouse-info {
    padding: 1rem 0;
}

h1,
h2 {
    color: #000 !important;
}

label {
    font-size: 0.9rem;
}

.text-dark {
    color: #212529 !important;
}

button {
    border-radius: 6px;
    padding: 0.45rem 1.2rem;
    font-weight: 500;
}

.btn-success {
    background-color: #198754;
    border: none;
}
</style>
