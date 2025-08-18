<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>

        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-outline-secondary me-3">{{ $t('buttons.cancel') }}</button>
            <div class="dropdown">
                <button class="btn btn-lg btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ $t('buttons.save') }}
                </button>
                <ul class="dropdown-menu bg-main text-light">
                    <li><a class="dropdown-item" href="#">{{ $t('buttons.save&print') }}</a></li>
                </ul>
            </div>
        </div>

        <form class="form">
            <h3 class="mb-5">{{ $t('label.income_and_expenses') }}</h3>
            <h5 class="mb-3">{{ $t('label.required') }}:</h5>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option1">
                <label class="form-check-label" for="option1">
                    {{ $t('label.all_invoices_income') }}
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option2">
                <label class="form-check-label" for="option2">
                    {{ $t('label.sales_total') }}
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option3">
                <label class="form-check-label" for="option3">
                    {{ $t('label.purchases_total') }}
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option4">
                <label class="form-check-label" for="option4">
                    {{ $t('label.revenues_total') }}
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option5">
                <label class="form-check-label" for="option5">
                    {{ $t('label.expenses_total') }}
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option6">
                <label class="form-check-label" for="option6">
                    {{ $t('label.all_invoices_short') }}
                </label>
            </div>
            <h5 class="mb-3 mt-3">{{ $t('label.by') }}:</h5>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option5">
                <label class="form-check-label" for="option5">
                    {{ $t('label.by_customs_revenue_expenses_statement') }}
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option6">
                <label class="form-check-label" for="option6">
                    {{ $t('label.specified_period') }}
                </label>
            </div>
            <div class="row mt-5">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.account_number') }}</h5>
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
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.notebook_number') }}</h5>
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
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.statement_number') }}</h5>
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

                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.invoice_number') }}</h5>
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

                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.date') }}</h5>
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
            </div>

        </form>
    </div>
</template>
