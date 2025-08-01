import BankReferenceComponent from "@/components/admin/cheques/bankReference/BankReferenceComponent.vue";
import ChequePortfolioComponent from "@/components/admin/cheques/chequePortfolio/ChequePortfolioComponent.vue";
import CreateChequePortfolio from "@/components/admin/cheques/chequePortfolio/CreateCheckComponent.vue";
import CreateCheckComponent from "@/components/admin/cheques/guarantor/CreateCheckComponent.vue";
import GuarantorComponent from "@/components/admin/cheques/guarantor/GuarantorComponent.vue";
import CreateCheckGuarantorComponent from "@/components/admin/cheques/incomingChecks/CreateCheckComponent.vue";
import CreateCheckBankReferenceComponent from "@/components/admin/cheques/incomingChecks/CreateCheckComponent.vue";
import IncomingChecksComponent from "@/components/admin/cheques/incomingChecks/IncomingChecksComponent.vue";
import CreateCheckIncomingOutgoingComponent from "@/components/admin/cheques/incomingOutgoing/CreateCheckComponent.vue";
import IncomingOutgoingComponent from "@/components/admin/cheques/incomingOutgoing/IncomingOutgoingComponent.vue";
import CreateCheckIssuedPaidComponent from "@/components/admin/cheques/issuedPaid/CreateCheckComponent.vue";
import IssuedPaidComponent from "@/components/admin/cheques/issuedPaid/IssuedPaidComponent.vue";
import CreateCheckIssuedChecksComponent from "@/components/admin/cheques/issuedChecks/CreateCheckComponent.vue";
import IssuedChecksComponent from "@/components/admin/cheques/issuedChecks/IssuedChecksComponent.vue";
import CreateCheckReferenceHolderComponent from "@/components/admin/cheques/referenceHolder/CreateCheckComponent.vue";
import ReferenceHolderComponent from "@/components/admin/cheques/referenceHolder/ReferenceHolderComponent.vue";
import CreateCheckUnderCollection from "@/components/admin/cheques/underCollection/CreateCheckComponent.vue";
import UnderCollectionComponent from "@/components/admin/cheques/underCollection/UnderCollectionComponent.vue";
import CreateCheckUnpaidChecksComponent from "@/components/admin/cheques/unpaidChecks/CreateCheckComponent.vue";
import UnpaidChecksComponent from "@/components/admin/cheques/unpaidChecks/UnpaidChecksComponent.vue";
import IssuedBankReferenceComponent from "@/components/admin/cheques/IssuedBankReference/IssuedBankReferenceComponent.vue";
import AutomaticDisbursementComponent from "@/components/admin/cheques/automaticDisbursement/AutomaticDisbursementComponent.vue";

export default [
    {
        path: "cheque/",
        children: [
            {
                path: "incoming-checks/",
                children: [
                    {
                        path: '',
                        name: "admin.cheques.incoming_checks",
                        component: IncomingChecksComponent
                    },
                    {
                        path: 'create',
                        name: "admin.cheques.incoming_checks.create",
                        component: CreateCheckComponent
                    }
                ],
            }, {
                path: "cheque-portfolio",
                children: [
                    {
                        path: '',
                        name: "admin.cheques.cheque_portfolio",
                        component: ChequePortfolioComponent
                    }, {
                        path: 'create',
                        name: "admin.cheques.cheque_portfolio.create",
                        component: CreateChequePortfolio
                    }
                ]
            }, {
                path: "under-collections",
                children: [
                    {
                        path: '',
                        name: "admin.cheques.under_collection",
                        component: UnderCollectionComponent
                    }, {
                        path: 'create',
                        name: "admin.cheques.under_collection.create",
                        component: CreateCheckUnderCollection
                    }
                ]
            }, {
                path: "incoming-outgoing",
                children: [
                    {
                        path: '',
                        name: "admin.cheques.incoming_outgoing",
                        component: IncomingOutgoingComponent
                    }, {
                        path: 'create',
                        name: "admin.cheques.incoming_outgoing.create",
                        component: CreateCheckIncomingOutgoingComponent
                    }
                ]
            }, {
                path: "bank-reference",
                children: [
                    {
                        path: '',
                        name: "admin.cheques.bank_reference",
                        component: BankReferenceComponent
                    }, {
                        path: 'create',
                        name: "admin.cheques.bank_reference.create",
                        component: CreateCheckBankReferenceComponent
                    }
                ]
            }, {
                path: "reference-holder",
                children: [
                    {
                        path: '',
                        component: ReferenceHolderComponent,
                        name: "admin.cheques.reference_holder"
                    }, {
                        path: 'create',
                        component: CreateCheckReferenceHolderComponent,
                        name: "admin.cheques.reference_holder.create"
                    }
                ]
            }, {
                path: "guarantor",
                children: [
                    {
                        path: '',
                        component: GuarantorComponent,
                        name: "admin.cheques.guarantor"
                    }, {
                        path: 'create',
                        component: CreateCheckGuarantorComponent,
                        name: "admin.cheques.guarantor.create"
                    }
                ]
            }, {
                path: "issued-checks",
                children: [
                    {
                        path: '',
                        component: IssuedChecksComponent,
                        name: "admin.cheques.issued_checks"
                    }, {
                        path: "create",
                        component: CreateCheckIssuedChecksComponent,
                        name: "admin.cheques.issued_checks.create"

                    }
                ]
            }, {
                path: "unpaid-checks",
                children: [
                    {
                        path: '',
                        component: UnpaidChecksComponent,
                        name: "admin.cheques.unpaid_checks"
                    }, {
                        path: "create",
                        component: CreateCheckUnpaidChecksComponent,
                        name: "admin.cheques.unpaid_checks.create"

                    }
                ]
            }, {
                path: "issued-paid",
                children: [
                    {
                        path: '',
                        component: IssuedPaidComponent,
                        name: "admin.cheques.issued_paid"
                    }, {
                        path: "create",
                        component: CreateCheckIssuedPaidComponent,
                        name: "admin.cheques.issued_paid.create"

                    }
                ]
            }, {
                path: "issued-bank-reference",
                children: [
                    {
                        path: '',
                        component: IssuedBankReferenceComponent,
                        name: "admin.cheques.issued_bank_reference"
                    }, {
                        path: "create",
                        component: CreateCheckBankReferenceComponent,
                        name: "admin.cheques.issued_bank_reference.create"

                    }
                ]
            },{
                path: "auto-disbursement",
                component: AutomaticDisbursementComponent,
                name: "admin.cheques.auto_disbursement"
            }
        ]
    }
];