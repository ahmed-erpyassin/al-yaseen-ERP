<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ t('label.company_undefined') }}</h1>

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
            <div class="row mb-4">
                <!-- Employee Number -->
                <div class="col-md-2">
                    <div class="mb-3 position-relative">
                        <label for="employee_number" class="form-label">{{ t('label.employee_number') }}</label>
                        <input type="text" id="employee_number" class="form-control rounded-1"
                            v-model="form.employee_number" />
                    </div>
                </div>

                <!-- Surname -->
                <div class="col-md-7">
                    <div class="mb-3 position-relative">
                        <label for="surname" class="form-label">{{ t('label.surname') }}</label>
                        <input type="text" id="surname" class="form-control rounded-1" v-model="form.surname" />
                    </div>
                </div>

                <!-- First Name -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="firstname" class="form-label">{{ t('label.first_name') }}</label>
                        <input type="text" id="firstname" class="form-control rounded-1" v-model="form.firstname" />
                    </div>
                </div>

                <!-- Second Name -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="secondname" class="form-label">{{ t('label.second_name') }}</label>
                        <input type="text" id="secondname" class="form-control rounded-1" v-model="form.secondname" />
                    </div>
                </div>

                <!-- Third Name -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="thirdname" class="form-label">{{ t('label.third_name') }}</label>
                        <input type="text" id="thirdname" class="form-control rounded-1" v-model="form.thirdname" />
                    </div>
                </div>

                <!-- Mobile 1 -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="mobile1" class="form-label">{{ t('label.mobile_1') }}</label>
                        <input type="text" id="mobile1" class="form-control rounded-1" v-model="form.mobile1" />
                    </div>
                </div>

                <!-- Mobile 2 -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="mobile2" class="form-label">{{ t('label.mobile_2') }}</label>
                        <input type="text" id="mobile2" class="form-control rounded-1" v-model="form.mobile2" />
                    </div>
                </div>

                <!-- Email -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="email" class="form-label">{{ t('label.email') }}</label>
                        <input type="email" id="email" class="form-control rounded-1" v-model="form.email" />
                    </div>
                </div>

                <!-- Date of Birth -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="date_birth" class="form-label">{{ t('label.date_of_birth') }}</label>
                        <input type="date" id="date_birth" class="form-control rounded-1" v-model="form.date_birth" />
                    </div>
                </div>

                <!-- Address -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="address" class="form-label">{{ t('label.address') }}</label>
                        <input type="text" id="address" class="form-control rounded-1" v-model="form.address" />
                    </div>
                </div>

                <!-- Government ID -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="government_id" class="form-label">{{ t('label.government_id') }}</label>
                        <input type="text" id="government_id" class="form-control rounded-1"
                            v-model="form.government_id" />
                    </div>
                </div>

                <!-- NID Number -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="nid_number" class="form-label">{{ t('label.nid_number') }}</label>
                        <input type="text" id="nid_number" class="form-control rounded-1" v-model="form.nid_number" />
                    </div>
                </div>

                <!-- Gender -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="gender" class="form-label">{{ t('label.gender') }}</label>
                        <input type="text" id="gender" class="form-control rounded-1" v-model="form.gender" />
                    </div>
                </div>

                <!-- Number of Wifes -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="wifes_count" class="form-label">{{ t('label.number_of_wifes') }}</label>
                        <input type="text" id="wifes_count" class="form-control rounded-1" v-model="form.wifes_count" />
                    </div>
                </div>

                <!-- Number of Children -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="children_count" class="form-label">{{ t('label.number_of_children') }}</label>
                        <input type="text" id="children_count" class="form-control rounded-1"
                            v-model="form.children_count" />
                    </div>
                </div>

                <!-- Number of Dependents -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="dependents_count" class="form-label">{{ t('label.number_of_dependents') }}</label>
                        <input type="text" id="dependents_count" class="form-control rounded-1"
                            v-model="form.dependents_count" />
                    </div>
                </div>

                <!-- Number of Students -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="students_count" class="form-label">{{ t('label.number_of_students') }}</label>
                        <input type="text" id="students_count" class="form-control rounded-1"
                            v-model="form.students_count" />
                    </div>
                </div>

                <!-- Driver & Sales Representative -->
                <div class="col-md-3">
                    <div class="mb-3 d-flex align-items-center">
                        <div class="form-check me-3">
                            <input type="checkbox" class="form-check-input rounded-circle" id="driver"
                                v-model="form.driver" />
                            <label class="form-check-label" for="driver">{{ t('label.driver') }}</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input rounded-circle" id="sales"
                                v-model="form.sales_representative" />
                            <label class="form-check-label" for="sales">{{ t('label.sales_representative') }}</label>
                        </div>
                    </div>
                </div>

                <!-- Car Number -->
                <div class="col-md-3">
                    <div class="mb-3 position-relative">
                        <label for="car_number" class="form-label">{{ t('label.car_number') }}</label>
                        <input type="text" id="car_number" class="form-control rounded-1" v-model="form.car_number" />
                    </div>
                </div>

                <!-- Job -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="job" class="form-label">{{ t('label.job') }}</label>
                        <input type="text" id="job" class="form-control rounded-1" v-model="form.job" />
                    </div>
                </div>

                <!-- Date of Appointment -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="date_of_appointment" class="form-label">{{ t('label.date_of_appointment') }}</label>
                        <input type="date" id="date_of_appointment" class="form-control rounded-1"
                            v-model="form.date_of_appointment" />
                    </div>
                </div>

                <!-- Employee Manager -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="employee_manager" class="form-label">{{ t('label.employee_manager') }}</label>
                        <input type="text" id="employee_manager" class="form-control rounded-1"
                            v-model="form.employee_manager" />
                    </div>
                </div>

                <!-- Employee ID -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="employee_id" class="form-label">{{ t('label.employee_id') }}</label>
                        <input type="text" id="employee_id" class="form-control rounded-1" v-model="form.employee_id" />
                    </div>
                </div>

                <!-- Job Title -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="job_title" class="form-label">{{ t('label.job_title') }}</label>
                        <input type="text" id="job_title" class="form-control rounded-1" v-model="form.job_title" />
                    </div>
                </div>

                <!-- Category -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="category" class="form-label">{{ t('label.category') }}</label>
                        <input type="text" id="category" class="form-control rounded-1" v-model="form.category" />
                    </div>
                </div>

                <!-- Sallery -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="sallery" class="form-label">{{ t('label.sallery') }}</label>
                        <input type="text" id="sallery" class="form-control rounded-1" v-model="form.sallery" />
                    </div>
                </div>

                <!-- Billing Rate -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="billing_rate" class="form-label">{{ t('label.billing_rate') }}</label>
                        <input type="text" id="billing_rate" class="form-control rounded-1"
                            v-model="form.billing_rate" />
                    </div>
                </div>

                <!-- Monthly Discount -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="monthly_discount" class="form-label">{{ t('label.monthly_discount') }}</label>
                        <input type="text" id="monthly_discount" class="form-control rounded-1"
                            v-model="form.monthly_discount" />
                    </div>
                </div>

                <!-- Currency -->
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="currency" class="form-label">{{ t('label.currency') }}</label>
                        <select id="currency" class="form-control" v-model="form.currency">
                            <option value="$ USD">$ USD</option>
                        </select>
                    </div>
                </div>

                <!-- Notes -->
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ t('label.notes') }}</label>
                        <textarea id="notes" class="form-control" rows="3" v-model="form.notes"></textarea>
                    </div>
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

const form = reactive({
    employee_number: '',
    surname: '',
    firstname: '',
    secondname: '',
    thirdname: '',
    mobile1: '',
    mobile2: '',
    email: '',
    date_birth: '',
    address: '',
    government_id: '',
    nid_number: '',
    gender: '',
    wifes_count: '',
    children_count: '',
    dependents_count: '',
    students_count: '',
    driver: false,
    sales_representative: false,
    car_number: '',
    job: '',
    date_of_appointment: '',
    employee_manager: '',
    employee_id: '',
    job_title: '',
    category: '',
    sallery: '',
    billing_rate: '',
    monthly_discount: '',
    currency: '$ USD',
    notes: '',
    attachments: []
});

const errorMsg = ref(null);
const successMsg = ref(null);

const saveForm = async () => {
    errorMsg.value = null;
    successMsg.value = null;

    const formData = new FormData();

    // إضافة جميع الحقول من reactive form
    for (const key in form) {
        if (key === 'attachments') {
            form.attachments.forEach(file => formData.append('attachments[]', file));
        } else if (typeof form[key] === 'boolean') {
            formData.append(key, form[key] ? 1 : 0); // تحويل البوليان إلى 1/0
        } else {
            formData.append(key, form[key]);
        }
    }

    try {
        const token = localStorage.getItem('authToken');
        await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/employees`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        Swal.fire({
            icon: 'success',
            title: t('messages.saved_title'),
            text: t('messages.employee_saved_successfully'),
            timer: 2000,
            showConfirmButton: false
        });

        successMsg.value = t('messages.employee_saved_successfully');
        router.push('/admin/employees');

    } catch (error) {
        console.error(error);
        errorMsg.value = error.response?.data?.message || t('messages.error_occurred');
        Swal.fire('خطأ', errorMsg.value, 'error');
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
        if (result.isConfirmed) {
            router.push('/admin/employees');
        }
    });
};
</script>


<style>
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
