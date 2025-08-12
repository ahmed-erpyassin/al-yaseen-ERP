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
            <h3 class="mb-5">{{ $t('label.trial_balance') }}</h3>

            <div class="row">
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
                        <h5 class="mb-3">{{ $t('label.branch') }}</h5>
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
                    <div class="row mb-3">
                        <h5 class="mb-3">{{ $t('label.funder') }}</h5>
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
                        <h5 class="mb-3">{{ $t('label.account_type') }}</h5>
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
                        <div class="col-md-2">
                            <label class="form-label fw-bold">{{ $t('label.period') }} :</label>

                        </div>
                        <div class="col-12 d-flex flex-wrap gap-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="currently" value="currently">
                                <label class="form-check-label" for="currently">{{ $t('label.currently')
                                    }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="by_specified_period_department_funder"
                                    value="by_specified_period_department_funder">
                                <label class="form-check-label" for="by_specified_period_department_funder">{{ $t('label.by_specified_period_department_funder')
                                    }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
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
                    </div>



                </div>
            </div>
            <div class="container mt-4">

                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.type') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="with_balances"
                                value="with_balances">
                            <label class="form-check-label" for="with_balances">{{ $t('label.with_balances')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="with_totals"
                                value="with_totals">
                            <label class="form-check-label" for="with_totals">{{ $t('label.with_totals')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                                id="with_balances_and_totals"
                                value="with_balances_and_totals">
                            <label class="form-check-label" for="with_balances_and_totals">{{
                                $t('label.with_balances_and_totals') }}</label>
                        </div>

                    </div>
                </div>
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.currency') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="by_group_currency"
                                value="by_group_currency">
                            <label class="form-check-label" for="by_group_currency">{{ $t('label.by_group_currency')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="by_accounts_currency"
                                value="by_accounts_currency">
                            <label class="form-check-label" for="by_accounts_currency">{{ $t('label.by_accounts_currency')
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.accounts') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="sub_accounts_only"
                                value="sub_accounts_only">
                            <label class="form-check-label" for="sub_accounts_only">{{ $t('label.sub_accounts_only')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="main_accounts_only"
                                value="main_accounts_only">
                            <label class="form-check-label" for="main_accounts_only">{{ $t('label.main_accounts_only')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="by_chart_of_accounts"
                                value="by_chart_of_accounts">
                            <label class="form-check-label" for="by_chart_of_accounts">{{ $t('label.by_chart_of_accounts')
                            }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="all_accounts_with_subs"
                                value="all_accounts_with_subs">
                            <label class="form-check-label" for="all_accounts_with_subs">{{ $t('label.all_accounts_with_subs')
                            }}</label>
                        </div>


                    </div>
                </div>


                <div class="row mb-3">
                    <label class="form-label fw-bold">{{ $t('label.sort_by') }} :</label>
                    <div class="col-12 d-flex flex-wrap gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="account_name" value="account_name">
                            <label class="form-check-label" for="account_name">{{ $t('label.account_name') }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="account_number" value="account_number">
                            <label class="form-check-label" for="account_number">{{ $t('label.account_number')
                            }}</label>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>
