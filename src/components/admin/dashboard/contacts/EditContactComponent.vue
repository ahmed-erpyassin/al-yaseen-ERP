<template>
    <div class="container pe-5 ps-5">
        <h1>
            <i class="bi bi-person-lines-fill"></i>
            {{ isEditMode ? t('label.edit_contact') : t('label.add_contact') }}
        </h1>

        <!-- Action Buttons -->
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="cancelForm">
                {{ t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="saveForm">
                {{ t('buttons.save') }}
            </button>
        </div>

        <!-- Contact Form -->
        <form class="form">
            <div class="row g-4">
                <div class="col-md-4">
                    <label for="name" class="form-label">{{ t('label.name') }}</label>
                    <input type="text" id="name" v-model="contact.name" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="statement" class="form-label">{{ t('label.statement') }}</label>
                    <input type="text" id="statement" v-model="contact.statement" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="address" class="form-label">{{ t('label.address') }}</label>
                    <input type="text" id="address" v-model="contact.address" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="phone" class="form-label">{{ t('label.phone') }}</label>
                    <input type="text" id="phone" v-model="contact.phone" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="mobile" class="form-label">{{ t('label.mobile') }}</label>
                    <input type="text" id="mobile" v-model="contact.mobile" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="email" class="form-label">{{ t('label.email') }}</label>
                    <input type="email" id="email" v-model="contact.email" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="notes" class="form-label">{{ t('label.notes') }}</label>
                    <input type="text" id="notes" v-model="contact.notes" class="form-control rounded-1" />
                </div>

                <div class="col-md-4">
                    <label for="category" class="form-label">{{ t('label.category') }}</label>
                    <select id="category" v-model="contact.category" class="form-control rounded-1">
                        <option value="customer">{{ t('label.customer') }}</option>
                        <option value="employee">{{ t('label.employee') }}</option>
                        <option value="supplier">{{ t('label.supplier') }}</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <label for="fax_number" class="form-label">{{ t('label.fax_number') }}</label>
                    <input type="text" id="fax_number" v-model="contact.fax_number" class="form-control rounded-1" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const { t } = useI18n();

        // Determine if this is edit mode
        const isEditMode = computed(() => !!route.params.id);

        // Reactive contact object
        const contact = reactive({
            name: '',
            statement: '',
            address: '',
            phone: '',
            mobile: '',
            email: '',
            notes: '',
            category: 'customer',
            fax_number: ''
        });

        // Load contact if editing
        const loadContact = () => {
            // Replace with API call to fetch the contact by ID
            // Example data for demonstration:
            const existingContact = {
                name: 'John Doe',
                statement: 'VIP Client',
                address: 'Gaza',
                phone: '0591234567',
                mobile: '0597654321',
                email: 'john@example.com',
                notes: 'Important contact',
                category: 'customer',
                fax_number: '08-123456'
            };
            Object.assign(contact, existingContact);
        };

        onMounted(() => {
            if (isEditMode.value) {
                loadContact(route.params.id);
            }
        });

        // Save or update form
        const saveForm = () => {
            if (isEditMode.value) {
                console.log('Updating contact:', contact);
            } else {
                console.log('Creating new contact:', contact);
            }

            Swal.fire({
                icon: 'success',
                title: t('messages.saved_title'),
                text: t('messages.saved_text'),
                timer: 2000,
                showConfirmButton: false
            });
        };

        // Cancel form
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
                    router.push('/admin/contacts');
                }
            });
        };

        return { contact, saveForm, cancelForm, t, isEditMode };
    }
};
</script>

<style>
.form-label {
    font-weight: 500;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.btn-outline-secondary {
    border-radius: 4px;
}
</style>
