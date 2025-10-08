<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-pencil-square"></i> {{ $t('label.edit_warehouse') }}</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm" :disabled="loading">
                {{ $t('buttons.cancel') }}
            </button>

            <button type="button" class="btn btn-lg btn-success d-flex align-items-center" @click="updateForm"
                :disabled="loading">
                <!-- Spinner أثناء التحميل -->
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <span>{{ loading ? $t('messages.loading') || 'جارٍ الحفظ...' : $t('buttons.save') }}</span>
            </button>
        </div>

        <!-- Form -->
        <form class="form">
            <div class="row">
                <!-- Warehouse Information Section -->
                <div class="col-12 mb-4">
                    <h3>{{ $t('label.warehouse_info') }}</h3>
                </div>

                <div class="col-md-2 mb-4">
                    <label for="warehouse_number" class="form-label">{{ $t('label.warehouse_number') }}</label>
                    <input type="text" id="warehouse_number" v-model="form.warehouse_number"
                        class="form-control rounded-1" disabled />
                </div>

                <div class="col-md-2 mb-4">
                    <label for="information" class="form-label">{{ $t('label.warehouse_name') }}</label>
                    <input type="text" id="information" v-model="form.information" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="warehousekeeper" class="form-label">{{ $t('label.warehousekeeper_employee_number')
                        }}</label>
                    <input type="text" id="warehousekeeper" v-model="form.warehousekeeper"
                        class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="warehousekeeper_employee_name" class="form-label">{{
                        $t('label.warehousekeeper_employee_name') }}</label>
                    <input type="text" id="warehousekeeper_employee_name" v-model="form.warehousekeeper_employee_name"
                        class="form-control rounded-1" />
                </div>

                <div class="col-md-3 mb-4">
                    <label for="mobile_number" class="form-label">{{ $t('label.mobile_number') }}</label>
                    <input type="text" id="mobile_number" v-model="form.mobile_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-3 mb-4">
                    <label for="fax_number" class="form-label">{{ $t('label.fax_number') }}</label>
                    <input type="text" id="fax_number" v-model="form.fax_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-3 mb-4">
                    <label for="address" class="form-label">{{ $t('label.address') }}</label>
                    <input type="text" id="address" v-model="form.address" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="category_number" class="form-label">{{ $t('label.category_number') }}</label>
                    <input type="text" id="category_number" v-model="form.category_number"
                        class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="category_name" class="form-label">{{ $t('label.category_name') }}</label>
                    <input type="text" id="category_name" v-model="form.category_name" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="sale_account" class="form-label">{{ $t('label.sale_account') }}</label>
                    <input type="text" id="sale_account" v-model="form.sale_account" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="buy_account" class="form-label">{{ $t('label.buy_account') }}</label>
                    <input type="text" id="buy_account" v-model="form.buy_account" class="form-control rounded-1" />
                </div>

                <!-- Stock Evaluation -->
                <div class="col-12 mt-4 mb-3">
                    <h3>{{ $t('label.how_to_evaluate_stock') }}</h3>
                </div>

                <div class="col-12">
                    <div class="form-check mb-2">
                        <input type="radio" class="form-check-input" id="eval1" value="no_value"
                            v-model="form.evaluation_method" />
                        <label class="form-check-label" for="eval1">
                            {{ $t('label.evaluation_method.natural') }}
                        </label>
                    </div>

                    <div class="form-check mb-2">
                        <input type="radio" class="form-check-input" id="eval3" value="first_purchase_price"
                            v-model="form.evaluation_method" />
                        <label class="form-check-label" for="eval3">
                            {{ $t('label.evaluation_method.first_purchase_price') }}
                        </label>
                    </div>

                    <div class="form-check mb-2">
                        <input type="radio" class="form-check-input" id="eval4" value="second_purchase_price"
                            v-model="form.evaluation_method" />
                        <label class="form-check-label" for="eval4">
                            {{ $t('label.evaluation_method.second_purchase_price') }}
                        </label>
                    </div>

                    <div class="form-check mb-4">
                        <input type="radio" class="form-check-input" id="eval5" value="third_purchase_price"
                            v-model="form.evaluation_method" />
                        <label class="form-check-label" for="eval5">
                            {{ $t('label.evaluation_method.third_purchase_price') }}
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const API_BASE = "https://alyaseenerp.com/api/v1/warehouses";

// 🟢 متغيرات الحالة
const loading = ref(true); // <-- تمت الإضافة هنا
const form = ref({
    warehouse_number: "",
    information: "",
    warehousekeeper: "",
    warehousekeeper_employee_name: "",
    mobile_number: "",
    fax_number: "",
    address: "",
    category_number: "",
    category_name: "",
    sale_account: "",
    buy_account: "",
    evaluation_method: "no_value",
});

// 🟢 جلب بيانات المستودع الحالي عند تحميل الصفحة
onMounted(async () => {
    try {
        loading.value = true; // ⬅️ بداية التحميل

        const id = route.params.id;
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${API_BASE}/inspect-facility/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data || response.data;

        form.value = {
            warehouse_number: data.warehouse_number,
            information: data.name,
            warehousekeeper: data.warehouse_keeper_employee_number,
            warehousekeeper_employee_name: data.warehouse_keeper_employee_name,
            mobile_number: data.mobile,
            fax_number: data.fax_number,
            address: data.address,
            category_number: data.department_warehouse_id,
            category_name: data.department_warehouse_name || "",
            sale_account: data.sales_account_id,
            buy_account: data.purchase_account_id,
            evaluation_method: data.inventory_valuation_method || "no_value",
        };
    } catch (err) {
        console.error("❌ Error fetching warehouse:", err);
        Swal.fire("خطأ", "فشل في تحميل بيانات المستودع.", "error");
    } finally {
        loading.value = false; // ⬅️ انتهاء التحميل في كل الأحوال
    }
});


// 🟡 تحديث بيانات المستودع
const updateForm = async () => {
    try {
        const id = route.params.id;
        const token = localStorage.getItem("authToken");

        // 🔎 تأكد من القيم الأساسية قبل الإرسال
        if (!form.value.information || !form.value.address) {
            Swal.fire("تنبيه", "يرجى إدخال اسم المستودع والعنوان على الأقل.", "warning");
            return;
        }

        const payload = {
            name: form.value.information.trim(),
            code: form.value.warehouse_number?.toString() || "N/A",
            location: form.value.address.trim(),
            warehouse_keeper_employee_number: form.value.warehousekeeper || "غير محدد",
            warehouse_keeper_name: form.value.warehousekeeper_employee_name || "غير محدد",
            mobile: form.value.mobile_number || "000000000",
            fax_number: form.value.fax_number || "",
            phone_number: form.value.mobile_number || "000000000",
            purchase_account: form.value.buy_account?.toString() || "1",
            sale_account: form.value.sale_account?.toString() || "1",
            inventory_valuation_method: form.value.evaluation_method || "no_value",
            status: "active",
        };

        // console.log("Payload to send:", payload);

        await axios.put(
            `${API_BASE}/modify-facility/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        Swal.fire({
            icon: "success",
            title: t("messages.updated"),
            text: t("messages.updated_text"),
            timer: 2000,
            showConfirmButton: false,
        });

        setTimeout(() => router.push("/admin/warehouses"), 1000);
    } catch (err) {
        console.error("❌ Error updating warehouse:", err);
        const msg =
            err.response?.data?.errors
                ? JSON.stringify(err.response.data.errors, null, 2)
                : err.response?.data?.message ||
                "فشل في تعديل المستودع، تحقق من البيانات.";
        Swal.fire("خطأ", msg, "error");
    }
};


// ❌ إلغاء التعديل
const cancelForm = () => router.push("/admin/warehouses");
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
</style>
