<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <router-link :to="{ name: 'admin.employees.journal_entries.create' }" class="btn btn-lg btn-main me-3">{{ $t('buttons.create')
            }}</router-link>
            <button class="btn btn-lg btn-outline-danger" type="button">
                {{ $t('buttons.delete') }}
            </button>

        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.journal_entries') }}</h3>
            </div>
        </div>
        <div class="d-flex align-items-center actions mb-3">
            <div class='search me-2 mb-3'>
                <i class="bi bi-search me-2"></i>
                <span class="text-main">{{ $t('label.search_journal_entry') }}</span>
            </div>
            <div class='edit me-4 mb-3'>
                <i class="bi bi-pencil me-2"></i>
                <span class="text-main">{{ $t('label.edit') }}</span>
            </div>
            <div class="dropdown me-4 mb-3">
                <i class="bi bi-gear" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </i>
                <ul class="dropdown-menu align-center rounded-0 p-2" style="width: 250px;">
                    <li v-for="(th, index) in table.fields" :key="index" @click="th.status = !th.status">
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked id="col0"><label
                                class="form-check-label" for="col0">{{ th.name }}</label></div>
                    </li>
                </ul>
            </div>
            <div class='sort me-4 mb-3'>
                <div>
                    <div class="d-flex align-items-center text-main">

                        <i class="bi bi-chevron-up me-2"></i>
                        <span class="text-main">{{ $t('label.first') }}</span>
                    </div>
                    <div class="d-flex align-items-center text-main">

                        <i class="bi bi-chevron-down me-2"></i>
                        <span class="text-main">{{ $t('label.last') }}</span>
                    </div>
                </div>
            </div>
            <div class='review me-4 mb-3'>
                <span class="text-main">{{ $t('label.review') }}</span>
            </div>
            <div class='info me-4 mb-3'>
                <p class="text-main mb-1">{{ $t('label.repeat_current_journal_entry') }}</p>
                <p class="text-main">{{ $t('label.close_journal_entries') }}</p>
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
                        name: this.$t('label.entry_number'),
                        status: true
                    },
                    {
                        name: this.$t('label.entry_date'),
                        status: true
                    },
                    {
                        name: this.$t('label.entry_time'),
                        status: true
                    },
                    {
                        name: this.$t('label.entry_amount'),
                        status: true
                    },
                    {
                        name: this.$t('label.entry_currency'),
                        status: true
                    },
                    {
                        name: this.$t('label.entry_description'),
                        status: true
                    },
                    {
                        name: this.$t('label.user'),
                        status: true
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