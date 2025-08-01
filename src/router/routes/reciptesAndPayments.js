import CashboxTransactionsComponent from "@/components/admin/receiptsAndPayments/cashboxTransactions/CashboxTransactionsComponent.vue";
import CreateTransactionComponent from "@/components/admin/receiptsAndPayments/cashboxTransactions/CreateTransactionComponent.vue";
import CreateCreditNoticeComponent from "@/components/admin/receiptsAndPayments/creditNotices/CreateCreditNoticeComponent.vue";
import CreditNoticesComponent from "@/components/admin/receiptsAndPayments/creditNotices/CreditNoticesComponent.vue";
import CreateDebitNoticeComponent from "@/components/admin/receiptsAndPayments/debitNotices/CreateDebitNoticeComponent.vue";
import DebitNoticesComponent from "@/components/admin/receiptsAndPayments/debitNotices/DebitNoticesComponent.vue";
import CreatePaymentComponent from "@/components/admin/receiptsAndPayments/payments/CreatePaymentComponent.vue";
import PaymentsComponent from "@/components/admin/receiptsAndPayments/payments/PaymentsComponent.vue";
import CreateRecipetComponent from "@/components/admin/receiptsAndPayments/recipts/CreateRecipetComponent.vue";
import ReciptsComponent from "@/components/admin/receiptsAndPayments/recipts/ReciptsComponent.vue";

export default [
    {
        path: "recipts-and-payments/",
        children: [
            {
                path: "receipts/",

                children: [
                    {
                        path: "",
                        component: ReciptsComponent,
                        name: "admin.recipts-and-payments.recipts",
                    },
                    {
                        path: "create",
                        component: CreateRecipetComponent,
                        name: "admin.recipts-and-payments.recipts.create"
                    }
                ]
            }, {
                path: "payments/",

                children: [
                    {
                        path: "",
                        component: PaymentsComponent,
                        name: "admin.recipts-and-payments.payments",
                    },
                    {
                        path: "create",
                        component: CreatePaymentComponent,
                        name: "admin.recipts-and-payments.payments.create"
                    }
                ]
            }, {
                path: "credit-notices/",

                children: [
                    {
                        path: "",
                        component: CreditNoticesComponent,
                        name: "admin.recipts-and-payments.credit-notices",
                    },
                    {
                        path: "create",
                        component: CreateCreditNoticeComponent,
                        name: "admin.recipts-and-payments.credit-notices.create"
                    }
                ]
            }, {
                path: "debit-notices/",

                children: [
                    {
                        path: "",
                        component: DebitNoticesComponent,
                        name: "admin.recipts-and-payments.debit-notices",
                    },
                    {
                        path: "create",
                        component: CreateDebitNoticeComponent,
                        name: "admin.recipts-and-payments.debit-notices.create"
                    }
                ]
            }, {
                path: "cashbox_transactions/",

                children: [
                    {

                        path: "",
                        component: CashboxTransactionsComponent,
                        name: "admin.recipts-and-payments.cashbox-transactions"
                    },{

                        path: "create",
                        component: CreateTransactionComponent,
                        name: "admin.recipts-and-payments.cashbox-transactions.create"
                    }
                ]
            }
        ]

    },
]