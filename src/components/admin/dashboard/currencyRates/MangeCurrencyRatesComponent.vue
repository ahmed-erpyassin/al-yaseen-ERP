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

<script>
import Swal from 'sweetalert2';
export default {
    name: "MangeCurrencyRatesComponent",
    data() {
        return {
            formData: {
                date: "",
                day: "",
                hour: "",
                rates: {}
            }
        };
    },
    mounted() {
        // جلب العملات من Vuex
        this.$store.dispatch('options/getCurrencies').then(() => {
            this.initForm();
        });
    },
    computed: {
        currencies() {
            return this.$store.getters['options/currencies'] || [];
        }
    },
    methods: {
        initForm() {
            // إعداد الـ formData للعملات
            const newRates = {};
            this.currencies.forEach(currency => {
                newRates[currency.code] = this.formData.rates[currency.code] || null;
            });
            this.formData.rates = newRates;
        },
        saveRates() {
            // مثال: هنا يمكن ربط API لحفظ البيانات
            console.log("Saving rates:", this.formData);
            Swal.fire({
                icon: 'success',
                title: 'تم الحفظ بنجاح',
                showConfirmButton: false,
                timer: 1500
            });
        }
        ,
    }
};
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
