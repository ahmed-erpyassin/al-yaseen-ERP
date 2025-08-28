<template>
    <div class="container pe-5 ps-5">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
            <div class="d-flex">
                <button class="btn btn-danger me-2">{{ $t('buttons.cancel') }}</button>
                <div class="dropdown">
                    <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        {{ $t('buttons.save') }}
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item">{{ $t('buttons.save') }}</button></li>
                        <li><button class="dropdown-item">{{ $t('buttons.save_and_print') }}</button></li>
                        <li><button class="dropdown-item">{{ $t('buttons.save_and_email') }}</button></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Title -->
        <h3 class="mb-4">{{ $t('label.add_monthly_revenue_expense') }}</h3>

        <!-- Date Section -->
        <div class="row mb-4">
            <div class="col-md-3">
                <label class="form-label">{{ $t('label.month') }}</label>
                <input type="month" class="form-control" v-model="form.month" />
            </div>
            <div class="col-md-3">
                <label class="form-label">{{ $t('label.year') }}</label>
                <input type="number" class="form-control" v-model="form.year" />
            </div>
            <div class="col-md-6">
                <label class="form-label">{{ $t('label.report_statement') }}</label>
                <input type="text" class="form-control" v-model="form.statement" />
            </div>
        </div>

        <!-- Revenues Section -->
        <div class="mb-4">
            <h4>{{ $t('label.revenues') }}</h4>
            <div class="row mb-3">
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.sales') }}</label>
                    <input type="number" class="form-control" v-model="form.revenues.sales" />
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.return_sales') }}</label>
                    <input type="number" class="form-control" v-model="form.revenues.returnSales" />
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.services') }}</label>
                    <input type="number" class="form-control" v-model="form.revenues.services" />
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.other_revenues') }}</label>
                    <input type="number" class="form-control" v-model="form.revenues.otherRevenues" />
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.tax_added') }}</label>
                    <input type="number" class="form-control" v-model="form.revenues.taxAdded" />
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.total_revenues') }}</label>
                    <input type="number" class="form-control" :value="calculateTotalRevenues" readonly />
                </div>
            </div>
        </div>

        <!-- Expenses Section -->
        <div class="mb-4">
            <h4>{{ $t('label.expenses') }}</h4>
            <div class="row mb-3">
                <div class="col-md-2" v-for="(expense, index) in form.expenses" :key="'expense'+index">
                    <label class="form-label">{{ expense.label }}</label>
                    <input type="number" class="form-control" v-model="expense.value" />
                </div>
                <div class="col-md-2">
                    <label class="form-label">{{ $t('label.total_expenses') }}</label>
                    <input type="number" class="form-control" :value="calculateTotal(form.expenses)" readonly />
                </div>
            </div>
        </div>

        <!-- Net Profit/Loss -->
        <div class="row">
            <div class="col-md-3">
                <label class="form-label">{{ $t('label.net_profit_loss') }}</label>
                <input type="number" class="form-control" :value="calculateNetProfitLoss" readonly />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateMonthlyFinancialsComponent',
    data() {
        return {
            form: {
                month: '',
                year: new Date().getFullYear(),
                statement: '',
                revenues: {
                    sales: 0,
                    returnSales: 0,
                    services: 0,
                    otherRevenues: 0,
                    taxAdded: 0
                },
                expenses: [
                    { label: this.$t('label.cash_expenses'), value: 0 },
                    { label: this.$t('label.bank_expenses'), value: 0 },
                    { label: this.$t('label.in_kind_expenses'), value: 0 },
                    { label: this.$t('label.other_expenses'), value: 0 }
                ]
            }
        };
    },
    methods: {
        calculateTotal(items) {
            if (!Array.isArray(items)) {
                console.error('Expected an array but got:', items);
                return 0;
            }
            return items.reduce((sum, item) => sum + Number(item.value), 0).toFixed(2);
        }
    },
    computed: {
        calculateTotalRevenues() {
            const { sales, returnSales, services, otherRevenues, taxAdded } = this.form.revenues;
            return (Number(sales) + Number(returnSales) + Number(services) + Number(otherRevenues) + Number(taxAdded)).toFixed(2);
        },
        calculateNetProfitLoss() {
            return (this.calculateTotal(this.form.revenues) - this.calculateTotal(this.form.expenses)).toFixed(2);
        }
    }
};
</script>

<style scoped>
.container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.form-label {
    font-weight: bold;
}
.form-control {
    border-radius: 4px;
}
</style>