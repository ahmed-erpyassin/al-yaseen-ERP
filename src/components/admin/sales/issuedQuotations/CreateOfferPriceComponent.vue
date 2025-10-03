<template>
    <div class="container pe-5 ps-5">
        <LoadingComponent :isLoading="quotationsLoading || customersLoading || isUpdating" />

        <!-- Success Message -->
        <div v-if="successMsg" class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle me-2"></i>
            {{ successMsg }}
            <button type="button" class="btn-close" @click="successMsg = null"></button>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ errorMsg }}
            <button type="button" class="btn-close" @click="errorMsg = null"></button>
        </div>

        <h1><i class="bi bi-image"></i> {{ $t('label.new_price_offer') }}</h1>
        <div class="d-flex align-items-center justify-content-end mb-4">
            <button type="button" class="btn btn-lg btn-outline-secondary me-3" @click="handleCancel">
                {{ $t('buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-lg btn-success" @click="handleSave">
                {{ $t('buttons.save') }}
            </button>
        </div>

        <form class="form">
            <!-- General error message -->
            <div v-if="errorMsg" class="alert alert-danger mb-3">
                {{ errorMsg }}
            </div>
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.new_price_offer') }}</h3>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="journal_number" class="form-label">{{ $t('label.journal_number') }}</label>

                            <input type="text" id="journal_number" class="form-control rounded-1"
                                v-model="form.journal_number" />

                            <div v-if="errors.journal_number" class="text-danger small mt-1">
                                {{ errors.journal_number[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="invoice_number" class="form-label">{{ $t('label.invoice_number') }}</label>

                            <input type="text" id="invoice_number" class="form-control rounded-1"
                                v-model="form.invoice_number" />

                            <div v-if="errors.invoice_number" class="text-danger small mt-1">
                                {{ errors.invoice_number[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="date" class="form-label">{{ $t('label.date') }}</label>

                            <input type="date" id="date" class="form-control rounded-1" v-model="form.date" />

                            <div v-if="errors.date" class="text-danger small mt-1">
                                {{ errors.date[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="time" class="form-label">{{ $t('label.hour') }}</label>

                            <input type="time" id="time" class="form-control rounded-1" v-model="form.time" step="1" />

                            <div v-if="errors.time" class="text-danger small mt-1">
                                {{ errors.time[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="due_date" class="form-label">{{ $t('label.due_date') }}</label>

                            <input type="date" id="due_date" class="form-control rounded-1" v-model="form.due_date" />

                            <div v-if="errors.due_date" class="text-danger small mt-1">
                                {{ errors.due_date[0] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="customer_id" class="form-label">{{ $t('label.customer_no') }}</label>

                            <VueSelect v-model="form.customer_id" :options="customers" :reduce="customer => customer.id"
                                :get-option-label="customer => `${customer.customer_number} - (${customer.first_name} ${customer.second_name})`"
                                :placeholder="$t('label.search_for_customer')" :loading="loading" :clearable="true"
                                :searchable="true" />

                            <div v-if="errors.customer_id" class="text-danger small mt-1">
                                {{ errors.customer_id[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="name" class="form-label">{{ $t('label.name') }}</label>

                            <input type="text" id="name" class="form-control rounded-1" v-model="form.customer_name" />

                            <div v-if="errors.name" class="text-danger small mt-1">
                                {{ errors.name[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="email" class="form-label">{{ $t('label.email') }}</label>

                            <input type="text" id="email" class="form-control rounded-1"
                                v-model="form.customer_email" />

                            <div v-if="errors.email" class="text-danger small mt-1">
                                {{ errors.email[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="licensed_operator" class="form-label">{{ $t('label.licensed_operator')
                            }}</label>

                            <input type="text" id="licensed_operator" class="form-control rounded-1"
                                v-model="form.licensed_operator" />

                            <div v-if="errors.licensed_operator" class="text-danger small mt-1">
                                {{ errors.licensed_operator[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('label.currency') }}</label>

                            <VueSelect v-model="form.currency_id" :options="currencies"
                                :reduce="currency => currency.id"
                                :get-option-label="currency => `${currency.name} (${currency.code})`"
                                :placeholder="$t('label.currency')" :clearable="true" :searchable="true" />

                            <div v-if="errors.currency_id" class="text-danger small mt-1">
                                {{ errors.currency_id[0] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency_price" class="form-label">{{ $t('label.currency_price') }}</label>

                            <input type="text" id="currency_price" class="form-control rounded-1"
                                v-model="form.exchange_rate" />

                            <div v-if="errors.currency_price" class="text-danger small mt-1">
                                {{ errors.currency_price[0] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="mb-5">{{ $t('label.offer_information') }}</h3>

            <div class="table-responsive">
                <table class="table table-bordered text-center align-middle">
                    <thead class="header">
                        <tr>
                            <th>#</th>
                            <th>{{ $t('label.offer_no') }}</th>
                            <th>Item ID</th>
                            <th>{{ $t('label.offer_information') }}</th>
                            <th>{{ $t('label.quantity') }}</th>
                            <th>{{ $t('label.price') }}</th>
                            <th>Discount %</th>
                            <th>Tax %</th>
                            <th>{{ $t('label.total') }}</th>
                            <th>{{ $t('label.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody form">
                        <tr v-for="row in offerRows" :key="row.id">
                            <td>{{ row.id }}</td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.number"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.item_id"
                                    placeholder="Item ID"></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="row.description"
                                    placeholder="Description"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.quantity"
                                    @input="calculateTotal(row)" step="0.0001" min="0.0001"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.unit_price"
                                    @input="calculateTotal(row)" step="0.01" min="0"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.discount_rate"
                                    @input="calculateTotal(row)" step="0.01" min="0" max="100"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.tax_rate"
                                    @input="calculateTotal(row)" step="0.01" min="0" max="100"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.total"
                                    readonly step="0.0001"></td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="removeRow(row.id)"
                                    :disabled="offerRows.length <= 1">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <!-- Items array validation errors -->
            <div v-if="errors.items" class="text-danger small mt-2">
                {{ errors.items[0] }}
            </div>
            <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-action" @click="addRow">{{ $t('label.add_row') }}</button>
                <button type="button" class="btn btn-action" @click="removeRow(offerRows[offerRows.length - 1].id)"
                    :disabled="offerRows.length <= 1">{{ $t('label.remove_row') }}</button>
            </div>
            <div class="col-md-9 mt-5">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="notes" class="form-label">{{ $t('label.notes') }}</label>

                        <textarea name="notes" id="notes" rows="3" class="form-control" v-model="form.notes"></textarea>

                        <div v-if="errors.notes" class="text-danger small mt-1">
                            {{ errors.notes[0] }}
                        </div>
                    </div>
                </div>
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="attachments" class="form-label">{{ $t('label.attachments') }}</label>

                        <div class="box-attachments d-flex align-items-center justify-content-center">
                            <div class="text-center">

                                <i class="bi bi-image"></i>
                                <p class="small">{{ $t('label.drop_file_here') }}</p>
                            </div>
                        </div>

                        <div v-if="errors.attachments" class="text-danger small mt-1">
                            {{ errors.attachments[0] }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5 justify-content-end">

                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="allowed_discount" class="form-label">{{ $t('label.allowed_discount') }}</label>

                            <input type="text" id="allowed_discount" class="form-control rounded-1"
                                v-model="form.allowed_discount" @input="calculateTotals" />

                            <div v-if="errors.allowed_discount" class="text-danger small mt-1">
                                {{ errors.allowed_discount[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="total_bill_without_tax" class="form-label">{{ $t('label.total_bill_without_tax')
                            }}</label>

                            <input type="text" id="total_bill_without_tax" class="form-control rounded-1"
                                v-model="form.total_without_tax" @input="calculateTotals" />

                            <div v-if="errors.total_bill_without_tax" class="text-danger small mt-1">
                                {{ errors.total_bill_without_tax[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="item mb-4">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3 position-relative">
                                    <label for="ratio_percent" class="form-label">{{ $t('label.ratio_percent')
                                    }}</label>

                                    <input type="text" id="ratio_percent" class="form-control rounded-1"
                                        v-model="form.tax_percentage" @input="calculateTotals" />

                                    <div v-if="errors.ratio_percent" class="text-danger small mt-1">
                                        {{ errors.ratio_percent[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="mb-3 position-relative">
                                    <label for="vat" class="form-label">{{ $t('label.vat') }}</label>

                                    <input type="text" id="vat" class="form-control rounded-1" v-model="form.tax_amount"
                                        readonly />

                                    <div v-if="errors.vat" class="text-danger small mt-1">
                                        {{ errors.vat[0] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="total_offer_amount" class="form-label">{{ $t('label.total_offer_amount')
                            }}</label>

                            <input type="text" id="total_offer_amount" class="form-control rounded-1"
                                v-model="form.total_amount" readonly />

                            <div v-if="errors.total_offer_amount" class="text-danger small mt-1">
                                {{ errors.total_offer_amount[0] }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingComponent from '@/components/components/LoadingComponent.vue';
import VueSelect from 'vue3-select';

export default {
    name: 'CreateOfferPriceComponent',
    components: {
        LoadingComponent,
        VueSelect
    },
    data() {
        return {
            offerRows: [
                {
                    id: 1,
                    item_id: '',
                    description: '',
                    quantity: '',
                    unit_price: '',
                    discount_rate: 0.00,
                    tax_rate: 5.0,
                    total_foreign: '',
                    total_local: '',
                    total: ''
                }
            ],
            nextRowId: 2,
            form: {
                branch_id: 1,
                currency_id: 1,
                employee_id: 1,
                customer_id: null,
                journal_id: null,
                journal_number: '',
                invoice_number: '',
                time: '',
                due_date: '',
                exchange_rate: 1.0,
                customer_name: '',
                customer_email: '',
                employee_name: '',
                currency_name: '',
                licensed_operator: '',
                date: '',
                hour: '',
                cash_paid: 0.00,
                checks_paid: 0.00,
                allowed_discount: 0.00,
                total_without_tax: 0.00,
                tax_percentage: 5.0,
                tax_amount: 0.00,
                total_amount: 0.00,
                remaining_balance: 0.00,
                total_foreign: 0.00,
                total_local: 0.00,
                notes: ''
            },
            errors: {},
            errorMsg: null,
            successMsg: null,
            isUpdating: false
        }
    },
    computed: {
        ...mapGetters('outgoingQuotations', { quotationsLoading: 'loading', quotationsError: 'error' }),
        ...mapGetters('customer', { customers: 'customers', customersLoading: 'loading' }),
        ...mapGetters('options', ['currencies'])
    },
    async mounted() {
        await this.loadCustomers();
        await this.loadCurrencies();
    },
    watch: {
        'form.customer_id': {
            handler(newCustomerId, oldCustomerId) {
                console.log('Customer ID changed from', oldCustomerId, 'to', newCustomerId);
                this.loadCustomerData(newCustomerId);
            },
            immediate: false
        }
    },
    methods: {
        ...mapActions('outgoingQuotations', ['createOutgoingQuotation']),
        ...mapActions('customer', ['fetchCustomers', 'fetchCustomer']),
        ...mapActions('options', ['getCurrencies']),

        calculateTotals() {
            const totalWithoutTax = parseFloat(this.form.total_without_tax) || 0;
            const allowedDiscount = parseFloat(this.form.allowed_discount) || 0;
            const taxPercentage = parseFloat(this.form.tax_percentage) || 0;

            const afterDiscount = totalWithoutTax - allowedDiscount;
            const taxAmount = afterDiscount * (taxPercentage / 100);
            this.form.tax_amount = taxAmount.toFixed(2);
            this.form.total_amount = (afterDiscount + taxAmount).toFixed(2);
        },
        async loadCustomers() {
            try {
                await this.fetchCustomers();
            } catch (error) {
                console.error('Failed to load customers:', error);
            }
        },

        async loadCurrencies() {
            try {
                await this.getCurrencies();
            } catch (error) {
                console.error('Failed to load currencies:', error);
            }
        },

        async loadCustomerData(customerId) {
            console.log('loadCustomerData called with customerId:', customerId);

            if (!customerId) {
                this.form.customer_name = '';
                this.form.customer_email = '';
                this.form.licensed_operator = '';
                this.form.currency_id = 1;
                return;
            }

            try {
                const response = await this.fetchCustomer(customerId);
                const customer = response.data.data || response;
                this.form.customer_name = `${customer.first_name} ${customer.second_name}`;
                this.form.customer_email = customer.email;
                this.form.licensed_operator = customer.licensed_operator || '';
                this.form.currency_id = customer.currency_id || 1;
            } catch (error) {
                console.error('Failed to load customer data:', error);
                this.form.customer_name = '';
                this.form.customer_email = '';
                this.form.licensed_operator = '';
                this.form.currency_id = 1;
            }
        },

        handleCancel() {
            this.$router.push({ name: 'admin.outgoing-offers' });
        },

        async handleSave() {
            try {
                this.errors = {};
                this.errorMsg = null;
                this.successMsg = null;
                this.isUpdating = true;

                const totalAmount = this.offerRows.reduce((sum, row) => {
                    return sum + (parseFloat(row.total) || 0);
                }, 0);

                const quotationData = {
                    branch_id: parseInt(this.form.branch_id),
                    currency_id: parseInt(this.form.currency_id),
                    employee_id: parseInt(this.form.employee_id),
                    customer_id: parseInt(this.form.customer_id),
                    journal_id: this.form.journal_id ? parseInt(this.form.journal_id) : null,
                    journal_number: parseInt(this.form.journal_number),
                    invoice_number: this.form.invoice_number,
                    time: this.form.time,
                    due_date: this.form.due_date,
                    exchange_rate: parseFloat(this.form.exchange_rate),
                    cash_paid: parseFloat(this.form.cash_paid) || 0.00,
                    checks_paid: parseFloat(this.form.checks_paid) || 0.00,
                    allowed_discount: parseFloat(this.form.allowed_discount) || 0.00,
                    total_without_tax: parseFloat(this.form.total_without_tax) || totalAmount,
                    tax_percentage: parseFloat(this.form.tax_percentage) || 5.0,
                    tax_amount: parseFloat(this.form.tax_amount) || (totalAmount * 0.05),
                    total_amount: parseFloat(this.form.total_amount) || totalAmount,
                    remaining_balance: parseFloat(this.form.remaining_balance) || totalAmount,
                    total_foreign: parseFloat(this.form.total_foreign) || totalAmount,
                    total_local: parseFloat(this.form.total_local) || totalAmount,
                    notes: this.form.notes || '',
                    items: this.offerRows.map(row => ({
                        item_id: parseInt(row.item_id),
                        description: row.description,
                        quantity: parseFloat(row.quantity),
                        unit_price: parseFloat(row.unit_price),
                        discount_rate: parseFloat(row.discount_rate) || 0.00,
                        tax_rate: parseFloat(row.tax_rate) || 5.0,
                        total_foreign: parseFloat(row.total_foreign) || parseFloat(row.total) || 0.00,
                        total_local: parseFloat(row.total_local) || parseFloat(row.total) || 0.00,
                        total: parseFloat(row.total) || 0.00
                    }))
                };

                await this.createOutgoingQuotation(quotationData);
                this.successMsg = this.$t('messages.quotation_created_successfully') || 'تم إنشاء العرض بنجاح';
                setTimeout(() => {
                    this.$router.push({ name: 'admin.outgoing-offers' });
                }, 2000);
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors || {};
                } else {
                    this.errorMsg = error.response?.data?.message || this.$t('messages.quotation_creation_failed');
                }
                this.errorMsg = this.errorMsg || 'فشل في إنشاء العرض. يرجى المحاولة مرة أخرى.';
            } finally {
                this.isUpdating = false;
            }
        },

        addRow() {
            this.offerRows.push({
                id: this.nextRowId++,
                item_id: '',
                description: '',
                quantity: '',
                unit_price: '',
                discount_rate: 0.00,
                tax_rate: 5.0,
                total_foreign: '',
                total_local: '',
                total: ''
            });
        },

        removeRow(rowId) {
            if (this.offerRows.length > 1) {
                this.offerRows = this.offerRows.filter(row => row.id !== rowId);
            }
        },

        calculateTotal(row) {
            const quantity = parseFloat(row.quantity) || 0;
            const unitPrice = parseFloat(row.unit_price) || 0;
            const discountRate = parseFloat(row.discount_rate) || 0;
            const taxRate = parseFloat(row.tax_rate) || 0;
            const subtotal = quantity * unitPrice;
            const discountAmount = subtotal * (discountRate / 100);
            const afterDiscount = subtotal - discountAmount;
            const taxAmount = afterDiscount * (taxRate / 100);
            const total = afterDiscount + taxAmount;
            row.total_foreign = total.toFixed(4);
            row.total_local = total.toFixed(4);
            row.total = total.toFixed(4);
        }
    }
}
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.btn-action {
    background-color: #F4FFF0 !important;
}
</style>
