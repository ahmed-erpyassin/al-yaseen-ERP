<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ t('label.supplier') }}</h1>

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
            <h3>{{ t('label.supplier_information') }}</h3>
            <div class="row mt-4">
                <!-- Supplier Type -->
                <div class="col-12 mb-4">
                    <label class="form-label">{{ t('label.supplier_type') }}</label>
                    <div class="d-flex align-items-center">
                        <div class="form-check me-3">
                            <input class="form-check-input" type="radio" name="supplier_type" value="personal"
                                v-model="form.supplier_type" id="personal">
                            <label class="form-check-label" for="personal">{{ t('label.personal') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="supplier_type" value="business"
                                v-model="form.supplier_type" id="business">
                            <label class="form-check-label" for="business">{{ t('label.business') }}</label>
                        </div>
                    </div>
                </div>

                <!-- Supplier Fields -->
                <div class="col-md-3" v-for="(field, index) in supplierFields" :key="index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ t(field.label) }}</label>
                        <input :type="field.type" :id="field.id" class="form-control rounded-1"
                            v-model="form[field.model]" />
                    </div>
                </div>

                <!-- Account Information -->
                <div class="col-12 mb-4">
                    <h3>{{ t('label.account_information') }}</h3>
                </div>

                <div class="col-md-6" v-for="(field, index) in accountFields" :key="index">
                    <div class="mb-3 position-relative">
                        <label :for="field.id" class="form-label">{{ t(field.label) }}</label>
                        <input :type="field.type" :id="field.id" class="form-control rounded-1"
                            v-model="form[field.model]" />
                    </div>
                </div>

                <!-- Currency & Email -->
                <div class="col-md-12 mb-4">
                    <div class="mb-3 position-relative">
                        <label for="currency" class="form-label">{{ t('label.currency') }}</label>
                        <select id="currency" class="form-control" v-model="form.currency">
                            <option value="USD">$ USD</option>
                            <option value="EUR">€ EUR</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-12 mb-4">
                    <div class="mb-3 position-relative">
                        <label for="email" class="form-label">{{ t('label.email') }}</label>
                        <input type="email" id="email" class="form-control rounded-1" v-model="form.email"
                            placeholder="example@gmail.com" />
                    </div>
                </div>

                <!-- Notes -->
                <div class="col-md-12 mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ t('label.notes') }}</label>
                        <textarea id="notes" rows="3" class="form-control" v-model="form.notes"></textarea>
                    </div>
                </div>

                <!-- Attachments -->
                <div class="col-md-12 mb-4">
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ t('label.attachments') }}</label>
                        <div class="box-attachments d-flex align-items-center justify-content-center"
                            @click="$refs.attachmentsInput.click()">
                            <div class="text-center">
                                <i class="bi bi-image"></i>
                                <p class="small">{{ t('label.drop_file_here') }}</p>
                            </div>
                        </div>
                        <input type="file" ref="attachmentsInput" @change="handleFileUpload" multiple
                            style="display:none;">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const form = reactive({
    supplier_type: '',
    supplier_number: '',
    company_name: '',
    first_name: '',
    last_name: '',
    mobile: '',
    phone: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    licensed_operator: '',
    code: '',
    invoice_type: '',
    currency: 'USD',
    email: '',
    category: '',
    notes: '',
    attachments: []
});

const supplierFields = [
    { id: 'supplier_number', label: 'label.supplier_number', model: 'supplier_number', type: 'text' },
    { id: 'company_name', label: 'label.company_name', model: 'company_name', type: 'text' },
    { id: 'first_name', label: 'label.first_name', model: 'first_name', type: 'text' },
    { id: 'last_name', label: 'label.last_name', model: 'last_name', type: 'text' },
    { id: 'mobile', label: 'label.mobile', model: 'mobile', type: 'text' },
    { id: 'phone', label: 'label.phone', model: 'phone', type: 'text' },
    { id: 'address_1', label: 'label.address_1', model: 'address_1', type: 'text' },
    { id: 'address_2', label: 'label.address_2', model: 'address_2', type: 'text' },
    { id: 'city', label: 'label.city', model: 'city', type: 'text' },
    { id: 'state', label: 'label.state', model: 'state', type: 'text' },
    { id: 'zip', label: 'label.zip', model: 'zip', type: 'text' },
    { id: 'licensed_operator', label: 'label.licensed_operator', model: 'licensed_operator', type: 'text' }
];

const accountFields = [
    { id: 'code', label: 'label.code', model: 'code', type: 'text' },
    { id: 'invoice_type', label: 'label.invoice_type', model: 'invoice_type', type: 'text' },
    { id: 'category', label: 'label.category', model: 'category', type: 'text' }
];

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
        if (result.isConfirmed) router.push({ name: 'admin.suppliers' });
    });
};
</script>

<style>
.box-attachments {
    height: 162px;
    border: 1px dashed #767171;
    border-radius: 3px;
    cursor: pointer;
}

.box-attachments i {
    font-size: 92px;
}
</style>
