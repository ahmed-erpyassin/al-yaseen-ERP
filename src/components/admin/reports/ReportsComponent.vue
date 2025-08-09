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
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.suppliers_index') }}</a>                            
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.suppliers_financial_movements') }}</a>                            
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.suppliers_stock_movements') }}</a>                            
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.suppliers_balances') }}</a>                            
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header  rounded-0 text-white fw-bold">{{ $t('label.receipts_and_expenses') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.customer_receipts_and_payments') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.supplier_receipts_and_payments') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.employee_receipts_and_payments') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.account_receipts_and_payments') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.general_ledger') }}</a>
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
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.salaries') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.employee_index') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.employee_transactions') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.employee_balances') }}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header rounded-0  text-white fw-bold">{{ $t('label.accounting') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.accounting_entries') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.general_ledger') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.trial_balance') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.balance_sheet') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.debit_accounts') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.credit_accounts') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.department_balances') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.monthly_account_balances') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.budget_balance_comparison') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.exceeded_budget_accounts') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.daily_report') }}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="card h-100 rounded-0">
                        <div class="card-header  rounded-0 text-white fw-bold">{{ $t('label.warehouses') }}</div>
                        <div class="card-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.items_index') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.price_list') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.item_balances') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.items_below_min') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.items_above_max') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.warehouse_balances') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.bom') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.inactive_item_balances') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.warehouse_movements') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.item_movements') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.warehouse_movements_by_account') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.monthly_net_sales') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.purchase_sale_price_changes') }}</a>
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
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.incoming_checks') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.outgoing_checks') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.bank_cash_flow') }}</a>
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
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.invoices_not_in_cash_statements') }}</a>
                                <a href="#" class="list-group-item list-group-item-action">{{ $t('label.invoices_without_vat') }}</a>
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