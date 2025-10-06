import AccountsListComponent from "@/components/admin/dashboard/accounts/AccountsListComponent.vue";
import EditAccountlistComponent from "@/components/admin/dashboard/accounts/EditAccountlistComponent.vue";
import CreateBankComponent from "@/components/admin/dashboard/banks/CreateBankComponent.vue";
import ListBanksComponent from "@/components/admin/dashboard/banks/ListBanksComponent.vue";
import EditBankComponent from "@/components/admin/dashboard/banks/EditBankComponent.vue";
import CreateContactComponent from "@/components/admin/dashboard/contacts/CreateContactComponent.vue";
import ListContactsComponent from "@/components/admin/dashboard/contacts/ListContactsComponent.vue";
import EditContactComponent from "@/components/admin/dashboard/contacts/EditContactComponent.vue";
import ListCurrencyRatesComponent from "@/components/admin/dashboard/currencyRates/ListCurrencyRatesComponent.vue";
import MangeCurrencyRatesComponent from "@/components/admin/dashboard/currencyRates/MangeCurrencyRatesComponent.vue";
import CurrencyRatesFromInternetComponent from "@/components/admin/dashboard/CurrencyRatesFromInternetComponent.vue";
import DashboardComponent from "@/components/admin/dashboard/DashboardComponent.vue";
import BranchesComponent from "@/components/admin/dashboard/branchs/BranchesComponent.vue";
import CreateBranchesComponent from "@/components/admin/dashboard/branchs/CreateBranchesComponent.vue";
import EditBranchesComponent from "@/components/admin/dashboard/branchs/EditBranchesComponent.vue";

export default [
  {
    path: "",
    component: DashboardComponent,
    name: "admin.dashboard",
  },
  {
    path: "accounts/list",
    component: AccountsListComponent,
    name: "admin.account-list",
  },
  {
    path: "/accounts/edit/:id",
    component: EditAccountlistComponent,
    name: "admin.account-edit",
  },
  {
    path: "currency-rates",
    children: [
      {
        path: "",
        name: "admin.currency-rates",
        component: ListCurrencyRatesComponent,
      },
      {
        path: "manage",
        component: MangeCurrencyRatesComponent,
        name: "admin.currency-rates.manage",
      },
    ],
  },
  {
    path: "currency-rates-from-internet",
    component: () => CurrencyRatesFromInternetComponent,
    name: "admin.currency-rates-from-internet",
  },
  {
    path: "banks",
    children: [
      {
        path: "",
        component: ListBanksComponent,
        name: "admin.banks",
      },
      {
        path: "create",
        component: CreateBankComponent,
        name: "admin.banks.create",
      },
      {
        path: ":id/edit",
        component: EditBankComponent,
        name: "admin.banks.edit",
      },
    ],
  },
  {
    path: "contacts",
    children: [
      {
        path: "",
        component: ListContactsComponent,
        name: "admin.contacts",
      },
      {
        path: "create",
        component: CreateContactComponent,
        name: "admin.contacts.create",
      },
      {
        path: ":id/edit",
        component: EditContactComponent,
        name: "admin.contacts.edit",
      },
    ],
  },
  {
    path: "branches",
  children: [
    {
      path: "",
      component: BranchesComponent,
      name: "admin.branches",
    },
    {
      path: "create",
      component: CreateBranchesComponent,
      name: "admin.branches.create",
    },
    {
      path: ":id/edit",
      component: EditBranchesComponent,
      name: "admin.branches.edit",
    },
  ]
  },
];
