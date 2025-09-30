<template>
    <aside class="text-white" style="width: 250px;">
        <div class="d-flex align-items-center justify-content-between">
            <div class="logo rounded-1 p-1 w-100 mb-5 m-4">
                <div class="d-flex flex-row align-items-center justify-content-center" dir="ltr">
                    <img src="@/assets/logo.png" alt="Logo" width="67.37px" height="59.78px">
                    <div class="ms-0">
                        <p class='mb-0 text-dark'>Al Yaseen</p>
                        <p class="mb-0 text-success">ERP</p>
                    </div>
                </div>
            </div>
        </div>

        <ul class="nav flex-column">
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#new" aria-expanded="true" aria-controls="new">
                    <span class="fs-5">{{ $t('aside.New') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="new">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.customers.create' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.Add Customer') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-sales-invoice' }">
                                <span>{{ $t('aside.Add Sales Invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-supplier' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.Add Supplier') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-purchaseInvoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between" href="#">
                                <span>{{ $t('aside.Add Purchase Invoice') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-Recipet' }">
                                <span>{{ $t('aside.Add Receipt') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-employee' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.Add Employee') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-payment' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between" href="#">
                                <span>{{ $t('aside.Add Payment') }}</span>
                            </router-link>
                            <!-- <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-exchange' }">
                                <span>{{ $t('aside.Add Exchange') }}</span>
                            </router-link> -->
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-warehouse' }">
                                <span>{{ $t('aside.Add Warehouse') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-item' }">
                                <span>{{ $t('aside.Add Item') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-account' }">
                                <span>{{ $t('aside.Add Account') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>

            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#dashboard" aria-expanded="true"
                    aria-controls="dashboard">
                    <span class="fs-5">{{ $t('aside.home') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="dashboard">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.account-list' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.chart_of_accounts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.currency-rates' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.exchange_rates') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.currency-rates-from-internet' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.currency_rates_from_internet') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.banks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.banks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.contacts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.contact_info') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#sales" aria-expanded="true" aria-controls="sales">
                    <span class="fs-5">{{ $t('aside.sales') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="sales">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.customers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.customers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.outgoing-offers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.outgoing_offers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.orders' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_orders') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.shipments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_shipments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.sales-invoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.sales_invoices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.services' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.services') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.sales-return-invoices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.sales_return_invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.debit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.debit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.credit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.credit_notices') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#purchases" aria-expanded="true"
                    aria-controls="purchases">
                    <span class="fs-5">{{ $t('aside.purchases') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="purchases">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.purchase.suppliers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.suppliers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.incoming-offers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_offers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.outgoing-orders' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.outgoing_orders') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.incoming-shipments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_shipments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.purchases-invoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.purchases_invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.expenses' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.expenses') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.purcheses-return-invoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.purchases_return_invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.debit-notice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.debit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.credit-notice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.credit_notices') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#receipts_and_payments" aria-expanded="true"
                    aria-controls="receipts_and_payments">
                    <span class="fs-5">{{ $t('aside.receipts_and_payments') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="receipts_and_payments">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.recipts-and-payments.recipts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.recipts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.payments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.payments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.debit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.debit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.credit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.credit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.cashbox-transactions' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.cashbox_transactions') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <!-- <li class="nav-item pe-2 ps-2">
                <router-link :to="{ name: 'admin.projects' }"
                    class="nav-link d-flex align-items-center justify-content-between text-white">
                    <span class="fs-5">{{ $t('aside.projects') }}</span>

                </router-link>

            </li> -->
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#projects" aria-expanded="true" aria-controls="projects">
                    <span class="fs-5">{{ $t('aside.projects') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="projects">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.projects' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.projects') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.tasks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('breadcrumb.tasks') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#cheques" aria-expanded="true" aria-controls="cheques">
                    <span class="fs-5">{{ $t('aside.cheques') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="cheques">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.cheques.incoming_checks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_checks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.cheque_portfolio' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.cheque_portfolio') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.under_collection' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.under_collection') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.incoming_outgoing' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_outgoing') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.bank_reference' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.bank_reference') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.reference_holder' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.reference_holder') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.guarantor' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.guarantor') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.issued_checks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.issued_checks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.unpaid_checks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.unpaid_checks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.issued_paid' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.issued_paid') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.issued_bank_reference' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.issued_bank_reference') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.auto_disbursement' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.automatic_disbursement') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#accounting" aria-expanded="true"
                    aria-controls="accounting">
                    <span class="fs-5">{{ $t('label.accounting') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="accounting">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.accounting.accounts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.accounts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.chart_of_accounts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.chart_of_accounts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.journal_entries' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.journal_entries') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.budgets' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.budgets') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.balance_sheet' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.balance_sheet') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.departments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.departments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.funders' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.funders') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.assets' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.assets') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#employees" aria-expanded="true"
                    aria-controls="employees">
                    <span class="fs-5">{{ $t('label.employees') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="employees">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.employees' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.employees') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.employees.payroll_report' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.payroll_report') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.employees.attendance_sheet' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.attendance_sheet') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.employees.leaves' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.leaves') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.employees.journal_entries' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.journal_entries') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#warehouses" aria-expanded="true"
                    aria-controls="warehouses">
                    <span class="fs-5">{{ $t('label.warehouses') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="warehouses">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.warehouses.items' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.items') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.warehouses.chart_of_items' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.item_tree') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.warehouses.manufacturing-formula' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.manufacturing_formula') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.warehouses.manufacturing-formula.manufacturing' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.manufacturing') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.warehouses' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.warehouses') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.warehouses.warehouse_movements' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.warehouse_movements') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.warehouses.current_inventory_value' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.current_inventory_value') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#taxes" aria-expanded="true" aria-controls="taxes">
                    <span class="fs-5">{{ $t('label.taxes') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="taxes">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.taxes.monthly_financials' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.monthly_revenue_expense_report') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"
                    data-bs-toggle="collapse" data-bs-target="#reports" aria-expanded="true" aria-controls="reports">
                    <span class="fs-5">{{ $t('label.reports') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="reports">
                    <div>
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.reports' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.reports') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </aside>
</template>

<script>

import appService from '@/services/appService';

export default {

    name: "AsideComponent",
    data() {
        return {
            openBox: {
                id: null,
                collapse: false
            },
        }
    },
    methods: {
        toggle(boxId) {

            this.openBox.id = this.openBox.id === boxId ? null : boxId;
            this.openBox.collapse = this.openBox.collapse == true && this.openBox.id == boxId ? false : true;
        },
        enter(el) {
            appService.smoothEnter(el);
        },
        leave(el) {
            appService.smoothLeave(el);
        },
    }

}

</script>

<style>
aside {
    background-color: #1D263B;
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 30px;
    position: sticky;
    top: 0;
    width: 250px;
    scroll-behavior: smooth;
}

/* scrollbar */
aside::-webkit-scrollbar {
    width: 6px;
}

aside::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}

aside::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.6);
}

aside {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

/* logo */
aside .logo {
    background-color: #FFF6F6;
}

/* rotation for icon */
button i.rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

/* responsive */
@media (max-width: 992px) {
    aside {
        position: fixed;
        left: -260px;
        top: 0;
        width: 250px;
        z-index: 1050;
        transition: left 0.3s ease;
    }

    aside.open {
        left: 0;
    }
}

/* على الموبايل الصغير */
@media (max-width: 576px) {
    aside {
        width: 100%;
        /* يغطي الشاشة */
        left: -100%;
    }

    aside.open {
        left: 0;
    }
}
</style>