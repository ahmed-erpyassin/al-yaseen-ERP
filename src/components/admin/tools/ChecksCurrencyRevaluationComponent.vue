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
        <h4>{{ $t('label.currency_difference_on_checks') }}</h4>
        <form class="form">

            <div class="row mt-5">
                <div class="col-md-3">
                    <h5>{{ $t('label.incoming_checks') }}</h5>
                </div>
                <div class="col-md-9">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="in_incoming_portfolio" />
                        <label class="form-check-label" for="in_incoming_portfolio">{{ $t('label.in_incoming_portfolio')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="profit_in_return_portfolio" />
                        <label class="form-check-label" for="profit_in_return_portfolio">{{ $t('label.profit_in_return_portfolio')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="in_bank_not_cashed" />
                        <label class="form-check-label" for="in_bank_not_cashed">{{ $t('label.in_bank_not_cashed')
                        }}</label>
                    </div>
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="in_bank_returned" />
                        <label class="form-check-label" for="in_bank_returned">{{ $t('label.in_bank_returned')
                        }}</label>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-3">
                    <h5>{{ $t('label.outgoing_checks') }}</h5>
                </div>
                <div class="col-md-9">
                    <div class="form-check mb-3 ">
                        <input checked type="checkbox" class="form-check-input rounded-circle" id="not_cashed" />
                        <label class="form-check-label" for="not_cashed">{{ $t('label.not_cashed')
                        }}</label>
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-5">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.check_account') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.receipt_account') }}</h5>
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
                <div class="col-md-2">
                    <div class="mb-3 position-relative">
                        <label for="hour" class="form-label">{{
                            $t('label.hour') }}</label>
                        <input type="text" id="hour" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>
