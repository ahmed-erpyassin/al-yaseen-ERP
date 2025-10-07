<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ $t('buttons.save') }}
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
                        class="form-control rounded-1" />
                </div>

                <div class="col-md-2 mb-4">
                    <label for="information" class="form-label">{{ $t('label.information') }}</label>
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
                        $t('label.warehousekeeper_employee_name')
                    }}</label>
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
                        <input type="radio" class="form-check-input" id="eval1" value="natural"
                            v-model="form.evaluation_method" />
                        <label class="form-check-label" for="eval1">
                            {{ $t('label.evaluation_method.natural') }}
                        </label>
                    </div>

                    <div class="form-check mb-2">
                        <input type="radio" class="form-check-input" id="eval2" value="no_value"
                            v-model="form.evaluation_method" />
                        <label class="form-check-label" for="eval2">
                            {{ $t('label.evaluation_method.no_value') }}
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
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import axios from "axios";

const router = useRouter();
const { t } = useI18n();

const API_BASE = "https://alyaseenerp.com/api/v1/warehouses/establish-facility";

// 🧾 نموذج البيانات
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
    evaluation_method: "natural",
});

// عند تحميل الصفحة، توليد رقم مستودع تلقائي فريد
onMounted(() => {
    form.value.warehouse_number = "WH-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
});

// ✅ حفظ النموذج (إرسال إلى السيرفر)
const saveForm = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            Swal.fire("خطأ", "لم يتم العثور على رمز المصادقة (token)", "error");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user")) || {};

        const payload = {
            warehouse_number: form.value.warehouse_number,
            name: form.value.information || "Default Warehouse",
            description: form.value.address || "",
            address: form.value.address || "",
            warehouse_keeper_employee_number: form.value.warehousekeeper || "",
            warehouse_keeper_employee_name: form.value.warehousekeeper_employee_name || "",
            warehouse_keeper_id: 1,
            mobile: form.value.mobile_number || "000000000",
            fax_number: form.value.fax_number || "",
            phone_number: form.value.mobile_number || "",
            sales_account_id: 1,
            purchase_account_id: 1,
            branch_id: 1,
            department_warehouse_id: 1,
            inventory_valuation_method: form.value.evaluation_method,
            status: "active",
            company_id: user.company_id || 1,
            user_id: user.id || 1,
            created_by: user.id || 1,
        };

        const response = await axios.post(API_BASE, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        console.log("✅ Warehouse Created:", response.data);

        Swal.fire({
            icon: "success",
            title: t("messages.saved_title"),
            text: t("messages.saved_text"),
            timer: 2000,
            showConfirmButton: false,
        });

        setTimeout(() => router.push("/admin/warehouses"), 1000);
    } catch (err) {
        console.error("❌ Error creating warehouse:", err);
        Swal.fire({
            icon: "error",
            title: "فشل في إنشاء المستودع",
            text:
                err.response?.data?.message_ar ||
                err.response?.data?.message ||
                "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.",
        });
    }
};

// ❌ إلغاء النموذج
const cancelForm = () => {
    Swal.fire({
        title: t("messages.cancel_title"),
        text: t("messages.cancel_text"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("buttons.yes_cancel"),
        cancelButtonText: t("buttons.no"),
    }).then((result) => {
        if (result.isConfirmed) router.push("/admin/warehouses");
    });
};
</script>
