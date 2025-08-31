<template>
    <div class="container pe-5 ps-5">
        <h1><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn btn-lg btn-success me-3 ms-3" type="button">
                {{ $t('buttons.copy') }}
            </button>
            <button class="btn btn-lg btn-danger" type="button">
                {{ $t('buttons.cancel') }}
            </button>
        </div>

        <div class="row">
            <div class="col-12">
                <h3 class="mb-5">{{ $t('label.group_settings') }}</h3>
            </div>
        </div>
        <form class="form">

            <div class="tabs">
                <ul class="nav nav-pills justify-content-start rounded-2" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="accounts-tab" data-bs-toggle="tab"
                            data-bs-target="#general_data" type="button" role="tab" aria-controls="accounts"
                            aria-selected="true">
                            {{ $t('label.general_data') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="accounts_and_journal_entries-tab" data-bs-toggle="tab"
                            data-bs-target="#accounts_and_journal_entries" type="button" role="tab"
                            aria-controls="accounts_and_journal_entries" aria-selected="false">
                            {{ $t('label.accounts_and_journal_entries') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="individuals-tab" data-bs-toggle="tab" data-bs-target="#individuals"
                            type="button" role="tab" aria-controls="individuals" aria-selected="false">
                            {{ $t('label.entities') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="items-tab" data-bs-toggle="tab" data-bs-target="#items"
                            type="button" role="tab" aria-controls="items" aria-selected="false">
                            {{ $t('label.items') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="documents-tab" data-bs-toggle="tab" data-bs-target="#documents"
                            type="button" role="tab" aria-controls="documents" aria-selected="false">
                            {{ $t('label.on_add') }}
                        </button>
                    </li>

                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="others-tab" data-bs-toggle="tab" data-bs-target="#others"
                            type="button" role="tab" aria-controls="others" aria-selected="false">
                            {{ $t('label.printing') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="others-tab" data-bs-toggle="tab" data-bs-target="#others"
                            type="button" role="tab" aria-controls="others" aria-selected="false">
                            {{ $t('label.security_and_privacy') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="others-tab" data-bs-toggle="tab" data-bs-target="#others"
                            type="button" role="tab" aria-controls="others" aria-selected="false">
                            {{ $t('label.others') }}
                        </button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="general_data" role="tabpanel"
                        aria-labelledby="accounts-tab">
                        <form class="form" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="company_name" class="form-label">{{ $t('label.company_name')
                                                }}</label>
                                            <input type="text" v-model="form.company_name" id="company_name"
                                                class="form-control rounded-1" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.company_name">{{
                                            errors.company_name[0] }}
                                        </p>
                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="company_type" class="form-label">{{ $t('label.company_field')
                                                }}</label>

                                            <VueSelect v-model="form.company_type" :options="companyTypes"
                                                :label="locale === 'ar' ? 'title_ar' : 'title_en'"
                                                :reduce="company => company.id" placeholder="" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.company_type">{{
                                            errors.company_type[0] }}
                                        </p>

                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="company_address" class="form-label">{{
                                                $t('label.company_address')
                                            }}</label>
                                            <input type="text" v-model="form.company_address" id="company_address"
                                                class="form-control rounded-1"
                                                :placeholder="$t('label.company_address_placeholder')" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.company_address">{{
                                            errors.company_address[0]
                                            }}
                                        </p>

                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="email" class="form-label">{{ $t('label.email') }}</label>
                                            <div class="position-relative group">
                                                <input type="email" v-model="form.email" id="email"
                                                    class="form-control rounded-1" placeholder="yassin2029@gmail.com" />
                                                <i class="bi bi-envelope"></i>
                                            </div>
                                            <p class='text-danger form-text' v-if="errors.email">
                                                {{ errors.email[0] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="commerical_registration_number" class="form-label">{{
                                                $t('label.commerical_registration_number') }}</label>
                                            <div class="position-relative group">
                                                <input type="text" v-model="form.commercial_registration_number"
                                                    id="commercial_registration_number"
                                                    class="form-control rounded-1" />
                                            </div>
                                            <p class='text-danger form-text'
                                                v-if="errors.commercial_registration_number">
                                                {{ errors.commercial_registration_number[0] }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="work_type" class="form-label">{{ $t('label.work_type')
                                            }}</label>
                                            <VueSelect v-model="form.work_type" :options="workTypes"
                                                :label="locale === 'ar' ? 'title_ar' : 'title_en'"
                                                :reduce="workType => workType.id" placeholder="" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.workType">
                                            {{ errors.workType[0] }}
                                        </p>
                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="company_logo" class="form-label">{{ $t('label.company_logo')
                                                }}</label>
                                            <div class="position-relative ">
                                                <input type="file" @change="handleLogo" id="company_logo"
                                                    class="form-control rounded-0 w-100" />
                                            </div>
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.company_logo">
                                            {{ errors.company_logo[0] }}
                                        </p>
                                    </div>
                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="phone" class="form-label">{{ $t('label.phone_number') }}</label>
                                            <div class="position-relative group">
                                                <input type="tel" v-model="form.phone" id="phone"
                                                    class="form-control rounded-0 w-100" />
                                            </div>
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.phone">
                                            {{ errors.phone[0] }}
                                        </p>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-check mb-3">
                                        <input type="checkbox" v-model="form.allow_emails"
                                            class="form-check-input rounded-circle" id="remember" />
                                        <label class="form-check-label" for="remember">{{ $t('label.messages_push')
                                            }}</label>
                                    </div>
                                    <h4 class="mb-5">{{ $t('label.taxHeading') }}</h4>
                                </div>

                                <div class="col-md-6">
                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="income_tax_rate" class="form-label">{{
                                                $t('label.income_tax_rate')
                                            }}</label>
                                            <input type="text" v-model="form.income_tax_rate" id="income_tax_rate"
                                                class="form-control rounded-1" placeholder="20%" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.income_tax_rate">
                                            {{ errors.income_tax_rate[0] }}
                                        </p>
                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="fiscal_year" class="form-label">{{ $t('label.fiscal_year')
                                                }}</label>
                                            <input type="text" v-model="form.fiscal_year" id="fiscal_year"
                                                class="form-control rounded-1" placeholder="2026" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.fiscal_year">
                                            {{ errors.fiscal_year[0] }}
                                        </p>
                                    </div>

                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="currency" class="form-label">{{ $t('label.currency') }}</label>

                                            <VueSelect v-model="form.currency_id" :options="currencies"
                                                :label="locale === 'ar' ? 'name_ar' : 'name_en'"
                                                :reduce="currency => currency.id" placeholder="" />

                                        </div>
                                        <p class='text-danger form-text' v-if="errors.currency_id">
                                            {{ errors.currency_id[0] }}
                                        </p>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="item mb-4">
                                        <div class="mb-3 position-relative">
                                            <label for="added_tax_rate" class="form-label">{{ $t('label.added_tax_rate')
                                                }}</label>
                                            <input type="text" v-model="form.vat_rate" id="added_tax_rate"
                                                class="form-control rounded-1" placeholder="20%" />
                                        </div>
                                        <p class='text-danger form-text' v-if="errors.vat_rate">
                                            {{ errors.vat_rate[0] }}
                                        </p>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{ $t('label.from') }}</label>
                                                <input type="date" v-model="form.from" id="from"
                                                    class="form-control rounded-1" />
                                            </div>
                                            <p class='text-danger form-text' v-if="errors.from">
                                                {{ errors.from[0] }}
                                            </p>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 position-relative">
                                                <label for="to" class="form-label">{{ $t('label.to') }}</label>
                                                <input type="date" v-model="form.to" id="to"
                                                    class="form-control rounded-1" />
                                            </div>
                                            <p class='text-danger form-text' v-if="errors.to">
                                                {{ errors.to[0] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="accounts_and_journal_entries" role="tabpanel"
                        aria-labelledby="accounts_and_journal_entries-tab">
                        <div class="tabs accounts">
                            <ul class="nav nav-pills justify-content-start rounded-2" id="myTab2" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="accounts-tab" data-bs-toggle="tab"
                                        data-bs-target="#on_creating_journal_entries" type="button" role="tab"
                                        aria-controls="on_creating_journal_entries" aria-selected="true">
                                        {{ $t('label.on_creating_journal_entries') }}
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="manual_journal_entries-tab" data-bs-toggle="tab"
                                        data-bs-target="#manual_journal_entries" type="button" role="tab"
                                        aria-controls="manual_journal_entries" aria-selected="false">
                                        {{ $t('label.manual_journal_entries') }}
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="cash_bank_checks_accounts-tab" data-bs-toggle="tab"
                                        data-bs-target="#cash_bank_checks_accounts" type="button" role="tab"
                                        aria-controls="cash_bank_checks_accounts" aria-selected="false">
                                        {{ $t('label.cash_bank_checks_accounts') }}
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="tax_accounts-tab" data-bs-toggle="tab"
                                        data-bs-target="#tax_accounts" type="button" role="tab"
                                        aria-controls="tax_accounts" aria-selected="false">
                                        {{ $t('label.tax_accounts') }}
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="trading_accounts-tab" data-bs-toggle="tab"
                                        data-bs-target="#trading_accounts" type="button" role="tab"
                                        aria-controls="trading_accounts" aria-selected="false">
                                        {{ $t('label.trading_accounts') }}
                                    </button>
                                </li>

                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="customers_suppliers_accounts-tab" data-bs-toggle="tab"
                                        data-bs-target="#customers_suppliers_accounts" type="button" role="tab"
                                        aria-controls="customers_suppliers_accounts" aria-selected="false">
                                        {{ $t('label.customers_suppliers_accounts') }}
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="other_accounts-tab" data-bs-toggle="tab"
                                        data-bs-target="#other_accounts" type="button" role="tab"
                                        aria-controls="other_accounts" aria-selected="false">
                                        {{ $t('label.other_accounts') }}
                                    </button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade active show" id="on_creating_journal_entries" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <strong class='text-primary'>{{
                                                $t('label.accounting_entries_setup')
                                            }}:</strong>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="detailed_entries" />
                                                <label class="form-check-label" for="detailed_entries">{{
                                                    $t('label.detailed_entries') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="detailed_entries_from_checks" />
                                                <label class="form-check-label" for="detailed_entries_from_checks">{{
                                                    $t('label.detailed_entries_from_checks') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="detailed_entries_from_vouchers" />
                                                <label class="form-check-label" for="detailed_entries_from_vouchers">{{
                                                    $t('label.detailed_entries_from_vouchers') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="detailed_entries_from_service_invoices" />
                                                <label class="form-check-label"
                                                    for="detailed_entries_from_service_invoices">{{
                                                        $t('label.detailed_entries_from_service_invoices') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="separate_tax_from_invoice" />
                                                <label class="form-check-label" for="separate_tax_from_invoice">{{
                                                    $t('label.separate_tax_from_invoice') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="fill_cost_center" />
                                                <label class="form-check-label" for="fill_cost_center">{{
                                                    $t('label.fill_cost_center') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="use_check_receipt_date" />
                                                <label class="form-check-label" for="use_check_receipt_date">{{
                                                    $t('label.use_check_receipt_date') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="entries_in_english" />
                                                <label class="form-check-label" for="entries_in_english">{{
                                                    $t('label.entries_in_english')
                                                }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="create_reverse_entry" />
                                                <label class="form-check-label" for="create_reverse_entry">{{
                                                    $t('label.create_reverse_entry')
                                                }}</label>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <strong class="text-primary">{{ $t('label.currency_usage')
                                            }}:</strong>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="entry_amount_group_currency_doc_currency" />
                                                <label class="form-check-label"
                                                    for="entry_amount_group_currency_doc_currency">{{
                                                        $t('label.entry_amount_group_currency_doc_currency') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="entry_amount_group_currency_account_currency" />
                                                <label class="form-check-label"
                                                    for="entry_amount_group_currency_account_currency">{{
                                                        $t('label.entry_amount_group_currency_account_currency') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="entry_amount_doc_currency_account_currency" />
                                                <label class="form-check-label"
                                                    for="entry_amount_doc_currency_account_currency">{{
                                                        $t('label.entry_amount_doc_currency_account_currency') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="transportation_entries" />
                                                <label class="form-check-label" for="transportation_entries">{{
                                                    $t('label.transportation_entries') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="cost_center_entries_for_transfers" />
                                                <label class="form-check-label"
                                                    for="cost_center_entries_for_transfers">{{
                                                        $t('label.cost_center_entries_for_transfers') }}</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-pane fade " id="manual_journal_entries" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <ul class="list-group-item">
                                        <li class="list-group-item">
                                            <strong class="text-primary">{{ $t('label.add_edit_entries')
                                            }}:</strong>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="check_account_amount_equals_group_amount" />
                                                <label class="form-check-label"
                                                    for="check_account_amount_equals_group_amount">{{
                                                        $t('label.check_account_amount_equals_group_amount') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="check_entry_balance_with_same_currency" />
                                                <label class="form-check-label"
                                                    for="check_entry_balance_with_same_currency">{{
                                                        $t('label.check_entry_balance_with_same_currency') }}</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="transfer_account_description" />
                                                <label class="form-check-label" for="transfer_account_description">{{
                                                    $t('label.transfer_account_description') }}</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-pane fade " id="cash_bank_checks_accounts" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <div class="row">
                                        <h5 class='text-primary mb-5'>{{ $t('label.cash_account') }}</h5>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.cash_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sub_cash') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.cash_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sub_cash') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.cash_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sub_cash') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.cash_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sub_cash') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.cash_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sub_cash') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <h5 class='text-primary mb-5'>{{ $t('label.checks_and_items') }}</h5>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.checks_portfolio_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.returned_checks_portfolio') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane fade " id="tax_accounts" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <div class="row mt-5">
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.vat_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.vat_due') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.salary_vat_deductions') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.payment_vat_deductions') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.receipt_vat_deductions') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.overtime_allowance_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <h4 class='text-primary fw-bold mb-5'>{{
                                            $t('label.withholding_and_addition_tax') }}
                                        </h4>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.withholding_tax_purchase') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.addition_tax_purchase') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.withholding_tax_sales') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.addition_tax_sales') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.withholding_tax_payable') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.withholding_tax_balance') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.withholding_calculation_method') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade " id="trading_accounts" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <div class="row mt-5">
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sales_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.sales_return_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.services_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.allowed_discount_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.allowed_addition_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.debit_notes_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-6 mb-3">
                                                <div class="mb-3 position-relative">
                                                    <label for="from" class="form-label">{{
                                                        $t('label.purchases_account') }}</label>
                                                    <input type="text" id="from" class="form-control rounded-1" />

                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="mb-3 position-relative">
                                                    <label for="from" class="form-label">{{
                                                        $t('label.purchases_return_account') }}</label>
                                                    <input type="text" id="from" class="form-control rounded-1" />

                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="mb-3 position-relative">
                                                    <label for="from" class="form-label">{{
                                                        $t('label.expenses_account') }}</label>
                                                    <input type="text" id="from" class="form-control rounded-1" />

                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="mb-3 position-relative">
                                                    <label for="from" class="form-label">{{
                                                        $t('label.earned_discount_account') }}</label>
                                                    <input type="text" id="from" class="form-control rounded-1" />

                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="mb-3 position-relative">
                                                    <label for="from" class="form-label">{{
                                                        $t('label.earned_addition_account') }}</label>
                                                    <input type="text" id="from" class="form-control rounded-1" />

                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="mb-3 position-relative">
                                                    <label for="from" class="form-label">{{
                                                        $t('label.credit_notes_account') }}</label>
                                                    <input type="text" id="from" class="form-control rounded-1" />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade " id="customers_suppliers_accounts" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <div class="row mt-5">
                                        <h4 class = "mb-3 text-primary fw-bold">{{ $t('label.misc_customers_accounts') }}</h4>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.first_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.second_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.third_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.fourth_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <h4 class="mb-5 text-primary fw-bold">{{ $t('label.customers_accounts') }}</h4>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.customer_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.suppliers_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.employees_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade " id="other_accounts" role="tabpanel"
                                    aria-labelledby="accounts-tab">
                                    <div class="row">
                                        <div class="col-md-6 mb-3 mt-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.employee_salaries_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3 mt-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.transport_wages_debit_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.transport_wages_credit_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.currency_difference_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.salary_allowances_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.overtime_allowance_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.transportation_allowance_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.social_insurance_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.employer_share_insurance_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="mb-3 position-relative">
                                                <label for="from" class="form-label">{{
                                                    $t('label.health_insurance_account') }}</label>
                                                <input type="text" id="from" class="form-control rounded-1" />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>

<script>
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import VueSelect from 'vue-select'
import { useI18n } from 'vue-i18n'
export default {
    name: "GroupDataComponent",
    components: { VueSelect },

    data() {
        return {
            locale: null,
            form: {
                company_name: '',
                commercial_registration_number: '',
                company_type: null,
                work_type: null,
                company_logo: null,
                company_address: '',
                email: '',
                country_code: '',
                phone: '',
                allow_emails: false,
                income_tax_rate: 0,
                vat_rate: 0,
                fiscal_year: 2026,
                from: '2026-01-01',
                to: '2026-12-31',
                currency_id: null,

            },
            iti: null,
            errors: []
        };
    },
    computed: {
        currencies: function () {

            return this.$store.getters['options/currencies'];

        },
        workTypes: function () {

            return this.$store.getters['options/workTypes'];

        },
        companyTypes: function () {

            return this.$store.getters['options/companyTypes'];

        },

    },
    async mounted() {
        const input = document.querySelector("#phone")
        this.iti = intlTelInput(input, {
            initialCountry: "PS",
            loadUtils: () => import("intl-tel-input/build/js/utils"),
            containerClass: 'w-100',
        });
        this.form.country_code = this.iti.getSelectedCountryData().dialCode;

        input.addEventListener("countrychange", () => {
            this.form.country_code = this.iti.getSelectedCountryData().dialCode;
        });
        const { locale } = useI18n();
        this.locale = locale.value;
        await this.$store.dispatch('options/getCurrencies');
        await this.$store.dispatch('options/getWorkTypes');
        await this.$store.dispatch('options/getCompanyTypes');
        this.isLoading = false;
    },
    methods: {
        handleLogo(event) {
            this.form.company_logo = event.target.files[0]
        },
        submitForm() {
            this.isLoading = true;
            this.errors = [];
            const formData = new FormData()

            formData.append('company_name', this.form.company_name)
            formData.append('commercial_registration_number', this.form.commercial_registration_number)
            formData.append('company_type', this.form.company_type)
            formData.append('work_type', this.form.work_type)
            formData.append('company_logo', this.form.company_logo)
            formData.append('company_address', this.form.company_address)
            formData.append('email', this.form.email)
            formData.append('country_code', this.form.country_code)
            formData.append('phone', this.form.phone)
            formData.append('allow_emails', this.form.allow_emails ? 1 : 0)
            formData.append('income_tax_rate', this.form.income_tax_rate)
            formData.append('vat_rate', this.form.vat_rate)
            formData.append('fiscal_year', this.form.fiscal_year)
            formData.append('from', this.form.from)
            formData.append('to', this.form.to)
            formData.append('currency_id', this.form.currency_id)

            this.$store.dispatch('auth/registerCompany', formData).then(res => {
                this.isLoading = false;
                if (res.data.success) {
                    this.$router.push("/admin");
                } else {
                    alert(res.data.message);
                }
            }).catch(err => {
                this.isLoading = false;

                if (err.response && err.response.status === 422) {
                    this.errors = err.response.data.errors;
                } else {
                    this.errorMsg = "Something went wrong";

                }
            });
        },
    }
};
</script>

<style scoped>
.tabs {
    margin-top: 20px;

}

.nav-pills {
    background-color: #1D263B;
}

.nav-pills .nav-link {
    border-radius: 0;
    background-color: #1D263B;
    color: #fff !important;
    margin: 0 5px;
}

.accounts .nav-pills {
    background-color: #1D7342;
}

.accounts .nav-pills .nav-link {
    border-radius: 0;
    background-color: #1D7342;
    color: #fff !important;
    margin: 0 5px;
}

.nav-pills .nav-link.active {
    background-color: #FFF;
    color: #333 !important;
}

.tab-content {
    margin-top: 20px;
    padding: 10px;
    border-top: none;
}

.tab-content {
    margin-top: 7px;
}

.list-group-item {
    border: none;
    padding: 0.5rem 1rem;
}
</style>