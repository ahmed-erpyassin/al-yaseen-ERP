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

                        <!-- تحويل company_name لقائمة منسدلة -->
                        <select v-if="field.model === 'company_name'" :id="field.id" class="form-control rounded-1"
                            v-model="form.company_name">
                            <option value="">{{ t('label.select_company') }}</option>
                            <option v-for="company in companies" :key="company.id" :value="company.name">{{ company.name
                            }}</option>
                        </select>

                        <!-- باقي الحقول تبقى إدخال نص -->
                        <input v-else :type="field.type" :id="field.id" class="form-control rounded-1"
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

                <!-- Company & Branch -->
                <div class="col-md-6 mb-4">
                    <label for="company_id" class="form-label">{{ t('label.company') }}</label>
                    <select id="company_id" class="form-control" v-model="form.company_id">
                        <option value="">{{ t('label.select_company') }}</option>
                        <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}
                        </option>
                    </select>
                </div>

                <div class="col-md-6 mb-4">
                    <label for="branch_id" class="form-label">{{ t('label.branch') }}</label>
                    <select id="branch_id" class="form-control" v-model="form.branch_id">
                        <option value="">{{ t('label.select_branch') }}</option>
                        <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}
                        </option>
                    </select>
                </div>

                <!-- Status -->
                <div class="col-md-6 mb-4">
                    <label for="status" class="form-label">{{ t('label.status') }}</label>
                    <select id="status" class="form-control" v-model="form.status">
                        <option value="">{{ t('label.select_status') }}</option>
                        <option value="active">{{ t('label.active') }}</option>
                        <option value="inactive">{{ t('label.inactive') }}</option>
                    </select>
                </div>

                <!-- Currency -->
                <div class="col-md-6 mb-4">
                    <label for="currency" class="form-label">{{ t('label.currency') }}</label>
                    <select id="currency" class="form-control" v-model="form.currency">
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                    </select>
                </div>

                <!-- Email -->
                <div class="col-md-6 mb-4">
                    <label for="email" class="form-label">{{ t('label.email') }}</label>
                    <input type="email" id="email" class="form-control rounded-1" v-model="form.email"
                        placeholder="example@gmail.com" />
                </div>

                <!-- Notes -->
                <div class="col-md-12 mb-4">
                    <label for="notes" class="form-label">{{ t('label.notes') }}</label>
                    <textarea id="notes" rows="3" class="form-control" v-model="form.notes"></textarea>
                </div>

            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const router = useRouter();
const { t } = useI18n();

const companies = ref([
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' }
]);

const branches = ref([
    { id: 1, name: 'Branch A' },
    { id: 2, name: 'Branch B' }
]);

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
    category: '',
    currency: 'USD',
    email: '',
    notes: '',
    // attachments: [],
    company_id: '',
    branch_id: '',
    status: ''
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

// const handleFileUpload = (event) => {
//     form.attachments.push(...Array.from(event.target.files));
// };

const saveForm = async () => {
    if (!form.supplier_type || !form.company_id || !form.branch_id || !form.status) {
        Swal.fire('Error', 'Please fill all required fields', 'error');
        return;
    }

    try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();

        for (const key in form) {
            if (key === 'attachments') {
                form.attachments.forEach(file => formData.append('attachments[]', file));
            } else {
                formData.append(key, form[key]);
            }
        }

        await axios.post('/suppliers/', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        Swal.fire({
            icon: 'success',
            title: t('messages.saved_title'),
            text: t('messages.saved_text'),
            timer: 2000,
            showConfirmButton: false
        });

        router.push({ name: 'admin.purchase.suppliers' });

    } catch (err) {
        console.error('Create supplier error:', err.response?.data);
        Swal.fire('Error', err.response?.data?.message || 'Failed to create supplier', 'error');
    }
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
        if (result.isConfirmed) router.push({ name: 'admin.purchase.suppliers' });
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
