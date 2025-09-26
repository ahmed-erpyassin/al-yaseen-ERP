import CreateMonthlyFinancialsComponent from "@/components/admin/taxes/monthlyFinancials/CreateMonthlyFinancialsComponent.vue";
import MonthlyFinancialsComponent from "@/components/admin/taxes/monthlyFinancials/MonthlyFinancialsComponent.vue";

export default [

    {
        path: "taxes",
        children: [
            {
                path: "monthly-financials",
                component: MonthlyFinancialsComponent,
                name: "admin.taxes.monthly_financials"
            },
            {
                path: "monthly-financials/create",
                component: CreateMonthlyFinancialsComponent,
                name: "admin.taxes.monthly_financials.create"
            },
        ]
    }

]