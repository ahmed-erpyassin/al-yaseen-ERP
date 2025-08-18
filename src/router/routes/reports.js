import CustomerCollectionPaymentReceiptsComponent from "@/components/admin/reports/CustomerCollectionPaymentReceiptsComponent.vue";
import CustomersBalancesComponent from "@/components/admin/reports/CustomersBalancesComponent.vue";
import CustomersFinancialMovementsComponent from "@/components/admin/reports/CustomersFinancialMovementsComponent.vue";
import CustomersIndexComponent from "@/components/admin/reports/CustomersIndexComponent.vue";
import CustomersStockMovementsComponent from "@/components/admin/reports/CustomersStockMovementsComponent.vue";
import DaliySalesReportComponent from "@/components/admin/reports/DaliySalesReportComponent.vue";
import EmployeesCollectionPaymentReceiptsComponent from "@/components/admin/reports/EmployeesCollectionPaymentReceiptsComponent.vue";
import PurchasesDeliveriesComponent from "@/components/admin/reports/PurchasesDeliveriesComponent.vue";
import PurchasesInvoicesComponent from "@/components/admin/reports/PurchasesInvoicesComponent.vue";
import ReportsComponent from "@/components/admin/reports/ReportsComponent.vue";
import SalesDeliveriesComponent from "@/components/admin/reports/SalesDeliveriesComponent.vue";
import SalesInvoiceComponent from "@/components/admin/reports/SalesInvoiceComponent.vue";
import SuppliersBalancesComponent from "@/components/admin/reports/SuppliersBalancesComponent.vue";
import SuppliersCollectionPaymentReceiptsComponent from "@/components/admin/reports/SuppliersCollectionPaymentReceiptsComponent.vue";
import SuppliersFinancialMovementsComponent from "@/components/admin/reports/SuppliersFinancialMovementsComponent.vue";
import SuppliersInexComponent from "@/components/admin/reports/SuppliersInexComponent.vue";
import SuppliersStockMovementsComponent from "@/components/admin/reports/SuppliersStockMovementsComponent.vue";
import AccountsCollectionPaymentReceiptsComponent from "./AccountsCollectionPaymentReceiptsComponent.vue";
import GeneralLedgerComponent from "@/components/admin/reports/GeneralLedgerComponent.vue";
import SaleriesComponent from "@/components/admin/reports/SaleriesComponent.vue";
import EmployeesIndexComponent from "@/components/admin/reports/EmployeesIndexComponent.vue";
import EmployeesTransactionsComponent from "@/components/admin/reports/EmployeesTransactionsComponent.vue";
import EmployeesBalancesComponent from "@/components/admin/reports/EmployeesBalancesComponent.vue";
import AccountingEntriesComponent from "@/components/admin/reports/AccountingEntriesComponent.vue";
import BalanceSheetComponent from "@/components/admin/accounting/balanceSheet/BalanceSheetComponent.vue";
import DebitAccountsComponent from "@/components/admin/reports/DebitAccountsComponent.vue";
import TrialBalanceComponent from "@/components/admin/reports/TrialBalanceComponent.vue";
import CreditAccountsComponent from "@/components/admin/reports/CreditAccountsComponent.vue";
import DepartmentBalancesComponent from "@/components/admin/reports/DepartmentBalancesComponent.vue";
import MonthlyAccountBalancesComponent from "@/components/admin/reports/MonthlyAccountBalancesComponent.vue";
import CompareBalancesBudgetComponent from "@/components/admin/reports/CompareBalancesBudgetComponent.vue";
import AccountsExceedingBudgetComponent from "@/components/admin/reports/AccountsExceedingBudgetComponent.vue";
import DailyReportComponent from "@/components/admin/reports/DailyReportComponent.vue";
import ItemsIndexComponent from "@/components/admin/reports/ItemsIndexComponent.vue";
import PriceListComponent from "@/components/admin/reports/PriceListComponent.vue";
import ItemBalancesComponent from "@/components/admin/reports/ItemBalancesComponent.vue";
import ItemsBelowMinComponent from "@/components/admin/reports/ItemsBelowMinComponent.vue";
import ItemsAboveMaxComponent from "@/components/admin/reports/ItemsAboveMaxComponent.vue";
import WarehouseBalancesComponent from "@/components/admin/reports/WarehouseBalancesComponent.vue";
import ManufacturingFormulaComponent from "@/components/admin/reports/ManufacturingFormulaComponent.vue";
import InactiveItemBalancesComponent from "@/components/admin/reports/InactiveItemBalancesComponent.vue";
import WarehouseMovementsComponent from "@/components/admin/reports/WarehouseMovementsComponent.vue";
import ItemMovementsComponent from "@/components/admin/reports/ItemMovementsComponent.vue";
import WarehouseMovementsByAccountComponent from "@/components/admin/reports/WarehouseMovementsByAccountComponent.vue";
import MonthlyNetSalesComponent from "@/components/admin/reports/MonthlyNetSalesComponent.vue";
import PurchaseSalePriceChangesComponent from "@/components/admin/reports/PurchaseSalePriceChangesComponent.vue";
import IncomingChecksComponent from "@/components/admin/reports/IncomingChecksComponent.vue";
import OutgoingChecksComponent from "@/components/admin/reports/OutgoingChecksComponent.vue";
import BankCashFlowComponent from "@/components/admin/reports/BankCashFlowComponent.vue";
import InvoicesWithoutStatementsComponent from "@/components/admin/reports/InvoicesWithoutStatementsComponent.vue";
import InvoiceWithoutVatComponent from "@/components/admin/reports/InvoiceWithoutVatComponent.vue";
import IncomeAndExpensesComponent from "@/components/admin/reports/IncomeAndExpensesComponent.vue";
import InvoicesTaxRateDiffComponent from "@/components/admin/reports/InvoicesTaxRateDiffComponent.vue";
import OffsetInvoicesComponent from "@/components/admin/reports/OffsetInvoicesComponent.vue";
import WithholdingOnVouchersComponent from "@/components/admin/reports/WithholdingOnVouchersComponent.vue";

export default [

    {
        path: "reports",
        children: [
            {
                path: "",
                component: ReportsComponent,
                name: "admin.reports"
            },{
                path: "sales-invoices",
                component: SalesInvoiceComponent,
                name: "admin.reports.sales_invoices"
            },{
                path: "sales-deliveries",
                component: SalesDeliveriesComponent,
                name: "admin.reports.sales_deliveries"
            },{
                path: "customers-index",
                component: CustomersIndexComponent,
                name: "admin.reports.customers_index"
            },{
                path: "customers-financial-movements",
                component: CustomersFinancialMovementsComponent,
                name: "admin.reports.customers_financial_movements"
            },{
                path: "customers-stock-movements",
                component: CustomersStockMovementsComponent,
                name: "admin.reports.customers_stock_movements"
            },{
                path: "customers-balances",
                component: CustomersBalancesComponent,
                name: "admin.reports.customers_balances"
            },{
                path: "daily-sales-report",
                component: DaliySalesReportComponent,
                name: "admin.reports.daily_sales_report"
            },{
                path: "purchases-invoices",
                component: PurchasesInvoicesComponent,
                name: "admin.reports.purchases_invoices"
            },{
                path: "purchases-shipments",
                component: PurchasesDeliveriesComponent,
                name: "admin.reports.purchases_shipments"
            },{
                path: "suppliers-index",
                component: SuppliersInexComponent,
                name: "admin.reports.suppliers_index"
            },{
                path: "suppliers-financial-movements",
                component: SuppliersFinancialMovementsComponent,
                name: "admin.reports.suppliers_financial_movements"
            },{
                path: "suppliers-stock-movements",
                component: SuppliersStockMovementsComponent,
                name: "admin.reports.suppliers_stock_movements"
            },{
                path: "suppliers-balances",
                component: SuppliersBalancesComponent,
                name: "admin.reports.suppliers_balances"
            },{
                path: "customers-payments-receipts",
                component: CustomerCollectionPaymentReceiptsComponent,
                name: "admin.reports.customers_payments_receipts"
            },{
                path: "suppliers-payments-receipts",
                component: SuppliersCollectionPaymentReceiptsComponent,
                name: "admin.reports.suppliers_payments_receipts"
            },{
                path: "employees-payments-receipts",
                component: EmployeesCollectionPaymentReceiptsComponent,
                name: "admin.reports.employees_payments_receipts"
            },{
                path: "accounts-payments-receipts",
                component: AccountsCollectionPaymentReceiptsComponent,
                name: "admin.reports.accounts_payments_receipts"
            },{
                path: "general-ledger",
                component: GeneralLedgerComponent,
                name: "admin.reports.general_ledger"
            },{
                path: "saleries",
                component: SaleriesComponent,
                name: "admin.reports.saleries"
            },{
                path: "employees-index",
                component: EmployeesIndexComponent,
                name: "admin.reports.employees_index"
            },{
                path: "employees-transactions",
                component: EmployeesTransactionsComponent,
                name: "admin.reports.employees_transactions"
            },{
                path: "employees-balances",
                component: EmployeesBalancesComponent,
                name: "admin.reports.employees_balances"
            },{
                path: "accounting-entries",
                component: AccountingEntriesComponent,
                name: "admin.reports.accounting_entries"
            },{
                path: "trial-balance",
                component: TrialBalanceComponent,
                name: "admin.reports.trial_balance"
            },{
                path: "debit-accounts",
                component: DebitAccountsComponent,
                name: "admin.reports.debit_accounts"
            },{
                path: "balance-sheet",
                component: BalanceSheetComponent,
                name: "admin.reports.balance_sheet"
            },{
                path: "credit-accounts",
                component: CreditAccountsComponent,
                name: "admin.reports.credit_accounts"
            },{
                path: "department-balances",
                component: DepartmentBalancesComponent,
                name: "admin.reports.department_balances"
            },{
                path: "monthly-account-balances",
                component: MonthlyAccountBalancesComponent,
                name: "admin.reports.monthly_account_balances"
            },{
                path: "compare-balances-budget",
                component: CompareBalancesBudgetComponent,
                name: "admin.reports.compare_balances_budget"
            },{
                path: "accounts-exceeding-budget",
                component: AccountsExceedingBudgetComponent,
                name: "admin.reports.accounts_exceeding_budget"
            },{
                path: "daily-report",
                component: DailyReportComponent,
                name: "admin.reports.daily_report"
            },{
                path: "items-index",
                component: ItemsIndexComponent,
                name: "admin.reports.items_index"
            },{
                path: "price-list",
                component: PriceListComponent,
                name : "admin.reports.price_list"
            },{
                path: "item-balances",
                component: ItemBalancesComponent,
                name : "admin.reports.item_balances"
            },{
                path: "items-below-min",
                component: ItemsBelowMinComponent,
                name : "admin.reports.items_below_min"
            },{
                path: "items-above-max",
                component: ItemsAboveMaxComponent,
                name : "admin.reports.items_above_max"
            },{
                path: "warehouse-balances",
                component: WarehouseBalancesComponent,
                name : "admin.reports.warehouse_balances"
            },{
                path: "manufacturing-formula",
                component: ManufacturingFormulaComponent,
                name : "admin.reports.manufacturing_formula"
            },{
                path: 'inactive-item-balances',
                component: InactiveItemBalancesComponent,
                name: "admin.reports.inactive_item_balances"
            },{
                path: 'warehouse-movements',
                component: WarehouseMovementsComponent,
                name: "admin.reports.warehouse_movements"
            },{
                path: 'item-movements',
                component: ItemMovementsComponent,
                name: "admin.reports.item_movements"
            },{
                path: 'warehouse-movements-by-account',
                component: WarehouseMovementsByAccountComponent,
                name: "admin.reports.warehouse_movements_by_account"
            },{
                path: 'monthly-net-sales',
                component: MonthlyNetSalesComponent,
                name: "admin.reports.monthly_net_sales"
            },{
                path: 'purchase-sale-price-changes',
                component: PurchaseSalePriceChangesComponent,
                name: "admin.reports.purchase_sale_price_changes"
            },{
                path: 'incoming-checks',
                component : IncomingChecksComponent,
                name : "admin.reports.incoming_checks"
            },{
                path: 'outgoing-checks',
                component: OutgoingChecksComponent,
                name : "admin.reports.outgoing_checks"
            },{
                path: 'bank-cash-flow',
                component: BankCashFlowComponent,
                name : "admin.reports.bank_cash_flow"
            },{
                path: 'invoice-without-statements',
                component: InvoicesWithoutStatementsComponent,
                name : "admin.reports.invoice_without_statements"
            },{
                path: 'invoice-without-vat',
                component: InvoiceWithoutVatComponent,
                name : "admin.reports.invoice_without_vat"
            },{
                path: 'income-and-expenses',
                component: IncomeAndExpensesComponent,
                name : "admin.reports.income_and_expenses"
            },{
                path: 'invoice-tax-rate-diff',
                component: InvoicesTaxRateDiffComponent,
                name : "admin.reports.invoice_tax_rate_diff"
            },{
                path: 'offset-invoices',
                component: OffsetInvoicesComponent,
                name : "admin.reports.offset_invoices"
            },{
                path: 'withholding-on-vouchers',
                component: WithholdingOnVouchersComponent,
                name : "admin.reports.withholding-on-vouchers"
            }
        ]
    }

]