<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Buttons Save / Cancel / Preview -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success me-3" @click="saveForm">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <!-- Alerts -->
        <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
        <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

        <form @submit.prevent="saveForm">
            <!-- Payment Header -->
            <div class="row mb-5">
                <div class="col-12">
                    <h3>{{ $t('label.new_payment') }}</h3>
                </div>

                <div class="col-md-2" v-for="(field, index) in headerFields" :key="index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ $t(field.label) }}</label>
                        <input type="text" :id="field.id" class="form-control rounded-1" v-model="form[field.model]" />
                    </div>
                </div>
            </div>

            <!-- Receipt Information -->
            <h3 class="mb-3">{{ $t('label.receipt_information') }}</h3>
            <div class="row mb-4" v-for="(field, index) in receiptFields" :key="index">
                <div class="col-md-3" v-if="field.col === 3">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ $t(field.label) }}</label>
                        <input type="text" :id="field.id" class="form-control rounded-1" v-model="form[field.model]" />
                    </div>
                </div>
                <div class="col-md-5" v-if="field.col === 5">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ $t(field.label) }}</label>
                        <input type="text" :id="field.id" class="form-control rounded-1" v-model="form[field.model]" />
                    </div>
                </div>
            </div>

            <!-- Cheques Table -->
            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.cheque_number') }}</th>
                            <th>{{ $t('label.cheque_date') }}</th>
                            <th>{{ $t('label.cheque_owner_name') }}</th>
                            <th>{{ $t('label.currency') }}</th>
                            <th>{{ $t('label.currency_price') }}</th>
                            <th>{{ $t('label.value') }}</th>
                            <th>{{ $t('label.account') }}</th>
                            <th>{{ $t('label.account_name') }}</th>
                            <th>{{ $t('label.notes') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.items" :key="index">
                            <td><input type="number" class="form-control border-0 rounded-0" v-model.number="item.no" />
                            </td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.cheque_number" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.cheque_date" />
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0"
                                    v-model="item.cheque_owner_name" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.currency" />
                            </td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.currency_price" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.value" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.account" />
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0"
                                    v-model="item.account_name" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.notes"
                                    readonly /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Add / Remove Row -->
            <div class="d-flex gap-2 justify-content-end mb-4">
                <button type="button" class="btn btn-action" @click="addRow">{{ $t('actions.add_row') }}</button>
                <button type="button" class="btn btn-action" @click="removeRow">{{ $t('actions.remove_row') }}</button>
            </div>

            <!-- Notes & Attachments -->
            <div class="row">
                <div class="col-md-9 mb-4">
                    <label class="form-label">{{ $t('label.notes') }}</label>
                    <textarea rows="3" class="form-control" v-model="form.notes"></textarea>
                </div>
                <div class="col-md-9 mb-4">
                    <label class="form-label">{{ $t('label.attachments') }}</label>
                    <div class="box-attachments d-flex align-items-center justify-content-center"
                        @click="$refs.attachmentsInput.click()">
                        <div class="text-center">
                            <i class="bi bi-image"></i>
                            <p class="small">{{ $t('label.attachment_note') }}</p>
                        </div>
                    </div>
                    <input type="file" ref="attachmentsInput" multiple @change="handleFileUpload" style="display:none;">
                </div>
            </div>

            <!-- Totals Section -->
            <div class="row justify-content-end mt-4">
                <!-- Row 1 -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.total_checks') }}</label>
                    <input type="text" class="form-control" v-model="form.total_checks" />
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.total_cash_and_checks') }}</label>
                    <input type="text" class="form-control" v-model="form.total_cash_and_checks" />
                </div>

                <!-- Row 2 -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.discount_ratio') }}</label>
                    <input type="text" class="form-control" v-model="form.discount_ratio" />
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.source_discount') }}</label>
                    <input type="text" class="form-control" v-model="form.source_discount" />
                </div>

                <!-- Row 3 -->
                <div class="col-md-12 mb-3">
                    <label class="form-label">{{ $t('label.account_amount') }}</label>
                    <input type="text" class="form-control" v-model="form.account_amount" />
                </div>
            </div>


        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const form = reactive({
    headerFields: {},
    items: [{ no: 1, cheque_number: '', cheque_date: '', cheque_owner_name: '', currency: '', currency_price: 0, value: 0, account: '', account_name: '', notes: '' }],
    notes: '',
    attachments: [],
    total_checks: '',
    total_cash_and_checks: '',
    discount_ratio: '',
    source_discount: '',
    account_amount: ''
});

const headerFields = [
    { id: 'notebook', label: 'label.notebook', model: 'notebook' },
    { id: 'invoice_no', label: 'label.invoice_no', model: 'invoice_no' },
    { id: 'date', label: 'label.date', model: 'date' },
    { id: 'hour', label: 'label.hour', model: 'hour' },
    { id: 'customer_no', label: 'label.customer_no', model: 'customer_no' },
    { id: 'name', label: 'label.name', model: 'name' },
    { id: 'email', label: 'label.email', model: 'email' },
    { id: 'licensed_operator', label: 'label.licensed_operator', model: 'licensed_operator' },
    { id: 'currency', label: 'label.currency', model: 'currency' },
    { id: 'currency_price', label: 'label.currency_price', model: 'currency_price' }
];

const receiptFields = [
    { id: 'fund_account', label: 'label.fund_account', model: 'fund_account', col: 3 },
    { id: 'paid_cash', label: 'label.paid_cash', model: 'paid_cash', col: 5 },
    { id: 'statement', label: 'label.statement', model: 'statement', col: 3 }
];

const addRow = () => {
    form.items.push({ no: form.items.length + 1, cheque_number: '', cheque_date: '', cheque_owner_name: '', currency: '', currency_price: 0, value: 0, account: '', account_name: '', notes: '' });
};

const removeRow = () => {
    if (form.items.length > 1) form.items.pop();
};

const handleFileUpload = (event) => {
    form.attachments.push(...Array.from(event.target.files));
};

const errorMsg = ref(null);
const successMsg = ref(null);

const saveForm = () => {
    errorMsg.value = null;
    successMsg.value = null;
    Swal.fire({
        icon: 'success',
        title: t('messages.saved_title'),
        text: t('messages.saved_text'),
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        successMsg.value = t('messages.receipt_created_successfully');
    });
};

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
            router.push('/admin/payments');
        }
    });
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-action {
    background-color: #F4FFF0 !important;
}

.box-attachments {
    height: 150px;
    border: 1px dashed #767171;
    border-radius: 3px;
    cursor: pointer;
}

.box-attachments i {
    font-size: 60px;
}
</style>
