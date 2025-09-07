import AccountsListComponent from "@/components/admin/dashboard/accounts/AccountsListComponent.vue";
import CreateBankComponent from "@/components/admin/dashboard/banks/CreateBankComponent.vue";
import ListBanksComponent from "@/components/admin/dashboard/banks/ListBanksComponent.vue";
import CreateContactComponent from "@/components/admin/dashboard/contacts/CreateContactComponent.vue";
import ListContactsComponent from "@/components/admin/dashboard/contacts/ListContactsComponent.vue";
import ListCurrencyRatesComponent from "@/components/admin/dashboard/currencyRates/ListCurrencyRatesComponent.vue";
import MangeCurrencyRatesComponent from "@/components/admin/dashboard/currencyRates/MangeCurrencyRatesComponent.vue";
import CurrencyRatesFromInternetComponent from "@/components/admin/dashboard/CurrencyRatesFromInternetComponent.vue";
import DashboardComponent from "@/components/admin/dashboard/DashboardComponent.vue";

export default [
    {
        path: '',
        component: DashboardComponent,
        name: "admin.dashboard"
    },
    {
        path: 'accounts/list',
        component: AccountsListComponent,
        name: 'admin.account-list'
    },
    {
        path: 'currency-rates',
        children: [
            {
                path: '',
                name: 'admin.currency-rates',
                component: ListCurrencyRatesComponent
            }, {
                path: 'manage',
                name: "admin.currency-rates.manage",
                component: MangeCurrencyRatesComponent
            }
        ]
    },
    {
        path: 'currency-rates-from-internet',
        component: () => CurrencyRatesFromInternetComponent,
        name: 'admin.currency-rates-from-internet'
    },
    {
        path: 'banks',
        children: [
            {
                path: '',
                component: ListBanksComponent,
                name: 'admin.banks'
            },
            {
                path: 'create',
                component: CreateBankComponent,
                name: 'admin.banks.create'
            }
        ]

    },{
        path: 'contacts',
        children: [
            {
                path: '',
                component:  ListContactsComponent,
                name: 'admin.contacts'
            },
            {
                path: 'create',
                component:  CreateContactComponent,
                name: 'admin.contacts.create'
            }
        ]
    }
];