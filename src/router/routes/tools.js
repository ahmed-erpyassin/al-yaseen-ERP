import CopyAccountsAndItemsFromGroupComponent from "@/components/admin/tools/CopyAccountsAndItemsFromGroupComponent.vue";
import GroupDataCopyComponent from "@/components/admin/tools/GroupDataCopyComponent.vue";

export default [

    {
        path: 'tools',
        children: [
            {
                path: "group-data-copy",
                component: GroupDataCopyComponent,
            },
            {
                path: "copy-accounts-and-items",
                component: CopyAccountsAndItemsFromGroupComponent,
            }
        ]
    }

]