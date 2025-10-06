<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-building"></i> {{ t('buttons.add_branch') }}</h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ t('buttons.save') }}
            </button>
        </div>

        <!-- Form -->
        <form class="form">
            <div class="row g-3 mt-3">
                <!-- Branch Information -->
                <div class="col-md-6">
                    <label class="form-label">{{ t('label.branch_name') }}</label>
                    <input type="text" v-model="branch.name" class="form-control rounded-1" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">{{ t('label.manager') }}</label>
                    <input type="text" v-model="branch.manager" class="form-control rounded-1" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">{{ t('label.currency') }}</label>
                    <input type="text" v-model="branch.currency" class="form-control rounded-1" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">{{ t('label.city') }}</label>
                    <input type="text" v-model="branch.city" class="form-control rounded-1" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">{{ t('label.country') }}</label>
                    <input type="text" v-model="branch.country" class="form-control rounded-1" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">{{ t('label.status') }}</label>
                    <select v-model="branch.status" class="form-select rounded-1">
                        <option value="active">{{ t('label.active') }}</option>
                        <option value="inactive">{{ t('label.inactive') }}</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const branch = reactive({
    name: '',
    manager: '',
    currency: '',
    city: '',
    country: '',
    status: 'active'
})

const saveForm = () => {
    Swal.fire({
        icon: 'success',
        title: t('messages.saved_title'),
        text: t('messages.saved_text'),
        timer: 1500,
        showConfirmButton: false
    })
    router.push({ name: 'admin.branches' })
}

const cancelForm = () => {
    Swal.fire({
        title: t('messages.cancel_title'),
        text: t('messages.cancel_text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t('buttons.yes_cancel'),
        cancelButtonText: t('buttons.no')
    }).then(result => {
        if (result.isConfirmed) router.push({ name: 'admin.branches' })
    })
}
</script>

<style scoped>
.form-control.rounded-1,
.form-select.rounded-1 {
    border-radius: 0.25rem;
    box-shadow: none !important;
}

.btn-outline-secondary {
    border-radius: 0.25rem;
}
</style>
