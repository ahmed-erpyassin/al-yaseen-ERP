<template>
    <div class="container pe-5 ps-5">
        <h1 class="text-center"><i class="bi bi-image"></i> {{ $t('label.company_undefined') }}</h1>
        <div class="container mt-5">
            <h5 class="fw-bold mb-4">{{  $t('label.reports') }}</h5>
            <div class="row text-center mb-3">
                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.sales') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to="{ name : 'admin.reports.sales_invoices' }" class="list-group-item list-group-item-action">{{ $t('label.invoices') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.sales_deliveries' }" class="list-group-item list-group-item-action">{{ $t('label.shipments') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.customers_index' }" class="list-group-item list-group-item-action">{{ $t('label.customers_index') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.customers_financial_movements' }" class="list-group-item list-group-item-action">{{ $t('label.customers_financial_movements') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.customers_stock_movements' }" class="list-group-item list-group-item-action">{{ $t('label.customers_stock_movements') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.customers_balances' }" class="list-group-item list-group-item-action">{{ $t('label.customers_balances') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.daily_sales_report' }" class="list-group-item list-group-item-action">{{ $t('label.daily_sales_report') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.purchases') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to = "{ name : 'admin.reports.purchases_invoices' }" class="list-group-item list-group-item-action">{{ $t('label.invoices') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.purchases_shipments' }" class="list-group-item list-group-item-action">{{ $t('label.shipments') }}</router-link>                            
                                <router-link :to="{ name : 'admin.reports.suppliers_index' }" class="list-group-item list-group-item-action">{{ $t('label.suppliers_index') }}</router-link>                            
                                <router-link :to="{ name : 'admin.reports.suppliers_financial_movements' }" class="list-group-item list-group-item-action">{{ $t('label.suppliers_financial_movements') }}</router-link>                            
                                <router-link :to="{ name : 'admin.reports.suppliers_stock_movements' }" class="list-group-item list-group-item-action">{{ $t('label.suppliers_stock_movements') }}</router-link>                            
                                <router-link :to="{ name : 'admin.reports.suppliers_balances' }" class="list-group-item list-group-item-action">{{ $t('label.suppliers_balances') }}</router-link>                            
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header  rounded-0 text-white fw-bold">{{ $t('label.receipts_and_expenses') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to = "{ name : 'admin.reports.customers_payments_receipts' }" class="list-group-item list-group-item-action">{{ $t('label.customer_receipts_and_payments') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.suppliers_payments_receipts' }" class="list-group-item list-group-item-action">{{ $t('label.supplier_receipts_and_payments') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.employees_payments_receipts' }" class="list-group-item list-group-item-action">{{ $t('label.employee_receipts_and_payments') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.accounts_payments_receipts' }" class="list-group-item list-group-item-action">{{ $t('label.account_receipts_and_payments') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.general_ledger' }" class="list-group-item list-group-item-action">{{ $t('label.general_ledger') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center mb-3">
                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.employees') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to = "{ name : 'admin.reports.saleries' }" class="list-group-item list-group-item-action">{{ $t('label.salaries') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.employees_index' }" class="list-group-item list-group-item-action">{{ $t('label.employee_index') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.employees_transactions' }" class="list-group-item list-group-item-action">{{ $t('label.employee_transactions') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.employees_balances' }" class="list-group-item list-group-item-action">{{ $t('label.employee_balances') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.accounting') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to = "{ name : 'admin.reports.accounting_entries' }" class="list-group-item list-group-item-action">{{ $t('label.accounting_entries') }}</router-link>
                                <router-link :to="{ name: 'admin.reports.general_ledger' }" class="list-group-item list-group-item-action">{{ $t('label.general_ledger') }}</router-link>
                                <router-link :to="{ name: 'admin.reports.trial_balance' }" class="list-group-item list-group-item-action">{{ $t('label.trial_balance') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.balance_sheet' }" class="list-group-item list-group-item-action">{{ $t('label.balance_sheet') }}</router-link>
                                <router-link :to = "{ name: 'admin.reports.debit_accounts' }" class="list-group-item list-group-item-action">{{ $t('label.debit_accounts') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.credit_accounts' }" class="list-group-item list-group-item-action">{{ $t('label.credit_accounts') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.department_balances' }" class="list-group-item list-group-item-action">{{ $t('label.department_balances') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.monthly_account_balances' }" class="list-group-item list-group-item-action">{{ $t('label.monthly_account_balances') }}</router-link>
                                <router-link :to="{ name: 'admin.reports.compare_balances_budget' }" class="list-group-item list-group-item-action">{{ $t('label.budget_balance_comparison') }}</router-link>
                                <router-link :to = "{ name : 'admin.reports.accounts_exceeding_budget' }" class="list-group-item list-group-item-action">{{ $t('label.exceeded_budget_accounts') }}</router-link>
                                <router-link :to="{  name : 'admin.reports.daily_report' }" class="list-group-item list-group-item-action">{{ $t('label.daily_report') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header  rounded-0 text-white fw-bold">{{ $t('label.warehouses') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to="{ name : 'admin.reports.items_index' }" class="list-group-item list-group-item-action">{{ $t('label.items_index') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.price_list' }" class="list-group-item list-group-item-action">{{ $t('label.price_list') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.item_balances' }" class="list-group-item list-group-item-action">{{ $t('label.item_balances') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.items_below_min' }" class="list-group-item list-group-item-action">{{ $t('label.items_below_min') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.items_above_max' }" class="list-group-item list-group-item-action">{{ $t('label.items_above_max') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.warehouse_balances' }" class="list-group-item list-group-item-action">{{ $t('label.warehouse_balances') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.manufacturing_formula' }" class="list-group-item list-group-item-action">{{ $t('label.bom') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.inactive_item_balances' }" class="list-group-item list-group-item-action">{{ $t('label.inactive_item_balances') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.warehouse_movements' }" class="list-group-item list-group-item-action">{{ $t('label.warehouse_movements') }}</router-link>
                                <router-link :to="{ name: 'admin.reports.item_movements' }" class="list-group-item list-group-item-action">{{ $t('label.item_movements') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.warehouse_movements_by_account' }" class="list-group-item list-group-item-action">{{ $t('label.warehouse_movements_by_account') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.monthly_net_sales' }" class="list-group-item list-group-item-action">{{ $t('label.monthly_net_sales') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.purchase_sale_price_changes' }" class="list-group-item list-group-item-action">{{ $t('label.purchase_sale_price_changes') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center mb-3">
                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.cheques') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <router-link :to="{ name : 'admin.reports.incoming_checks' }" class="list-group-item list-group-item-action">{{ $t('label.incoming_checks') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.outgoing_checks' }" class="list-group-item list-group-item-action">{{ $t('label.outgoing_checks') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.bank_cash_flow'}" class="list-group-item list-group-item-action">{{ $t('label.bank_cash_flow') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.tax_reports') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.income_and_expenses') }}</a>
                                <router-link :to="{ name : 'admin.reports.invoice_without_statements' }" class="list-group-item list-group-item-action">{{ $t('label.invoices_not_in_cash_statements') }}</router-link>
                                <router-link :to="{ name : 'admin.reports.invoice_without_vat' }" class="list-group-item list-group-item-action">{{ $t('label.invoices_without_vat') }}</router-link>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.invoices_with_wrong_tax_rate') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.offset_invoices') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.withholding_on_vouchers') }}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header  rounded-0 text-white fw-bold">{{ $t('label.other_reports') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>

.card  {
    border: 0
}

.card-header  {
    background-color: #1D263B;
}
a.list-group-item.list-group-item-action {
    border-radius: 0;
    background-color: #E8FFF2;
    color: #214393;
    margin-bottom: 10px;
}
</style>