<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-pencil-square"></i> {{ $t('label.edit_customer') }}</h1>
        <form class="form" @submit.prevent="handleSubmit">
            <!-- Loading Message -->
            <div class="alert alert-info" v-if="!dataLoaded && loading">{{ $t('label.loading') }}...</div>
            
            <!-- General Error Message -->
            <div class="alert alert-danger" v-if="errorMsg">{{ errorMsg }}</div>
            
            <!-- Success Message -->
            <div class="alert alert-success" v-if="successMsg">{{ successMsg }}</div>
        
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="handleCancel">{{ $t('buttons.cancel') }}</button>
            <button type="submit" class="btn btn-lg btn-success" :disabled="loading" @click="handleSubmit">
                {{ loading ? $t('label.updating') : $t('buttons.update') }}
            </button>
        </div>

        <div class="row">
            <div class="col-md-3">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="customer_number" class="form-label">{{ $t('label.customer_number') }}</label>

                        <input type="text" id="customer_number" class="form-control rounded-1" 
                               v-model="form.customer_number" maxlength="50"
                               :class="{ 'is-invalid': errors.customer_number }" />
                        <div v-if="errors.customer_number" class="invalid-feedback">{{ errors.customer_number[0] }}</div>

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
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="first_name" class="form-label">{{ $t('label.first_name') }}</label>

                        <input type="text" id="first_name" class="form-control rounded-1" 
                               v-model="form.first_name" maxlength="100" :class="{ 'is-invalid': errors.first_name }" />
                        <div v-if="errors.first_name" class="invalid-feedback">{{ errors.first_name[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="second_name" class="form-label">{{ $t('label.last_name') }}</label>

                        <input type="text" id="second_name" class="form-control rounded-1" 
                               v-model="form.second_name" maxlength="100" :class="{ 'is-invalid': errors.second_name }" />
                        <div v-if="errors.second_name" class="invalid-feedback">{{ errors.second_name[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="contact_name" class="form-label">{{ $t('label.contact_name') }}</label>

                        <input type="text" id="contact_name" class="form-control rounded-1" v-model="form.contact_name" 
                               maxlength="100" :class="{ 'is-invalid': errors.contact_name }" />
                        <div v-if="errors.contact_name" class="invalid-feedback">{{ errors.contact_name[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="mobile" class="form-label">{{ $t('label.mobile') }}</label>

                        <input type="text" id="mobile" class="form-control rounded-1" 
                               v-model="form.mobile" maxlength="50" :class="{ 'is-invalid': errors.mobile }" />
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
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="address_one" class="form-label">{{ $t('label.address_1') }}</label>

                        <input type="text" id="address_one" class="form-control rounded-1" v-model="form.address_one" 
                               maxlength="255" :class="{ 'is-invalid': errors.address_one }" />
                        <div v-if="errors.address_one" class="invalid-feedback">{{ errors.address_one[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="address_two" class="form-label">{{ $t('label.address_2') }}</label>

                        <input type="text" id="address_two" class="form-control rounded-1" v-model="form.address_two" 
                               maxlength="255" :class="{ 'is-invalid': errors.address_two }" />
                        <div v-if="errors.address_two" class="invalid-feedback">{{ errors.address_two[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="city_id" class="form-label">{{ $t('label.city') }}</label>

                        <input type="text" id="city_id" class="form-control rounded-1" v-model="form.city_id" 
                               :class="{ 'is-invalid': errors.city_id }" />
                        <div v-if="errors.city_id" class="invalid-feedback">{{ errors.city_id[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="region_id" class="form-label">{{ $t('label.state') }}</label>

                        <input type="text" id="region_id" class="form-control rounded-1" v-model="form.region_id" 
                               :class="{ 'is-invalid': errors.region_id }" />
                        <div v-if="errors.region_id" class="invalid-feedback">{{ errors.region_id[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="postal_code" class="form-label">{{ $t('label.zip') }}</label>

                        <input type="text" id="postal_code" class="form-control rounded-1" v-model="form.postal_code" 
                               maxlength="20" :class="{ 'is-invalid': errors.postal_code }" />
                        <div v-if="errors.postal_code" class="invalid-feedback">{{ errors.postal_code[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="licensed_operator" class="form-label">{{ $t('label.licensed_operator') }}</label>

                        <input type="text" id="licensed_operator" class="form-control rounded-1" v-model="form.licensed_operator" 
                               maxlength="255" :class="{ 'is-invalid': errors.licensed_operator }" />
                        <div v-if="errors.licensed_operator" class="invalid-feedback">{{ errors.licensed_operator[0] }}</div>

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

                        <input type="text" id="invoice_type" class="form-control rounded-1" v-model="form.invoice_type" 
                               maxlength="100" :class="{ 'is-invalid': errors.invoice_type }" />
                        <div v-if="errors.invoice_type" class="invalid-feedback">{{ errors.invoice_type[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="category" class="form-label">{{ $t('label.category') }}</label>

                        <input type="text" id="category" class="form-control rounded-1" v-model="form.category" 
                               maxlength="100" :class="{ 'is-invalid': errors.category }" />
                        <div v-if="errors.category" class="invalid-feedback">{{ errors.category[0] }}</div>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="currency_id" class="form-label">{{ $t('label.select_currency') }}</label>
                        <VueSelect v-model="form.currency_id" 
                                   :options="currencies" 
                                   :label="locale === 'ar' ? 'name_ar' : 'name_en'" 
                                   :reduce="currency => currency.id" 
                                   :placeholder="$t('label.select_currency')"
                                   :dir="locale === 'ar' ? 'rtl' : 'ltr'"
                                   :class="{ 'rtl-select': locale === 'ar' }" />
                        <div v-if="errors.currency_id" class="invalid-feedback">{{ errors.currency_id[0] }}</div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ $t('label.notes') }}</label>

                        <textarea name="notes" id="notes" rows="3" class="form-control" v-model="form.notes"
                                  maxlength="500" :class="{ 'is-invalid': errors.notes }"></textarea>
                        <div v-if="errors.notes" class="invalid-feedback">{{ errors.notes[0] }}</div>

                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
<<<<<<< HEAD
import Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
=======
import VueSelect from 'vue-select';
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
import LoadingComponent from '@/components/components/LoadingComponent.vue';

export default {
    name: 'EditCustomerComponent',
    // eslint-disable-next-line vue/no-unused-components
<<<<<<< HEAD
    components: { Select, LoadingComponent },
=======
    components: { VueSelect, LoadingComponent },
>>>>>>> 5e25639469de159d12b434d70cc5162e896419f7
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
            dataLoaded: false,
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
        ...mapGetters('customer', ['loading', 'error']),
        locale() {
            return this.$i18n.locale;
        }
    },
    async mounted() {
        // Load customer data for editing
        const customerId = this.$route.params.id;
        if (customerId) {
            await this.loadCustomer(customerId);
        }
    },
    methods: {
        ...mapActions('customer', [
            'updateCustomer'
        ]),
        
        async loadCustomer(customerId) {
            this.isLoading = true; // Start loading
            try {
                console.log('Loading customer with ID:', customerId);
                // Since backend doesn't have GET /customers/{id}, we'll get from the customers list
                await this.$store.dispatch('customer/fetchCustomers');
                const customers = this.$store.getters['customer/customers'];
                const customer = customers.find(c => c.id == customerId);
                console.log('Found customer data:', customer);
                if (customer) {
                    // Populate form with customer data
                    this.form = {
                        ...this.form,
                        ...customer,
                        currency_id: customer.currency_id || 1
                    };
                    this.dataLoaded = true;
                    console.log('Form populated with:', this.form);
                } else {
                    this.errorMsg = this.$t('messages.customer_not_found') || 'Customer not found.';
                }
            } catch (error) {
                console.error('Failed to load customer:', error);
                this.errorMsg = this.$t('messages.customer_load_failed') || 'Failed to load customer data.';
            } finally {
                this.isLoading = false; // Stop loading
            }
        },
        
        async handleSubmit() {
            this.errors = {};
            this.errorMsg = null;
            this.successMsg = null;
            this.isLoading = true; // Start loading
            
            try {
                const customerId = this.$route.params.id;
                await this.updateCustomer({ id: customerId, ...this.form });
                this.successMsg = this.$t('messages.customer_updated_successfully');
                
                // Redirect after showing success message for 2 seconds
                setTimeout(() => {
                    this.$router.push({ name: 'admin.customers' });
                }, 2000);
            } catch (error) {
                console.error('Failed to update customer:', error);
                
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else if (error.response && error.response.status === 401) {
                    this.errorMsg = error.response.data.message;
                } else if (error.response && error.response.data && error.response.data.message) {
                    this.errorMsg = error.response.data.message;
                } else {
                    this.errorMsg = this.$t('messages.customer_update_failed') || 'Failed to update customer. Please try again.';
                }
            } finally {
                this.isLoading = false; // Stop loading
            }
        },
        
        handleCancel() {
            this.$router.push({ name: 'admin.customers' });
        }
    }
};
</script>

<style scoped>
/* Vue Select RTL Support */
.rtl-select .vs__dropdown-toggle {
    direction: rtl;
    text-align: right;
}

.rtl-select .vs__selected-options {
    direction: rtl;
    text-align: right;
}

.rtl-select .vs__search {
    direction: rtl;
    text-align: right;
}

.rtl-select .vs__dropdown-menu {
    direction: rtl;
    text-align: right;
}

.rtl-select .vs__dropdown-option {
    direction: rtl;
    text-align: right;
}

.rtl-select .vs__clear {
    right: auto;
    left: 8px;
}

.rtl-select .vs__open-indicator {
    right: auto;
    left: 8px;
}
</style>
