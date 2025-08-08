import CustomersIndexComponent from "@/components/admin/reports/CustomersIndexComponent.vue";
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
            }
        ]
    }

]