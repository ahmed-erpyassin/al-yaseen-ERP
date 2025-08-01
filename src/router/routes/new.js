import CreateAccountComponent from "@/components/admin/dashboard/accounts/CreateAccountComponent.vue";
import CreateCustomerComponent from "@/components/admin/sales/customers/CreateCustomerComponent.vue";
import CreateDebitNoticeComponent from "@/components/admin/sales/DebitNotice/CreateDebitNoticeComponent.vue";
import CreateEmployeeComponent from "@/components/admin/new/CreateEmployeeComponent.vue";
import CreateExchangeComponent from "@/components/admin/new/CreateExchangeComponent.vue";
import CreateExpenseComponent from "@/components/admin/purchases/expenses/CreateExpenseComponent.vue";
import CreateIncomeShipment from "@/components/admin/purchases/incomingShipments/CreateIncomeShipment.vue";
import CreateItemComponent from "@/components/admin/new/CreateItemComponent.vue";
import CreateOfferPriceComponent from "@/components/admin/sales/issuedQuotations/CreateOfferPriceComponent.vue";
import CreateOrderComponent from "@/components/admin/sales/incomingOrders/CreateOrderComponent.vue";
import CreateOutgoingOrderComponent from "@/components/admin/purchases/outgoingOrders/CreateOutgoingOrderComponent.vue";
import CreatePaymentComponent from "@/components/admin/receiptsAndPayments/payments/CreatePaymentComponent.vue";
import CreatePurchaseInvoice from "@/components/admin/purchases/purchaseInvoices/CreatePurchaseInvoice.vue";
import CreatePurchaseReturnInvoiceComponent from "@/components/admin/purchases/purchaseReferenceInvoices/CreatePurchaseReturnInvoiceComponent.vue";
import CreateRecipetComponent from "@/components/admin/receiptsAndPayments/recipts/CreateRecipetComponent.vue";
import CreateSaleInvoiceComponent from "@/components/admin/sales/selesInvoice/CreateSaleInvoiceComponent.vue";
import CreateSalesReturnInvoiceComponent from "@/components/admin/sales/salesReferenceInvoices/CreateSalesReturnInvoiceComponent.vue";
import CreateServiceComponent from "@/components/admin/sales/services/CreateServiceComponent.vue";
import CreateSupplierComponent from "@/components/admin/purchases/suppliers/CreateSupplierComponent.vue";
import CreateWarehouseComponent from "@/components/admin/new/CreateWarehouseComponent.vue";
import CreateCreditNoticeComponent from "@/components/admin/purchases/creditNotices/CreateCreditNoticeComponent.vue";

export default [

    {
        path: "new-customer",
        component: CreateCustomerComponent,
        name: "admin.new-customer"
    },
    {
        path: "new-supplier",
        component: CreateSupplierComponent,
        name : "admin.new-supplier"
    },
    {
        path: "new-warehouse",
        component: CreateWarehouseComponent,
        name : "admin.new-warehouse"
    },
    {
        path: "new-account",
        component: CreateAccountComponent,
        name : "admin.new-account"
    },
    {
        path: "new-employee",
        component: CreateEmployeeComponent,
        name : "admin.new-employee"
    },
    {
        path: "new-purchase-invoice",
        component: CreatePurchaseInvoice,
        name : "admin.new-purchaseInvoice"
    },{
        path: "new-recipet",
        component: CreateRecipetComponent,
        name : "admin.new-Recipet"
    },{
        path: "new-payment",
        component: CreatePaymentComponent,
        name : "admin.new-payment"
    },{
        path: "new-exchange",
        component: CreateExchangeComponent,
        name : "admin.new-exchange"
    },
    {
        path: "new-item",
        component: CreateItemComponent,
        name : "admin.new-item"
    },{
        path: "new-sales-invoice",
        component: CreateSaleInvoiceComponent,
        name : "admin.new-sales-invoice"
    },{
        path: "new-price-offer",
        component: CreateOfferPriceComponent,
        name : "admin.new-price-offer"
    },{
        path: "new-order",
        component: CreateOrderComponent,
        name : "admin.new-order"
    },{
        path: "new-outgoing-order",
        component: CreateOutgoingOrderComponent,
        name : "admin.new-outgoing-order"
    },{
        path: "new-income-shipment",
        component: CreateIncomeShipment,
        name : "admin.new-income-shipment"
    },{
        path: "new-service",
        component: CreateServiceComponent,
        name : "admin.new-service"
    },{
        path: "new-sales-return-invoice",
        component: CreateSalesReturnInvoiceComponent,
        name : "admin.new-sales-return-invoice"
    },{
        path: "new-purchase-return-invoice",
        component: CreatePurchaseReturnInvoiceComponent,
        name : "admin.new-purchase-return-invoice"
    },{
        path: "new-debit-notice",
        component: CreateDebitNoticeComponent,
        name : "admin.new-debit-notice"
    },{
        path: "new-credit-notice",
        component: CreateCreditNoticeComponent,
        name : "admin.new-credit-notice"
    },{
        path: "new-expense",
        component: CreateExpenseComponent,
        name : "admin.new-expense"
    },


]