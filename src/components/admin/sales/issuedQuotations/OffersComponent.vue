<template>
    <div class="container pe-5 ps-5">
        <LoadingComponent :isLoading="loading" />
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <router-link :to="{ name: 'admin.outgoing-offers.create' }" class="btn btn-lg btn-main">{{ $t('buttons.create') }}</router-link>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.outgoing_price_offers') }}</h3>
            </div>
        </div>
        <div class="d-flex align-items-center actions mb-3">
            <div class='search me-2 mb-3'>
                <i class="bi bi-search me-2"></i>
                <span class="text-main">{{ $t('label.search_account') }}</span>

            </div>
            <div class='edit me-4 mb-3'>
                <i class="bi bi-pencil me-2"></i>
                <span class="text-main">{{ $t('buttons.edit') }}</span>
            </div>
            <div class="dropdown mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.offer_number" @change="toggleColumn('offer_number')" id="col0"><label
                                class="form-check-label" for="col0">{{ $t('label.offer_number') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.customer_name" @change="toggleColumn('customer_name')" id="col1"><label
                                class="form-check-label" for="col1">{{ $t('label.customer_name') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.licensed_operator" @change="toggleColumn('licensed_operator')" id="col2"><label
                                class="form-check-label" for="col2">{{ $t('label.licensed_operator') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.amount" @change="toggleColumn('amount')" id="col3"><label
                                class="form-check-label" for="col3">{{ $t('label.amount') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.currency" @change="toggleColumn('currency')" id="col4"><label
                                class="form-check-label" for="col4">{{ $t('label.currency') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.date" @change="toggleColumn('date')" id="col5"><label
                                class="form-check-label" for="col5">{{ $t('label.date') }}</label></div>
                    </li>
                    <li>
                        <div class="form-check"><input class="form-check-input" type="checkbox" :checked="tableColumns.mobile" @change="toggleColumn('mobile')" id="col6"><label
                                class="form-check-label" for="col6">{{ $t('label.mobile') }}</label></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-if="tableColumns.offer_number">{{ $t('label.offer_number') }}</th>
                        <th v-if="tableColumns.invoice_number">{{ $t('label.invoice_number') }}</th>
                        <th v-if="tableColumns.customer_name">{{ $t('label.customer_name') }}</th>
                        <th v-if="tableColumns.licensed_operator">{{ $t('label.licensed_operator') }}</th>
                        <th v-if="tableColumns.amount">{{ $t('label.amount') }}</th>
                        <th v-if="tableColumns.currency">{{ $t('label.currency') }}</th>
                        <th v-if="tableColumns.status">{{ $t('label.status') }}</th>
                        <th v-if="tableColumns.date">{{ $t('label.date') }}</th>
                        <th v-if="tableColumns.mobile">{{ $t('label.mobile') }}</th>
                        <th>{{ $t('label.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-for="offer in filteredOutgoingQuotations" :key="offer.id">
                        <td v-if="tableColumns.offer_number">{{ offer.journal_number || offer.id || '-' }}</td>
                        <td v-if="tableColumns.invoice_number">{{ offer.invoice_number || '-' }}</td>
                        <td v-if="tableColumns.customer_name">
                            {{ offer.customer?.company_name || 
                               (offer.customer?.first_name && offer.customer?.second_name ? 
                                offer.customer.first_name + ' ' + offer.customer.second_name : 
                                offer.customer?.first_name || offer.customer?.second_name || '-') }}
                        </td>
                        <td v-if="tableColumns.licensed_operator">
                            {{ offer.user?.first_name && offer.user?.second_name ? 
                               offer.user.first_name + ' ' + offer.user.second_name : 
                               offer.user?.first_name || offer.user?.second_name || '-' }}
                        </td>
                        <td v-if="tableColumns.amount">{{ offer.total_amount || '0.00' }}</td>
                        <td v-if="tableColumns.currency">{{ offer.currency?.name || offer.currency?.code || '-' }}</td>
                        <td v-if="tableColumns.status">
                            <span class="badge" :class="{
                                'bg-warning': offer.status === 'draft',
                                'bg-success': offer.status === 'approved',
                                'bg-danger': offer.status === 'rejected',
                                'bg-info': offer.status === 'pending'
                            }">
                                {{ offer.status_label || offer.status || '-' }}
                            </span>
                        </td>
                        <td v-if="tableColumns.date">{{ offer.created_at ? new Date(offer.created_at).toLocaleDateString() : '-' }}</td>
                        <td v-if="tableColumns.mobile">{{ offer.customer?.phone || offer.customer?.email || '-' }}</td>
                        <td>
                            <div class="d-flex gap-2 justify-content-center">
                                <button type="button" class="btn btn-sm btn-main text-white" @click="handleEdit(offer.id)">
                                    <i class="bi bi-pencil me-1"></i>{{ $t('buttons.edit') }}
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="handleDelete(offer.id)">
                                    <i class="bi bi-trash me-1"></i>{{ $t('buttons.delete') }}
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredOutgoingQuotations.length === 0">
                        <td :colspan="Object.values(tableColumns).filter(v => v).length + 2" class="text-center py-4">
                            {{ $t('label.no_offers_found') }}
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
    name: 'OffersComponent',
    components: {
        LoadingComponent
    },
    computed: {
        ...mapGetters('outgoingQuotations', [
            'outgoingQuotations', 
            'loading', 
            'error', 
            'searchQuery', 
            'tableColumns',
            'filteredOutgoingQuotations'
        ])
    },
    async mounted() {
        await this.loadOffers();
    },
    methods: {
        ...mapActions('outgoingQuotations', [
            'fetchOutgoingQuotations',
            'deleteOutgoingQuotation'
        ]),
        
        async loadOffers() {
            try {
                await this.fetchOutgoingQuotations();
            } catch (error) {
                console.error('Failed to load offers:', error);
            }
        },
        
        handleEdit(offerId) {
            // Navigate to edit offer page
            this.$router.push({ name: 'admin.outgoing-offers.edit', params: { id: offerId } });
        },
        
        async handleDelete(offerId) {
            if (confirm(this.$t('messages.confirm_delete_quotation'))) {
                try {
                    await this.deleteOutgoingQuotation(offerId);
                    this.loadOffers(); // Reload the list
                } catch (error) {
                    console.error('Failed to delete offer:', error);
                }
            }
        },
        
        toggleColumn(column) {
            this.$store.commit('outgoingQuotations/toggleColumn', column);
        },
        
        
        
        updateSearchQuery(query) {
            this.$store.commit('outgoingQuotations/setSearchQuery', query);
        },
        
        resetSearch() {
            this.$store.commit('outgoingQuotations/setSearchQuery', '');
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

/* Status badges */
.badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
}

.bg-warning {
    background-color: #ffc107 !important;
    color: #000 !important;
}

.bg-success {
    background-color: #198754 !important;
    color: #fff !important;
}

.bg-danger {
    background-color: #dc3545 !important;
    color: #fff !important;
}

.bg-info {
    background-color: #0dcaf0 !important;
    color: #000 !important;
}
</style>