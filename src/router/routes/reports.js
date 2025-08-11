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
            }
        ]
    }

]