import AccountsListComponent from "@/components/admin/accounting/accounts/AccountsListComponent.vue";
import CreateAccountComponent from "@/components/admin/accounting/accounts/CreateAccountComponent.vue";
import AssetsComponent from "@/components/admin/accounting/assets/AssetsComponent.vue";
import CreateAssetComponent from "@/components/admin/accounting/assets/CreateAssetComponent.vue";
import BalanceSheetComponent from "@/components/admin/accounting/balanceSheet/BalanceSheetComponent.vue";
import BudgetsComponent from "@/components/admin/accounting/budgets/BudgetsComponent.vue";
import CreateBudgetComponent from "@/components/admin/accounting/budgets/CreateBudgetComponent.vue";
import ChartOfAccountsComponent from "@/components/admin/accounting/chartOfAccounts/ChartOfAccountsComponent.vue";
import CreateDapartmentComponent from "@/components/admin/accounting/departments/CreateDapartmentComponent.vue";
import DepartmentsComponent from "@/components/admin/accounting/departments/DepartmentsComponent.vue";
import CreateFunderComponent from "@/components/admin/accounting/funders/CreateFunderComponent.vue";
import FundersComponent from "@/components/admin/accounting/funders/FundersComponent.vue";
import CreateEntryComponent from "@/components/admin/accounting/journalEntries/CreateEntryComponent.vue";
import JournalEntriesComponent from "@/components/admin/accounting/journalEntries/JournalEntriesComponent.vue";

export default [
    {
        path: 'accounting',
        children: [
            {
                path: 'accounts',
                children: [

                    {
                        path: '',
                        component: AccountsListComponent,
                        name: "admin.accounting.accounts"
                    }, {
                        path: 'create',
                        component: CreateAccountComponent,
                        name: "admin.accounting.accounts.create"
                    }

                ]
            },
            {
                path: 'chart-of-accounts',
                component: ChartOfAccountsComponent,
                name: "admin.accounting.chart_of_accounts"
            }, {
                path: 'journal-entries',
                children: [
                    {
                        path: '',
                        component: JournalEntriesComponent,
                        name: "admin.accounting.journal_entries"
                    }, {
                        path: 'create',
                        component: CreateEntryComponent,
                        name: "admin.accounting.journal_entries.create"
                    }
                ]
            }, {
                path: 'budgets',
                children: [
                    {
                        path: '',
                        component: BudgetsComponent,
                        name: "admin.accounting.budgets"
                    }, {
                        path: 'create',
                        component: CreateBudgetComponent,
                        name: "admin.accounting.budgets.create"

                    }
                ]
            },{
                path: 'balance-sheet',
                component : BalanceSheetComponent,
                name: "admin.accounting.balance_sheet"
            },{
                path: 'departments',

                children : [
                    {
                        path: '',
                        component: DepartmentsComponent,
                        name: "admin.accounting.departments"
                    },{
                        path: 'create', 
                        component: CreateDapartmentComponent,
                        name: "admin.accounting.departments.create"
                    }
                ]
            },{
                path: "funders",
                children : [
                    {
                        path: '',
                        component: FundersComponent,
                        name: "admin.accounting.funders"
                    },{
                        path: "create",
                        component: CreateFunderComponent,
                        name: "admin.accounting.funders.create"
                    }
                ]
            },{
                path: "assets",
                children : [
                    {
                        path: '',
                        component: AssetsComponent,
                        name: "admin.accounting.assets"
                    },{
                        path: "create",
                        component: CreateAssetComponent,
                        name: "admin.accounting.assets.create"
                    }
                ]
            }
        ]
    }

]