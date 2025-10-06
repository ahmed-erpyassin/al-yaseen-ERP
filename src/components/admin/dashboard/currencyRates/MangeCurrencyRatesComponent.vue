<template>
    <div class="container pe-5 ps-5">
        <!-- Page Title -->
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>v>

        <!-- Form -->
        <form class="form">
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.exchange_rates') }}</h3>
                </div>

                <!-- Date -->
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="date" class="form-label">{{ $t('label.date') }}</label>
                            <input type="date" id="date" class="form-control rounded-1" v-model="formData.date" />
                        </div>
                    </div>
                </div>

                <!-- Day -->
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="day" class="form-label">{{ $t('label.day') }}</label>
                            <input type="text" id="day" class="form-control rounded-1" v-model="formData.day" />
                        </div>
                    </div>
                </div>

                <!-- Hour -->
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="hour" class="form-label">{{ $t('label.hour') }}</label>
                            <input type="time" id="hour" class="form-control rounded-1" v-model="formData.hour" />
                        </div>
                    </div>
                </div>

                <!-- Currency Rates -->
                <div class="col-md-4" v-for="currency in currencies" :key="currency.code">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label :for="currency.code" class="form-label">{{ currency.name_ar }}</label>
                            <input type="number" :id="currency.code" class="form-control rounded-1"
                                v-model="formData.rates[currency.code]" />
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-success" @click.prevent="saveRates">
                {{ $t('buttons.save') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// i18n
const { t } = useI18n();

// Sample currencies
const currencies = ref([
    { code: 'USD', name_ar: 'دولار' },
    { code: 'EUR', name_ar: 'يورو' },
    { code: 'GBP', name_ar: 'جنيه إسترليني' }
]);

// Form data
const formData = reactive({
    date: '',
    day: '',
    hour: '',
    rates: {}
});

// Initialize rates to zero
currencies.value.forEach(currency => {
    formData.rates[currency.code] = 0;
});

// Save function
function saveRates() {
    // Basic validation example
    if (!formData.date || !formData.day || !formData.hour) {
        alert(t('messages.fill_all_fields'));
        return;
    }

    console.log('Form Data:', JSON.stringify(formData, null, 2));

    // Here you can call your API to save rates
    // Example:
    // await axios.post('/api/rates', formData);

    alert(t('messages.rates_saved'));
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
    color: #1D7342;
}

.form-check-input:checked[type=checkbox] {
    border-radius: 50%;
    background-color: #1D7342 !important;
}

.pages p {
    font-size: 25px;
}
</style>
