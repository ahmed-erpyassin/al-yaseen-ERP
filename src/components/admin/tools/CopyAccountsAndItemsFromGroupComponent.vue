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
                <h3 class="mb-5">{{ $t('label.copy_accounts_and_items_from_group') }}</h3>
                <p>{{ $t('label.source_group') }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="main_group_name" class="form-label">{{ $t('label.main_group_name') }}</label>
                        <input type="text" id="main_group_name" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="sub_group_name" class="form-label">{{ $t('label.sub_group_name') }}</label>
                        <input type="text" id="sub_group_name" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-4">
                    <div class="mb-3 position-relative">
                        <label for="fiscal_year" class="form-label">{{ $t('label.fiscal_year') }}</label>
                        <input type="text" id="fiscal_year" class="form-control rounded-1" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs Section -->
        <div class="tabs">
            <ul class="nav nav-pills justify-content-start rounded-2" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="accounts-tab" data-bs-toggle="tab" data-bs-target="#accounts"
                        type="button" role="tab" aria-controls="accounts" aria-selected="true">
                        {{ $t('label.copy_accounts') }}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="individuals-tab" data-bs-toggle="tab" data-bs-target="#individuals"
                        type="button" role="tab" aria-controls="individuals" aria-selected="false">
                        {{ $t('label.copy_individuals') }}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="items-tab" data-bs-toggle="tab" data-bs-target="#items" type="button"
                        role="tab" aria-controls="items" aria-selected="false">
                        {{ $t('label.copy_items') }}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="documents-tab" data-bs-toggle="tab" data-bs-target="#documents"
                        type="button" role="tab" aria-controls="documents" aria-selected="false">
                        {{ $t('label.copy_documents') }}
                    </button>
                </li>

                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="others-tab" data-bs-toggle="tab" data-bs-target="#others" type="button"
                        role="tab" aria-controls="others" aria-selected="false">
                        {{ $t('label.copy_others') }}
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="accounts" role="tabpanel" aria-labelledby="accounts-tab">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_accounts_option" />
                                <label class="form-check-label" for="copy_accounts_option">{{
                                    $t('label.copy_accounts_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="update_accounts_option" />
                                <label class="form-check-label" for="update_accounts_option">{{
                                    $t('label.update_accounts_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_notes_option" />
                                <label class="form-check-label" for="copy_notes_option">{{ $t('label.copy_notes_option')
                                    }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="update_notes_option" />
                                <label class="form-check-label" for="update_notes_option">{{
                                    $t('label.update_notes_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_images_option" />
                                <label class="form-check-label" for="copy_images_option">{{
                                    $t('label.copy_images_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="update_images_option" />
                                <label class="form-check-label" for="update_images_option">{{
                                    $t('label.update_images_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_divisions_option" />
                                <label class="form-check-label" for="copy_divisions_option">{{
                                    $t('label.copy_divisions_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_points_option" />
                                <label class="form-check-label" for="copy_points_option">{{
                                    $t('label.copy_points_option') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_distribution_option" />
                                <label class="form-check-label" for="copy_distribution_option">{{
                                    $t('label.copy_distribution_option') }}</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="individuals" role="tabpanel" aria-labelledby="items-tab">
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_accounts_option" />
                                        <label class="form-check-label" for="copy_customers">{{
                                            $t('label.copy_customers') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_customers" />
                                        <label class="form-check-label" for="update_customers">{{
                                            $t('label.update_customers') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_customer_notes" />
                                        <label class="form-check-label" for="copy_customer_notes">{{
                                            $t('label.copy_customer_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_customer_notes" />
                                        <label class="form-check-label" for="update_customer_notes">{{
                                            $t('label.update_customer_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_customer_images" />
                                        <label class="form-check-label" for="copy_customer_images">{{
                                            $t('label.copy_customer_images') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_customer_images" />
                                        <label class="form-check-label" for="update_customer_images">{{
                                            $t('label.update_customer_images') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="create_journal_entry_transfer_customer_balances" />
                                        <label class="form-check-label"
                                            for="create_journal_entry_transfer_customer_balances">{{
                                                $t('label.create_journal_entry_transfer_customer_balances') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="copy_customer_points_balances" />
                                        <label class="form-check-label" for="copy_customer_points_balances">{{
                                            $t('label.copy_customer_points_balances') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="copy_account_points_balances" />
                                        <label class="form-check-label" for="copy_account_points_balances">{{
                                            $t('label.copy_account_points_balances') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="copy_distribution_accounts" />
                                        <label class="form-check-label" for="copy_distribution_accounts">{{
                                            $t('label.copy_distribution_accounts') }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6 mb-5">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_suppliers" />
                                        <label class="form-check-label" for="copy_suppliers">{{
                                            $t('label.copy_suppliers') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_suppliers" />
                                        <label class="form-check-label" for="update_suppliers">{{
                                            $t('label.update_suppliers') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_supplier_notes" />
                                        <label class="form-check-label" for="copy_supplier_notes">{{
                                            $t('label.copy_supplier_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_supplier_notes" />
                                        <label class="form-check-label" for="update_supplier_notes">{{
                                            $t('label.update_supplier_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_supplier_images" />
                                        <label class="form-check-label" for="copy_supplier_images">{{
                                            $t('label.copy_supplier_images') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_supplier_images" />
                                        <label class="form-check-label" for="update_supplier_images">{{
                                            $t('label.update_supplier_images') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="create_journal_entry_transfer_supplier_balances" />
                                        <label class="form-check-label"
                                            for="create_journal_entry_transfer_supplier_balances">{{
                                                $t('label.create_journal_entry_transfer_supplier_balances') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="copy_supplier_points_balances" />
                                        <label class="form-check-label" for="copy_supplier_points_balances">{{
                                            $t('label.copy_supplier_points_balances') }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6 mb-5 mt-5">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_employees" />
                                        <label class="form-check-label" for="copy_employees">{{
                                            $t('label.copy_employees') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_employees" />
                                        <label class="form-check-label" for="update_employees">{{
                                            $t('label.update_employees') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_employee_notes" />
                                        <label class="form-check-label" for="copy_employee_notes">{{
                                            $t('label.copy_employee_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_employee_notes" />
                                        <label class="form-check-label" for="update_employee_notes">{{
                                            $t('label.update_employee_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_employee_images" />
                                        <label class="form-check-label" for="copy_employee_images">{{
                                            $t('label.copy_employee_images') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_employee_images" />
                                        <label class="form-check-label" for="update_employee_images">{{
                                            $t('label.update_employee_images') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="create_journal_entry_transfer_employee_balances" />
                                        <label class="form-check-label"
                                            for="create_journal_entry_transfer_employee_balances">{{
                                                $t('label.create_journal_entry_transfer_employee_balances') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="copy_employee_points_balances" />
                                        <label class="form-check-label" for="copy_employee_points_balances">{{
                                            $t('label.copy_employee_points_balances') }}</label>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="documents" role="tabpanel" aria-labelledby="documents-tab">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <strong class='text-primary'>{{ $t('label.copy_invoices_not_in_any_tax_statement')
                            }}:</strong>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="sales_invoices_option" />
                                <label class="form-check-label" for="sales_invoices_option">{{
                                    $t('label.sales_invoices_option') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="return_sales_invoices_option" />
                                <label class="form-check-label" for="return_sales_invoices_option">{{
                                    $t('label.return_sales_invoices_option') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="service_invoices_option" />
                                <label class="form-check-label" for="service_invoices_option">{{
                                    $t('label.service_invoices_option') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="city_invoices_option" />
                                <label class="form-check-label" for="city_invoices_option">{{
                                    $t('label.city_invoices_option') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="return_purchase_invoices_option" />
                                <label class="form-check-label" for="return_purchase_invoices_option">{{
                                    $t('label.return_purchase_invoices_option') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="purchase_invoices_option" />
                                <label class="form-check-label" for="purchase_invoices_option">{{
                                    $t('label.purchase_invoices_option') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="purchase_return_invoices" />
                                <label class="form-check-label" for="purchase_return_invoices">{{
                                    $t('label.purchase_return_invoices') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="expense_invoices" />
                                <label class="form-check-label" for="expense_invoices">{{ $t('label.expense_invoices')
                                }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="credit_notes" />
                                <label class="form-check-label" for="credit_notes">{{ $t('label.credit_notes')
                                }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <strong class="text-primary">{{ $t('label.copy_shipments_without_invoices') }}:</strong>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="outgoing_shipments" />
                                        <label class="form-check-label" for="outgoing_shipments">{{
                                            $t('label.outgoing_shipments') }}</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="incoming_shipments" />
                                        <label class="form-check-label" for="incoming_shipments">{{
                                            $t('label.incoming_shipments') }}</label>
                                    </div>
                                </div>
                            </div>

                        </li>
                        <li class="list-group-item">
                            <strong class="text-primary">{{ $t('label.copy_unpaid_checks_in') }}:</strong>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="check_portfolio" />
                                <label class="form-check-label" for="check_portfolio">{{
                                    $t('label.check_portfolio') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="bank_under_collection" />
                                <label class="form-check-label" for="bank_under_collection">{{
                                    $t('label.bank_under_collection') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="issued_not_cleared" />
                                <label class="form-check-label" for="issued_not_cleared">{{
                                    $t('label.issued_not_cleared') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="returned_check_portfolio" />
                                <label class="form-check-label" for="returned_check_portfolio">{{
                                    $t('label.returned_check_portfolio') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="returned_in_bank" />
                                <label class="form-check-label" for="returned_in_bank">{{
                                    $t('label.returned_in_bank') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <strong class='text-primary'>{{ $t('label.copy_active_unexecuted_offers_orders')
                                }}:</strong>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="outgoing_orders" />
                                <label class="form-check-label" for="outgoing_orders">{{
                                    $t('label.outgoing_orders') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="outgoing_quotations" />
                                <label class="form-check-label" for="outgoing_quotations">{{
                                    $t('label.outgoing_quotations') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                    id="sales_purchase_offer_order_templates" />
                                <label class="form-check-label" for="sales_purchase_offer_order_templates">{{
                                    $t('label.sales_purchase_offer_order_templates') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="incoming_orders" />
                                <label class="form-check-label" for="incoming_orders">{{
                                    $t('label.incoming_orders') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="incoming_quotations" />
                                <label class="form-check-label" for="incoming_quotations">{{
                                    $t('label.incoming_quotations') }}</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="items" role="tabpanel" aria-labelledby="individuals-tab">
                    <ul class="list-group">
                        <div class="row">
                            <div class="col-md-6">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_items" />
                                        <label class="form-check-label" for="copy_items">{{
                                            $t('label.copy_items') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_notes" />
                                        <label class="form-check-label" for="copy_notes">{{
                                            $t('label.copy_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_images" />
                                        <label class="form-check-label" for="copy_images">{{
                                            $t('label.copy_images') }}</label>
                                    </div>
                                </li>
                            </div>
                            <div class="col-md-6">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_items" />
                                        <label class="form-check-label" for="update_items">{{
                                            $t('label.update_items') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_notes" />
                                        <label class="form-check-label" for="update_notes">{{
                                            $t('label.update_notes') }}</label>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="update_images" />
                                        <label class="form-check-label" for="update_images">{{
                                            $t('label.update_images') }}</label>
                                    </div>
                                </li>
                            </div>
                        </div>
                        <div class="col-md-12">

                            <li class="list-group-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="copy_warehouses" />
                                    <label class="form-check-label" for="copy_warehouses">{{
                                        $t('label.copy_warehouses') }}</label>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="copy_counters" />
                                    <label class="form-check-label" for="copy_counters">{{
                                        $t('label.copy_counters') }}</label>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="copy_catalog_numbers" />
                                    <label class="form-check-label" for="copy_catalog_numbers">{{
                                        $t('label.copy_catalog_numbers') }}</label>
                                </div>
                            </li>
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="copy_manufacturing_formulas" />
                                        <label class="form-check-label" for="copy_manufacturing_formulas">{{
                                            $t('label.copy_manufacturing_formulas') }}</label>
                                    </div>
                                </li>
                            </div>
                            <div class="col-md-6">
                                <li class="list-group-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="update_manufacturing_formulas" />
                                        <label class="form-check-label" for="update_manufacturing_formulas">{{
                                            $t('label.update_manufacturing_formulas') }}</label>
                                    </div>
                                </li>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <li class="list-group-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox"
                                        id="copy_device_numbers_and_expiry_dates" />
                                    <label class="form-check-label" for="copy_device_numbers_and_expiry_dates">{{
                                        $t('label.copy_device_numbers_and_expiry_dates') }}</label>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox"
                                        id="create_opening_entry_transfer_item_balances" />
                                    <label class="form-check-label" for="create_opening_entry_transfer_item_balances">{{
                                        $t('label.create_opening_entry_transfer_item_balances') }}</label>
                                </div>
                            </li>
                        </div>

                    </ul>
                </div>
                <div class="tab-pane fade" id="others" role="tabpanel" aria-labelledby="others-tab">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_group_constants" />
                                <label class="form-check-label" for="copy_group_constants">{{
                                    $t('label.copy_group_constants') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_book_numbers" />
                                <label class="form-check-label" for="copy_book_numbers">{{
                                    $t('label.copy_book_numbers') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_content_accounts" />
                                <label class="form-check-label" for="copy_content_accounts">{{
                                    $t('label.copy_content_accounts') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="update_group_notes" />
                                <label class="form-check-label" for="update_group_notes">{{
                                    $t('label.update_group_notes') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_group_notes" />
                                <label class="form-check-label" for="copy_group_notes">{{
                                    $t('label.copy_group_notes') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_assets" />
                                <label class="form-check-label" for="copy_assets">{{
                                    $t('label.copy_assets') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_asset_images" />
                                <label class="form-check-label" for="copy_asset_images">{{
                                    $t('label.copy_asset_images') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="update_assets" />
                                <label class="form-check-label" for="update_assets">{{
                                    $t('label.update_assets') }}</label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="copy_group_reports" />
                                <label class="form-check-label" for="copy_group_reports">{{
                                    $t('label.copy_group_reports') }}</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GroupDataCopyComponent",
    data() {
        return {};
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

.nav-pills .nav-link.active {
    background-color: #FFF;
    color: #333 !important;
}

.tab-content {
    margin-top: 20px;
    padding: 10px;
    border-top: none;
}

.list-group-item {
    border: none;
    padding: 0.5rem 1rem;
}
</style>