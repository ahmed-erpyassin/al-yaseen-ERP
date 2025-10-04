<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="onCancel">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="onSave">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <form class="form">
            <div class="row mt-5">
                <h3>{{ $t('label.account_information') }}</h3>
                <div class="row mt-4">

                    <!-- Account Number -->
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_number" class="form-label">{{ $t('label.account_number') }}</label>
                                <input type="text" id="account_number" class="form-control rounded-1"
                                    v-model="form.account_number" />
                            </div>
                        </div>
                    </div>

                    <!-- Account Name -->
                    <div class="col-md-9">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_name" class="form-label">{{ $t('label.account_name') }}</label>
                                <input type="text" id="account_name" class="form-control rounded-1"
                                    v-model="form.account_name" />
                            </div>
                        </div>
                    </div>

                    <!-- Branch -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="branch" class="form-label">{{ $t('label.branch') }}</label>
                                <input type="text" id="branch" class="form-control rounded-1" v-model="form.branch" />
                            </div>
                        </div>
                    </div>

                    <!-- Account Type -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_type" class="form-label">{{ $t('label.account_type') }}</label>
                                <select id="account_type" class="form-control" v-model="form.account_type">
                                    <option value="">{{ $t('label.debit_credit') }}</option>
                                    <option value="debit">{{ $t('label.debit') }}</option>
                                    <option value="credit">{{ $t('label.credit') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Nature Account -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="nature_account" class="form-label">{{ $t('label.nature_of_the_account')
                                    }}</label>
                                <select id="nature_account" class="form-control" v-model="form.nature_account">
                                    <option value="general_budget">{{ $t('label.general_budget') }}</option>
                                    <option value="profits_losses">{{ $t('label.profits_losses') }}</option>
                                    <option value="inventory">{{ $t('label.inventory') }}</option>
                                    <option value="details">{{ $t('label.details') }}</option>
                                    <option value="revenues_expenses">{{ $t('label.revenues_expenses') }}</option>
                                    <option value="balance_sheet_support">{{ $t('label.balance_sheet_support') }}
                                    </option>
                                    <option value="agent_balance">{{ $t('label.agent_balance') }}</option>
                                    <option value="project">{{ $t('label.project') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Category -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="category" class="form-label">{{ $t('label.category') }}</label>
                                <select id="category" class="form-control" v-model="form.category">
                                    <option value="main">{{ $t('label.main') }}</option>
                                    <option value="sub">{{ $t('label.sub') }}</option>
                                    <option value="detailed">{{ $t('label.detailed') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Level -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="level" class="form-label">{{ $t('label.level') }}</label>
                                <select id="level" class="form-control" v-model="form.level">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Report Type -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="report_type" class="form-label">{{ $t('label.report_type') }}</label>
                                <select id="report_type" class="form-control" v-model="form.report_type">
                                    <option value="budget">{{ $t('label.budget') }}</option>
                                    <option value="income_statement">{{ $t('label.income_statement') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Currency -->
                    <div class="col-md-8">
                        <div class="item">
                            <div class="mb-3 position-relative">
                                <label for="currency" class="form-label">{{ $t('label.currency') }}</label>
                                <select id="currency" class="form-control" v-model="form.currency">
                                    <option value="USD">$ USD</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Subject to Currency Conditions -->
                    <div class="col-md-4">
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input rounded-circle" id="subject_to_currency"
                                v-model="form.subject_to_currency" />
                            <label class="form-check-label" for="subject_to_currency">{{
                                $t('label.subject_to_currency_conditions') }}</label>
                        </div>
                    </div>

                    <!-- Allowed Account Users -->
                    <div class="col-12">
                        <p class="mb-3 fs-5">{{ $t('label.allowed_account_users') }}</p>
                        <div class="d-flex align-items-center">
                            <div class="form-check mb-3 me-3">
                                <input type="checkbox" class="form-check-input rounded-circle" id="all_users"
                                    v-model="form.all_users" />
                                <label class="form-check-label" for="all_users">{{ $t('label.all_users') }}</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input rounded-circle" id="only_admin"
                                    v-model="form.only_admin" />
                                <label class="form-check-label" for="only_admin">{{ $t('label.only_admin') }}</label>
                            </div>
                        </div>
                        <h3 class="mt-3 mb-4">{{ $t('label.account_opening_information') }}</h3>
                    </div>

                    <!-- Account Opening Date -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_opening_date" class="form-label">{{ $t('label.account_opening_date')
                                    }}</label>
                                <input type="date" class="form-control" id="account_opening_date"
                                    v-model="form.account_opening_date">
                            </div>
                        </div>
                    </div>

                    <!-- Account Created By -->
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_created_by" class="form-label">{{ $t('label.account_created_by')
                                    }}</label>
                                <input type="text" class="form-control" id="account_created_by"
                                    v-model="form.account_created_by">
                            </div>
                        </div>
                    </div>

                    <!-- Linking Accounts -->
                    <div class="col-12">
                        <h3 class="mt-3 mb-4">{{ $t('label.linking_accounts') }}</h3>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="follows_account" class="form-label">{{ $t('label.follows_account')
                                    }}</label>
                                <input type="text" class="form-control" id="follows_account"
                                    v-model="form.follows_account">
                            </div>
                        </div>
                    </div>

                    <!-- Depreciation Linkage -->
                    <div class="col-12">
                        <h3 class="mt-3 mb-4">{{ $t('label.depreciation_linkage') }}</h3>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_linked" class="form-label">{{ $t('label.account_linked') }}</label>
                                <input type="text" class="form-control" id="account_linked"
                                    v-model="form.account_linked">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="depreciation_account" class="form-label">{{ $t('label.depreciation_account')
                                    }}</label>
                                <input type="text" class="form-control" id="depreciation_account"
                                    v-model="form.depreciation_account">
                            </div>
                        </div>
                    </div>

                    <!-- Consumption Rate -->
                    <div class="row">
                        <div class="col-md-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="consumption_rate" class="form-label">{{ $t('label.consumption_rate')
                                        }}</label>
                                    <input type="text" class="form-control" id="consumption_rate"
                                        v-model="form.consumption_rate">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input rounded-circle"
                                    id="declining_depreciation" v-model="form.declining_depreciation" />
                                <label class="form-check-label" for="declining_depreciation">{{
                                    $t('label.declining_depreciation') }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Accumulated Depreciation Account Classification -->
                    <div class="row mb-5">
                        <div class="col-12">
                            <h4>{{ $t('label.accumulated_depreciation_account_classification') }}</h4>
                            <div class="form-check mb-3 mt-4">
                                <input type="checkbox" class="form-check-input rounded-circle" id="not_depreciation"
                                    v-model="form.not_depreciation" />
                                <label class="form-check-label" for="not_depreciation">{{
                                    $t('label.not_a_depreciation_account') }}</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input rounded-circle" id="to_profit_and_loss"
                                    v-model="form.to_profit_and_loss" />
                                <label class="form-check-label" for="to_profit_and_loss">{{
                                    $t('label.accumulated_depreciation_to_profit_and_loss') }}</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input rounded-circle" id="to_trading"
                                    v-model="form.to_trading" />
                                <label class="form-check-label" for="to_trading">{{
                                    $t('label.accumulated_depreciation_to_trading') }}</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input rounded-circle" id="to_operating"
                                    v-model="form.to_operating" />
                                <label class="form-check-label" for="to_operating">{{
                                    $t('label.accumulated_depreciation_to_operating') }}</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input rounded-circle"
                                    id="to_revenue_and_expense" v-model="form.to_revenue_and_expense" />
                                <label class="form-check-label" for="to_revenue_and_expense">{{
                                    $t('label.accumulated_depreciation_to_revenue_and_expense') }}</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>


<script setup>
import router from "@/router";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();

const form = reactive({
    account_number: "",
    account_name: "",
    branch: "",
    account_type: "",
    nature_account: "",
    category: "",
    level: "",
    report_type: "",
    currency: "",
    subject_to_currency: false,
    all_users: false,
    only_admin: false,
    account_opening_date: "",
    account_created_by: "",
    follows_account: "",
    account_linked: "",
    depreciation_account: "",
    consumption_rate: "",
    declining_depreciation: false,
    not_depreciation: false,
    to_profit_and_loss: false,
    to_trading: false,
    to_operating: false,
    to_revenue_and_expense: false
});

// 🔹 جلب بيانات الحساب عند الدخول لصفحة Edit
onMounted(async () => {
    try {
        const id = route.params.id; // جلب ID من الرابط
        const res = await axios.get(`https://alyaseenerp.com/api/v1/accounts/${id}`);
        Object.assign(form, res.data); // تعبئة الفورم بالبيانات
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: t("messages.error"),
            text: "تعذر تحميل بيانات الحساب"
        });
    }
});

// 🔹 تعديل البيانات
async function onSave() {
    try {
        const id = route.params.id;
        const res = await axios.put(`https://alyaseenerp.com/api/v1/accounts/${id}`, form);
        Swal.fire({
            icon: "success",
            title: t("messages.saved_success"),
            text: "تم تعديل البيانات بنجاح"
        });
        console.log(res.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: t("messages.error"),
            text: "حدث خطأ أثناء التعديل"
        });
    }
}

function onCancel() {
    Swal.fire({
        title: t('messages.cancel_title'),
        text: t('messages.cancel_text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t('buttons.yes_cancel'),
        cancelButtonText: t('buttons.no')
    }).then((result) => {
        if (result.isConfirmed) {
            router.push('/admin/accounting/accounts');
        }
    });
}
</script>
