<template>
    <aside class="text-white" style="width: 250px;">
        <div class="d-flex align-items-center justify-content-between">
            <div class="logo rounded-1 p-1 w-100 mb-5 m-4">
                <div class="d-flex flex-row align-items-center justify-content-center" dir="ltr">
                    <img src="@/assets/logo.png" alt="Logo" width="67.37px" height="59.78px">
                    <div class="ms-0">
                        <p class='mb-0 text-dark'>Al Yaseen</p>
                        <p class="mb-0 text-success">ERP</p>
                    </div>
                </div>
            </div>
        </div>

        <ul class="nav flex-column">
            <li class="nav-item pe-2 ps-2">
                <a class="nav-link d-flex align-items-center justify-content-between" href="#" @click="toggle(1)"
                    :class="openBox.id == 1 && openBox.collapse ? 'bg-white text-dark' : 'text-white'">
                    <span class="fs-5">{{ $t('aside.New') }}</span>
                    <i class="bi bi-chevron-down me-2"
                        :style="openBox.id == 1 && openBox.collapse ? 'transform: rotate(180deg)' : ''"></i>
                </a>

                <transition @enter="enter('new')" @leave="leave('new')" id='new'>
                    <div v-show="openBox.collapse && openBox.id == 1" class="overflow-hidden">
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.new-customer' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.Add Customer') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-sales-invoice' }">
                                <span>{{ $t('aside.Add Sales Invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-supplier' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.Add Supplier') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-purchaseInvoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between" href="#">
                                <span>{{ $t('aside.Add Purchase Invoice') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-Recipet' }">
                                <span>{{ $t('aside.Add Receipt') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-employee' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.Add Employee') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.new-payment' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between" href="#">
                                <span>{{ $t('aside.Add Payment') }}</span>
                            </router-link>
                            <!-- <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-exchange' }">
                                <span>{{ $t('aside.Add Exchange') }}</span>
                            </router-link> -->
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-warehouse' }">
                                <span>{{ $t('aside.Add Warehouse') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-item' }">
                                <span>{{ $t('aside.Add Item') }}</span>
                            </router-link>
                            <router-link class="nav-link text-dark d-flex align-items-center justify-content-between"
                                :to="{ name: 'admin.new-account' }">
                                <span>{{ $t('aside.Add Account') }}</span>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </li>

            <li class="nav-item pe-2 ps-2">
                <a class="nav-link d-flex align-items-center justify-content-between" href="#" @click="toggle(2)"
                    :class="openBox.id == 2 && openBox.collapse ? 'bg-white text-dark' : 'text-white'">
                    <span class="fs-5">{{ $t('aside.home') }}</span>
                    <i class="bi bi-chevron-down me-2"
                        :style="openBox.id == 2 && openBox.collapse ? 'transform: rotate(180deg)' : ''"></i>
                </a>

                <transition @enter="enter('dashboard')" @leave="leave('dashboard')" id='dashboard'>
                    <div v-show="openBox.collapse && openBox.id == 2" class="overflow-hidden">
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.account-list' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('aside.chart_of_accounts') }}</span>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </li>
            <li class="nav-item pe-2 ps-2">
                <a class="nav-link d-flex align-items-center justify-content-between" href="#" @click="toggle(3)"
                    :class="openBox.id == 3 && openBox.collapse ? 'bg-white text-dark' : 'text-white'">
                    <span class="fs-5">{{ $t('aside.sales') }}</span>
                    <i class="bi bi-chevron-down me-2"
                        :style="openBox.id == 3 && openBox.collapse ? 'transform: rotate(180deg)' : ''"></i>
                </a>

                <transition @enter="enter('sales')" @leave="leave('sales')" id='sales'>
                    <div v-show="openBox.collapse && openBox.id == 3" class="overflow-hidden">
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.customers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.customers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.outgoing-offers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.outgoing_offers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.orders' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_orders') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.shipments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_shipments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.sales-invoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.sales_invoices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.services' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.services') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.sales-return-invoices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.sales_return_invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.debit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.debit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.credit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.credit_notices') }}</span>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </li>
            <li class="nav-item pe-2 ps-2">
                <a class="nav-link d-flex align-items-center justify-content-between" href="#" @click="toggle(4)"
                    :class="openBox.id == 4 && openBox.collapse ? 'bg-white text-dark' : 'text-white'">
                    <span class="fs-5">{{ $t('aside.purchases') }}</span>
                    <i class="bi bi-chevron-down me-2"
                        :style="openBox.id == 4 && openBox.collapse ? 'transform: rotate(180deg)' : ''"></i>
                </a>

                <transition @enter="enter('purchases')" @leave="leave('purchases')" id='purchases'>
                    <div v-show="openBox.collapse && openBox.id == 4" class="overflow-hidden">
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.purchase.suppliers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.suppliers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.incoming-offers' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_offers') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.outgoing-orders' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.outgoing_orders') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.incoming-shipments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_shipments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.purchases-invoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.purchases_invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.expenses' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.expenses') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.purcheses-return-invoice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.purchases_return_invoice') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.debit-notice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.debit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.purchase.credit-notice' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.credit_notices') }}</span>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </li>
            <li class="nav-item pe-2 ps-2">
                <a class="nav-link d-flex align-items-center justify-content-between" href="#" @click="toggle(5)"
                    :class="openBox.id == 5 && openBox.collapse ? 'bg-white text-dark' : 'text-white'">
                    <span class="fs-5">{{ $t('aside.receipts_and_payments') }}</span>
                    <i class="bi bi-chevron-down me-2"
                        :style="openBox.id == 5 && openBox.collapse ? 'transform: rotate(180deg)' : ''"></i>
                </a>

                <transition @enter="enter('receipts_and_payments')" @leave="leave('receipts_and_payments')"
                    id='receipts_and_payments'>
                    <div v-show="openBox.collapse && openBox.id == 5" class="overflow-hidden">
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.recipts-and-payments.recipts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.recipts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.payments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.payments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.debit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.debit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.credit-notices' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.credit_notices') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.recipts-and-payments.cashbox-transactions' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.cashbox_transactions') }}</span>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </li>
            <li class="nav-item pe-2 ps-2">
                <router-link :to="{ name: 'admin.projects' }"
                    class="nav-link d-flex align-items-center justify-content-between text-white">
                    <span class="fs-5">{{ $t('aside.projects') }}</span>

                </router-link>

            </li>
            <li class="nav-item pe-2 ps-2">
                <a class="nav-link d-flex align-items-center justify-content-between" href="#" @click="toggle(6)"
                    :class="openBox.id == 6 && openBox.collapse ? 'bg-white text-dark' : 'text-white'">
                    <span class="fs-5">{{ $t('aside.cheques') }}</span>
                    <i class="bi bi-chevron-down me-2"
                        :style="openBox.id == 6 && openBox.collapse ? 'transform: rotate(180deg)' : ''"></i>
                </a>

                <transition @enter="enter('cheques')" @leave="leave('cheques')" id='cheques'>
                    <div v-show="openBox.collapse && openBox.id == 6" class="overflow-hidden">
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.cheques.incoming_checks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_checks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.cheque_portfolio' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.cheque_portfolio') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.under_collection' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.under_collection') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.incoming_outgoing' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.incoming_outgoing') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.bank_reference' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.bank_reference') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.reference_holder' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.reference_holder') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.guarantor' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.guarantor') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.issued_checks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.issued_checks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.unpaid_checks' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.unpaid_checks') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.issued_paid' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.issued_paid') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.issued_bank_reference' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.issued_bank_reference') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.cheques.auto_disbursement' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.automatic_disbursement') }}</span>
                            </router-link>
                        </div>
                    </div>
                </transition>
            </li>
            <li class="nav-item pe-2 ps-2">
                <button class="nav-link w-100 text-white d-flex align-items-center justify-content-between collapsed"  data-bs-toggle="collapse" data-bs-target="#accounting"
                aria-expanded="true" aria-controls="accounting">
                    <span class="fs-5">{{ $t('label.accounting') }}</span>
                    <i class="bi bi-chevron-down me-2"></i>
                </button>

                <div class="collapse" id="accounting">
                    <div >
                        <div class=" bg-white text-dark">
                            <router-link :to="{ name: 'admin.accounting.accounts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.accounts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.chart_of_accounts' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.chart_of_accounts') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.journal_entries' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.journal_entries') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.budgets' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.budgets') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.balance_sheet' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.balance_sheet') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.departments' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.departments') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.funders' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.funders') }}</span>
                            </router-link>
                            <router-link :to="{ name: 'admin.accounting.assets' }"
                                class="nav-link text-dark d-flex align-items-center justify-content-between">
                                <span>{{ $t('label.assets') }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
    </aside>
</template>

<script>

import appService from '@/services/appService';

export default {

    name: "AsideComponent",
    data() {
        return {
            openBox: {
                id: null,
                collapse: false
            },
        }
    },
    methods: {
        toggle(boxId) {

            this.openBox.id = this.openBox.id === boxId ? null : boxId;
            this.openBox.collapse = this.openBox.collapse == true && this.openBox.id == boxId ? false : true;
        },
        enter(el) {
            appService.smoothEnter(el);
        },
        leave(el) {
            appService.smoothLeave(el);
        },
    }

}

</script>

<style>
aside {

    background-color: #1D263B;
    min-height: 100vh !important;
    overflow-y: scroll;
    padding-bottom: 30px;

}

aside .logo {

    background-color: #FFF6F6;

}

button:not(.collapsed){
    background-color: #FFF;
    color: #333 !important
}

button:not(.collapsed) i {
    transform: rotate(180deg);
}

</style>