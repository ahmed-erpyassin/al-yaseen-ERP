<template>
    <div class="container pe-5 ps-5">
<<<<<<< HEAD
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <form class="form" @submit.prevent="handleSubmit">
            <!-- General Error Message -->
            <div class="alert alert-danger" v-if="errorMsg">{{ errorMsg }}</div>

            <!-- Success Message -->
            <div class="alert alert-success" v-if="successMsg">{{ successMsg }}</div>

            <div class="d-flex align-items-center justify-content-end mb-4">
                <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="handleCancel">{{
                    $t('buttons.cancel') }}</button>
                <button type="submit" class="btn btn-lg btn-success" :disabled="loading" @click="handleSubmit">
                    {{ loading ? $t('label.saving') : $t('buttons.save') }}
                </button>
            </div>
            <h3>{{ $t('label.customer_information') }}</h3>
            <div class="row mt-5">
=======
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
>>>>>>> a178603e0020e54dbb9e51af640313bf6318008f
                <div class="col-12">
                    <h3>{{ t('label.customer_information') }}</h3>
                </div>

<<<<<<< HEAD
                            <div class="form-check me-3">
                                <input class="form-check-input" type="radio" name="client_type" id="personal"
                                    value="personal" v-model="form.client_type">
                                <label class="form-check-label" for="personal">
                                    {{ $t('label.personal') }}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="client_type" id="business"
                                    value="business" v-model="form.client_type">
                                <label class="form-check-label" for="business">
                                    {{ $t('label.business') }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="customer_number" class="form-label">{{ $t('label.customer_number')
                                    }}</label>

                                <input type="text" id="customer_number" class="form-control rounded-1"
                                    v-model="form.customer_number" maxlength="50"
                                    :class="{ 'is-invalid': errors.customer_number }" />
                                <div v-if="errors.customer_number" class="invalid-feedback">{{ errors.customer_number[0]
                                    }}</div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="company_name" class="form-label">{{ $t('label.company_name') }}</label>

                            <input type="text" id="company_name" class="form-control rounded-1"
                                v-model="form.company_name" maxlength="255"
                                :class="{ 'is-invalid': errors.company_name }" />
                            <div v-if="errors.company_name" class="invalid-feedback">{{ errors.company_name[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="first_name" class="form-label">{{ $t('label.first_name') }}</label>

                            <input type="text" id="first_name" class="form-control rounded-1" v-model="form.first_name"
                                maxlength="100" :class="{ 'is-invalid': errors.first_name }" />
                            <div v-if="errors.first_name" class="invalid-feedback">{{ errors.first_name[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="second_name" class="form-label">{{ $t('label.second_name') }}</label>

                            <input type="text" id="second_name" class="form-control rounded-1"
                                v-model="form.second_name" maxlength="100"
                                :class="{ 'is-invalid': errors.second_name }" />
                            <div v-if="errors.second_name" class="invalid-feedback">{{ errors.second_name[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="contact_name" class="form-label">{{ $t('label.contact_name') }}</label>

                            <input type="text" id="contact_name" class="form-control rounded-1"
                                v-model="form.contact_name" maxlength="100"
                                :class="{ 'is-invalid': errors.contact_name }" />
                            <div v-if="errors.contact_name" class="invalid-feedback">{{ errors.contact_name[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="mobile" class="form-label">{{ $t('label.mobile') }}</label>

                            <input type="text" id="mobile" class="form-control rounded-1" v-model="form.mobile"
                                maxlength="50" :class="{ 'is-invalid': errors.mobile }" />
                            <div v-if="errors.mobile" class="invalid-feedback">{{ errors.mobile[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="phone" class="form-label">{{ $t('label.phone') }}</label>

                            <input type="text" id="phone" class="form-control rounded-1" v-model="form.phone"
                                maxlength="50" :class="{ 'is-invalid': errors.phone }" />
                            <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="address_one" class="form-label">{{ $t('label.address_1') }}</label>

                            <input type="text" id="address_one" class="form-control rounded-1"
                                v-model="form.address_one" maxlength="255"
                                :class="{ 'is-invalid': errors.address_one }" />
                            <div v-if="errors.address_one" class="invalid-feedback">{{ errors.address_one[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="addres_2" class="form-label">{{ $t('label.address_2') }}</label>

                            <input type="text" id="address_two" class="form-control rounded-1"
                                v-model="form.address_two" maxlength="255"
                                :class="{ 'is-invalid': errors.address_two }" />
                            <div v-if="errors.address_two" class="invalid-feedback">{{ errors.address_two[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="city" class="form-label">{{ $t('label.city') }}</label>

                            <input type="text" id="city" class="form-control rounded-1" v-model="form.city"
                                :class="{ 'is-invalid': errors.city }" />
                            <div v-if="errors.city" class="invalid-feedback">{{ errors.city[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="state" class="form-label">{{ $t('label.state') }}</label>

                            <input type="text" id="state" class="form-control rounded-1" v-model="form.state"
                                :class="{ 'is-invalid': errors.state }" />
                            <div v-if="errors.state" class="invalid-feedback">{{ errors.state[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="postal_code" class="form-label">{{ $t('label.zip') }}</label>

                            <input type="text" id="postal_code" class="form-control rounded-1"
                                v-model="form.postal_code" maxlength="20"
                                :class="{ 'is-invalid': errors.postal_code }" />
                            <div v-if="errors.postal_code" class="invalid-feedback">{{ errors.postal_code[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="licensed_operator" class="form-label">{{ $t('label.licensed_operator')
                                }}</label>

                            <input type="text" id="licensed_operator" class="form-control rounded-1"
                                v-model="form.licensed_operator" maxlength="255"
                                :class="{ 'is-invalid': errors.licensed_operator }" />
                            <div v-if="errors.licensed_operator" class="invalid-feedback">{{ errors.licensed_operator[0]
                                }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="tax_number" class="form-label">{{ $t('label.tax_number') }}</label>

                            <input type="text" id="tax_number" class="form-control rounded-1" v-model="form.tax_number"
                                maxlength="50" :class="{ 'is-invalid': errors.tax_number }" />
                            <div v-if="errors.tax_number" class="invalid-feedback">{{ errors.tax_number[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-12 mb-5">
                    <h3>{{ $t('label.account_information') }}</h3>

                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="code" class="form-label">{{ $t('label.code') }}</label>

                            <input type="text" id="code" class="form-control rounded-1" v-model="form.code"
                                maxlength="50" :class="{ 'is-invalid': errors.code }" />
                            <div v-if="errors.code" class="invalid-feedback">{{ errors.code[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="invoice_type" class="form-label">{{ $t('label.invoice_type') }}</label>

                            <input type="text" id="invoice_type" class="form-control rounded-1"
                                v-model="form.invoice_type" maxlength="100"
                                :class="{ 'is-invalid': errors.invoice_type }" />
                            <div v-if="errors.invoice_type" class="invalid-feedback">{{ errors.invoice_type[0] }}</div>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('label.currency')
                                }}</label>
                            <select name="currency" id="currency" class="form-control">
                                <option value="">$ USD</option>
=======
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
>>>>>>> a178603e0020e54dbb9e51af640313bf6318008f
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
<<<<<<< HEAD
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
=======
                            <label class="form-label">{{ t('label.attachments') }}</label>
                            <div class="box-attachments d-flex align-items-center justify-content-center"
                                @click="$refs.attachmentsInput.click()" style="cursor:pointer;">
>>>>>>> a178603e0020e54dbb9e51af640313bf6318008f
                                <div class="text-center">
                                    <i class="bi bi-image"></i>
                                    <p class="small">{{ t('label.drop_file_here') }}</p>
                                </div>
                            </div>
<<<<<<< HEAD
                            <input type="file" ref="fileInput" @change="handleFileUpload" multiple
                                style="display: none;">

=======
                            <input type="file" ref="attachmentsInput" @change="handleFileUpload" multiple
                                style="display:none;">
>>>>>>> a178603e0020e54dbb9e51af640313bf6318008f
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<<<<<<< HEAD
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

// حقل الملفات
const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    form.attachments.push(...files);
=======
<script>
import { mapActions, mapGetters } from 'vuex';
import VueSelect from 'vue-select';
import LoadingComponent from '@/components/components/LoadingComponent.vue';

export default {
    name: 'CreateCustomerComponent',
    // eslint-disable-next-line vue/no-unused-components
    components: { Vue3Select, LoadingComponent },
    components: { VueSelect, LoadingComponent },
    data() {
        return {
            form: {
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
            },
            errors: {},
            errorMsg: null,
            successMsg: null,
            isLoading: false,
            currencies: [
                { id: 1, name_en: 'USD', name_ar: 'دولار أمريكي' },
                { id: 2, name_en: 'EUR', name_ar: 'يورو' },
                { id: 3, name_en: 'SAR', name_ar: 'ريال سعودي' },
                { id: 4, name_en: 'AED', name_ar: 'درهم إماراتي' },
                { id: 5, name_en: 'EGP', name_ar: 'جنيه مصري' }
            ]
        };
    },
    computed: {
        ...mapGetters('customer', [
            'loading',
            'error'
        ]),
        locale() {
            return this.$i18n.locale;
        }
    },
    methods: {
        ...mapActions('customer', [
            'createCustomer'
        ]),

        async handleSubmit() {
            this.errors = {};
            this.errorMsg = null;
            this.successMsg = null; // Clear previous success message
            this.isLoading = true; // Start loading

            try {
                await this.createCustomer(this.form);
                // Show success message in div
                this.successMsg = this.$t('messages.customer_created_successfully');

                // Redirect to customers list after showing success message for 2 seconds
                setTimeout(() => {
                    this.$router.push({ name: 'admin.customers' });
                }, 2000);
            } catch (error) {
                console.error('Failed to create customer:', error);

                // Handle API validation errors like LoginComponent
                if (error.response && error.response.status === 422) {
                    // Validation errors - show field-specific errors
                    this.errors = error.response.data.errors;
                } else if (error.response && error.response.status === 401) {
                    // Unauthorized - show general error message
                    this.errorMsg = error.response.data.message;
                } else if (error.response && error.response.data && error.response.data.message) {
                    // Other API errors with message
                    this.errorMsg = error.response.data.message;
                } else {
                    // Generic error
                    this.errorMsg = this.$t('messages.customer_creation_failed') || 'Failed to create customer. Please try again.';
                }
            } finally {
                this.isLoading = false; // Stop loading
            }
        },

        handleFileUpload(event) {
            const files = Array.from(event.target.files);
            this.form.attachments = [...this.form.attachments, ...files];
        },

        removeAttachment(index) {
            this.form.attachments.splice(index, 1);
        },

        handleCancel() {
            this.$router.push({ name: 'admin.customers' });
        }
    }
>>>>>>> ebdf308c2aa2efebfd0b93f3642b12b029ce45a6
};

// حفظ النموذج مع رسالة نجاح
const saveForm = () => {
    errors.value = {};
    errorMsg.value = null;
    successMsg.value = null;

    // هنا عادةً ترسل البيانات إلى API
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

// إلغاء النموذج مع تأكيد
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

// تعريف الحقول لاستخدامها في حلقة v-for
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
