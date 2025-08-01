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
                    <li><a class="dropdown-item" href="#">{{ $t('label.save&print') }}</a></li>
                </ul>
            </div>
        </div>
        <form class="form">

            <div class="row mt-5">
                <h3>{{ $t('label.account_information') }}</h3>
                <div class="row mt-4">
                    <div class="col-md-3">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="account_number" class="form-label">{{ $t('label.account_number')
                                        }}</label>

                                    <input type="text" id="account_number" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="account_name" class="form-label">{{ $t('label.account_name') }}</label>

                                    <input type="text" id="account_name" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="branch" class="form-label">{{ $t('label.branch') }}</label>

                                    <input type="text" id="branch" class="form-control rounded-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="account_type" class="form-label">{{ $t('label.account_type') }}</label>

                                    <select name="account_type" id="account_type" class="form-control">
                                        <option value="">{{ $t('label.debit_credit') }}</option>
                                        <option value="">{{ $t('label.debit') }}</option>
                                        <option value="">{{ $t('label.credit') }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="nature_account" class="form-label">{{ $t('label.nature_of_the_account')
                                        }}</label>

                                    <select name="nature_account" id="nature_account" class="form-control">
                                        <option value="">{{ $t('label.general_budget') }}</option>
                                        <option value="">{{ $t('label.profits_losses') }}</option>
                                        <option value="">{{ $t('label.inventory') }}</option>
                                        <option value="">{{ $t('label.details') }}</option>
                                        <option value="">{{ $t('label.revenues_expenses') }}</option>
                                        <option value="">{{ $t('label.balance_sheet_support') }}</option>
                                        <option value="">{{ $t('label.agent_balance') }}</option>
                                        <option value="">{{ $t('label.project') }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="category" class="form-label">{{ $t('label.category') }}</label>

                                    <select name="category" id="category" class="form-control">
                                        <option value="">{{ $t('label.main') }}</option>
                                        <option value="">{{ $t('label.sub') }}</option>
                                        <option value="">{{ $t('label.detailed') }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="level" class="form-label">{{ $t('label.level') }}</label>

                                    <select name="level" id="level" class="form-control">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="nature_account" class="form-label">{{ $t('label.report_type') }}</label>

                                    <select name="nature_account" id="nature_account" class="form-control">
                                        <option value="">{{ $t('label.budget') }}</option>
                                        <option value="">{{ $t('label.income_statement') }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="item">
                            <div class="mb-3 position-relative">
                                <label for="currency" class="form-label">{{ $t('label.currency')
                                    }}</label>
                                <select name="currency" id="currency" class="form-control">
                                    <option value="">$ USD</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-check mb-3 ">
                            <input checked type="checkbox" class="form-check-input rounded-circle" id="remember" />
                            <label class="form-check-label" for="remember">{{ $t('label.subject_to_currency_conditions')
                                }}</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <p class="mb-3 fs-5">{{ $t('label.allowed_account_users') }}</p>
                        <div class="d-flex align-items-center">
                            <div class="form-check mb-3 me-3">
                                <input checked type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.all_users') }}</label>
                            </div>
                            <div class="form-check mb-3 ">
                                <input checked type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.only_admin') }}</label>
                            </div>
                        </div>
                        <h3 class="mt-3 mb-4">{{ $t('label.account_opening_information') }}</h3>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="account_opening_date" class="form-label">{{
                                        $t('label.account_opening_date') }}</label>

                                    <input type="date" class="form-control" id="account_opening_date">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="account_created_by" class="form-label">{{ $t('label.account_created_by')
                                        }}</label>

                                    <input type="text" class="form-control" id="account_created_by">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <h3 class="mt-3 mb-4">{{ $t('label.linking_accounts') }}</h3>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="follows_account" class="form-label">{{ $t('label.follows_account')
                                    }}</label>

                                <input type="text" class="form-control" id="follows_account">
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <h3 class="mt-3 mb-4">{{ $t('label.depreciation_linkage') }}</h3>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="account_linked" class="form-label">{{ $t('label.account_linked') }}</label>

                                <input type="text" class="form-control" id="account_linked">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item mb-4">
                            <div class="mb-3 position-relative">
                                <label for="depreciation_account" class="form-label">{{ $t('label.depreciation_account')
                                    }}</label>

                                <input type="text" class="form-control" id="depreciation_account">
                            </div>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col-md-4">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="consumption_rate" class="form-label">{{ $t('label.consumption_rate')
                                        }}</label>

                                    <input type="text" class="form-control" id="consumption_rate">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-check mb-3 ">
                                <input checked type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.declining_depreciation')
                                    }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-12">

                            <h4>{{ $t('label.accumulated_depreciation_account_classification') }}</h4>
                            <div class="form-check mb-3 mt-4">
                                <input type="checkbox" checked class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{ $t('label.not_a_depreciation_account')
                                    }}</label>
                            </div>
                            <div class="form-check mb-3 ">
                                <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{
                                    $t('label.accumulated_depreciation_to_profit_and_loss') }}</label>
                            </div>
                            <div class="form-check mb-3 ">
                                <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{
                                    $t('label.accumulated_depreciation_to_trading') }}</label>
                            </div>
                            <div class="form-check mb-3 ">
                                <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{
                                    $t('label.accumulated_depreciation_to_operating') }}</label>
                            </div>
                            <div class="form-check mb-3 ">
                                <input type="checkbox" class="form-check-input rounded-circle" id="remember" />
                                <label class="form-check-label" for="remember">{{
                                    $t('label.accumulated_depreciation_to_revenue_and_expense') }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>