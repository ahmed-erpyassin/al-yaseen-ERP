import AccountsListComponent from "@/components/admin/dashboard/accounts/AccountsListComponent.vue";
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
    }
];