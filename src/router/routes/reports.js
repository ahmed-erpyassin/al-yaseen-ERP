import CustomersBalancesComponent from "@/components/admin/reports/CustomersBalancesComponent.vue";
import CustomersFinancialMovementsComponent from "@/components/admin/reports/CustomersFinancialMovementsComponent.vue";
import CustomersIndexComponent from "@/components/admin/reports/CustomersIndexComponent.vue";
import CustomersStockMovementsComponent from "@/components/admin/reports/CustomersStockMovementsComponent.vue";
import DaliySalesReportComponent from "@/components/admin/reports/DaliySalesReportComponent.vue";
import PurchasesDeliveriesComponent from "@/components/admin/reports/PurchasesDeliveriesComponent.vue";
import PurchasesInvoicesComponent from "@/components/admin/reports/PurchasesInvoicesComponent.vue";
import ReportsComponent from "@/components/admin/reports/ReportsComponent.vue";
import SalesDeliveriesComponent from "@/components/admin/reports/SalesDeliveriesComponent.vue";
import SalesInvoiceComponent from "@/components/admin/reports/SalesInvoiceComponent.vue";

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
            }
        ]
    }

]