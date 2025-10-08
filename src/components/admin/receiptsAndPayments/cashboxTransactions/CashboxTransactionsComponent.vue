<template>
    <div class="container pe-5 ps-5">
        <!-- العنوان -->
        <h1><i class="bi bi-cash-stack me-2"></i> {{ $t('label.cashbox_transactions') }}</h1>

        <!-- أزرار التحكم -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <router-link :to="{ name: 'admin.recipts-and-payments.cashbox-transactions.create' }"
                class="btn btn-lg btn-main me-3">
                {{ $t('buttons.create') }}
            </router-link>

            <div class="dropdown">
                <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.import_export') }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li>
                        <label class="dropdown-item mb-0" style="cursor: pointer;">
                            {{ $t('buttons.import_excel') }}
                            <input type="file" accept=".xlsx, .xls" class="d-none" />
                        </label>
                    </li>
                    <li><button class="dropdown-item">{{ $t('buttons.export_excel') }}</button></li>
                    <li><button class="dropdown-item">{{ $t('buttons.export_pdf') }}</button></li>
                    <li><button class="dropdown-item">{{ $t('buttons.print') }}</button></li>
                </ul>
            </div>
        </div>

        <!-- البحث والإعدادات -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="search-bar d-flex align-items-center flex-grow-1 me-3">
                <i class="bi bi-search me-2"></i>
                <input type="text" class="form-control" :placeholder="$t('label.search_transaction')"
                    v-model="searchQuery" />
            </div>

            <div class="dropdown">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style="font-size:1.5rem;cursor:pointer;"></i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(field, index) in table.fields" :key="field.key">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="field.status"
                                :id="'col-' + index" />
                            <label class="form-check-label" :for="'col-' + index">{{ field.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- الجدول -->
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="field in visibleFields" :key="field.key">{{ field.name }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedItems.length === 0">
                        <td :colspan="visibleFields.length + 1" class="text-center">
                            {{ $t('label.no_data') }}
                        </td>
                    </tr>
                    <tr v-else v-for="(transaction, index) in paginatedItems" :key="index">
                        <td v-for="field in visibleFields" :key="field.key">{{ transaction[field.key] }}</td>
                        <td class="text-center">
                            <i class="bi bi-eye action-icon me-2" :title="$t('buttons.check')"></i>
                            <i class="bi bi-pencil action-icon me-2" :title="$t('buttons.edit')"></i>
                            <i class="bi bi-trash action-icon" :title="$t('buttons.delete')"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ $t('buttons.previous') }}
            </button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t('buttons.next') }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CashboxTransactionsComponent',
    data() {
        return {
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            items: [
                { number: 'CBX-001', account: 'A200', box: 'Main Box', received_amount: 1500, paid_amount: 200, net_amount: 1300, currency: 'USD', date: '2025-10-08', registration_number: 'REG-1001' },
                { number: 'CBX-002', account: 'A210', box: 'Branch 1', received_amount: 1000, paid_amount: 300, net_amount: 700, currency: 'USD', date: '2025-10-07', registration_number: 'REG-1002' },
                { number: 'CBX-003', account: 'A220', box: 'Branch 2', received_amount: 500, paid_amount: 100, net_amount: 400, currency: 'EUR', date: '2025-10-06', registration_number: 'REG-1003' }
            ],
            table: {
                fields: [
                    { name: this.$t('label.number'), key: 'number', status: true },
                    { name: this.$t('label.account'), key: 'account', status: true },
                    { name: this.$t('label.box'), key: 'box', status: true },
                    { name: this.$t('label.received_amount'), key: 'received_amount', status: true },
                    { name: this.$t('label.paid_amount'), key: 'paid_amount', status: true },
                    { name: this.$t('label.net_amount'), key: 'net_amount', status: true },
                    { name: this.$t('label.currency'), key: 'currency', status: true },
                    { name: this.$t('label.date'), key: 'date', status: true },
                    { name: this.$t('label.registration_number'), key: 'registration_number', status: true }
                ]
            }
        };
    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(f => f.status);
        },
        filteredItems() {
            if (!this.searchQuery) return this.items;
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(item =>
                Object.values(item).some(val => val?.toString().toLowerCase().includes(query))
            );
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.perPage) || 1;
        }
    },
    methods: {
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
    }
};
</script>

<style scoped>
.header th {
    background-color: #F4FFF0 !important;
}

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

.action-icon {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.2s, color 0.3s, opacity 0.3s;
}

.action-icon.bi-eye {
    color: #0d6efd;
}

.action-icon.bi-pencil {
    color: #ffc107;
}

.action-icon.bi-trash {
    color: #dc3545;
}

.action-icon:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

.search-bar input {
    border-radius: 4px;
    padding: 0.5rem 1rem;
}
</style>
