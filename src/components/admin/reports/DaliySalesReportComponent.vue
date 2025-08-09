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
            <h3 class="mb-5">{{ $t('label.daily_sales_report') }}</h3>

            <div class="row">
                <div class="col-md-6">
                    <div class="row mb-3">
                        <h5 class = "mb-3">{{ $t('label.account_number') }}</h5>
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
                        <h5 class = "mb-3">{{ $t('label.receipt_number') }}</h5>
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
                        <h5 class = "mb-3">{{ $t('label.salesperson') }}</h5>
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
                        <h5 class = "mb-3">{{ $t('label.invoice_number') }}</h5>
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
                        <h5 class = "mb-3">{{ $t('label.invoice_date') }}</h5>
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
