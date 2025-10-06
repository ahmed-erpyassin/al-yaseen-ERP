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
            <div class="row mt-5">
                <!-- Account Information -->
                <h3 class="mb-4">{{ $t('label.account_information') }}</h3>

                <div class="col-md-3 mb-4">
                    <label for="account_number" class="form-label">{{ $t('label.account_number') }}</label>
                    <input type="text" id="account_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-9 mb-4">
                    <label for="account_name" class="form-label">{{ $t('label.account_name') }}</label>
                    <input type="text" id="account_name" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="branch" class="form-label">{{ $t('label.branch') }}</label>
                    <input type="text" id="branch" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="account_type" class="form-label">{{ $t('label.account_type') }}</label>
                    <select id="account_type" class="form-control">
                        <option value="">{{ $t('label.debit_credit') }}</option>
                        <option value="">{{ $t('label.debit') }}</option>
                        <option value="">{{ $t('label.credit') }}</option>
                    </select>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="nature_account" class="form-label">{{ $t('label.nature_of_the_account') }}</label>
                    <select id="nature_account" class="form-control">
                        <option value="">{{ $t('label.general_budget') }}</option>
                        <option value="">{{ $t('label.profits_losses') }}</option>
                        <option value="">{{ $t('label.inventory') }}</option>
                        <option value="">{{ $t('label.details') }}</option>
                        <option value="">{{ $t('label.revenues_expenses') }}</option>
                        <option value="">{{ $t('label.balance_sheet_support') }}</option>
                        <option value="">{{ $t('label.agent_balance') }}</option>
                        <option value="">{{ $t('label.project') }}</option>
                    </select>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="category" class="form-label">{{ $t('label.category') }}</label>
                    <select id="category" class="form-control">
                        <option value="">{{ $t('label.main') }}</option>
                        <option value="">{{ $t('label.sub') }}</option>
                        <option value="">{{ $t('label.detailed') }}</option>
                    </select>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="level" class="form-label">{{ $t('label.level') }}</label>
                    <select id="level" class="form-control">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="report_type" class="form-label">{{ $t('label.report_type') }}</label>
                    <select id="report_type" class="form-control">
                        <option value="">{{ $t('label.budget') }}</option>
                        <option value="">{{ $t('label.income_statement') }}</option>
                    </select>
                </div>

                <div class="col-md-8 mb-4">
                    <label for="currency" class="form-label">{{ $t('label.currency') }}</label>
                    <select id="currency" class="form-control">
                        <option value="">$ USD</option>
                    </select>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="form-check">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="currency_conditions" />
                        <label class="form-check-label" for="currency_conditions">{{
                            $t('label.subject_to_currency_conditions') }}</label>
                    </div>
                </div>

                <!-- Allowed Users -->
                <div class="col-12 mb-4">
                    <p class="fs-5">{{ $t('label.allowed_account_users') }}</p>
                    <div class="d-flex align-items-center">
                        <div class="form-check me-3">
                            <input checked type="checkbox" class="form-check-input rounded-circle" id="all_users" />
                            <label class="form-check-label" for="all_users">{{ $t('label.all_users') }}</label>
                        </div>
                        <div class="form-check">
                            <input checked type="checkbox" class="form-check-input rounded-circle" id="only_admin" />
                            <label class="form-check-label" for="only_admin">{{ $t('label.only_admin') }}</label>
                        </div>
                    </div>
                </div>

                <!-- Account Opening Information -->
                <div class="col-12">
                    <h3 class="mt-3 mb-4">{{ $t('label.account_opening_information') }}</h3>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="account_opening_date" class="form-label">{{ $t('label.account_opening_date') }}</label>
                    <input type="date" id="account_opening_date" class="form-control" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="account_created_by" class="form-label">{{ $t('label.account_created_by') }}</label>
                    <input type="text" id="account_created_by" class="form-control" />
                </div>

                <!-- Linking Accounts -->
                <div class="col-12">
                    <h3 class="mt-3 mb-4">{{ $t('label.linking_accounts') }}</h3>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="follows_account" class="form-label">{{ $t('label.follows_account') }}</label>
                    <input type="text" id="follows_account" class="form-control" />
                </div>

                <!-- Depreciation Linkage -->
                <div class="col-12">
                    <h3 class="mt-3 mb-4">{{ $t('label.depreciation_linkage') }}</h3>
                </div>

                <div class="col-md-4 mb-4">
                    <label for="account_linked" class="form-label">{{ $t('label.account_linked') }}</label>
                    <input type="text" id="account_linked" class="form-control" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="depreciation_account" class="form-label">{{ $t('label.depreciation_account') }}</label>
                    <input type="text" id="depreciation_account" class="form-control" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="consumption_rate" class="form-label">{{ $t('label.consumption_rate') }}</label>
                    <input type="text" id="consumption_rate" class="form-control" />
                </div>

                <div class="col-md-4 mb-4">
                    <div class="form-check">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="declining_depreciation" />
                        <label class="form-check-label" for="declining_depreciation">{{
                            $t('label.declining_depreciation') }}</label>
                    </div>
                </div>

                <!-- Accumulated Depreciation -->
                <div class="col-12 mb-5">
                    <h4>{{ $t('label.accumulated_depreciation_account_classification') }}</h4>

                    <div class="form-check mt-3">
                        <input type="radio" class="form-check-input custom-radio" name="accumulated_depreciation"
                            id="not_depreciation" value="not_depreciation" v-model="account.accumulatedDepreciation" />
                        <label class="form-check-label" for="not_depreciation">{{ $t('label.not_a_depreciation_account')
                            }}</label>
                    </div>

                    <div class="form-check">
                        <input type="radio" class="form-check-input custom-radio" name="accumulated_depreciation"
                            id="to_profit_loss" value="to_profit_loss" v-model="account.accumulatedDepreciation" />
                        <label class="form-check-label" for="to_profit_loss">{{
                            $t('label.accumulated_depreciation_to_profit_and_loss') }}</label>
                    </div>

                    <div class="form-check">
                        <input type="radio" class="form-check-input custom-radio" name="accumulated_depreciation"
                            id="to_trading" value="to_trading" v-model="account.accumulatedDepreciation" />
                        <label class="form-check-label" for="to_trading">{{
                            $t('label.accumulated_depreciation_to_trading') }}</label>
                    </div>

                    <div class="form-check">
                        <input type="radio" class="form-check-input custom-radio" name="accumulated_depreciation"
                            id="to_operating" value="to_operating" v-model="account.accumulatedDepreciation" />
                        <label class="form-check-label" for="to_operating">{{
                            $t('label.accumulated_depreciation_to_operating') }}</label>
                    </div>

                    <div class="form-check">
                        <input type="radio" class="form-check-input custom-radio" name="accumulated_depreciation"
                            id="to_revenue_expense" value="to_revenue_expense"
                            v-model="account.accumulatedDepreciation" />
                        <label class="form-check-label" for="to_revenue_expense">{{
                            $t('label.accumulated_depreciation_to_revenue_and_expense') }}</label>
                    </div>
                </div>

            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const account = ref({
    account_number: '',
    account_name: '',
    branch: '',
    account_type: '',
    nature_account: '',
    category: '',
    level: '',
    report_type: '',
    currency: '$ USD',
    currency_conditions: true, // checkbox
    allowed_users: {
        all_users: true,
        only_admin: true
    },
    account_opening_date: '',
    account_created_by: '',
    follows_account: '',
    account_linked: '',
    depreciation_account: '',
    consumption_rate: '',
    declining_depreciation: true, // checkbox
    accumulatedDepreciation: '', // radio/checkbox حسب تعديلنا
    accumulated_depreciation_classification: {
        not_depreciation: true,
        to_profit_loss: false,
        to_trading: false,
        to_operating: false,
        to_revenue_expense: false
    }
})


// تحديد إذا كانت العملية Edit
const isEdit = ref(false)

onMounted(() => {
    const id = route.params.id
    if (id) {
        isEdit.value = true
        loadAccount(id) // دالة لتحميل بيانات الحساب من السيرفر حسب id
    }
})

const loadAccount = async (id) => {
    // هنا ضع منطق جلب البيانات من API
    // مثال:
    // const response = await fetch(`/api/accounts/${id}`)
    // account.value = await response.json()
    console.log('Loading account', id)
}

// حفظ النموذج
const saveForm = async () => {
    if (isEdit.value) {
        // تحديث الحساب
        console.log('Updating account', account.value)
    } else {
        // إنشاء حساب جديد
        console.log('Creating account', account.value)
    }

    Swal.fire({
        icon: 'success',
        title: t('messages.saved_title'),
        text: t('messages.saved_text'),
        timer: 2000,
        showConfirmButton: false
    })
}

// إلغاء النموذج
const cancelForm = () => {
    Swal.fire({
        title: t('messages.cancel_title'),
        text: t('messages.cancel_text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t('buttons.yes_cancel'),
        cancelButtonText: t('buttons.no')
    }).then((result) => {
        if (result.isConfirmed) {
            router.push('/admin/accounts/list')
        }
    })
}
</script>

<style scoped>
/* تعديل شكل الـ radio عند التحديد */
.custom-radio:checked {
    background-color: #28a745;
    border-color: #28a745;
}
</style>