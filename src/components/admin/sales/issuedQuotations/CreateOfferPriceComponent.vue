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

        <h1><i class="bi bi-image"></i> {{ isEditMode ? $t('label.edit_price_offer') : $t('label.new_price_offer') }}
        </h1>
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

            <!-- Basic Info -->
            <div class="row">
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.journal_number') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.journal_number" />
                    <div v-if="errors.journal_number" class="text-danger small mt-1">{{ errors.journal_number[0] }}
                    </div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.invoice_number') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.invoice_number" />
                    <div v-if="errors.invoice_number" class="text-danger small mt-1">{{ errors.invoice_number[0] }}
                    </div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.date') }}</label>
                    <input type="date" class="form-control rounded-1" v-model="form.date" />
                    <div v-if="errors.date" class="text-danger small mt-1">{{ errors.date[0] }}</div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.hour') }}</label>
                    <input type="time" class="form-control rounded-1" v-model="form.time" step="1" />
                    <div v-if="errors.time" class="text-danger small mt-1">{{ errors.time[0] }}</div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.due_date') }}</label>
                    <input type="date" class="form-control rounded-1" v-model="form.due_date" />
                    <div v-if="errors.due_date" class="text-danger small mt-1">{{ errors.due_date[0] }}</div>
                </div>
            </div>

            <!-- Customer Info -->
            <div class="row mb-5">
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.customer_no') }}</label>
                    <VueSelect v-model="form.customer_id" :options="customers" :reduce="c => c.id"
                        :get-option-label="c => `${c.customer_number} - ${c.first_name} ${c.second_name}`"
                        :placeholder="$t('label.search_for_customer')" :loading="customersLoading" :clearable="true" />
                    <div v-if="errors.customer_id" class="text-danger small mt-1">{{ errors.customer_id[0] }}</div>
                </div>
                <div class="col-md-4">
                    <label class="form-label">{{ $t('label.name') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.customer_name" />
                    <div v-if="errors.name" class="text-danger small mt-1">{{ errors.name[0] }}</div>
                </div>
                <div class="col-md-3">
                    <label class="form-label">{{ $t('label.email') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.customer_email" />
                    <div v-if="errors.email" class="text-danger small mt-1">{{ errors.email[0] }}</div>
                </div>
                <div class="col-md-4">
                    <label class="form-label">{{ $t('label.licensed_operator') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.licensed_operator" />
                    <div v-if="errors.licensed_operator" class="text-danger small mt-1">{{ errors.licensed_operator[0]
                        }}</div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.currency') }}</label>
                    <VueSelect v-model="form.currency_id" :options="currencies" :reduce="c => c.id"
                        :get-option-label="c => `${c.name} (${c.code})`" :clearable="true" :searchable="true" />
                    <div v-if="errors.currency_id" class="text-danger small mt-1">{{ errors.currency_id[0] }}</div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.currency_price') }}</label>
                    <input type="text" class="form-control rounded-1" v-model="form.exchange_rate" />
                    <div v-if="errors.currency_price" class="text-danger small mt-1">{{ errors.currency_price[0] }}
                    </div>
                </div>
            </div>

            <!-- Offer Rows -->
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
                    <tbody>
                        <tr v-for="row in offerRows" :key="row.id">
                            <td>{{ row.id }}</td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.number"></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.item_id"
                                    placeholder="Item ID" /></td>
                            <td><input type="text" class="form-control border-0 rounded-0" v-model="row.description"
                                    placeholder="Description" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.quantity"
                                    @input="calculateTotal(row)" step="0.0001" min="0.0001" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.unit_price"
                                    @input="calculateTotal(row)" step="0.01" min="0" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.discount_rate"
                                    @input="calculateTotal(row)" step="0.01" min="0" max="100" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.tax_rate"
                                    @input="calculateTotal(row)" step="0.01" min="0" max="100" /></td>
                            <td><input type="number" class="form-control border-0 rounded-0" v-model="row.total"
                                    readonly step="0.0001" /></td>
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

            <div class="d-flex gap-2 justify-content-end mb-5">
                <button type="button" class="btn btn-action" @click="addRow">{{ $t('label.add_row') }}</button>
                <button type="button" class="btn btn-action" @click="removeRow(offerRows[offerRows.length - 1].id)"
                    :disabled="offerRows.length <= 1">{{ $t('label.remove_row') }}</button>
            </div>

            <!-- Notes and totals -->
            <div class="row">
                <div class="col-md-9">
                    <label>{{ $t('label.notes') }}</label>
                    <textarea class="form-control" rows="3" v-model="form.notes"></textarea>
                </div>
                <div class="col-md-4">
                    <label>{{ $t('label.allowed_discount') }}</label>
                    <input type="text" class="form-control" v-model="form.allowed_discount" @input="calculateTotals" />

                    <label>{{ $t('label.total_bill_without_tax') }}</label>
                    <input type="text" class="form-control" v-model="form.total_without_tax" @input="calculateTotals" />

                    <label>{{ $t('label.ratio_percent') }}</label>
                    <input type="text" class="form-control" v-model="form.tax_percentage" @input="calculateTotals" />

                    <label>{{ $t('label.vat') }}</label>
                    <input type="text" class="form-control" v-model="form.tax_amount" readonly />

                    <label>{{ $t('label.total_offer_amount') }}</label>
                    <input type="text" class="form-control" v-model="form.total_amount" readonly />
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
    components: { LoadingComponent, VueSelect },
    props: { offerId: { type: Number, default: null } },
    data() {
        return {
            offerRows: [],
            nextRowId: 1,
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
                licensed_operator: '',
                date: '',
                hour: '',
                allowed_discount: 0.00,
                total_without_tax: 0.00,
                tax_percentage: 5.0,
                tax_amount: 0.00,
                total_amount: 0.00,
                notes: ''
            },
            errors: {},
            errorMsg: null,
            successMsg: null,
            isUpdating: false
        };
    },
    computed: {
        isEditMode() { return !!this.offerId; },
        ...mapGetters('outgoingQuotations', { quotationsLoading: 'loading' }),
        ...mapGetters('customer', { customers: 'customers', customersLoading: 'loading' }),
        ...mapGetters('options', ['currencies'])
    },
    async mounted() {
        await this.loadCustomers();
        await this.loadCurrencies();
        if (this.isEditMode) {
            await this.loadOffer(this.offerId);
        } else {
            this.addRow(); // row empty by default
        }
    },
    watch: {
        'form.customer_id': {
            handler(newCustomerId) { this.loadCustomerData(newCustomerId); },
            immediate: false
        }
    },
    methods: {
        ...mapActions('outgoingQuotations', ['createOutgoingQuotation', 'fetchQuotation']),
        ...mapActions('customer', ['fetchCustomers', 'fetchCustomer']),
        ...mapActions('options', ['getCurrencies']),

        async loadCustomers() { await this.fetchCustomers(); },
        async loadCurrencies() { await this.getCurrencies(); },

        async loadCustomerData(customerId) {
            if (!customerId) { this.form.customer_name = ''; this.form.customer_email = ''; this.form.licensed_operator = ''; this.form.currency_id = 1; return; }
            try {
                const res = await this.fetchCustomer(customerId);
                const c = res.data.data || res;
                this.form.customer_name = `${c.first_name} ${c.second_name}`;
                this.form.customer_email = c.email;
                this.form.licensed_operator = c.licensed_operator || '';
                this.form.currency_id = c.currency_id || 1;
            } catch (e) {
                this.form.customer_name = ''; this.form.customer_email = ''; this.form.licensed_operator = ''; this.form.currency_id = 1;
            }
        },

        async loadOffer(id) {
            try {
                const res = await this.fetchQuotation(id);
                const data = res.data.data || res;
                this.form = {
                    ...this.form,
                    ...data,
                    customer_id: data.customer_id,
                    currency_id: data.currency_id,
                    allowed_discount: data.allowed_discount || 0,
                    total_without_tax: data.total_without_tax || 0,
                    tax_percentage: data.tax_percentage || 5,
                    tax_amount: data.tax_amount || 0,
                    total_amount: data.total_amount || 0,
                    notes: data.notes || ''
                };
                this.offerRows = data.items.map((item, idx) => ({
                    id: idx + 1,
                    number: item.number || idx + 1,
                    item_id: item.item_id,
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    discount_rate: item.discount_rate || 0,
                    tax_rate: item.tax_rate || 5,
                    total_foreign: item.total_foreign,
                    total_local: item.total_local,
                    total: item.total
                }));
                this.nextRowId = this.offerRows.length + 1;
            } catch (e) {
                console.error('Failed to load offer:', e);
            }
        },

        handleCancel() { this.$router.push({ name: 'admin.outgoing-offers' }); },

        addRow() { this.offerRows.push({ id: this.nextRowId++, item_id: '', description: '', quantity: '', unit_price: '', discount_rate: 0, tax_rate: 5, total_foreign: '', total_local: '', total: '' }); },

        removeRow(rowId) { if (this.offerRows.length > 1) this.offerRows = this.offerRows.filter(r => r.id !== rowId); },

        calculateTotal(row) {
            const q = parseFloat(row.quantity) || 0, p = parseFloat(row.unit_price) || 0, d = parseFloat(row.discount_rate) || 0, t = parseFloat(row.tax_rate) || 0;
            const subtotal = q * p, afterDiscount = subtotal - subtotal * (d / 100), tax = afterDiscount * (t / 100), total = afterDiscount + tax;
            row.total = total.toFixed(4); row.total_foreign = row.total_local = row.total;
            this.calculateTotals();
        },

        calculateTotals() {
            const totalWithoutTax = this.offerRows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0);
            const allowedDiscount = parseFloat(this.form.allowed_discount) || 0;
            const taxPercent = parseFloat(this.form.tax_percentage) || 0;
            const afterDiscount = totalWithoutTax - allowedDiscount;
            const taxAmount = afterDiscount * (taxPercent / 100);
            this.form.tax_amount = taxAmount.toFixed(2);
            this.form.total_amount = (afterDiscount + taxAmount).toFixed(2);
            this.form.total_without_tax = totalWithoutTax.toFixed(2);
        },

        async handleSave() {
            try {
                this.isUpdating = true; this.errors = {}; this.errorMsg = null; this.successMsg = null;
                const totalAmount = this.offerRows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0);
                const payload = {
                    ...this.form,
                    total_without_tax: parseFloat(this.form.total_without_tax) || totalAmount,
                    tax_amount: parseFloat(this.form.tax_amount),
                    total_amount: parseFloat(this.form.total_amount),
                    items: this.offerRows.map(r => ({
                        item_id: parseInt(r.item_id),
                        description: r.description,
                        quantity: parseFloat(r.quantity),
                        unit_price: parseFloat(r.unit_price),
                        discount_rate: parseFloat(r.discount_rate),
                        tax_rate: parseFloat(r.tax_rate),
                        total: parseFloat(r.total),
                        total_foreign: parseFloat(r.total_foreign),
                        total_local: parseFloat(r.total_local)
                    }))
                };
                await this.createOutgoingQuotation(payload);
                this.successMsg = this.$t('messages.quotation_created_successfully') || 'تم إنشاء العرض بنجاح';
                setTimeout(() => this.$router.push({ name: 'admin.outgoing-offers' }), 2000);
            } catch (e) {
                if (e.response?.status === 422) this.errors = e.response.data.errors || {};
                else this.errorMsg = e.response?.data?.message || this.$t('messages.quotation_creation_failed') || 'فشل في إنشاء العرض';
            } finally { this.isUpdating = false; }
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
