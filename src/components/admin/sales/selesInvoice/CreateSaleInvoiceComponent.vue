<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-receipt"></i> {{ t('label.invoice') }}</h1>

        <!-- Buttons Save / Cancel -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ t('buttons.save') }}
            </button>
        </div>

        <form @submit.prevent="saveForm">
            <!-- Customer & Invoice Info -->
            <div class="row mb-4">
                <div class="col-12">
                    <h3>{{ t('label.customer_information') }}</h3>
                </div>

                <!-- Customer Fields -->
                <div class="col-md-3" v-for="(field, index) in customerFields" :key="index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ t(field.label) }}</label>
                        <input v-if="field.type === 'text'" type="text" :id="field.id" class="form-control rounded-1"
                            v-model="form[field.model]" />
                        <input v-else type="number" :id="field.id" class="form-control rounded-1"
                            v-model.number="form[field.model]" />
                    </div>
                </div>

                <!-- Additional Invoice Fields -->
                <div class="col-md-3" v-for="(field, index) in additionalFields" :key="'add-' + index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ field.label }}</label>
                        <input :type="field.type" :id="field.id" class="form-control rounded-1"
                            v-model="form[field.model]" />
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
                            <th>Item No</th>
                            <th>Item Information</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.items" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.item_no"></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.description">
                            </td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="item.unit"></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.quantity"></td>
                            <td><input type="number" class="form-control border-0 rounded-0"
                                    v-model.number="item.price"></td>
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
                    <label class="form-label">{{ t('label.discount') }} %</label>
                    <input type="number" class="form-control" v-model.number="form.discount">
                </div>
                <div class="col-md-3">
                    <label class="form-label">{{ t('label.vat') }} %</label>
                    <input type="number" class="form-control" v-model.number="form.vat">
                </div>
                <div class="col-md-3">
                    <label class="form-label">{{ t('label.total') }}</label>
                    <input type="text" class="form-control" :value="totalAmount.toFixed(2)" readonly>
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
import { reactive, computed } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const form = reactive({
    customer_name: '',
    email: '',
    phone: '',
    notebook: '',
    invoice_no: '',
    date: '',
    hour: '',
    due_date: '',
    customer_no: '',
    licensed_operator: '',
    currency: '',
    currency_price: 0,
    cash: 0,
    check_payments: 0,
    currency_payment: '',
    allowed_discount: 0,
    total_without_tax: 0,
    ratio: 0,
    vat_amount: 0,
    total_invoice: 0,
    remaining_amount: 0,
    items: [{ item_no: '', description: '', unit: '', quantity: 0, price: 0 }],
    discount: 0,
    vat: 0,
    notes: '',
    attachments: []
});

const customerFields = [
    { id: 'customer_name', label: 'label.customer_name', model: 'customer_name', type: 'text' },
    { id: 'email', label: 'label.email', model: 'email', type: 'text' },
    { id: 'phone', label: 'label.phone', model: 'phone', type: 'text' }
];

const additionalFields = [
    { id: 'notebook', label: t('label.notebook'), model: 'notebook', type: 'text' },
    { id: 'invoice_no', label: t('label.invoice_no'), model: 'invoice_no', type: 'text' },
    { id: 'date', label: t('label.date'), model: 'date', type: 'text' },
    { id: 'hour', label: t('label.hour'), model: 'hour', type: 'text' },
    { id: 'due_date', label: t('label.due_date'), model: 'due_date', type: 'text' },
    { id: 'customer_no', label: t('label.customer_no'), model: 'customer_no', type: 'text' },
    { id: 'licensed_operator', label: t('label.licensed_operator'), model: 'licensed_operator', type: 'text' },
    { id: 'currency', label: t('label.currency'), model: 'currency', type: 'text' },
    { id: 'currency_price', label: t('label.currency_price'), model: 'currency_price', type: 'number' },
    { id: 'cash', label: t('label.cash'), model: 'cash', type: 'number' },
    { id: 'check_payments', label: t('label.check_payments'), model: 'check_payments', type: 'number' },
    { id: 'currency_payment', label: t('label.currency_payment'), model: 'currency_payment', type: 'text' },
    { id: 'allowed_discount', label: t('label.allowed_discount'), model: 'allowed_discount', type: 'number' },
    { id: 'total_without_tax', label: t('label.total_without_tax'), model: 'total_without_tax', type: 'number' },
    { id: 'ratio', label: t('label.ratio'), model: 'ratio', type: 'number' },
    { id: 'vat_amount', label: t('label.vat_amount'), model: 'vat_amount', type: 'number' },
    { id: 'total_invoice', label: t('label.total_invoice'), model: 'total_invoice', type: 'number' },
    { id: 'remaining_amount', label: t('label.remaining_amount'), model: 'remaining_amount', type: 'number' }
];


const addRow = () => {
    form.items.push({ item_no: '', description: '', unit: '', quantity: 0, price: 0 });
};

const removeRow = () => {
    if (form.items.length > 1) form.items.pop();
};

const totalAmount = computed(() => {
    const subtotal = form.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const discount = subtotal * (form.discount / 100);
    const vat = (subtotal - discount) * (form.vat / 100);
    return subtotal - discount + vat;
});

const handleFileUpload = (event) => {
    form.attachments.push(...Array.from(event.target.files));
};

const saveForm = () => {
    Swal.fire({
        icon: 'success',
        title: t('messages.saved_title'),
        text: t('messages.saved_text'),
        timer: 2000,
        showConfirmButton: false
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
        if (result.isConfirmed) router.push({ name: 'admin.sales-invoice' });
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
