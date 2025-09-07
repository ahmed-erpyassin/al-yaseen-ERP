<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <router-link :to="{ name: 'admin.currency-rates.manage' }" class="btn btn-lg btn-main me-3">{{ $t('buttons.create')
            }}</router-link>
            <button class="btn btn-lg btn-outline-danger" type="button">
                {{ $t('buttons.delete') }}
            </button>

        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.exchange_rates') }}</h3>
            </div>
        </div>
        <div class="d-flex align-items-center actions mb-3">
            <div class='search me-2 mb-3'>
                <i class="bi bi-search me-2"></i>
                <span class="text-main">{{ $t('label.search_by_date') }}</span>
            </div>
            <div class='edit me-4 mb-3'>
                <i class="bi bi-pencil me-2"></i>
                <span class="text-main">{{ $t('label.edit') }}</span>
            </div>
            <div class="dropdown mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(th, index) in table.fields" :key="index" @click="th.status = !th.status">
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col0"><label
                                class="form-check-label" for="col0">{{ th.name }}</label></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-end">
            <div class="pages">

                <p class="text-main mb-0">{{ $t('label.export_rates_excel') }}</p>
                <p class="text-main mb-0">{{ $t('label.edit_currency_names') }}</p>
                <p class="text-main mb-0">{{ $t('label.update_rates_internet') }}</p>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle">
                <thead>
                    <tr class="header">
                        <th v-for="(th, index) in visibleFields" :key="index">{{ th.name }}</th>
                    </tr>
                </thead>
                <tbody class="table-body form">
                    <tr v-for="(tr, index) in 8" :key="index">
                        <td v-for="(td, index) in visibleFields.length" :key="index">Test</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script>

export default {

    name: "AccountsListComponent",
    data() {

        return {
            table: {
                fields: [
                    {
                        name: this.$t('label.date'),
                        status: true
                    },
                    {
                        name: this.$t('label.time'),
                        status: true
                    },
                    {
                        name: this.$t('label.usd'),
                        status: true
                    },
                    {
                        name: this.$t('label.eur'),
                        status: true
                    },
                    {
                        name: this.$t('label.cad'),
                        status: true
                    },
                    {
                        name: this.$t('label.try'),
                        status: true
                    },
                    {
                        name: this.$t('label.jod'),
                        status: true
                    },
                    {
                        name: this.$t('label.omr'),
                        status: true
                    },
                    {
                        name: this.$t('label.sar'),
                        status: true
                    },
                    {
                        name: this.$t('label.qar'),
                        status: true
                    },
                    {
                        name: this.$t('label.aed'),
                        status: true
                    },
                    {
                        name: this.$t('label.kwd'),
                        status: false
                    },
                    {
                        name: this.$t('label.egp'),
                        status: false
                    },
                    {
                        name: this.$t('label.yer'),
                        status: false
                    },
                    {
                        name: this.$t('label.ils'),
                        status: false
                    },
                    {
                        name: this.$t('label.bhd'),
                        status: false
                    }
                ]

            }
        }

    },
    computed: {
        visibleFields() {
            return this.table.fields.filter(field => field.status);
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
</style>