<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-receipt"></i> {{ t('label.new_purchase_invoice') }}</h1>

        <!-- Buttons Save / Cancel -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ t('buttons.save') }}
            </button>
        </div>

        <!-- Alerts -->
        <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
        <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

        <form @submit.prevent="saveForm">
            <!-- Invoice Header Fields -->
            <div class="row mb-4">
                <div class="col-md-2" v-for="(field, index) in invoiceHeaderFields" :key="index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ t(field.label) }}</label>
                        <input type="text" :id="field.id" class="form-control rounded-1" v-model="form[field.model]" />
                    </div>
                </div>
            </div>

            <!-- Customer Info -->
            <div class="row mb-4">
                <div class="col-md-2" v-for="(field, index) in customerFields" :key="index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ t(field.label) }}</label>
                        <input type="text" :id="field.id" class="form-control rounded-1" v-model="form[field.model]" />
                    </div>
                </div>
            </div>

            <!-- Invoice Items Table -->
            <h3>{{ t('label.invoice_items') }}</h3>
            <div class="table-responsive mb-3">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ t('label.item_no') }}</th>
                            <th>{{ t('label.item_information') }}</th>
                            <th>{{ t('label.unit') }}</th>
                            <th>{{ t('label.quantity') }}</th>
                            <th>{{ t('label.price') }}</th>
                            <th>{{ t('label.total') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.items" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.item_no" />
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.description" />
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.unit" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.quantity" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.price" /></td>
                            <td>{{ (item.quantity * item.price).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Add / Remove Row Buttons -->
            <div class="d-flex gap-2 mb-4">
                <button type="button" class="btn btn-secondary" @click="addRow">{{ t('buttons.add_row') }}</button>
                <button type="button" class="btn btn-danger" @click="removeRow">{{ t('buttons.remove_row') }}</button>
            </div>

            <!-- Totals -->
            <div class="row mb-4">
                <div class="col-md-3">
                    <label class="form-label">{{ t('label.cash') }}</label>
                    <input type="number" class="form-control" v-model.number="form.cash" />
                </div>
                <div class="col-md-3">
                    <label class="form-label">{{ t('label.check_payments') }}</label>
                    <input type="number" class="form-control" v-model.number="form.check_payments" />
                </div>
                <div class="col-md-3">
                    <label class="form-label">{{ t('label.currency_payment') }}</label>
                    <input type="text" class="form-control" v-model="form.currency_payment" />
                </div>
                <div class="col-md-3">
                    <label class="form-label">{{ t('label.allowed_discount') }} %</label>
                    <input type="number" class="form-control" v-model.number="form.allowed_discount" />
                </div>
                <div class="col-md-3 mt-3">
                    <label class="form-label">{{ t('label.total_without_tax') }}</label>
                    <input type="number" class="form-control" v-model.number="form.total_without_tax" />
                </div>
                <div class="col-md-3 mt-3">
                    <label class="form-label">{{ t('label.ratio') }} %</label>
                    <input type="number" class="form-control" v-model.number="form.ratio" />
                </div>
                <div class="col-md-3 mt-3">
                    <label class="form-label">{{ t('label.vat') }} %</label>
                    <input type="number" class="form-control" v-model.number="form.vat" />
                </div>
                <div class="col-md-3 mt-3">
                    <label class="form-label">{{ t('label.total_invoice') }}</label>
                    <input type="number" class="form-control" :value="totalAmount.toFixed(2)" readonly />
                </div>
            </div>

            <!-- Notes -->
            <div class="mb-4">
                <label class="form-label">{{ t('label.notes') }}</label>
                <textarea class="form-control" rows="3" v-model="form.notes"></textarea>
            </div>

            <!-- Attachments -->
            <div class="mb-4">
                <label class="form-label">{{ t('label.attachments') }}</label>
                <div class="box-attachments d-flex align-items-center justify-content-center"
                    @click="$refs.attachmentsInput.click()">
                    <div class="text-center">
                        <i class="bi bi-image"></i>
                        <p class="small">{{ t('label.drop_file_here') }}</p>
                    </div>
                </div>
                <input type="file" ref="attachmentsInput" @change="handleFileUpload" multiple style="display:none;">
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const form = reactive({
    invoice_number: '',
    date: '',
    supplier_name: '',
    customer_name: '',
    email: '',
    phone: '',
    items: [{ item_no: '', description: '', unit: '', quantity: 0, price: 0 }],
    cash: 0,
    check_payments: 0,
    currency_payment: '',
    allowed_discount: 0,
    total_without_tax: 0,
    ratio: 0,
    vat: 0,
    notes: '',
    attachments: []
});

const errorMsg = ref(null);
const successMsg = ref(null);

const invoiceHeaderFields = [
    { id: 'invoice_number', label: 'label.invoice_number', model: 'invoice_number' },
    { id: 'date', label: 'label.date', model: 'date' }
];

const customerFields = [
    { id: 'supplier_name', label: 'label.supplier_name', model: 'supplier_name' },
    { id: 'customer_name', label: 'label.customer_name', model: 'customer_name' },
    { id: 'email', label: 'label.email', model: 'email' },
    { id: 'phone', label: 'label.phone', model: 'phone' }
];

const addRow = () => {
    form.items.push({ item_no: '', description: '', unit: '', quantity: 0, price: 0 });
};

const removeRow = () => {
    if (form.items.length > 1) form.items.pop();
};

const totalAmount = computed(() => {
    const subtotal = form.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const discount = subtotal * (form.allowed_discount / 100);
    const vat = (subtotal - discount) * (form.vat / 100);
    return subtotal - discount + vat;
});

const handleFileUpload = (event) => {
    form.attachments.push(...Array.from(event.target.files));
};

const saveForm = () => {
    errorMsg.value = null;
    successMsg.value = null;

    Swal.fire({
        icon: 'success',                  // أيقونة النجاح
        title: t('messages.saved_title'), // عنوان الحفظ
        text: t('messages.saved_text'),   // نص الحفظ
        timer: 2000,                       // يظهر لمدة ثانيتين
        showConfirmButton: false           // بدون زر تأكيد
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
            // تأكد أن هذا المسار موجود في router
            router.push('/admin/purchase-invoices');
        }
    });
};
</script>

<style>
.header th {
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
