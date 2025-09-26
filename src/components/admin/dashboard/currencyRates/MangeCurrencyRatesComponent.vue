<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <router-link :to="{ name: 'admin.new-account' }" class="btn btn-lg btn-main me-3">{{ $t('buttons.create')
                }}</router-link>
            <button class="btn btn-lg btn-outline-danger" type="button">
                {{ $t('buttons.delete') }}
            </button>

        </div>
        <form class="form">
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-5">{{ $t('label.exchange_rates') }}</h3>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="date" class="form-label">{{ $t('label.date')
                            }}</label>

                            <input type="date" id="date" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="day" class="form-label">{{ $t('label.day')
                                }}</label>

                            <input type="text" id="day" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="hour" class="form-label">{{ $t('label.hour')
                            }}</label>

                            <input type="time" id="hour" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                <div class="col-md-4" v-for="(currency, index) in currencies" :key="index">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label :for="currency.code" class="form-label">{{ currency.name_ar }}</label>

                            <input type="number" id="currency.code" class="form-control rounded-1" />

                        </div>
                    </div>
                </div>
                
            </div>
        </form>


    </div>
</template>

<script>

export default {

    name: "MangeCurrencyRatesComponent",
    data() {

        return {

        }

    },
    mounted() {

        this.$store.dispatch('options/getCurrencies');

    },
    computed: {
        currencies: function () {

            return this.$store.getters['options/currencies'];

        },
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
</style>