<template>
    <aside :class="{ open: isOpen }" class="text-white" style="width: 250px;">
        <!-- Logo -->
        <div class="logo rounded-1 p-1 w-100 mb-5 m-4">
            <div class="d-flex flex-row align-items-center justify-content-center" dir="ltr">
                <img src="@/assets/logo.png" alt="Logo" width="67.37px" height="59.78px">
                <div class="ms-0">
                    <p class='mb-0 text-dark'>Al Yaseen</p>
                    <p class="mb-0 text-success">ERP</p>
                </div>
            </div>
        </div>

        <!-- Menu -->
        <ul class="nav flex-column">
            <li v-for="section in menuSections" :key="section.id" class="nav-item pe-2 ps-2">
                <button @click="toggle(section.id)"
                    class="nav-link w-100 text-white d-flex align-items-center justify-content-between">
                    <span class="fs-5">{{ $t(section.label) }}</span>
                    <i class="bi bi-chevron-down" :class="{ rotate: openBox.id === section.id }"></i>
                </button>

                <div v-show="openBox.id === section.id" class="bg-white text-dark">
                    <router-link v-for="item in section.items" :key="item.label" :to="item.to"
                        class="nav-link text-dark d-flex align-items-center justify-content-between">
                        <span>{{ $t(item.label) }}</span>
                        <i :class="item.icon"></i>
                    </router-link>
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
            openBox: { id: null },
            isOpen: false,
            menuSections: [
                {
                    id: 'new',
                    label: 'aside.New',
                    icon: 'bi bi-plus-circle',
                    items: [
                        { label: 'aside.Add Customer', to: { name: 'admin.customers.create' }, icon: 'bi bi-person-plus' },
                        { label: 'aside.Add Sales Invoice', to: { name: 'admin.new-sales-invoice' }, icon: 'bi bi-receipt' },
                        { label: 'aside.Add Supplier', to: { name: 'admin.new-supplier' }, icon: 'bi bi-truck' },
                        { label: 'aside.Add Purchase Invoice', to: { name: 'admin.new-purchaseInvoice' }, icon: 'bi bi-bag-plus' },
                        { label: 'aside.Add Receipt', to: { name: 'admin.new-Recipet' }, icon: 'bi bi-cash-stack' },
                        { label: 'aside.Add Employee', to: { name: 'admin.new-employee' }, icon: 'bi bi-people' },
                        { label: 'aside.Add Payment', to: { name: 'admin.new-payment' }, icon: 'bi bi-credit-card' },
                        { label: 'aside.Add Warehouse', to: { name: 'admin.new-warehouse' }, icon: 'bi bi-archive' },
                        { label: 'aside.Add Item', to: { name: 'admin.new-item' }, icon: 'bi bi-box-seam' },
                        { label: 'aside.Add Account', to: { name: 'admin.new-account' }, icon: 'bi bi-wallet2' },
                    ]
                },
                {
                    id: 'dashboard',
                    label: 'aside.home',
                    icon: 'bi bi-house',
                    items: [
                        { label: 'aside.chart_of_accounts', to: { name: 'admin.account-list' }, icon: 'bi bi-list-columns' },
                        { label: 'label.exchange_rates', to: { name: 'admin.currency-rates' }, icon: 'bi bi-currency-exchange' },
                        { label: 'label.currency_rates_from_internet', to: { name: 'admin.currency-rates-from-internet' }, icon: 'bi bi-cloud-arrow-down' },
                        { label: 'label.banks', to: { name: 'admin.banks' }, icon: 'bi bi-bank' },
                        { label: 'label.contact_info', to: { name: 'admin.contacts' }, icon: 'bi bi-telephone' },
                    ]
                },
                {
                    id: 'sales',
                    label: 'aside.sales',
                    icon: 'bi bi-cart-check',
                    items: [
                        { label: 'label.customers', to: { name: 'admin.customers' }, icon: 'bi bi-people' },
                        { label: 'label.outgoing_offers', to: { name: 'admin.outgoing-offers' }, icon: 'bi bi-bag-check' },
                        { label: 'label.incoming_orders', to: { name: 'admin.orders' }, icon: 'bi bi-bag' },
                        { label: 'label.incoming_shipments', to: { name: 'admin.shipments' }, icon: 'bi bi-truck' },
                        { label: 'label.sales_invoices', to: { name: 'admin.sales-invoice' }, icon: 'bi bi-receipt' },
                        { label: 'label.services', to: { name: 'admin.services' }, icon: 'bi bi-gear' },
                        { label: 'label.sales_return_invoice', to: { name: 'admin.sales-return-invoices' }, icon: 'bi bi-arrow-counterclockwise' },
                        { label: 'label.debit_notices', to: { name: 'admin.debit-notices' }, icon: 'bi bi-file-minus' },
                        { label: 'label.credit_notices', to: { name: 'admin.credit-notices' }, icon: 'bi bi-file-plus' },
                    ]
                },
                {
                    id: 'purchases',
                    label: 'aside.purchases',
                    icon: 'bi bi-bag-plus',
                    items: [
                        { label: 'label.suppliers', to: { name: 'admin.purchase.suppliers' }, icon: 'bi bi-truck' },
                        { label: 'label.incoming_offers', to: { name: 'admin.purchase.incoming-offers' }, icon: 'bi bi-bag-check' },
                        { label: 'label.outgoing_orders', to: { name: 'admin.purchase.outgoing-orders' }, icon: 'bi bi-bag' },
                        { label: 'label.incoming_shipments', to: { name: 'admin.purchase.incoming-shipments' }, icon: 'bi bi-truck' },
                        { label: 'label.purchases_invoice', to: { name: 'admin.purchase.purchases-invoice' }, icon: 'bi bi-receipt' },
                        { label: 'label.expenses', to: { name: 'admin.purchase.expenses' }, icon: 'bi bi-cash-stack' },
                        { label: 'label.purchases_return_invoice', to: { name: 'admin.purchase.purcheses-return-invoice' }, icon: 'bi bi-arrow-counterclockwise' },
                        { label: 'label.debit_notices', to: { name: 'admin.purchase.debit-notice' }, icon: 'bi bi-file-minus' },
                        { label: 'label.credit_notices', to: { name: 'admin.purchase.credit-notice' }, icon: 'bi bi-file-plus' },
                    ]
                },
                {
                    id: 'receipts_and_payments',
                    label: 'aside.receipts_and_payments',
                    icon: 'bi bi-wallet2',
                    items: [
                        { label: 'label.recipts', to: { name: 'admin.recipts-and-payments.recipts' }, icon: 'bi bi-cash' },
                        { label: 'label.payments', to: { name: 'admin.recipts-and-payments.payments' }, icon: 'bi bi-credit-card' },
                        { label: 'label.debit_notices', to: { name: 'admin.recipts-and-payments.debit-notices' }, icon: 'bi bi-file-minus' },
                        { label: 'label.credit_notices', to: { name: 'admin.recipts-and-payments.credit-notices' }, icon: 'bi bi-file-plus' },
                        { label: 'label.cashbox_transactions', to: { name: 'admin.recipts-and-payments.cashbox-transactions' }, icon: 'bi bi-cash-stack' },
                    ]
                },
                {
                    id: 'projects',
                    label: 'aside.projects',
                    icon: 'bi bi-kanban',
                    items: [
                        { label: 'aside.projects', to: { name: 'admin.projects' }, icon: 'bi bi-folder' },
                        { label: 'breadcrumb.tasks', to: { name: 'admin.tasks' }, icon: 'bi bi-list-task' },
                        { label: 'aside.milestones', to: { name: 'admin.milestones' }, icon: 'bi bi-flag' },
                        { label: 'aside.sources', to: { name: 'admin.sources' }, icon: 'bi bi-journal-bookmark' },
                        { label: 'aside.documents', to: { name: 'admin.documents' }, icon: 'bi bi-file-earmark-text' },
                        { label: 'aside.financials', to: { name: 'admin.financials' }, icon: 'bi bi-bar-chart' },
                    ]
                },
                {
                    id: 'cheques',
                    label: 'aside.cheques',
                    icon: 'bi bi-file-text',
                    items: [
                        { label: 'label.incoming_checks', to: { name: 'admin.cheques.incoming_checks' }, icon: 'bi bi-file-arrow-down' },
                        { label: 'label.cheque_portfolio', to: { name: 'admin.cheques.cheque_portfolio' }, icon: 'bi bi-folder2-open' },
                        { label: 'label.under_collection', to: { name: 'admin.cheques.under_collection' }, icon: 'bi bi-clock' },
                        { label: 'label.incoming_outgoing', to: { name: 'admin.cheques.incoming_outgoing' }, icon: 'bi bi-arrow-left-right' },
                        { label: 'label.bank_reference', to: { name: 'admin.cheques.bank_reference' }, icon: 'bi bi-building' },
                        { label: 'label.reference_holder', to: { name: 'admin.cheques.reference_holder' }, icon: 'bi bi-person-badge' },
                        { label: 'label.guarantor', to: { name: 'admin.cheques.guarantor' }, icon: 'bi bi-shield-check' },
                        { label: 'label.issued_checks', to: { name: 'admin.cheques.issued_checks' }, icon: 'bi bi-file-earmark-check' },
                        { label: 'label.unpaid_checks', to: { name: 'admin.cheques.unpaid_checks' }, icon: 'bi bi-x-circle' },
                        { label: 'label.issued_paid', to: { name: 'admin.cheques.issued_paid' }, icon: 'bi bi-check-circle' },
                        { label: 'label.issued_bank_reference', to: { name: 'admin.cheques.issued_bank_reference' }, icon: 'bi bi-bank2' },
                        { label: 'label.automatic_disbursement', to: { name: 'admin.cheques.auto_disbursement' }, icon: 'bi bi-arrow-repeat' },
                    ]
                },
                {
                    id: 'accounting',
                    label: 'label.accounting',
                    icon: 'bi bi-calculator',
                    items: [
                        { label: 'label.accounts', to: { name: 'admin.accounting.accounts' }, icon: 'bi bi-wallet2' },
                        { label: 'label.chart_of_accounts', to: { name: 'admin.accounting.chart_of_accounts' }, icon: 'bi bi-list-columns' },
                        { label: 'label.journal_entries', to: { name: 'admin.accounting.journal_entries' }, icon: 'bi bi-journal-text' },
                        { label: 'label.journal_vouchers', to: { name: 'admin.accounting.journal_vouchers' }, icon: 'bi bi-receipt' },
                        { label: 'label.budgets', to: { name: 'admin.accounting.budgets' }, icon: 'bi bi-bar-chart' },
                        { label: 'label.balance_sheet', to: { name: 'admin.accounting.balance_sheet' }, icon: 'bi bi-file-earmark-text' },
                        { label: 'label.funders', to: { name: 'admin.accounting.funders' }, icon: 'bi bi-person-check' },
                        { label: 'label.assets', to: { name: 'admin.accounting.assets' }, icon: 'bi bi-archive' },
                    ]
                },
                {
                    id: 'employees',
                    label: 'label.employees',
                    icon: 'bi bi-people',
                    items: [
                        { label: 'label.employees', to: { name: 'admin.employees' }, icon: 'bi bi-people' }, // الموظفين
                        { label: 'label.payroll_report', to: { name: 'admin.employees.payroll_report' }, icon: 'bi bi-file-earmark-text' }, // تقرير الرواتب
                        { label: 'label.attendance_sheet', to: { name: 'admin.employees.attendance_sheet' }, icon: 'bi bi-calendar-check' }, // كشف الحضور
                        { label: 'label.leaves', to: { name: 'admin.employees.leaves' }, icon: 'bi bi-file-earmark-minus' }, // الإجازات
                        { label: 'label.departments', to: { name: 'admin.accounting.departments' }, icon: 'bi bi-building' }, // الأقسام
                        { label: 'label.contracts', to: { name: 'admin.employees.contracts' }, icon: 'bi bi-file-text' }, // العقود
                        { label: 'label.attendanceshifts', to: { name: 'admin.employees.attendance-shifts' }, icon: 'bi bi-clock' }, // الشفتات / حضور
                        { label: 'label.loans', to: { name: 'admin.employees.loans' }, icon: 'bi bi-cash-stack' }, // القروض
                        { label: 'label.promotions-evaluations', to: { name: 'admin.employees.promotions-evaluations' }, icon: 'bi bi-award' }, // الترقيات والتقييمات
                        { label: 'label.employee-documents', to: { name: 'admin.employees.employee-documents' }, icon: 'bi bi-folder' }, // مستندات الموظفين
                        { label: 'label.reports', to: { name: 'admin.employees.reports' }, icon: 'bi bi-graph-up' }, // التقارير
                        { label: 'label.settings', to: { name: 'admin.employees.settings' }, icon: 'bi bi-gear' }, // الإعدادات

                    ]
                },
                {
                    id: 'warehouses',
                    label: 'label.warehouses',
                    icon: 'bi bi-archive',
                    items: [
                        { label: 'label.items', to: { name: 'admin.warehouses.items' }, icon: 'bi bi-box-seam' },
                        { label: 'label.item_tree', to: { name: 'admin.warehouses.chart_of_items' }, icon: 'bi bi-diagram-3' },
                        { label: 'label.manufacturing_formula', to: { name: 'admin.warehouses.manufacturing-formula' }, icon: 'bi bi-gear' },
                        { label: 'label.manufacturing', to: { name: 'admin.warehouses.manufacturing-formula.manufacturing' }, icon: 'bi bi-hammer' },
                        { label: 'label.warehouses', to: { name: 'admin.warehouses' }, icon: 'bi bi-building' },
                        { label: 'label.warehouse_movements', to: { name: 'admin.warehouses.warehouse_movements' }, icon: 'bi bi-arrow-left-right' },
                        { label: 'label.current_inventory_value', to: { name: 'admin.warehouses.current_inventory_value' }, icon: 'bi bi-cash-stack' },
                    ]
                },
                {
                    id: 'taxes',
                    label: 'label.taxes',
                    icon: 'bi bi-receipt-cutoff',
                    items: [
                        { label: 'label.monthly_revenue_expense_report', to: { name: 'admin.taxes.monthly_financials' }, icon: 'bi bi-bar-chart-line' },
                    ]
                },
                {
                    id: 'reports',
                    label: 'label.reports',
                    icon: 'bi bi-file-earmark-bar-graph',
                    items: [
                        { label: 'label.reports', to: { name: 'admin.reports' }, icon: 'bi bi-file-earmark-text' },
                    ]
                },
            ]
        }
    },
    methods: {
        toggle(boxId) {
            this.openBox.id = this.openBox.id === boxId ? null : boxId;
        },
        enter(el) {
            appService.smoothEnter(el);
        },
        leave(el) {
            appService.smoothLeave(el);
        }
    }
}
</script>

<style>
aside {
    background-color: #1D263B;
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 30px;
    position: sticky;
    top: 0;
    width: 250px;
    scroll-behavior: smooth;
}

/* scrollbar */
aside::-webkit-scrollbar {
    width: 6px;
}

aside::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}

aside::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.6);
}

aside {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

/* logo */
aside .logo {
    background-color: #FFF6F6;
}

/* rotation for icon */
button i.rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

/* responsive */
@media (max-width: 992px) {
    aside {
        position: fixed;
        left: -260px;
        top: 0;
        width: 250px;
        z-index: 1050;
        transition: left 0.3s ease;
    }

    aside.open {
        left: 0;
    }
}

/* على الموبايل الصغير */
@media (max-width: 576px) {
    aside {
        width: 100%;
        left: -100%;
    }

    aside.open {
        left: 0;
    }
}
</style>
