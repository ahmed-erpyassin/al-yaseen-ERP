<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-person-plus"></i> {{ $t('aside.Add Customer') || 'إضافة عميل جديد' }}</h1>

        <!-- ✅ أزرار الإجراءات -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') || 'إلغاء' }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ $t('buttons.save') || 'حفظ' }}
            </button>
        </div>

        <!-- ✅ نموذج العميل -->
        <form class="form">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>{{ $t('label.customer_information') || 'بيانات العميل' }}</h3>
                </div>

                <!-- نوع العميل -->
                <div class="col-md-3 mb-3">
                    <label class="form-label d-block">{{ $t('label.client_type') || 'نوع العميل' }}</label>
                    <div class="d-flex">
                        <div class="form-check me-3">
                            <input class="form-check-input" type="radio" id="personal" value="personal"
                                v-model="form.client_type" />
                            <label class="form-check-label" for="personal">{{ $t('label.personal') || 'فردي' }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="business" value="business"
                                v-model="form.client_type" />
                            <label class="form-check-label" for="business">{{ $t('label.business') || 'تجاري' }}</label>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.customer_number') || 'رقم العميل' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.customer_number" />
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.company_name') || 'اسم الشركة (الاسم التجاري)' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.company_name" required />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.first_name') || 'الاسم الأول' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.first_name" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.second_name') || 'الاسم الثاني' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.second_name" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.mobile') || 'الجوال' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.mobile" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.phone') || 'الهاتف' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.phone" />
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.address_one') || 'عنوان الشارع 1' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.address_one" />
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.address_two') || 'عنوان الشارع 2' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.address_two" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.city') || 'المدينة' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.city" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.state') || 'المنطقة' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.state" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.postal_code') || 'الرمز البريدي' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.postal_code" />
                </div>

                <div class="col-md-3 mb-3">
                    <label class="form-label">{{ $t('label.licensed_operator') || 'المشغل المرخص' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.licensed_operator" />
                </div>
            </div>

            <!-- بيانات الحساب -->
            <div class="row mt-5">
                <div class="col-12 mb-3">
                    <h3>{{ $t('label.account_information') || 'بيانات الحساب' }}</h3>
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.code') || 'رقم الكود' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.code" required />
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.barcode_type') || 'نوع الباركود' }}</label>
                    <select class="form-select rounded-1" v-model="form.barcode_type">
                        <option value="">اختر نوع الباركود</option>
                        <option value="EAN13">EAN-13</option>
                        <option value="CODE128">Code 128</option>
                        <option value="QR">QR Code</option>
                        <option value="UPC">UPC</option>
                    </select>
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.invoice_type') || 'طريقة الفاتورة' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.invoice_type" />
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">{{ $t('label.email') || 'البريد الإلكتروني' }}</label>
                    <input type="email" class="form-control rounded-1" v-model="form.email" />
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label">{{ $t('label.category') || 'التصنيف' }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.category" />
                </div>

                <div class="col-12 mb-3">
                    <label class="form-label">{{ $t('label.notes') || 'الملاحظات' }}</label>
                    <textarea class="form-control rounded-1" rows="3" v-model="form.notes"></textarea>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// ✅ بيانات النموذج
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
    client_type: 'personal',
    barcode_type: ''
})

// ✅ حفظ العميل الجديد
const saveForm = async () => {
    try {
        // 🔹 استدعاء الأكشن الصحيح من Vuex
        await store.dispatch('customer/createCustomer', form)

        Swal.fire({
            icon: 'success',
            title: 'تم الحفظ بنجاح',
            text: 'تم إنشاء العميل الجديد بنجاح',
            timer: 2000,
            showConfirmButton: false
        })

        // 🔹 الانتقال إلى صفحة العملاء بعد الحفظ
        router.push({ name: 'admin.customers' })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ أثناء الحفظ',
            text: error.response?.data?.message || 'فشل إنشاء العميل'
        })
    }
}

// ✅ إلغاء وإنهاء النموذج
const cancelForm = () => {
    router.push({ name: 'admin.customers' })
}
</script>



<style>
.container {
    max-width: 900px;
}
</style>
