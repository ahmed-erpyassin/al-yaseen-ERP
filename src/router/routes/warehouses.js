import ChartOfItemsComponent from "@/components/admin/warehouses/chartOfItems/ChartOfItemsComponent.vue";
import CurrentInventoryValueComponent from "@/components/admin/warehouses/currentInventoryValue/CurrentInventoryValueComponent.vue";
import CreateItemComponent from "@/components/admin/warehouses/items/CreateItemComponent.vue";
import ItemsComponent from "@/components/admin/warehouses/items/ItemsComponent.vue";
import ShowCustomerComponent from "@/components/admin/sales/customers/ShowCustomerComponent.vue";
import CreateManufacturingFormulaComponent from "@/components/admin/warehouses/manufacturingFormula/CreateManufacturingFormulaComponent.vue";
import ManufacturingComponent from "@/components/admin/warehouses/manufacturingFormula/ManufacturingComponent.vue";
import CreateManufacturingComponent from "@/components/admin/warehouses/manufacturingFormula/CreateManufacturingComponent.vue";
import ManufacturingFormulaComponent from "@/components/admin/warehouses/manufacturingFormula/ManufacturingFormulaComponent.vue";
import CreateWarehouseMovementComponent from "@/components/admin/warehouses/warehouseMovements/CreateWarehouseMovementComponent.vue";
import WarehouseMovementsComponent from "@/components/admin/warehouses/warehouseMovements/WarehouseMovementsComponent.vue";
import CreateWarehouseComponent from "@/components/admin/warehouses/warehouses/CreateWarehouseComponent.vue";
import WarehousesComponent from "@/components/admin/warehouses/warehouses/WarehousesComponent.vue";

export default [

    {
        path: "warehouses",
        children: [
            {
                path: "items",
                children: [
                    {
                        path: "",
                        component: ItemsComponent,
                        name: "admin.warehouses.items"
                    }, {
                        path: "items-create",
                        component: CreateItemComponent,
                        name: "admin.warehouses.items.create"
                    },{
                        path: "item-show",
                        component: ShowCustomerComponent,
                        name: "admin.warehouses.items.details"
                    }
                ]
            }, {
                path: "chart-of-items",
                component: ChartOfItemsComponent,
                name: "admin.warehouses.chart_of_items"
            }, {
                path: "manufacturing-formula",
                children: [
                    {
                        path: "",
                        component: ManufacturingFormulaComponent,
                        name: "admin.warehouses.manufacturing-formula"
                    }, {
                        path: "create",
                        component: CreateManufacturingFormulaComponent,
                        name: "admin.warehouses.manufacturing-formula.create"
                    }, {
                        path: "manufacturing",
                        component: ManufacturingComponent,
                        name: "admin.warehouses.manufacturing-formula.manufacturing"
                    }, {
                        path: "manufacturing/create",
                        component: CreateManufacturingComponent,
                        name: "admin.warehouses.manufacturing-formula.manufacturing.create"
                    }
                ]
            }, {
                path: "",
                children: [
                    {
                        path: "",
                        component: WarehousesComponent,
                        name: "admin.warehouses",
                    },
                    {
                        path: "create",
                        component: CreateWarehouseComponent,
                        name: "admin.warehouses.create"
                    }
                ]
            },{
                path: "warehouse-movements",
                children: [
                    {
                        path: "",
                        component: WarehouseMovementsComponent,
                        name: "admin.warehouses.warehouse_movements"
                    },{
                        path: "create",
                        component: CreateWarehouseMovementComponent,
                        name : "admin.warehouses.warehouse_movements.create"
                    }
                ]
            },{
                path: "current-inventory-value",
                component: CurrentInventoryValueComponent,
                name: "admin.warehouses.current_inventory_value"
            }
        ]
    }

]