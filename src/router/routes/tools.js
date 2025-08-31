import ChecksCurrencyRevaluationComponent from "@/components/admin/tools/ChecksCurrencyRevaluationComponent.vue";
import CopyAccountsAndItemsFromGroupComponent from "@/components/admin/tools/CopyAccountsAndItemsFromGroupComponent.vue";
import CreateUserComponent from "@/components/admin/tools/CreateUserComponent.vue";
import CurrencyRevaluationComponent from "@/components/admin/tools/CurrencyRevaluationComponent.vue";
import FileMaintenanceComponent from "@/components/admin/tools/FileMaintenanceComponent.vue";
import GroupDataAuditComponent from "@/components/admin/tools/GroupDataAuditComponent.vue";
import GroupDataCopyComponent from "@/components/admin/tools/GroupDataCopyComponent.vue";
import GroupDataRestoreComponent from "@/components/admin/tools/GroupDataRestoreComponent.vue";
import GroupSettingsComponent from "@/components/admin/tools/GroupSettingsComponent.vue";
import GroupTransactionCopyComponent from "@/components/admin/tools/GroupTransactionCopyComponent.vue";
import PostingClosingComponent from "@/components/admin/tools/PostingClosingComponent.vue";
import UserRecordsComponent from "@/components/admin/tools/UserRecordsComponent.vue";

export default [

    {
        path: 'tools',
        children: [
            {
                path: "group-data-copy",
                name: "admin.tools.group-data-copy",
                component: GroupDataCopyComponent,
            },
            {
                path: "copy-accounts-and-items",
                name: "admin.tools.copy-accounts-and-items",
                component: CopyAccountsAndItemsFromGroupComponent,
            },
            {
                path: "currency-revaluation",
                name: "admin.tools.currency-revaluation",
                component: CurrencyRevaluationComponent,
            },
            {
                path: "file-maintenance",
                name: "admin.tools.file-maintenance",
                component: FileMaintenanceComponent,
            },
            {
                path: "group-data-restore",
                name: "admin.tools.group-data-restore",
                component: GroupDataRestoreComponent,
            },
            {
                path: "group-transaction-copy",
                name: "admin.tools.group-transaction-copy",
                component: GroupTransactionCopyComponent,
            },
            {
                path: "group-data-audit",
                name: "admin.tools.group-data-audit",
                component: GroupDataAuditComponent,
            },
            {
                path: "checks-currency-revaluation",
                name: "admin.tools.checks-currency-revaluation",
                component: ChecksCurrencyRevaluationComponent,
            },
            {
                path: "posting-closing",
                name: "admin.tools.posting-closing",
                component: PostingClosingComponent,
            },
            {
                path: "group-settings",
                name: "admin.tools.group-settings",
                component: GroupSettingsComponent,
            },
            {
                path: "users",
                name: "admin.tools.users",
                component: UserRecordsComponent,
            },   
            {
                path: "users/create",
                name: "admin.tools.users.create",
                component: CreateUserComponent,
            },
        ]
    }

]