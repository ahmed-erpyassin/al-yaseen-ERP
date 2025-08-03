<template>

    <div class="container pe-5 ps-5">
        <h1 class="mb-5"><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <form class="form">
            <h3 class="mb-3">{{ $t('label.budget_period') }}</h3>

            <div class="row mb-5">
                <div class="col-md-3">
                    <div class="form-check mb-1 ">
                        <input type="checkbox" class="form-check-input rounded-circle" id="by_fiscal_period" checked />
                        <label class="form-check-label" for="by_fiscal_period">{{
                            $t('label.by_fiscal_period') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle" id="from_date_to_date" />
                        <label class="form-check-label" for="from_date_to_date">{{
                            $t('label.from_date_to_date') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="period_start" class="form-label">{{ $t('label.period_start')
                                        }}</label>

                                    <input type="date" class="form-control" id="period_start">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="period_end" class="form-label">{{ $t('label.period_end')
                                        }}</label>

                                    <input type="date" class="form-control" id="period_end">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="mb-3">{{ $t('label.balance_sheet') }}</h3>
            <div class="row mb-3">
                <div class="col-md-3">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="currency" class="form-label">{{ $t('label.currency')
                            }}</label>

                            <select name="currency" id="currency" class="form-control">
                                <option value="1">جنية فلسطيني</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle"
                            id="use_account_currency_amount" />
                        <label class="form-check-label" for="use_account_currency_amount">{{
                            $t('label.use_account_currency_amount') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="use_first_dependency" />
                        <label class="form-check-label" for="use_first_dependency">{{
                            $t('label.use_first_dependency') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle"
                            id="use_all_account_currency_amounts" />
                        <label class="form-check-label" for="use_all_account_currency_amounts">{{
                            $t('label.use_all_account_currency_amounts') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle" id="hide_detailed_accounts" />
                        <label class="form-check-label" for="hide_detailed_accounts">{{
                            $t('label.hide_detailed_accounts') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle"
                            id="show_budget_currency_on_print" />
                        <label class="form-check-label" for="show_budget_currency_on_print">{{
                            $t('label.show_budget_currency_on_print') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input checked type="checkbox" class="form-check-input rounded-circle"
                            id="separate_agents_and_distributors_accounts" />
                        <label class="form-check-label" for="separate_agents_and_distributors_accounts">{{
                            $t('label.separate_agents_and_distributors_accounts') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle" id="show_account_numbers" />
                        <label class="form-check-label" for="show_account_numbers">{{
                            $t('label.show_account_numbers') }}</label>
                    </div>
                </div>

            </div>
            <div class="row mb-5">
                <div class="col-md-6">

                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="budget_without_inventory" />
                        <label class="form-check-label" for="budget_without_inventory">{{
                            $t('label.budget_without_inventory') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" class="form-check-input rounded-circle"
                            id="budget_without_depreciation" />
                        <label class="form-check-label" for="budget_without_depreciation">{{
                            $t('label.budget_without_depreciation') }}</label>
                    </div>
                </div>
            </div>
            <h3 class="mb-3">{{ $t('label.branch_values_funder') }}</h3>
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="row">
                        <p>{{ $t('label.first_classification') }}</p>

                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{ $t('label.from')
                                    }}</label>

                                    <input type="text" class="form-control" id="from">
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="to" class="form-label">{{ $t('label.to')
                                        }}</label>

                                    <input type="text" class="form-control" id="to">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">

                    <div class="row">
                        <p>{{ $t('label.second_classification') }}</p>

                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{ $t('label.from')
                                    }}</label>

                                    <input type="text" class="form-control" id="from">
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="to" class="form-label">{{ $t('label.to')
                                        }}</label>

                                    <input type="text" class="form-control" id="to">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="row">
                        <p>{{ $t('label.branch') }}</p>

                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{ $t('label.from')
                                    }}</label>

                                    <input type="text" class="form-control" id="from">
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="to" class="form-label">{{ $t('label.to')
                                        }}</label>

                                    <input type="text" class="form-control" id="to">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">

                    <div class="row">
                        <p>{{ $t('label.department') }}</p>
                        <div class="col-md-6">

                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{ $t('label.from')
                                    }}</label>

                                    <input type="text" class="form-control" id="from">
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="to" class="form-label">{{ $t('label.to')
                                        }}</label>

                                    <input type="text" class="form-control" id="to">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-6">

                    <div class="row">
                        <p>{{ $t('label.funder') }}</p>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="from" class="form-label">{{ $t('label.from')
                                    }}</label>

                                    <input type="text" class="form-control" id="from">
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item mb-4">
                                <div class="mb-3 position-relative">
                                    <label for="to" class="form-label">{{ $t('label.to')
                                        }}</label>

                                    <input type="text" class="form-control" id="to">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <h3 class="mb-5">{{ $t('label.ending_inventory') }}</h3>
                <div class="col-md-6">
                    <div class="item mb-4">
                        <div class="mb-3 position-relative">
                            <label for="to" class="form-label">{{ $t('label.evaluate_by')
                            }}</label>

                            <select name="evaluate_by" id="evaluate_by" class="form-control">
                                <option value="">{{ $t('label.purchase_price_1') }}</option>
                                <option value="">{{ $t('label.purchase_price_2') }}</option>
                                <option value="">{{ $t('label.purchase_price_3') }}</option>
                                <option value="">{{ $t('label.sale_price_1') }}</option>
                                <option value="">{{ $t('label.sale_price_2') }}</option>
                                <option value="">{{ $t('label.sale_price_3') }}</option>
                            </select>
                        </div>
                    </div>
                    <p class="fs-4 mb-3">{{ $t('label.extra_evaluation_method') }}</p>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="no_evaluation_extra_as_inventory" />
                        <label class="form-check-label" for="no_evaluation_extra_as_inventory">{{
                            $t('label.no_evaluation_extra_as_inventory') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="from_item_card_conditions" />
                        <label class="form-check-label" for="from_item_card_conditions">{{
                            $t('label.from_item_card_conditions') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="from_transactions_no_extra_valuation" />
                        <label class="form-check-label" for="from_transactions_no_extra_valuation">{{
                            $t('label.from_transactions_no_extra_valuation') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="additional_quantity_rate" />
                        <label class="form-check-label" for="additional_quantity_rate">{{
                            $t('label.additional_quantity_rate') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="unit_cost_price" />
                        <label class="form-check-label" for="unit_cost_price">{{
                            $t('label.unit_cost_price') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <p class="fs-4 mb-3">{{ $t('label.evaluation_method_used') }}</p>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="selected_price" />
                        <label class="form-check-label" for="selected_price">{{
                            $t('label.selected_price') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="fifo" />
                        <label class="form-check-label" for="fifo">{{
                            $t('label.fifo') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="lifo" />
                        <label class="form-check-label" for="lifo">{{
                            $t('label.lifo') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="average_purchase_price" />
                        <label class="form-check-label" for="average_purchase_price">{{
                            $t('label.average_purchase_price') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="average_sale_price" />
                        <label class="form-check-label" for="average_sale_price">{{
                            $t('label.average_sale_price') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle" id="last_sale_price" />
                        <label class="form-check-label" for="last_sale_price">{{
                            $t('label.last_sale_price') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="last_purchase_price" />
                        <label class="form-check-label" for="last_purchase_price">{{
                            $t('label.last_purchase_price') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="moving_average_price" />
                        <label class="form-check-label" for="moving_average_price">{{
                            $t('label.moving_average_price') }}</label>
                    </div>
                </div>

            </div>
            <div class="row mb-5">
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="lower_of_cost_or_market" />
                        <label class="form-check-label" for="lower_of_cost_or_market">{{
                            $t('label.lower_of_cost_or_market') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="inventory_zero_value_items" />
                        <label class="form-check-label" for="inventory_zero_value_items">{{
                            $t('label.inventory_zero_value_items') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="use_item_card_price" />
                        <label class="form-check-label" for="use_item_card_price">{{
                            $t('label.use_item_card_price') }}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="inventory_each_warehouse_separately" />
                        <label class="form-check-label" for="inventory_each_warehouse_separately">{{
                            $t('label.inventory_each_warehouse_separately') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="consider_returned_goods" />
                        <label class="form-check-label" for="consider_returned_goods">{{
                            $t('label.consider_returned_goods') }}</label>
                    </div>
                    <div class="form-check  ">
                        <input type="checkbox" checked class="form-check-input rounded-circle"
                            id="check_shipments_without_invoices" />
                        <label class="form-check-label" for="check_shipments_without_invoices">{{
                            $t('label.check_shipments_without_invoices') }}</label>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>