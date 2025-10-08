import CreditNoticesComponent from "@/components/admin/purchases/creditNotices/CreditNoticesComponent.vue";
import DebitNoticesComponent from "@/components/admin/purchases/debitNotices/DebitNoticesComponent.vue";
import ExpensesComponent from "@/components/admin/purchases/expenses/ExpensesComponent.vue";
import IncomingOffersComponent from "@/components/admin/purchases/incomingQuotations/IncomingOffersComponent.vue";
import OutgoingOrdersComponent from "@/components/admin/purchases/outgoingOrders/OutgoingOrdersComponent.vue";
import PurchaseReturnInvoiceComponent from "@/components/admin/purchases/purchaseReferenceInvoices/PurchaseReturnInvoiceComponent.vue";
import PurchasesInvoiceComponent from "@/components/admin/purchases/purchaseInvoices/PurchasesInvoiceComponent.vue";
import SuplliersComponent from "@/components/admin/purchases/suppliers/SuplliersComponent.vue";
import CreateSupplierComponent from "@/components/admin/purchases/suppliers/CreateSupplierComponent.vue";
import ShowSupplierComponent from "@/components/admin/purchases/suppliers/ShowSupplierComponent.vue";
import IncomingShipmentComponent from "@/components/admin/purchases/incomingShipments/incomingShipmentComponent.vue";
import CreateCreditNoticeComponent from "@/components/admin/purchases/creditNotices/CreateCreditNoticeComponent.vue";

export default [
  {
    path: "/suppliers",
    component: SuplliersComponent,
    name: "admin.purchase.suppliers",
  },
  {
    path: "/suppliers-create",
    component: CreateSupplierComponent,
    name: "admin.purchase.suppliers.create",
  },
  {
    path: "/suppliers-details",
    component: ShowSupplierComponent,
    name: "admin.purchase.suppliers.details",
  },
  {
    path: "/incoming-offers",
    component: IncomingOffersComponent,
    name: "admin.purchase.incoming-offers",
  },
  {
    path: "/outgoing-orders",
    component: OutgoingOrdersComponent,
    name: "admin.purchase.outgoing-orders",
  },
  {
    path: "/incoming-shipments",
    component: IncomingShipmentComponent,
    name: "admin.purchase.incoming-shipments",
  },
  {
    path: "/purchases-invoice",
    component: PurchasesInvoiceComponent,
    name: "admin.purchase.purchases-invoice",
  },
  {
    path: "/expenses",
    component: ExpensesComponent,
    name: "admin.purchase.expenses",
  },
  {
    path: "/purcheses-return-invoice",
    component: PurchaseReturnInvoiceComponent,
    name: "admin.purchase.purcheses-return-invoice",
  },
  {
    path: "/credit-notice",
    component: CreditNoticesComponent,
    name: "admin.purchase.credit-notice",
  },
  {
    path: "/credit-notice-create",
    component: CreateCreditNoticeComponent,
    name: "admin.new-purchase-credit-notice",
  },
  {
    path: "/debit-notice",
    component: DebitNoticesComponent,
    name: "admin.purchase.debit-notice",
  },
];
