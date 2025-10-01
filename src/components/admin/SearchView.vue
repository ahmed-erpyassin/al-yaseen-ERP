<template>
    <div class="search-container p-4">
        <h4 class="mb-4">نتائج البحث: "{{ $route.query.q }}"</h4>

        <div v-if="results.length === 0" class="text-muted mt-3">لا يوجد نتائج</div>

        <ul v-else class="results-list list-unstyled">
            <li v-for="(item, index) in results" :key="index"
                class="result-item mb-2 p-2 rounded shadow-sm d-flex justify-content-between align-items-center">
                <router-link :to="item.path" class="text-decoration-none text-dark w-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="label-ar">{{ item.labelAr }}</span> / <span class="label-en">{{ item.labelEn
                            }}</span>
                        </div>
                        <span class="badge bg-success">{{ item.section }}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SearchView",
    data() {
        return {
            results: []
        };
    },
    computed: {
        pages() {
            return [
                // New
                { path: '/admin/customers/create', labelAr: 'عميل جديد', labelEn: 'New Customer' },
                { path: '/admin/new-sales-invoice', labelAr: 'فاتورة مبيعات جديدة', labelEn: 'New Sales Invoice' },
                { path: '/admin/new-supplier', labelAr: 'مورد جديد', labelEn: 'New Supplier' },
                { path: '/admin/new-purchaseInvoice', labelAr: 'فاتورة شراء جديدة', labelEn: 'New Purchase Invoice' },
                { path: '/admin/new-Recipet', labelAr: 'إيصال جديد', labelEn: 'New Receipt' },
                { path: '/admin/new-employee', labelAr: 'موظف جديد', labelEn: 'New Employee' },
                { path: '/admin/new-payment', labelAr: 'دفعة جديدة', labelEn: 'New Payment' },
                { path: '/admin/new-warehouse', labelAr: 'مخزن جديد', labelEn: 'New Warehouse' },
                { path: '/admin/new-item', labelAr: 'صنف جديد', labelEn: 'New Item' },
                { path: '/admin/new-account', labelAr: 'حساب جديد', labelEn: 'New Account' },

                // Home / Dashboard
                { path: '/admin/account-list', labelAr: 'قائمة الحسابات', labelEn: 'Account List' },
                { path: '/admin/currency-rates', labelAr: 'أسعار العملات', labelEn: 'Currency Rates' },
                { path: '/admin/currency-rates-from-internet', labelAr: 'أسعار العملات من الإنترنت', labelEn: 'Currency Rates from Internet' },
                { path: '/admin/banks', labelAr: 'البنوك', labelEn: 'Banks' },
                { path: '/admin/contacts', labelAr: 'جهات الاتصال', labelEn: 'Contacts' },

                // Sales
                { path: '/admin/customers', labelAr: 'العملاء', labelEn: 'Customers' },
                { path: '/admin/outgoing-offers', labelAr: 'العروض الصادرة', labelEn: 'Outgoing Offers' },
                { path: '/admin/orders', labelAr: 'الطلبات', labelEn: 'Orders' },
                { path: '/admin/shipments', labelAr: 'الشحنات', labelEn: 'Shipments' },
                { path: '/admin/sales-invoice', labelAr: 'فواتير المبيعات', labelEn: 'Sales Invoice' },
                { path: '/admin/services', labelAr: 'الخدمات', labelEn: 'Services' },
                { path: '/admin/sales-return-invoices', labelAr: 'فواتير مرتجعات المبيعات', labelEn: 'Sales Return Invoices' },
                { path: '/admin/debit-notices', labelAr: 'إشعارات مدين', labelEn: 'Debit Notices' },
                { path: '/admin/credit-notices', labelAr: 'إشعارات دائن', labelEn: 'Credit Notices' },

                // Purchases
                { path: '/admin/purchase.suppliers', labelAr: 'الموردون', labelEn: 'Suppliers' },
                { path: '/admin/purchase.incoming-offers', labelAr: 'العروض الواردة', labelEn: 'Incoming Offers' },
                { path: '/admin/purchase.outgoing-orders', labelAr: 'الطلبات الصادرة', labelEn: 'Outgoing Orders' },
                { path: '/admin/purchase.incoming-shipments', labelAr: 'الشحنات الواردة', labelEn: 'Incoming Shipments' },
                { path: '/admin/purchase.purchases-invoice', labelAr: 'فواتير الشراء', labelEn: 'Purchase Invoices' },
                { path: '/admin/purchase.expenses', labelAr: 'المصروفات', labelEn: 'Expenses' },
                { path: '/admin/purchase.purcheses-return-invoice', labelAr: 'فواتير مرتجعات الشراء', labelEn: 'Purchase Return Invoices' },
                { path: '/admin/purchase.debit-notice', labelAr: 'إشعار مدين', labelEn: 'Debit Notice' },
                { path: '/admin/purchase.credit-notice', labelAr: 'إشعار دائن', labelEn: 'Credit Notice' },

                // Receipts & Payments
                { path: '/admin/recipts-and-payments.recipts', labelAr: 'الإيصالات', labelEn: 'Receipts' },
                { path: '/admin/recipts-and-payments.payments', labelAr: 'المدفوعات', labelEn: 'Payments' },
                { path: '/admin/recipts-and-payments.debit-notices', labelAr: 'إشعارات مدين', labelEn: 'Debit Notices' },
                { path: '/admin/recipts-and-payments.credit-notices', labelAr: 'إشعارات دائن', labelEn: 'Credit Notices' },
                { path: '/admin/recipts-and-payments.cashbox-transactions', labelAr: 'حركات الصندوق', labelEn: 'Cashbox Transactions' },

                // Projects
                { path: '/admin/projects', labelAr: 'المشاريع', labelEn: 'Projects' },
                { path: '/admin/tasks', labelAr: 'المهام', labelEn: 'Tasks' },
                { path: '/admin/milestones', labelAr: 'المستويات', labelEn: 'Milestones' },
                { path: '/admin/sources', labelAr: 'المصادر', labelEn: 'Sources' },
                { path: '/admin/documents', labelAr: 'المستندات', labelEn: 'Documents' },

                // Cheques
                { path: '/admin/cheques.incoming_checks', labelAr: 'الشيكات الواردة', labelEn: 'Incoming Checks' },
                { path: '/admin/cheques.cheque_portfolio', labelAr: 'محفظة الشيكات', labelEn: 'Cheque Portfolio' },
                { path: '/admin/cheques.under_collection', labelAr: 'تحت التحصيل', labelEn: 'Under Collection' },
                { path: '/admin/cheques.incoming_outgoing', labelAr: 'الشيكات الواردة والصادرة', labelEn: 'Incoming & Outgoing' },
                { path: '/admin/cheques.bank_reference', labelAr: 'تحويل بنكي', labelEn: 'Bank Reference' },
                { path: '/admin/cheques.reference_holder', labelAr: 'حامل الإشعار', labelEn: 'Reference Holder' },
                { path: '/admin/cheques.guarantor', labelAr: 'الضامن', labelEn: 'Guarantor' },
                { path: '/admin/cheques.issued_checks', labelAr: 'الشيكات الصادرة', labelEn: 'Issued Checks' },
                { path: '/admin/cheques.unpaid_checks', labelAr: 'شيكات غير مدفوعة', labelEn: 'Unpaid Checks' },
                { path: '/admin/cheques.issued_paid', labelAr: 'شيكات صادرة مدفوعة', labelEn: 'Issued Paid' },
                { path: '/admin/cheques.issued_bank_reference', labelAr: 'شيكات صادرة تحويل بنكي', labelEn: 'Issued Bank Reference' },
                { path: '/admin/cheques.auto_disbursement', labelAr: 'صرف تلقائي', labelEn: 'Auto Disbursement' },

                // Accounting
                { path: '/admin/accounting/accounts', labelAr: 'الحسابات', labelEn: 'Accounts' },
                { path: '/admin/accounting/chart-of-accounts', labelAr: 'كشف الحسابات', labelEn: 'Chart of Accounts' },
                { path: '/admin/accounting/journal-entries', labelAr: 'قيود المحاسبة', labelEn: 'Journal Entries' },
                { path: '/admin/accounting/budgets', labelAr: 'الميزانيات', labelEn: 'Budgets' },
                { path: '/admin/accounting/balance-sheet', labelAr: 'الميزانية العمومية', labelEn: 'Balance Sheet' },
                { path: '/admin/accounting/funders', labelAr: 'الممولون', labelEn: 'Funders' },
                { path: '/admin/accounting/assets', labelAr: 'الأصول', labelEn: 'Assets' },

                // Employees
                { path: '/admin/employees', labelAr: 'الموظفين', labelEn: 'Employees' },
                { path: '/admin/employees/payroll-report', labelAr: 'تقرير الرواتب', labelEn: 'Payroll Report' },
                { path: '/admin/employees/attendance-sheet', labelAr: 'ورقة الحضور', labelEn: 'Attendance Sheet' },
                { path: '/admin/employees/leaves', labelAr: 'الإجازات', labelEn: 'Leaves' },
                { path: '/admin/accounting/departments', labelAr: 'الأقسام', labelEn: 'Departments' },


                // Warehouses
                { path: '/admin/warehouses/items', labelAr: 'الاصناف', labelEn: 'Items' },
                { path: '/admin/warehouses/chart-of-items', labelAr: 'كشف الاصناف', labelEn: 'Chart of Items' },
                { path: '/admin/warehouses/manufacturing-formula', labelAr: 'صيغة التصنيع', labelEn: 'Manufacturing Formula' },
                { path: '/admin/warehouses/manufacturing-formula.manufacturing', labelAr: 'تصنيع', labelEn: 'Manufacturing' },
                { path: '/admin/warehouses', labelAr: 'المخازن', labelEn: 'Warehouses' },
                { path: '/admin/warehouses/warehouse-movements', labelAr: 'حركات المخازن', labelEn: 'Warehouse Movements' },
                { path: '/admin/warehouses/current-inventory-value', labelAr: 'قيمة المخزون الحالية', labelEn: 'Current Inventory Value' },

                // Taxes
                { path: '/admin/taxes.monthly-financials', labelAr: 'التقارير الشهرية', labelEn: 'Monthly Financials' },

                // Reports
                { path: '/admin/reports', labelAr: 'التقارير', labelEn: 'Reports' }

            ];
        }
    },
    mounted() {
        this.search(this.$route.query.q);
    },
    watch: {
        "$route.query.q"(newQuery) {
            this.search(newQuery);
        }
    },
    methods: {
        search(query) {
            if (!query) {
                this.results = [];
                return;
            }
            const lowerQuery = query.toLowerCase();
            this.results = this.pages.filter(page =>
                page.labelAr.includes(query) ||
                page.labelEn.toLowerCase().includes(lowerQuery)
            );
        }
    }
};
</script>

<style scoped>
.search-container {
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.results-list .result-item {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: #fff;
}

.results-list .result-item:hover {
    background: #e8f5e9;
    transform: translateX(5px);
}

.label-ar {
    font-weight: 600;
}

.label-en {
    color: #555;
    font-size: 0.9em;
}

.badge {
    font-size: 0.75em;
    padding: 0.35em 0.6em;
}
</style>
