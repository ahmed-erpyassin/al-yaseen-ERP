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
        <div class="row h-100 mt-5">
            <div class="col-12 text-center">
                <img src="@/assets/currency-exchanges.png" alt="" width="500px">
            </div>
        </div>

    </div>
</template>

<script>

export default {

    name: "CurrencyRatesFromInternetComponent",
    data() {

        return {
        }

    },


}

</script>

