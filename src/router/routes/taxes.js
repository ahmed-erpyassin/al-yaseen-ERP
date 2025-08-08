import MonthlyFinancialsComponent from "@/components/admin/taxes/monthlyFinancials/MonthlyFinancialsComponent.vue";

export default [

    {
        path: "taxes",
        children: [
            {
                path: "monthly-financials",
                component: MonthlyFinancialsComponent,
                name: "admin.taxes.monthly_financials"
            }
        ]
    }

]