<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <!-- Form -->
        <form class="form">
            <div class="row">
                <!-- Warehouse Information Section -->
                <div class="col-12 mb-4">
                    <h3>{{ $t('label.warehouse_info') }}</h3>
                </div>

                <div class="col-md-2 mb-4">
                    <label for="warehouse_number" class="form-label">{{ $t('label.warehouse_number') }}</label>
                    <input type="text" id="warehouse_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-2 mb-4">
                    <label for="information" class="form-label">{{ $t('label.information') }}</label>
                    <input type="text" id="information" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="warehousekeeper" class="form-label">{{ $t('label.warehousekeeper_employee_number')
                        }}</label>
                    <input type="text" id="warehousekeeper" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="warehousekeeper_employee_name" class="form-label">{{
                        $t('label.warehousekeeper_employee_name') }}</label>
                    <input type="text" id="warehousekeeper_employee_name" class="form-control rounded-1" />
                </div>

                <div class="col-md-3 mb-4">
                    <label for="mobile_number" class="form-label">{{ $t('label.mobile_number') }}</label>
                    <input type="text" id="mobile_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-3 mb-4">
                    <label for="fax_number" class="form-label">{{ $t('label.fax_number') }}</label>
                    <input type="text" id="fax_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-3 mb-4">
                    <label for="address" class="form-label">{{ $t('label.address') }}</label>
                    <input type="text" id="address" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="category_number" class="form-label">{{ $t('label.category_number') }}</label>
                    <input type="text" id="category_number" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="category_name" class="form-label">{{ $t('label.category_name') }}</label>
                    <input type="text" id="category_name" class="form-control rounded-1" />
                </div>

                <!-- Accounts -->
                <div class="col-md-4 mb-4">
                    <label for="sale_account" class="form-label">{{ $t('label.sale_account') }}</label>
                    <input type="text" id="sale_account" class="form-control rounded-1" />
                </div>

                <div class="col-md-4 mb-4">
                    <label for="buy_account" class="form-label">{{ $t('label.buy_account') }}</label>
                    <input type="text" id="buy_account" class="form-control rounded-1" />
                </div>

                <!-- Stock Evaluation -->
                <div class="col-12 mt-4 mb-3">
                    <h3>{{ $t('label.how_to_evaluate_stock') }}</h3>
                </div>

                <div class="col-12">
                    <div class="form-check mb-2">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="remember1" />
                        <label class="form-check-label" for="remember1">{{ $t('label.evaluation_method.natural')
                            }}</label>
                    </div>

                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember2" />
                        <label class="form-check-label" for="remember2">{{ $t('label.evaluation_method.no_value')
                            }}</label>
                    </div>

                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember3" />
                        <label class="form-check-label" for="remember3">{{
                            $t('label.evaluation_method.first_purchase_price') }}</label>
                    </div>

                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember4" />
                        <label class="form-check-label" for="remember4">{{
                            $t('label.evaluation_method.second_purchase_price') }}</label>
                    </div>

                    <div class="form-check mb-4">
                        <input type="checkbox" class="form-check-input rounded-circle" id="remember5" />
                        <label class="form-check-label" for="remember5">{{
                            $t('label.evaluation_method.third_purchase_price') }}</label>
                    </div>
                </div>

                <!-- Attachments -->
                <div class="col-md-12 mb-4">
                    <label for="attachments" class="form-label">{{ $t('label.attachments') }}</label>
                    <div class="box-attachments d-flex align-items-center justify-content-center">
                        <div class="text-center">
                            <i class="bi bi-image"></i>
                            <p class="small">{{ $t('label.attachment_note') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// Save Form
const saveForm = () => {
    Swal.fire({
        icon: 'success',
        title: t('messages.saved_title'),
        text: t('messages.saved_text'),
        timer: 2000,
        showConfirmButton: false
    })
}

// Cancel Form
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
            router.push('/admin/warehouses') // تعديل الرابط حسب المسار المطلوب
        }
    })
}
</script>
