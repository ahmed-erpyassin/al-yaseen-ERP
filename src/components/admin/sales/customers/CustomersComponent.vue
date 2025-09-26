<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <router-link :to="{ name: 'admin.customers.create' }" class="btn btn-lg btn-main">{{ $t('buttons.create') }}</router-link>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.customers') }}</h3>
            </div>
        </div>
        <div class="d-flex align-items-center actions mb-3">
            <div class='search me-2 mb-3'>
                <i class="bi bi-search me-2"></i>
                <span class="text-main">{{ $t('label.search_account') }}</span>
            </div>
            <div class='edit me-4 mb-3'>
                <i class="bi bi-pencil me-2"></i>
                <span class="text-main">{{ $t('label.edit') }}</span>
            </div>
            <div class="dropdown mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(visible, column) in tableColumns" :key="column">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :checked="visible" 
                                   :id="'col-' + column" @change="handleToggleColumn(column)">
                            <label class="form-check-label" :for="'col-' + column">
                                {{ $t('label.' + column) }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-end">
            <div class="pages">

                <p class="text-main mb-0">{{ $t('label.customers') }}</p>
                <p class="text-main mb-0">{{ $t('label.customer_financial_movement') }}</p>
                <p class="text-main mb-0">{{ $t('label.store_customer_movement') }}</p>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-if="tableColumns.customer_number">{{ $t('label.customer_number') }}</th>
                        <th v-if="tableColumns.customer_name">{{ $t('label.customer_name') }}</th>
                        <th v-if="tableColumns.balance">{{ $t('label.balance') }}</th>
                        <th v-if="tableColumns.currency">{{ $t('label.currency') }}</th>
                        <th v-if="tableColumns.branch">{{ $t('label.branch') }}</th>
                        <th v-if="tableColumns.date_of_last_movement">{{ $t('label.date_of_last_movement') }}</th>
                        <th v-if="tableColumns.mobile">{{ $t('label.mobile') }}</th>
                        <th v-if="tableColumns.sales_representative">{{ $t('label.sales_representative') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-if="loading">
                        <td :colspan="Object.keys(tableColumns).filter(col => tableColumns[col]).length + 1" class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="filteredCustomers.length === 0">
                        <td :colspan="Object.keys(tableColumns).filter(col => tableColumns[col]).length + 1" class="text-center">
                            No customers found
                        </td>
                    </tr>
                    <tr v-else v-for="customer in filteredCustomers" :key="customer.id">
                        <td v-if="tableColumns.customer_number">{{ customer.customer_number || customer.id }}</td>
                        <td v-if="tableColumns.customer_name">{{ customer.contact_name || customer.first_name + ' ' + customer.second_name }}</td>
                        <td v-if="tableColumns.balance">{{ customer.balance || '0.00' }}</td>
                        <td v-if="tableColumns.currency">{{ customer.currency_name || 'USD' }}</td>
                        <td v-if="tableColumns.branch">{{ customer.branch_name || 'Main' }}</td>
                        <td v-if="tableColumns.date_of_last_movement">{{ customer.updated_at ? new Date(customer.updated_at).toLocaleDateString() : '-' }}</td>
                        <td v-if="tableColumns.mobile">{{ customer.mobile || '-' }}</td>
                        <td v-if="tableColumns.sales_representative">{{ customer.employee_name || '-' }}</td>
                        <td>
                            <div class="d-flex gap-2 justify-content-center">
                                <button type="button" class="btn btn-sm btn-main text-white" @click="handleEdit(customer.id)">
                                    <i class="bi bi-pencil me-1"></i>{{ $t('buttons.edit') }}
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="handleDelete(customer.id)">
                                    <i class="bi bi-trash me-1"></i>{{ $t('buttons.delete') }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingComponent from '@/components/components/LoadingComponent.vue';

export default {
    name: 'CustomersComponent',
    components: { LoadingComponent },
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        ...mapGetters('customer', [
            'customers',
            'loading',
            'error',
            'filteredCustomers',
            'tableColumns'
        ])
    },
    mounted() {
        this.loadCustomers();
    },
    methods: {
        ...mapActions('customer', [
            'fetchCustomers',
            'deleteCustomer',
            'toggleColumn'
        ]),
        
        async loadCustomers() {
            try {
                await this.fetchCustomers();
            } catch (error) {
                console.error('Failed to load customers:', error);
            }
        },
        
        async handleDelete(customerId) {
            if (confirm(this.$t('messages.confirm_delete_customer'))) {
                this.isLoading = true; // Start loading
                try {
                    await this.deleteCustomer(customerId);
                    this.loadCustomers();
                } catch (error) {
                    console.error('Failed to delete customer:', error);
                } finally {
                    this.isLoading = false; // Stop loading
                }
            }
        },
        
        handleEdit(customerId) {
            // Navigate to edit customer page
            this.$router.push({ name: 'admin.customers.edit', params: { id: customerId } });
        },
        
        handleToggleColumn(columnName) {
            this.toggleColumn(columnName);
        }
    }
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

/* Action buttons styling */
.btn-main {
    background-color: #28a745;
    border-color: #28a745;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-main:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-1px);
}

.btn-outline-danger {
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn-outline-danger:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

/* Button icons */
.btn i {
    font-size: 0.875rem;
}

/* Table action column */
.table td:last-child {
    vertical-align: middle;
    text-align: center;
}

.btn-action {
    background-color: #F4FFF0 !important;
}

.actions i {
    font-size: 30px;
}

.actions span {
    font-size: 24px;
}

.dropdown .show {
    color: #1D7342
}

.form-check-input:checked[type=checkbox] {
    border-radius: 50%;
    background-color: #1D7342 !important;
}
.pages p {
    font-size: 25px;
}
</style>