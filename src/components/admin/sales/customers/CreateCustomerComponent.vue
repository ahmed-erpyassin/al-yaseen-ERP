<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ t('label.company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ t('buttons.save') }}
            </button>
        </div>

        <form class="form" @submit.prevent="saveForm">
            <div class="alert alert-danger" v-if="errorMsg">{{ errorMsg }}</div>
            <div class="alert alert-success" v-if="successMsg">{{ successMsg }}</div>

            <div class="row">
                <!-- Customer Information Section -->
                <div class="col-12">
                    <h3>{{ t('label.customer_information') }}</h3>
                </div>

                <div class="col-12 mb-4">
                    <label for="client_type" class="form-label">{{ t('label.client_type') }}</label>
                    <div class="d-flex align-items-center">
                        <div class="form-check me-3">
                            <input class="form-check-input" type="radio" name="client_type" id="personal"
                                value="personal" v-model="form.client_type" />
                            <label class="form-check-label" for="personal">{{ t('label.personal') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="client_type" id="business"
                                value="business" v-model="form.client_type" />
                            <label class="form-check-label" for="business">{{ t('label.business') }}</label>
                        </div>
                    </div>
                </div>

                <!-- جميع الحقول الأخرى -->
                <div class="col-md-3" v-for="(field, index) in fields" :key="index">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label :for="field.id" class="form-label">{{ t(field.label) }}</label>
                            <input v-if="field.type !== 'textarea' && field.type !== 'file' && field.type !== 'select'"
                                :type="field.type" :id="field.id" class="form-control rounded-1"
                                v-model="form[field.model]" :maxlength="field.maxlength"
                                :class="{ 'is-invalid': errors[field.model] }" />
                            <textarea v-if="field.type === 'textarea'" :id="field.id" rows="3" class="form-control"
                                v-model="form[field.model]" :maxlength="field.maxlength"
                                :class="{ 'is-invalid': errors[field.model] }"></textarea>
                            <select v-if="field.type === 'select'" :id="field.id" class="form-control"
                                v-model="form[field.model]">
                                <option v-for="option in field.options" :key="option.value" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <input v-if="field.type === 'file'" type="file" :ref="field.ref" multiple
                                style="display:none" @change="handleFileUpload" />
                            <div v-if="errors[field.model]" class="invalid-feedback">{{ errors[field.model][0] }}</div>
                        </div>
                    </div>
                </div>

                <!-- Attachments Box -->
                <div class="col-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="email" class="form-label">{{ $t('label.email')
                                }}</label>
                            <div class=" position-relative group">
                                <input type="email" id="email" class="form-control rounded-1"
                                    placeholder="yassin2029@gmail.com" v-model="form.email" maxlength="150"
                                    :class="{ 'is-invalid': errors.email }" />
                                <i class="bi bi-envelope"></i>
                            </div>
                            <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="category" class="form-label">{{ $t('label.category') }}</label>

                            <input type="text" id="category" class="form-control rounded-1" v-model="form.category"
                                maxlength="100" :class="{ 'is-invalid': errors.category }" />
                            <div v-if="errors.category" class="invalid-feedback">{{ errors.category[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="notes" class="form-label">{{ $t('label.notes') }}</label>

                            <textarea name="notes" id="notes" rows="3" class="form-control" v-model="form.notes"
                                maxlength="500" :class="{ 'is-invalid': errors.notes }"></textarea>
                            <div v-if="errors.notes" class="invalid-feedback">{{ errors.notes[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="attachments" class="form-label">{{ $t('label.attachments') }}</label>

                            <div class="box-attachments d-flex align-items-center justify-content-center"
                                @click="$refs.fileInput.click()" style="cursor: pointer;">
                                <div class="text-center">
                                    <i class="bi bi-image"></i>
                                    <p class="small">{{ t('label.drop_file_here') }}</p>
                                </div>
                            </div>
                            <input type="file" ref="fileInput" @change="handleFileUpload" multiple
                                style="display: none;">

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const form = reactive({
    company_id: 1,
    branch_id: 1,
    currency_id: 1,
    employee_id: 1,
    country_id: 1,
    region_id: 1,
    city_id: 1,
    customer_number: '',
    company_name: '',
    first_name: '',
    second_name: '',
    contact_name: '',
    email: '',
    phone: '',
    mobile: '',
    address_one: '',
    address_two: '',
    postal_code: '',
    licensed_operator: '',
    tax_number: '',
    notes: '',
    status: 'active',
    code: '',
    invoice_type: '',
    category: '',
    attachments: []
});

const errors = reactive({});
const errorMsg = ref(null);
const successMsg = ref(null);

const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    form.attachments.push(...files);
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
        successMsg.value = t('messages.customer_created_successfully');
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
            router.push({ name: 'admin.customers' });
        }
    });
};

const fields = [
    { id: 'customer_number', label: 'label.customer_number', model: 'customer_number', type: 'text', maxlength: 50 },
    { id: 'company_name', label: 'label.company_name', model: 'company_name', type: 'text', maxlength: 255 },
    { id: 'first_name', label: 'label.first_name', model: 'first_name', type: 'text', maxlength: 100 },
    { id: 'second_name', label: 'label.second_name', model: 'second_name', type: 'text', maxlength: 100 },
    { id: 'contact_name', label: 'label.contact_name', model: 'contact_name', type: 'text', maxlength: 100 },
    { id: 'mobile', label: 'label.mobile', model: 'mobile', type: 'text', maxlength: 50 },
    { id: 'phone', label: 'label.phone', model: 'phone', type: 'text', maxlength: 50 },
    { id: 'address_one', label: 'label.address_1', model: 'address_one', type: 'text', maxlength: 255 },
    { id: 'address_two', label: 'label.address_2', model: 'address_two', type: 'text', maxlength: 255 },
    { id: 'city', label: 'label.city', model: 'city', type: 'text' },
    { id: 'state', label: 'label.state', model: 'state', type: 'text' },
    { id: 'postal_code', label: 'label.zip', model: 'postal_code', type: 'text', maxlength: 20 },
    { id: 'licensed_operator', label: 'label.licensed_operator', model: 'licensed_operator', type: 'text', maxlength: 255 },
    { id: 'tax_number', label: 'label.tax_number', model: 'tax_number', type: 'text', maxlength: 50 },
    { id: 'code', label: 'label.code', model: 'code', type: 'text', maxlength: 50 },
    { id: 'invoice_type', label: 'label.invoice_type', model: 'invoice_type', type: 'text', maxlength: 100 },
    { id: 'category', label: 'label.category', model: 'category', type: 'text', maxlength: 100 },
    { id: 'notes', label: 'label.notes', model: 'notes', type: 'textarea', maxlength: 500 },
    { id: 'attachments', label: 'label.attachments', model: 'attachments', type: 'file', ref: 'attachmentsInput' }
];
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

/* RTL support (optional) */
</style>
