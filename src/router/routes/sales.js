import CreditNoticesComponent from "@/components/admin/sales/creditNotices/CreditNoticesComponent.vue";
import CustomersComponent from "@/components/admin/sales/customers/CustomersComponent.vue";
import EditCustomerComponent from "@/components/admin/sales/customers/EditCustomerComponent.vue";
import ShowCustomerComponent from "@/components/admin/sales/customers/ShowCustomerComponent.vue";
import DebitNoticesComponent from "@/components/admin/sales/DebitNotice/DebitNoticesComponent.vue";
import OffersComponent from "@/components/admin/sales/issuedQuotations/OffersComponent.vue";
import OrdersComponent from "@/components/admin/sales/incomingOrders/OrdersComponent.vue";
import SalesInvoiceComponent from "@/components/admin/sales/selesInvoice/SalesInvoiceComponent.vue";
import SalesReturnInvoices from "@/components/admin/sales/salesReferenceInvoices/SalesReturnInvoices.vue";
import ServicesComponent from "@/components/admin/sales/services/ServicesComponent.vue";
import OutgoingShipmentComponent from "@/components/admin/sales/outgoingShipments/OutgoingShipmentComponent.vue";

export default [
  {
    path: "customers",
    component: CustomersComponent,
    name: "admin.customers",
  },
  {
    path: "edit-customers",
    component: EditCustomerComponent,
    name: "admin.customers.edit",
  },
  {
    path: "show-customers",
    component: ShowCustomerComponent,
    name: "admin.customers.show",
  },
  {
    path: "outgoing-offers",
    component: OffersComponent,
    name: "admin.outgoing-offers",
  },
  {
    path: "orders",
    component: OrdersComponent,
    name: "admin.orders",
  },
  {
    path: "shipments",
    component: OutgoingShipmentComponent,
    name: "admin.shipments",
  },
  {
    path: "sales-invoice",
    component: SalesInvoiceComponent,
    name: "admin.sales-invoice",
  },
  {
    path: "services",
    component: ServicesComponent,
    name: "admin.services",
  },
  {
    path: "sales-return-invoices",
    component: SalesReturnInvoices,
    name: "admin.sales-return-invoices",
  },
  {
    path: "debit-notices",
    component: DebitNoticesComponent,
    name: "admin.debit-notices",
  },
  {
    path: "credit-notices",
    component: CreditNoticesComponent,
    name: "admin.credit-notices",
  },
];
