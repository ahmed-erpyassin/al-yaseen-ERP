<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-success me-3 ms-3" type="button">
                {{ $t('buttons.calculation') }}
            </button>
            <button class="btn btn-lg btn-danger" type="button">
                {{ $t('buttons.cancel') }}
            </button>

        </div>
        <h4>{{ $t('label.account_currency_revaluation') }}</h4>
        <form class="form">

            <div class="row mt-5 align-items-center">
                <div class="col-md-3">
                    <h5>{{ $t('label.classified_accounts') }}</h5>
                </div>
                <div class="col-md-9">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="balance_sheet" />
                        <label class="form-check-label" for="balance_sheet">{{ $t('label.balance_sheet')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="profit_and_loss" />
                        <label class="form-check-label" for="profit_and_loss">{{ $t('label.profit_and_loss')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="trading" />
                        <label class="form-check-label" for="trading">{{ $t('label.trading')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="operating" />
                        <label class="form-check-label" for="operating">{{ $t('label.operating')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="income_and_expenses" />
                        <label class="form-check-label" for="income_and_expenses">{{ $t('label.income_and_expenses')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="receivables_and_payables" />
                        <label class="form-check-label" for="receivables_and_payables">{{
                            $t('label.receivables_and_payables')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="agents_and_distributors" />
                        <label class="form-check-label" for="agents_and_distributors">{{
                            $t('label.agents_and_distributors')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="project" />
                        <label class="form-check-label" for="project">{{ $t('label.project')
                            }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="currency_difference_accounts_only" />
                        <label class="form-check-label text-primary" for="currency_difference_accounts_only">{{
                            $t('label.currency_difference_accounts_only')
                            }}</label>
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-5">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.account') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row ">
                        <h5 class="mb-3">{{ $t('label.department') }}</h5>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                <input type="text" id="fax_number" class="form-control rounded-1" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 position-relative">
                                <label for="from" class="form-label">{{ $t('label.to') }}</label>
                                <input type="text" id="from" class="form-control rounded-1" />

                            </div>
                        </div>
                        <div class="form-check">
                            <input checked type="checkbox" class="form-check-input rounded-circle"
                                id="calculate_each_section_separately" />
                            <label class="form-check-label " for="calculate_each_section_separately">{{
                                $t('label.calculate_each_section_separately')
                            }}</label>
                        </div>
                    </div>

                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="currency_difference_calculation" class="form-label">{{
                            $t('label.currency_difference_calculation') }}</label>
                        <input type="number" id="currency_difference_calculation" class="form-control rounded-1" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3 position-relative">
                        <label for="date" class="form-label">{{
                            $t('label.date') }}</label>
                        <input type="date" id="date" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script>

export default {
    name: "CurrencyRevaluationComponent",
    data() {

        return {

        };

    }
}

</script>

<style></style>