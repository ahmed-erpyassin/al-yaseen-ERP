<template>

    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ $t('buttons.save') }}
            </button>
        </div>
        <form class="form">
            <div class="row mt-5">
                <h3 class="mb-5">{{ $t('label.banks') }}</h3>

                <!-- Bank -->
                <div class="col-md-4">
                    <div class="row">
                        <h5 class="mb-3">{{ $t('label.bank') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" class="form-control rounded-1" v-model="formData.bank.from" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" class="form-control rounded-1" v-model="formData.bank.to" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Branch -->
                <div class="col-md-4">
                    <div class="row">
                        <h5 class="mb-3">{{ $t('label.branch') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" class="form-control rounded-1" v-model="formData.branch.from" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" class="form-control rounded-1" v-model="formData.branch.to" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Address & Contact -->
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.address') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.address" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.po_box') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.po_box" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.email') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.email" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.website') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.website" />
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.mobile') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.mobile" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.fax_number') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.fax_number" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('SWIFT code') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.swift_code" />
                    </div>
                </div>

                <!-- Other Info -->
                <h3 class="mb-5">{{ $t('label.other_info') }}</h3>
                <div class="col-md-8">
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.general_manager') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.general_manager" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.chairman') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.chairman" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.special_alert') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.special_alert" />
                    </div>
                    <div class="mb-3 position-relative">
                        <label class="form-label">{{ $t('label.check_cash_days') }}</label>
                        <input type="text" class="form-control rounded-1" v-model="formData.check_cash_days" />
                    </div>
                </div>
            </div>
        </form>

    </div>

</template>

<script>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { reactive, onMounted } from 'vue'

export default {
    setup() {
        const router = useRouter()
        const { t } = useI18n()

        // Reactive form object
        const formData = reactive({
            bank: { from: '', to: '' },
            branch: { from: '', to: '' },
            address: '',
            po_box: '',
            mobile: '',
            fax_number: '',
            email: '',
            website: '',
            swift_code: '',
            general_manager: '',
            chairman: '',
            special_alert: '',
            check_cash_days: ''
        })

        // Example: Load existing data (replace with actual API call)
        onMounted(() => {
            // fetchBankData().then(data => Object.assign(formData, data))
            formData.bank.from = 'Bank A'
            formData.bank.to = 'Bank B'
            formData.branch.from = 'Main Branch'
            formData.branch.to = 'Secondary Branch'
            formData.address = '123 Street'
            formData.mobile = '0591234567'
            formData.email = 'example@bank.com'
            formData.swift_code = 'ABCDEF123'
            formData.general_manager = 'John Doe'
        })

        // Save Form
        const saveForm = () => {
            // Example: Replace with API call
            console.log('Saving form data:', JSON.stringify(formData, null, 2))

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
                    router.push('/admin/banks') // عدل المسار حسب المطلوب
                }
            })
        }

        return {
            formData,
            saveForm,
            cancelForm,
            t
        }
    }
}
</script>
