<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-currency-exchange"></i> {{ $t('label.exchange_rates_online') }}</h1>

        <!-- Loader -->
        <div v-if="loading" class="text-center mt-5">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">{{ $t('label.loading_rates') }}</p>
        </div>

        <!-- Error -->
        <div v-if="error" class="alert alert-danger mt-5">
            {{ $t('messages.error_fetching_rates') }}: {{ error }}
        </div>

        <!-- Rates Table -->
        <div v-if="!loading && !error" class="table-responsive mt-5">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th>{{ $t('label.currency') }}</th>
                        <th>{{ $t('label.rate_vs_usd') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rate, code) in paginatedRates" :key="code">
                        <td>{{ code }}</td>
                        <td>{{ rate.toFixed(4) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="!loading && !error" class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">
                {{ $t('buttons.previous') }}
            </button>
            <span>{{ $t('label.page') }} {{ currentPage }} {{ $t('label.of') }} {{ totalPages }}</span>
            <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t('buttons.next') }}
            </button>
        </div>

        <!-- Refresh Button -->
        <div class="text-center mt-3">
            <button class="btn btn-success" @click="fetchRates">
                {{ $t('buttons.refresh_rates') }}
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CurrencyRatesFromInternetComponent",
    data() {
        return {
            rates: {},
            loading: false,
            error: null,
            currentPage: 1,
            perPage: 20,
        };
    },
    computed: {
        rateKeys() {
            return Object.keys(this.rates);
        },
        paginatedRates() {
            const start = (this.currentPage - 1) * this.perPage;
            const keys = this.rateKeys.slice(start, start + this.perPage);
            const result = {};
            keys.forEach(k => (result[k] = this.rates[k]));
            return result;
        },
        totalPages() {
            return Math.ceil(this.rateKeys.length / this.perPage);
        }
    },
    mounted() {
        this.fetchRates();
    },
    methods: {
        async fetchRates() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/9442082d319103876e9a8983/latest/USD');
                if (response.data && response.data.conversion_rates) {
                    this.rates = response.data.conversion_rates;
                } else {
                    this.error = 'Invalid response from API';
                }
            } catch (err) {
                this.error = err.message || 'Network error';
            } finally {
                this.loading = false;
            }
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        }
    }
};
</script>

<style>
.header th {
    background-color: #F4FFF0 !important;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.table {
    font-size: 18px;
}

.btn-success,
.btn-secondary {
    font-size: 16px;
    padding: 8px 20px;
}
</style>
