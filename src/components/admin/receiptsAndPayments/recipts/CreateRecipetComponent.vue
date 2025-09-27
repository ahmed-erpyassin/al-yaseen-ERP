<template>
  <div class="container pe-5 ps-5">
    <h1><i class="bi bi-receipt"></i> {{ t('label.new_receipt') }}</h1>

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
      <!-- Receipt Header Fields -->
      <div class="row mb-4">
        <div class="col-md-2" v-for="(field, index) in receiptFields" :key="index">
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

      <!-- Receipt Cheques Table -->
      <h3>{{ t('label.cheques') }}</h3>
      <div class="table-responsive mb-3">
        <table class="table table-bordered text-center align-middle">
          <thead class="header">
            <tr>
              <th>#</th>
              <th>{{ t('label.cheque_number') }}</th>
              <th>{{ t('label.cheque_date') }}</th>
              <th>{{ t('label.cheque_owner_name') }}</th>
              <th>{{ t('label.currency') }}</th>
              <th>{{ t('label.currency_price') }}</th>
              <th>{{ t('label.value') }}</th>
              <th>{{ t('label.account') }}</th>
              <th>{{ t('label.account_name') }}</th>
              <th>{{ t('label.notes') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cheque, index) in form.cheques" :key="index">
              <td>{{ index + 1 }}</td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.chequeNumber" /></td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.chequeDate" /></td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.ownerName" /></td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.currency" /></td>
              <td><input type="number" class="form-control border-0 rounded-0" v-model.number="cheque.currencyPrice" /></td>
              <td><input type="number" class="form-control border-0 rounded-0" v-model.number="cheque.value" /></td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.account" /></td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.accountName" /></td>
              <td><input type="text" class="form-control border-0 rounded-0" v-model="cheque.notes" readonly /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add / Remove Cheque -->
      <div class="d-flex gap-2 mb-4">
        <button type="button" class="btn btn-secondary" @click="addCheque">{{ t('buttons.add_row') }}</button>
        <button type="button" class="btn btn-danger" @click="removeCheque">{{ t('buttons.remove_row') }}</button>
      </div>

      <!-- Totals -->
      <div class="row mb-4">
        <div class="col-md-3">
          <label class="form-label">{{ t('label.total_checks') }}</label>
          <input type="number" class="form-control" v-model.number="form.total_checks" />
        </div>
        <div class="col-md-3">
          <label class="form-label">{{ t('label.total_cash_and_checks') }}</label>
          <input type="number" class="form-control" v-model.number="form.total_cash_checks" />
        </div>
        <div class="col-md-3">
          <label class="form-label">{{ t('label.discount_ratio') }} %</label>
          <input type="number" class="form-control" v-model.number="form.discount_ratio" />
        </div>
        <div class="col-md-3">
          <label class="form-label">{{ t('label.source_discount') }}</label>
          <input type="number" class="form-control" v-model.number="form.source_discount" />
        </div>
        <div class="col-md-3 mt-3">
          <label class="form-label">{{ t('label.account_amount') }}</label>
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
        <div class="box-attachments d-flex align-items-center justify-content-center" @click="$refs.attachmentsInput.click()">
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
import { reactive, ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const form = reactive({
  notebook: '',
  invoice_no: '',
  date: '',
  hour: '',
  customer_no: '',
  customer_name: '',
  customer_email: '',
  licensed_operator: '',
  currency: '',
  currency_price: '',
  cheques: [{ chequeNumber:'', chequeDate:'', ownerName:'', currency:'', currencyPrice:0, value:0, account:'', accountName:'', notes:'' }],
  total_checks: 0,
  total_cash_checks: 0,
  discount_ratio: 0,
  source_discount: 0,
  account_amount: 0,
  notes: '',
  attachments: []
});

const errorMsg = ref(null);
const successMsg = ref(null);

const receiptFields = [
  { id: 'notebook', label: 'label.notebook', model: 'notebook' },
  { id: 'invoice_no', label: 'label.invoice_no', model: 'invoice_no' },
  { id: 'date', label: 'label.date', model: 'date' },
  { id: 'hour', label: 'label.hour', model: 'hour' }
];

const customerFields = [
  { id: 'customer_no', label: 'label.customer_no', model: 'customer_no' },
  { id: 'customer_name', label: 'label.name', model: 'customer_name' },
  { id: 'customer_email', label: 'label.email', model: 'customer_email' },
  { id: 'licensed_operator', label: 'label.licensed_operator', model: 'licensed_operator' },
  { id: 'currency', label: 'label.currency', model: 'currency' },
  { id: 'currency_price', label: 'label.currency_price', model: 'currency_price' }
];

const addCheque = () => {
  form.cheques.push({ chequeNumber:'', chequeDate:'', ownerName:'', currency:'', currencyPrice:0, value:0, account:'', accountName:'', notes:'' });
};

const removeCheque = () => {
  if(form.cheques.length > 1) form.cheques.pop();
};

const totalAmount = computed(() => {
  const chequesTotal = form.cheques.reduce((sum, c) => sum + c.value, 0);
  return chequesTotal + form.total_cash_checks - (chequesTotal * form.discount_ratio / 100) - form.source_discount;
});

const handleFileUpload = (event) => {
  form.attachments.push(...Array.from(event.target.files));
};

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
    if(result.isConfirmed) {
      router.push('/admin/receipts');
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
